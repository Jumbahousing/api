'use strict';
module.exports = {
  login: function(res, userName, password){
    let User = this;
    return User.findOne({
      where: {
        userName: userName
      }
    }).
    then((user)=>{
      if(!user.validatePassword(password)){
        res.response.successButInvalid([], 'BAD_PASSWORD');
      }else{
        return user.login().
          then((loggedInUser)=>res.response.success(loggedInUser, 'Logged In Successfully'));
      }
    });
  }
};
