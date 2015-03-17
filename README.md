# OpenRoads
This is the main repo for the Philippines OpenRoads project containing the API. Other projects part of this project:

- [OR network editor](https://github.com/developmentseed/openroads-iD) - fork of iD
- [OR verification platform](https://github.com/developmentseed/openroads-tofix) - fork of To-fix

[![Build Status](https://magnum.travis-ci.com/developmentseed/openroads.svg?token=d4tUG3NhuWNZYSxWndVL&branch=develop)](https://magnum.travis-ci.com/developmentseed/openroads)

[![Build Status](https://magnum.travis-ci.com/developmentseed/openroads.svg?token=d4tUG3NhuWNZYSxWndVL&branch=develop)](https://magnum.travis-ci.com/developmentseed/openroads)

## Contributing

### Installing dependencies
```sh
git clone git@github.com:developmentseed/openroads.git
cd openroads
npm install
```

Install sails globally:

```sh
sudo npm install -g sails
```

### Local configuration

Before running the server, you will need to modify `config/local.js` to include directions to the postgresql database. You'll want to include the following:


```javascript
module.exports.connections = {
  osmPostgreSQL: {
    adapter: 'sails-postgresql',
    host: 'YOUR_HOST',
    port: 5434,
    user: 'USER_NAME',
    password: 'PASSWORD',
    database: 'DB_NAME',
    ssl: false,
    pool: false,
  }
}
```

### Installing a database with docker

The `db-server` directory contains instructions on running your own postgresql database with the appropriate table schema using Docker. For Mac OS X users you might need [boot2docker](https://docs.docker.com/installation/mac/)


### Running

To run the server, run the following command:

```sh
sails lift
```

To test the bounding box query:

```sh
curl http://localhost:1337/xml/map?bbox=123.81042480468751,9.584500864717155,123.81591796875,9.58991730708743
```
