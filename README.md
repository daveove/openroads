# OpenRoads
OpenRoads is a set of tools that allows for management and collaborative editing of road network data. Most of them are forks from OSM applications that were adapted and streamlined for the OR use case.

The following repositories are part of the OR ecosystem:

| | | |
| --- | --- | --- |
| [![Build Status](https://magnum.travis-ci.com/developmentseed/openroads-api.svg?token=d4tUG3NhuWNZYSxWndVL&branch=develop)](https://magnum.travis-ci.com/developmentseed/openroads-api) | [API](https://github.com/developmentseed/openroads-api)  | The partial port of the OSM API to Hapi |
| [![Build Status](https://magnum.travis-ci.com/developmentseed/openroads-iD.svg?token=d4tUG3NhuWNZYSxWndVL&branch=develop)](https://magnum.travis-ci.com/developmentseed/openroads-iD) | [Network editor](https://github.com/developmentseed/openroads-iD) | Forked from iD |
| [![Build Status](https://magnum.travis-ci.com/developmentseed/openroads-analytics.svg?token=d4tUG3NhuWNZYSxWndVL&branch=feature/travis)](https://magnum.travis-ci.com/developmentseed/openroads-analytics) | [Analytics](https://github.com/developmentseed/openroads-analytics) | Analytics and dashboards |
| | [Frontend to-fix](https://github.com/developmentseed/to-fix) | Frontend for the verification platform |
| | [Backend to-fix](https://github.com/developmentseed/to-fix-backend) | Backend for the verification platform |
| | [OpenRoads data](https://github.com/developmentseed/openroads-data) | Everything related to data and maps |

This is the main repo that contains the frontend wrapper that glues all these applications together.

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
