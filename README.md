# OpenRoads
[![Build Status](https://magnum.travis-ci.com/opengovt/openroads.svg?token=d4tUG3NhuWNZYSxWndVL&branch=develop)](https://magnum.travis-ci.com/opengovt/openroads)

OpenRoads is a set of tools that allows for management and collaborative editing of road network data. Most of them are forks from OSM applications that were adapted and streamlined for the OR use case.

The following repositories are part of the OR ecosystem:

| Build status | Repo | Notes |
| --- | --- | --- |
| [![Build Status](https://magnum.travis-ci.com/opengovt/openroads-api.svg?token=d4tUG3NhuWNZYSxWndVL&branch=master)](https://magnum.travis-ci.com/opengovt/openroads-api) | [API](https://github.com/opengovt/openroads-api)  | The partial port of the OSM API to Hapi |
| [![Build Status](https://magnum.travis-ci.com/opengovt/openroads-iD.svg?token=d4tUG3NhuWNZYSxWndVL&branch=master)](https://magnum.travis-ci.com/opengovt/openroads-iD) | [Network editor](https://github.com/opengovt/openroads-iD) | Forked from iD |
| [![Build Status](https://magnum.travis-ci.com/opengovt/openroads-analytics.svg?token=d4tUG3NhuWNZYSxWndVL&branch=master)](https://magnum.travis-ci.com/opengovt/openroads-analytics) | [Analytics](https://github.com/opengovt/openroads-analytics) | Analytics and dashboards |
| | [Workers](https://github.com/developmentseed/openroads-workers) | A set of background workers to perform the more intensive processes |
| | [Frontend to-fix](https://github.com/developmentseed/to-fix) | __Soon to be deprecated. Will be folded into Analytics__ |
| | [Backend to-fix](https://github.com/developmentseed/to-fix-backend) | __Soon to be deprecated. Will be folded into Analytics__ |
| | [OpenRoads data](https://github.com/opengovt/openroads-data) | Everything related to road network data and maps |
| | [OpenRoads boundaries](https://github.com/opengovt/openroads-boundaries) | The political boundaries used in the project |

This is the main repo that contains the frontend wrapper that glues all these applications together.

## The wrapper
The wrapper is the bit of glue that brings the OR eco-system together for the end users. It contains a shared header, loads each of the applications in an `<iframe>` and takes care of the routing.

### Local environment

```
$ python -m SimpleHTTPServer 9898
```

Starts the server at `http://localhost:9898`

To run tests, point your browser to `http://localhost:9898/test`

### Implementing the header
For technical docs on how to implement this in the OR applications, check `docs/or-wrapper.md`.