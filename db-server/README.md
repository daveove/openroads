Adapted from https://github.com/openstreetmap/osmosis/tree/master/db-server

### Dependencies

- [Docker](https://docs.docker.com/installation/#Installation)

On Ubuntu, it is necessary to install the Docker maintained package, since the one maintained by Ubuntu is outdated.

### Installation

This directory contains the scripts to create a docker-based database server to be used for  testing. In order to use this server, docker must be installed on the local workstation. Beyond that, no additional configuration should be required.

On Mac OS X:
- Make sure the docker VM is initialized using `boot2docker init`
- Load the `DOCKER_HOST`, `DOCKER_TLS_VERIFY` and `DOCKER_CERT_PATH` environment variables in your current terminal window using `$(boot2docker shellinit)`
- The docker VM does not forward localhost ports, you can get the IP of the VM using `boot2docker ip`

To build the docker image, run the following script.

``` sh
./build.sh
```

To run the docker image, run the following command. You will get a container ID that you can use to [start/stop](https://docs.docker.com/userguide/usingdocker/) the process. If you which to launch multiple databases, you can modify the left part of the port forwarding, e.g `5433:5432`, `5434:5432`, etc.

```sh
docker run -ti -p 5432:5432 developmentseed/openroads-db
```



