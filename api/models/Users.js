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
      numerical: true,
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
    }
  }
};

