'use strict';
const Q = require('q');
const bcrypt = require('bcryptjs');
const _ = require('underscore');

module.exports = {
  display: function(remoteData) {
    let user = this;
    return {
      id: user.id,
      userName: user.userName,
      name: {
        first: user.firstName,
        last: user.lastName,
        full: user.firstName + ' ' + user.lastName
      },
      email: user.email,
      phone: user.phone,
      isVrettaAdmin: user.isVrettaAdmin,
      remoteData: remoteData
    };
  },

  validatePassword: function(password) {
    let word = this.salt + password + this.salt;
    return bcrypt.compareSync(word, this.password);
  },

  login: function() {
    let user = this;
    return Q.all([
      user.createSession({
        key: user.id
      }),
      user.display()
    ]).
    then((datas)=>{
      let session = datas[0];
      let userDisplay = datas[1];
      return _.extend(userDisplay,{session_key: session.key});
    });
  }

};
