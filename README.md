# OpenRoads
This is the main repo for the Philippines OpenRoads project. Currently it contains the common header that is shared between all OR applications (the wrapper), general docs and data processing scripts.

## The wrapper
The wrapper is the bit of glue that brings the different tools in the OR eco-system together. It contains a shared header, loads each of the applications in an `<iframe>` and takes care of the routing.

### Getting started

```
$ python -m SimpleHTTPServer 9898
```

Starts the server at `http://localhost:9898`

### Implementing the header
For technical docs on how to implement this in the OR applications, check `docs/or-wrapper.md`.

## The OpenRoads project
Other repositories that are part of the OpenRoads ecosystem:

- [OR API](https://github.com/developmentseed/openroads-api)  
[![Build Status](https://magnum.travis-ci.com/developmentseed/openroads-api.svg?token=d4tUG3NhuWNZYSxWndVL&branch=develop)](https://magnum.travis-ci.com/developmentseed/openroads-api)
- [OR network editor](https://github.com/developmentseed/openroads-iD)
- [OR verification platform](https://github.com/developmentseed/openroads-tofix)

### Issues
The [issue queue of this repository](https://github.com/developmentseed/openroads/issues) is used to track the overall progress of the project.  
The queue of each separate tool should only be used for issues that are very specific to that application.

### Hosting and deployment
The wiki contains an [overview of the hosting and deployment](https://github.com/developmentseed/openroads/wiki/Hosting-of-OR-ecosystem) of all the applications.