module.exports = {

  tableName: 'changeset_tags',

  attributes: {
    changeset_id: {
      type: 'integer',
      primaryKey: true,
      model: 'changesets'
    },
    k: {
      type: 'string',
      truthy: true
    },
    v: {
      type: 'string',
      truthy: true
    },
  }

};

