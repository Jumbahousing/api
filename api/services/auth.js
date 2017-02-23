'use strict';
module.exports = (system)=>{
  const log = system.log;
  const Session = system.storage.sequelize.Session;

  return (req,res,options={})=>{
    let shouldBe = options.shouldBe || 'admin';
    return req.shouldHave(options.shouldHave).
    then(() => {
      req.forceResponseType = 'unAuthorized';
      let authID = req.headers['x-auth-id'];
      let authSessionKey = req.headers['x-auth-session-key'];
      return Session.findOne({
        where: {
          key: authSessionKey,
          user_id: authID
        }
      }).
      then((session)=>{
        if(session.expired){
          throw res.errors.unAuthorized({
            expired_on: session.updated_at
          },'SESSION_EXPIRED');
        }else{
          return session.getUser();
        }
      }).
      then((user)=>{
        if(shouldBe === 'admin' && user.isVrettaAdmin){
          req.forceResponseType = false;
          return user;
        }else{
          throw res.errors.unAuthorized({
            isVrettaAdmin: user.isVrettaAdmin
          },'NOT_ADMIN');
        }
      });
    });
  };
}
