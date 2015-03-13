'''
A translation function for ogr2osm for OpenRoads FMR data.

The following fields are dropped from the source shapefile:

Field           Definition            Reason
x_coord         X coordinate          Centroid, automatically generated
y_coord         Y coordinate          Centroid, automatically generated
Shape_Leng      Shape length          Always null, automatically generated


The following fields are used:

Field           Used for                    Reason
FolderPath      name=FolderPath             Name of the road
Name            or_proj_name=Name           Project name, can be null
id_fmrdp        or_proj_id=id_fmrdp         Project ID
sp_cost         or_proj_cost=sp_cost        Project cost
sp_costrev      or_proj_costrev=sp_costrev  Project cost revision
MUN_NAME        or_mun=MUN_NAME             Municipality
BRGY_NAME       or_brgy=BRGY_NAME           Barangay


To be defined: 

region
province
muni
PopupInfo
code
sp_length
sp_eleva
leng_diff
road_conn
status
geolink
'''

def filterTags(attrs):
  if not attrs: return

  tags = {}

  # Add the source
  tags.update({'source':'OpenRoads'})

  # Add a reference to the project type
  tags.update({'project_type':'FMR'})

  # Set Road as default highway classification
  tags.update({'highway':'road'})

  # Add the road name
  if attrs['FolderPath']:
    tags.update({'name':attrs['FolderPath'].strip(' ')})
  
  if attrs['id_fmrdp']:
    tags.update({'fmr_id':attrs['id_fmrdp'].strip(' ').title()})

  if attrs['status']:
    tags.update({'status':attrs['status'].strip(' ').title()})

  if attrs['sp_cost']:
    tags.update({'sp_cost':attrs['sp_cost']})

  if attrs['sp_costrev']:
    tags.update({'sp_costrev':attrs['sp_costrev']})

  return tags

