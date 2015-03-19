# ogr2osm
ogr2osm is used to transform the OR shapefiles to OSM XML. For this project, we use a slightly adapted version that allows to specify a `uid` and `user` on each way, node and relation.

## Usage

```bash 
python ogr2osm.py data/road_network_bohol.shp -t bin/ogr2osm-translations/or-crid.py --add-version --add-user="openroads" --add-uid="1919292 --positive-id --add-timestamp"
```

Note that it is not recommended to add version, user, uid and timestamp, nor use positive id's. For the initial OpenRoads import into the db this is necessary though.