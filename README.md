# OpenRoads
OpenRoads is a set of tools that allows for management and collaborative editing of road network data. Most of them are forks from OSM applications that were adapted and streamlined for the OR use case.

The following repositories are part of the OR ecosystem:

- [OR API](https://github.com/developmentseed/openroads-api)  
The OSM API was partially ported to Sails.js [![Build Status](https://magnum.travis-ci.com/developmentseed/openroads-api.svg?token=d4tUG3NhuWNZYSxWndVL&branch=develop)](https://magnum.travis-ci.com/developmentseed/openroads-api)
- [OR network editor](https://github.com/developmentseed/openroads-iD)  
Forked from iD
- [OR verification platform](https://github.com/developmentseed/openroads-tofix)  
A fork of To-fix

This is the main repo that contains the frontend wrapper that glues all these applications together. It is also used to version some other things that might end up in their own repo at some point: general docs, data processing scripts and wireframes.

## The wrapper
The wrapper is the bit of glue that brings the OR eco-system together for the end users. It contains a shared header, loads each of the applications in an `<iframe>` and takes care of the routing.

### Getting started

```
$ python -m SimpleHTTPServer 9898
```

Starts the server at `http://localhost:9898`

### Implementing the header
For technical docs on how to implement this in the OR applications, check `docs/or-wrapper.md`.

## The OpenRoads project

### Issues
The [issue queue of this repository](https://github.com/developmentseed/openroads/issues) is used to track the overall progress of the project.  
The queue of each separate tool should only be used for issues that are very specific to that application.

### Hosting and deployment
The wiki contains an [overview of the hosting and deployment](https://github.com/developmentseed/openroads/wiki/Hosting-of-OR-ecosystem) of all the applications.