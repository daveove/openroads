'''
A translation function for ogr2osm for OpenRoads CRID data.

The following fields are dropped from the source shapefile:

Field           Definition            Reason
RD_LENGTH       Road length           Automatically generated


The following fields are used:    

Field           Used for              Reason
ROAD_NAME       name=ROAD_NAME        Name of the road
RD_CLASS        highway=*             Type of the road
                or_class=RD_CLASS     Keep original type of road
MUN_NAME        or_mun=MUN_NAME       Municipality
BRGY_NAME       or_brgy=BRGY_NAME     Barangay
RD_TYPE         surface=RD_TYPE       Surface type
RD_COND         or_condition=RD_COND  Condition of the road


OSM Mappings

Source value          OSM value                   Shortcomings
RD_CLASS=NATIONAL     highway=primary                   
RD_CLASS=PROVINCIAL   highway=secondary
RD_CLASS=MUNICIPAL    highway=tertiary
RD_CLASS=BARANGAY     highway=unclassified            
'''

def filterTags(attrs):
  if not attrs: return

  tags = {}

  # Add the source
  tags.update({'source':'OpenRoads'})

  # Add the road name
  if attrs['ROAD_NAME']:
    tags.update({'name':attrs['ROAD_NAME'].strip(' ')})
  
  if attrs['MUN_NAME']:
    tags.update({'or_mun':attrs['MUN_NAME'].strip(' ').title()})

  if attrs['BRGY_NAME']:
    tags.update({'or_brgy':attrs['BRGY_NAME'].strip(' ').title()})

  # Map the road type to the OSM highway classification
  if attrs['RD_CLASS'] and attrs['RD_CLASS'] == "NATIONAL":
    tags.update({'highway':'primary'})
  elif attrs['RD_CLASS'] and attrs['RD_CLASS'] == "PROVINCIAL":
    tags.update({'highway':'secondary'})
  elif attrs['RD_CLASS'] and attrs['RD_CLASS'] == "MUNICIPAL":
    tags.update({'highway':'tertiary'})
  elif attrs['RD_CLASS'] and attrs['RD_CLASS'] == "BARANGAY":
    tags.update({'highway':'unclassified'})
  else:
    tags.update({'highway':'road'})

  # Though included in above mapping, store the original road classification
  if attrs['RD_CLASS']:
    tags.update({'or_class':attrs['RD_CLASS'].strip(' ').lower()})

  # Road condition
  if attrs['RD_COND']:
    tags.update({'rd_cond':attrs['RD_COND'].strip(' ').lower()})

  return tags