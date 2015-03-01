'''
A translation function for ogr2osm for OpenRoads FMR data.

The following fields are dropped from the source shapefile:

Field           Definition            Reason
x_coord					X coordinate					Centroid, automatically generated
y_coord					Y coordinate					Centroid, automatically generated
Shape_Leng			Shape length 					Always null, automatically generated


The following fields are used:    

Field           Used for            	Reason
Name 						name=ROAD_NAME				Name of the road
RD_CLASS				highway=*							Type of the road
								or_class=RD_CLASS			Keep original type of road
MUN_NAME				or_mun=MUN_NAME				Municipality
BRGY_NAME				or_brgy=BRGY_NAME			Barangay
RD_TYPE					surface=RD_TYPE				Surface type
RD_COND					or_condition=RD_COND	Condition of the road


To be defined: 

FolderPath
PopupInfo
code
sp_cost
sp_length
sp_eleva
leng_diff
sp_costrev
road_conn
status
geolink
region
province
muni
id_fmrdp
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
	if attrs['ROAD_NAME']:
		tags.update({'name':attrs['ROAD_NAME'].strip(' ')})
	
	if attrs['MUN_NAME']:
		tags.update({'or_mun':attrs['MUN_NAME'].strip(' ').title()})

	if attrs['BRGY_NAME']:
		tags.update({'or_brgy':attrs['BRGY_NAME'].strip(' ').title()})

	return tags

