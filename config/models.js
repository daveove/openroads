/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#/documentation/concepts/ORM
 */

module.exports.models = {

  /***************************************************************************
  *                                                                          *
  * Your app's default connection. i.e. the name of one of your app's        *
  * connections (see `config/connections.js`)                                *
  *                                                                          *
  ***************************************************************************/
  connection: 'osmPostgreSQL',

  /***************************************************************************
  *                                                                          *
  * How and whether Sails will attempt to automatically rebuild the          *
  * tables/collections/etc. in your schema.                                  *
  *                                                                          *
  * See http://sailsjs.org/#/documentation/concepts/ORM/model-settings.html  *
  *                                                                          *
  ***************************************************************************/
  migrate: 'safe',

  /* Since not all tables require a timestamp, default to off.
   * Turn on case-by-case as required.
   * Schema: http://chrisnatali.github.io/osm_notes/osm_schema.html#way_nodes.way_id
   *
   * See http://sailsjs.org/#!/documentation/concepts/ORM/model-settings.html?q=autocreatedat
   */
  autoCreatedAt: false,
  autoUpdatedAt: false,

  // We probably don't want to auto-generate primary keys for everything either.
  autoPk: false,

};
