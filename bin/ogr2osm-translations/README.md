This folder contains a collection of translation files for ogr2osm. These convert the OpenRoads shapefiles into OSM XML.

| shapefile | translation file |
| --- | --- |
| road network | or-crid.py |
| fmr_polyline | or-fmr.py |
| fmr_points | or-fmr.py |
| TRIP contract | or-trip-contract.py |
| TRIP_national | or-trip-national.py |

Example usage: `python ogr2osm.py fmr_polyline.shp -t or-fmr.py`

For more info on ogr2osm, including installation and usage instructions: http://wiki.openstreetmap.org/wiki/Ogr2osm