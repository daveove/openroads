/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      numeric: true,
      index: true,
    },
    display_name: {
      type: 'string',
      required: true
    },
    creation_time: {
      type: 'datetime',
      datetime: true,
      required: true
    },


    // TODO unnecessary to keep these since we don't want to store them,
    // but currently required by the database schema.
    // Remove for production.
    email: {
      type: 'email',
      defaultsTo: 'openroads-user@openroads.org'
    },
    pass_crypt: {
      type: 'string',
      defaultsTo: '00000000000000000000000000000000'
    },
    data_public: {
      type: 'boolean',
      defaultsTo: true
    }
  }
};

