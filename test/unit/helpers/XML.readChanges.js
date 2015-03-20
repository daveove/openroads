var xmlNodeModify = '<osmChange version="0.3" generator="iD">' +
  '<create/>' +
  '<modify>' +
    '<node id="-76703" lon="123.83676223498107" lat="9.632539331799256" version="1" changeset="123"/>' +
  '</modify>'  +
  '<delete if-unused="true"/>' +
'</osmChange>';

var jsonNodeModify = [{
  action: 'modify',
  model: 'node',
  id: -76703,
  indexName: 'id',
  attributes: {
    latitude: 96325393,
    longitude: 1238367622,
    changeset_id: 123,
    visible: true,
    tile: 3805365679,
    version: 1,
    timestamp: new Date()
  }
}];

var xmlCreateWay = '<osmChange version="0.3" generator="iD">' +
  '<create>' +
    '<node id="-7" lon="123.83621506434201" lat="9.632200849325827" version="0" changeset="123"/>' +
    '<node id="-10" lon="123.84027056437253" lat="9.63569143353531" version="0" changeset="123"/>' +
    '<way id="-4" version="0" changeset="123">' +
      '<nd ref="-7"/>' +
      '<nd ref="-10"/>' +
      '<tag k="highway" v="residential"/>' +
      '<tag k="name" v="Fake Street"/>' +
    '</way>' +
  '</create>' +
  '<modify/>' +
  '<delete if-unused="true"/>' +
'</osmChange>';

var jsonCreateWay = [{
  action: 'create',
  model: 'node',
  id: -7,
  indexName: 'id',
  attributes: {
    latitude: 96322008,
    longitude: 1238362150,
    changeset_id: 123,
    visible: true,
    tile: 3805365678,
    version: 1,
    timestamp: new Date()
  }
}, {
  action: 'create',
  model: 'node',
  id: -10,
  indexName: 'id',
  attributes: {
    latitude: 96356914,
    longitude: 1238402705,
    changeset_id: 123,
    visible: true,
    tile: 3805366032,
    version: 1,
    timestamp: new Date()
  }
}, {
  action: 'create',
  model: 'way',
  id: -4,
  indexName: 'id',
  attributes: {
    changeset_id: 123,
    timestamp: new Date(),
    version: 1,
    visible: true
  }
}, {
  action: 'create',
  model: 'way_node',
  id: -7,
  indexName: 'node_id',
  attributes: {
    way_id: -4,
    node_id: -7,
    sequence_id: 0
  }
}, {
  action: 'create',
  model: 'way_node',
  id: -10,
  indexName: 'node_id',
  attributes: {
    way_id: -4,
    node_id: -10,
    sequence_id: 1
  }
}, {
  action: 'create',
  model: 'way_tag',
  id: -4,
  indexName: 'way_id',
  attributes: {
    way_id: -4,
    k: 'highway',
    v: 'residential'
  }
}, {
  action: 'create',
  model: 'way_tag',
  id: -4,
  indexName: 'way_id',
  attributes: {
    way_id: -4,
    k: 'name',
    v: 'Fake Street'
  }
}];

// Creates a new point and a new way.
// Connects new way to a pre-existing way (modify).
// Modify a way at several nodes.
// Modify an existing way into two ways.
var longCreateModify = '<osmChange version="0.3" generator="iD"><create><node id="-1" lon="123.8348527433777" lat="9.63294974221721" version="0" changeset="123"><tag k="amenity" v="bar" /><tag k="name" v="Bar" /></node><node id="-2" lon="123.83562521957398" lat="9.634324822103615" version="0" changeset="123" /><node id="-5" lon="123.8386722090149" lat="9.635255642231789" version="0" changeset="123" /><node id="-8" lon="123.8406892301941" lat="9.635297952176614" version="0" changeset="123" /><node id="-11" lon="123.8407965185547" lat="9.6366941773801" version="0" changeset="123" /><node id="-14" lon="123.83858637832643" lat="9.636567248054869" version="0" changeset="123" /><node id="-17" lon="123.83558230422975" lat="9.635890290847229" version="0" changeset="123" /><node id="-20" lon="123.83401589416505" lat="9.634684457457446" version="0" changeset="123" /><node id="-23" lon="123.83812503837586" lat="9.642987696536505" version="0" changeset="123" /><node id="-26" lon="123.83785681747437" lat="9.642548740606607" version="0" changeset="123" /><node id="-29" lon="123.83788900398257" lat="9.642517008830493" version="0" changeset="123" /><node id="-32" lon="123.83808748744964" lat="9.64255931786465" version="0" changeset="123" /><node id="-35" lon="123.8382215979004" lat="9.642294886314103" version="0" changeset="123" /><node id="-38" lon="123.83771466039659" lat="9.641932614753236" version="0" changeset="123" /><node id="-41" lon="123.8374839904213" lat="9.641541255257513" version="0" changeset="123" /><node id="-44" lon="123.83731232904435" lat="9.641303266152935" version="0" changeset="123" /><node id="-49" lon="123.83650230192185" lat="9.640927771890864" version="0" changeset="123" /><way id="-1" version="0" changeset="123"><nd ref="-2" /><nd ref="-5" /><nd ref="-8" /><nd ref="-11" /><nd ref="-14" /><nd ref="-17" /><nd ref="-20" /><tag k="highway" v="service" /><tag k="name" v="New Road" /></way><way id="-9" version="0" changeset="123"><nd ref="-23" /><nd ref="-26" /><nd ref="-29" /><nd ref="-32" /><nd ref="-35" /><nd ref="-38" /><nd ref="-41" /><nd ref="-44" /><nd ref="-73870" /><tag k="highway" v="service" /><tag k="name" v="Connecting Road" /></way><way id="-19" version="0" changeset="123"><nd ref="-49" /><nd ref="-73863" /><nd ref="-73864" /><nd ref="-73865" /><nd ref="-73866" /><nd ref="-73867" /><nd ref="-73868" /><nd ref="-73869" /><nd ref="-73870" /><nd ref="-73871" /><nd ref="-73872" /><nd ref="-73873" /><tag k="highway" v="service" /><tag k="name" v="Disconnected road 2" /></way></create><modify><node id="-73862" lon="123.83622871660232" lat="9.640795555501903" version="1" changeset="123" /><node id="-76623" lon="123.83382545732499" lat="9.640615741129734" version="1" changeset="123" /><node id="-76622" lon="123.83364306711198" lat="9.640478235956923" version="1" changeset="123" /><node id="-76621" lon="123.83351432107928" lat="9.640346019391744" version="1" changeset="123" /><node id="-76620" lon="123.83343921922685" lat="9.640287844086632" version="1" changeset="123" /><node id="-76619" lon="123.83364843153" lat="9.640324864736504" version="1" changeset="123" /><node id="-76624" lon="123.83383082174302" lat="9.640509967924848" version="1" changeset="123" /><way id="-73847" version="1" changeset="123"><nd ref="-73848" /><nd ref="-73849" /><nd ref="-73850" /><nd ref="-73851" /><nd ref="-73852" /><nd ref="-73853" /><nd ref="-73854" /><nd ref="-73855" /><nd ref="-73856" /><nd ref="-73857" /><nd ref="-73858" /><nd ref="-73859" /><nd ref="-73860" /><nd ref="-73861" /><nd ref="-73862" /><tag k="highway" v="service" /><tag k="name" v="Disconnected road 1" /></way><way id="-76496" version="1" changeset="123"><nd ref="-74977" /><nd ref="-76497" /><nd ref="-76498" /><nd ref="-76499" /><nd ref="-76500" /><nd ref="-76501" /><nd ref="-76502" /><nd ref="-76503" /><nd ref="-76504" /><nd ref="-76505" /><nd ref="-76506" /><nd ref="-76507" /><nd ref="-76508" /><nd ref="-76509" /><nd ref="-76510" /><nd ref="-76511" /><nd ref="-76512" /><nd ref="-76513" /><nd ref="-76514" /><nd ref="-76515" /><nd ref="-76516" /><nd ref="-76517" /><nd ref="-76518" /><nd ref="-76519" /><nd ref="-76520" /><nd ref="-76521" /><nd ref="-76522" /><nd ref="-76523" /><nd ref="-76524" /><nd ref="-76525" /><nd ref="-76526" /><nd ref="-76527" /><nd ref="-76528" /><nd ref="-76529" /><nd ref="-76530" /><nd ref="-76531" /><nd ref="-76532" /><nd ref="-76533" /><nd ref="-76534" /><nd ref="-76535" /><nd ref="-76536" /><nd ref="-76537" /><nd ref="-76538" /><nd ref="-76539" /><nd ref="-76540" /><nd ref="-76541" /><nd ref="-76542" /><nd ref="-76543" /><nd ref="-76544" /><nd ref="-76545" /><nd ref="-76546" /><nd ref="-76547" /><nd ref="-76548" /><nd ref="-76549" /><nd ref="-76550" /><nd ref="-76551" /><nd ref="-76552" /><nd ref="-76553" /><nd ref="-76554" /><nd ref="-76555" /><nd ref="-76556" /><nd ref="-76557" /><nd ref="-76558" /><nd ref="-76559" /><nd ref="-76560" /><nd ref="-76561" /><nd ref="-76562" /><nd ref="-76563" /><nd ref="-76564" /><nd ref="-76565" /><nd ref="-76566" /><nd ref="-76567" /><nd ref="-76568" /><nd ref="-76569" /><nd ref="-76570" /><nd ref="-76571" /><nd ref="-76572" /><nd ref="-76573" /><nd ref="-76574" /><nd ref="-76575" /><nd ref="-76576" /><nd ref="-76577" /><nd ref="-76578" /><nd ref="-76579" /><nd ref="-76580" /><nd ref="-76581" /><nd ref="-76582" /><nd ref="-76583" /><nd ref="-76584" /><nd ref="-76585" /><nd ref="-76586" /><nd ref="-76587" /><nd ref="-76588" /><nd ref="-76589" /><nd ref="-76590" /><nd ref="-76591" /><nd ref="-76592" /><nd ref="-76593" /><nd ref="-76594" /><nd ref="-76595" /><nd ref="-76596" /><nd ref="-76597" /><nd ref="-76598" /><nd ref="-76599" /><nd ref="-76600" /><nd ref="-76601" /><nd ref="-76602" /><nd ref="-76603" /><nd ref="-76604" /><nd ref="-76605" /><nd ref="-76606" /><nd ref="-76607" /><nd ref="-76608" /><nd ref="-76609" /><nd ref="-76610" /><nd ref="-76611" /><nd ref="-76612" /><nd ref="-76613" /><nd ref="-76614" /><nd ref="-76615" /><nd ref="-76616" /><nd ref="-76617" /><nd ref="-76618" /><nd ref="-76619" /><nd ref="-76620" /><nd ref="-76621" /><nd ref="-76622" /><nd ref="-76623" /><nd ref="-76624" /><nd ref="-76625" /><nd ref="-76626" /><nd ref="-76627" /><nd ref="-76628" /><nd ref="-76629" /><nd ref="-76630" /><nd ref="-76631" /><nd ref="-76632" /><nd ref="-76633" /><nd ref="-76634" /><nd ref="-76635" /><nd ref="-76636" /><nd ref="-76637" /><nd ref="-76638" /><nd ref="-76639" /><nd ref="-76640" /><nd ref="-76641" /><nd ref="-73848" /><tag k="highway" v="service" /><tag k="name" v="Modification to road" /></way></modify><delete if-unused="true" /></osmChange>';

// Deletes a way.
// Creates two new ways.
var longCreateDestroy = '<osmChange version="0.3" generator="iD"><create><node id="-1" lon="123.83218117721557" lat="9.641508772080813" version="0" changeset="123" /><node id="-4" lon="123.83239575393675" lat="9.641487617498509" version="0" changeset="123" /><node id="-7" lon="123.83252449996947" lat="9.641381844567048" version="0" changeset="123" /><node id="-10" lon="123.83302339084624" lat="9.641069814225968" version="0" changeset="123" /><node id="-13" lon="123.83345790870663" lat="9.640472195987199" version="0" changeset="123" /><node id="-16" lon="123.83358129032133" lat="9.639996216101485" version="0" changeset="123" /><node id="-21" lon="123.8343323088455" lat="9.640847690756443" version="0" changeset="123" /><node id="-24" lon="123.83421429164885" lat="9.640763072253387" version="0" changeset="123" /><node id="-27" lon="123.83386024005888" lat="9.640308247435739" version="0" changeset="123" /><node id="-32" lon="123.83331843383789" lat="9.639811112631204" version="0" changeset="123" /><node id="-35" lon="123.83314140804288" lat="9.639726493868105" version="0" changeset="123" /><node id="-38" lon="123.83283027179718" lat="9.639398595960603" version="0" changeset="123" /><node id="-41" lon="123.83230455883027" lat="9.639060120366944" version="0" changeset="123" /><node id="-44" lon="123.83222945697784" lat="9.63897021273029" version="0" changeset="123" /><node id="-47" lon="123.83168765075682" lat="9.638594715871156" version="0" changeset="123" /><node id="-50" lon="123.83148916728972" lat="9.638488942032575" version="0" changeset="123" /><node id="-53" lon="123.83113779790878" lat="9.638158398573264" version="0" changeset="123" /><node id="-56" lon="123.83085884817123" lat="9.637748524233984" version="0" changeset="123" /><node id="-59" lon="123.83078106410979" lat="9.637579285651867" version="0" changeset="123" /><node id="-62" lon="123.83067109354018" lat="9.637232875164397" version="0" changeset="123" /><node id="-65" lon="123.83064695365903" lat="9.63716412189559" version="0" changeset="123" /><node id="-68" lon="123.83001127012253" lat="9.636783334306946" version="0" changeset="123" /><node id="-71" lon="123.82990666397093" lat="9.63673573582816" version="0" changeset="123" /><node id="-74" lon="123.82979937561034" lat="9.636709292225929" version="0" changeset="123" /><node id="-77" lon="123.82970281608581" lat="9.636733091468013" version="0" changeset="123" /><node id="-80" lon="123.82962771423338" lat="9.636778045587418" version="0" changeset="123" /><way id="-1" version="0" changeset="123"><nd ref="-1" /><nd ref="-4" /><nd ref="-7" /><nd ref="-10" /><nd ref="-13" /><nd ref="-16" /><tag k="highway" v="service" /><tag k="name" v="Connecting Road" /></way></create><modify><way id="-73847" version="1" changeset="123"><nd ref="-80" /><nd ref="-77" /><nd ref="-74" /><nd ref="-71" /><nd ref="-68" /><nd ref="-65" /><nd ref="-62" /><nd ref="-59" /><nd ref="-56" /><nd ref="-53" /><nd ref="-50" /><nd ref="-47" /><nd ref="-44" /><nd ref="-41" /><nd ref="-38" /><nd ref="-35" /><nd ref="-32" /><nd ref="-16" /><nd ref="-27" /><nd ref="-24" /><nd ref="-21" /><nd ref="-73848" /><nd ref="-73849" /><nd ref="-73850" /><nd ref="-73851" /><nd ref="-73852" /><nd ref="-73853" /><nd ref="-73854" /><nd ref="-73855" /><nd ref="-73856" /><nd ref="-73857" /><nd ref="-73858" /><nd ref="-73859" /><nd ref="-73860" /><nd ref="-73861" /><nd ref="-73862" /><nd ref="-73863" /><nd ref="-73864" /><nd ref="-73865" /><nd ref="-73866" /><nd ref="-73867" /><nd ref="-73868" /><nd ref="-73869" /><nd ref="-73870" /><nd ref="-73871" /><nd ref="-73872" /><nd ref="-73873" /><tag k="highway" v="service" /><tag k="name" v="New Road" /></way></modify><delete if-unused="true"><way id="-76496" version="1" changeset="123"><nd ref="-74977" /><nd ref="-76497" /><nd ref="-76498" /><nd ref="-76499" /><nd ref="-76500" /><nd ref="-76501" /><nd ref="-76502" /><nd ref="-76503" /><nd ref="-76504" /><nd ref="-76505" /><nd ref="-76506" /><nd ref="-76507" /><nd ref="-76508" /><nd ref="-76509" /><nd ref="-76510" /><nd ref="-76511" /><nd ref="-76512" /><nd ref="-76513" /><nd ref="-76514" /><nd ref="-76515" /><nd ref="-76516" /><nd ref="-76517" /><nd ref="-76518" /><nd ref="-76519" /><nd ref="-76520" /><nd ref="-76521" /><nd ref="-76522" /><nd ref="-76523" /><nd ref="-76524" /><nd ref="-76525" /><nd ref="-76526" /><nd ref="-76527" /><nd ref="-76528" /><nd ref="-76529" /><nd ref="-76530" /><nd ref="-76531" /><nd ref="-76532" /><nd ref="-76533" /><nd ref="-76534" /><nd ref="-76535" /><nd ref="-76536" /><nd ref="-76537" /><nd ref="-76538" /><nd ref="-76539" /><nd ref="-76540" /><nd ref="-76541" /><nd ref="-76542" /><nd ref="-76543" /><nd ref="-76544" /><nd ref="-76545" /><nd ref="-76546" /><nd ref="-76547" /><nd ref="-76548" /><nd ref="-76549" /><nd ref="-76550" /><nd ref="-76551" /><nd ref="-76552" /><nd ref="-76553" /><nd ref="-76554" /><nd ref="-76555" /><nd ref="-76556" /><nd ref="-76557" /><nd ref="-76558" /><nd ref="-76559" /><nd ref="-76560" /><nd ref="-76561" /><nd ref="-76562" /><nd ref="-76563" /><nd ref="-76564" /><nd ref="-76565" /><nd ref="-76566" /><nd ref="-76567" /><nd ref="-76568" /><nd ref="-76569" /><nd ref="-76570" /><nd ref="-76571" /><nd ref="-76572" /><nd ref="-76573" /><nd ref="-76574" /><nd ref="-76575" /><nd ref="-76576" /><nd ref="-76577" /><nd ref="-76578" /><nd ref="-76579" /><nd ref="-76580" /><nd ref="-76581" /><nd ref="-76582" /><nd ref="-76583" /><nd ref="-76584" /><nd ref="-76585" /><nd ref="-76586" /><nd ref="-76587" /><nd ref="-76588" /><nd ref="-76589" /><nd ref="-76590" /><nd ref="-76591" /><nd ref="-76592" /><nd ref="-76593" /><nd ref="-76594" /><nd ref="-76595" /><nd ref="-76596" /><nd ref="-76597" /><nd ref="-76598" /><nd ref="-76599" /><nd ref="-76600" /><nd ref="-76601" /><nd ref="-76602" /><nd ref="-76603" /><nd ref="-76604" /><nd ref="-76605" /><nd ref="-76606" /><nd ref="-76607" /><nd ref="-76608" /><nd ref="-76609" /><nd ref="-76610" /><nd ref="-76611" /><nd ref="-76612" /><nd ref="-76613" /><nd ref="-76614" /><nd ref="-76615" /><nd ref="-76616" /><nd ref="-76617" /><nd ref="-76618" /><nd ref="-76619" /><nd ref="-76620" /><nd ref="-76621" /><nd ref="-76622" /><nd ref="-76623" /><nd ref="-76624" /><nd ref="-76625" /><nd ref="-76626" /><nd ref="-76627" /><nd ref="-76628" /><nd ref="-76629" /><nd ref="-76630" /><nd ref="-76631" /><nd ref="-76632" /><nd ref="-76633" /><nd ref="-76634" /><nd ref="-76635" /><nd ref="-76636" /><nd ref="-76637" /><nd ref="-76638" /><nd ref="-76639" /><nd ref="-76640" /><nd ref="-76641" /><nd ref="-73848" /></way><node id="-76497" lon="123.8284251" lat="9.6333225" version="1" changeset="123" /><node id="-76498" lon="123.8284284" lat="9.6333341" version="1" changeset="123" /><node id="-76499" lon="123.8284425" lat="9.633388" version="1" changeset="123" /><node id="-76500" lon="123.8284596" lat="9.6334538" version="1" changeset="123" /><node id="-76501" lon="123.8284772" lat="9.6334973" version="1" changeset="123" /><node id="-76502" lon="123.8284908" lat="9.633535" version="1" changeset="123" /><node id="-76503" lon="123.8285033" lat="9.6335757" version="1" changeset="123" /><node id="-76504" lon="123.8285121" lat="9.6336267" version="1" changeset="123" /><node id="-76505" lon="123.8285247" lat="9.6336823" version="1" changeset="123" /><node id="-76506" lon="123.8285351" lat="9.6337276" version="1" changeset="123" /><node id="-76507" lon="123.8285499" lat="9.6337798" version="1" changeset="123" /><node id="-76508" lon="123.8285709" lat="9.6338559" version="1" changeset="123" /><node id="-76509" lon="123.8285788" lat="9.6339572" version="1" changeset="123" /><node id="-76510" lon="123.828581" lat="9.6340566" version="1" changeset="123" /><node id="-76511" lon="123.828578" lat="9.6341506" version="1" changeset="123" /><node id="-76512" lon="123.8285746" lat="9.634246" version="1" changeset="123" /><node id="-76513" lon="123.8285721" lat="9.6343354" version="1" changeset="123" /><node id="-76514" lon="123.8285588" lat="9.6344265" version="1" changeset="123" /><node id="-76515" lon="123.8285428" lat="9.6345219" version="1" changeset="123" /><node id="-76516" lon="123.8285301" lat="9.6346243" version="1" changeset="123" /><node id="-76517" lon="123.8285145" lat="9.634728" version="1" changeset="123" /><node id="-76518" lon="123.8284969" lat="9.6348286" version="1" changeset="123" /><node id="-76519" lon="123.8284824" lat="9.6349259" version="1" changeset="123" /><node id="-76520" lon="123.8284689" lat="9.6350201" version="1" changeset="123" /><node id="-76521" lon="123.8284467" lat="9.6351144" version="1" changeset="123" /><node id="-76522" lon="123.8284187" lat="9.6352105" version="1" changeset="123" /><node id="-76523" lon="123.8283865" lat="9.6353012" version="1" changeset="123" /><node id="-76524" lon="123.8283637" lat="9.6353981" version="1" changeset="123" /><node id="-76525" lon="123.8283549" lat="9.6354789" version="1" changeset="123" /><node id="-76526" lon="123.8283347" lat="9.6355478" version="1" changeset="123" /><node id="-76527" lon="123.8283192" lat="9.6356194" version="1" changeset="123" /><node id="-76528" lon="123.828313" lat="9.6356976" version="1" changeset="123" /><node id="-76529" lon="123.828313" lat="9.6357694" version="1" changeset="123" /><node id="-76530" lon="123.82832" lat="9.6358474" version="1" changeset="123" /><node id="-76531" lon="123.8283431" lat="9.6359246" version="1" changeset="123" /><node id="-76532" lon="123.8283788" lat="9.6360051" version="1" changeset="123" /><node id="-76533" lon="123.8284145" lat="9.6360953" version="1" changeset="123" /><node id="-76534" lon="123.8284523" lat="9.6361814" version="1" changeset="123" /><node id="-76535" lon="123.8284785" lat="9.6362708" version="1" changeset="123" /><node id="-76536" lon="123.8284995" lat="9.636351" version="1" changeset="123" /><node id="-76537" lon="123.8285304" lat="9.6364168" version="1" changeset="123" /><node id="-76538" lon="123.8285828" lat="9.6364643" version="1" changeset="123" /><node id="-76539" lon="123.8286431" lat="9.6365039" version="1" changeset="123" /><node id="-76540" lon="123.8287106" lat="9.6365349" version="1" changeset="123" /><node id="-76541" lon="123.828776" lat="9.6365639" version="1" changeset="123" /><node id="-76542" lon="123.8288315" lat="9.6366053" version="1" changeset="123" /><node id="-76543" lon="123.8288753" lat="9.6366527" version="1" changeset="123" /><node id="-76544" lon="123.8289112" lat="9.6366999" version="1" changeset="123" /><node id="-76545" lon="123.82896" lat="9.636728" version="1" changeset="123" /><node id="-76546" lon="123.8290206" lat="9.6367384" version="1" changeset="123" /><node id="-76547" lon="123.8290924" lat="9.6367447" version="1" changeset="123" /><node id="-76548" lon="123.8291732" lat="9.6367532" version="1" changeset="123" /><node id="-76549" lon="123.829258" lat="9.6367597" version="1" changeset="123" /><node id="-76550" lon="123.829345" lat="9.6367675" version="1" changeset="123" /><node id="-76551" lon="123.8294282" lat="9.6367757" version="1" changeset="123" /><node id="-76552" lon="123.8295065" lat="9.6367868" version="1" changeset="123" /><node id="-76553" lon="123.829582" lat="9.636797" version="1" changeset="123" /><node id="-76554" lon="123.8296505" lat="9.6367846" version="1" changeset="123" /><node id="-76555" lon="123.8297165" lat="9.6367509" version="1" changeset="123" /><node id="-76556" lon="123.8297907" lat="9.6367278" version="1" changeset="123" /><node id="-76557" lon="123.8298732" lat="9.6367358" version="1" changeset="123" /><node id="-76558" lon="123.8299506" lat="9.6367627" version="1" changeset="123" /><node id="-76559" lon="123.8300223" lat="9.6368017" version="1" changeset="123" /><node id="-76560" lon="123.8300892" lat="9.6368491" version="1" changeset="123" /><node id="-76561" lon="123.8301585" lat="9.636898" version="1" changeset="123" /><node id="-76562" lon="123.8302298" lat="9.6369415" version="1" changeset="123" /><node id="-76563" lon="123.830302" lat="9.6369854" version="1" changeset="123" /><node id="-76564" lon="123.8303731" lat="9.6370286" version="1" changeset="123" /><node id="-76565" lon="123.8304453" lat="9.63707" version="1" changeset="123" /><node id="-76566" lon="123.8305191" lat="9.6371125" version="1" changeset="123" /><node id="-76567" lon="123.830589" lat="9.6371596" version="1" changeset="123" /><node id="-76568" lon="123.8306415" lat="9.6372166" version="1" changeset="123" /><node id="-76569" lon="123.8306764" lat="9.6372802" version="1" changeset="123" /><node id="-76570" lon="123.8306998" lat="9.6373537" version="1" changeset="123" /><node id="-76571" lon="123.8307204" lat="9.6374352" version="1" changeset="123" /><node id="-76572" lon="123.8307486" lat="9.6375214" version="1" changeset="123" /><node id="-76573" lon="123.8307804" lat="9.6376038" version="1" changeset="123" /><node id="-76574" lon="123.8308111" lat="9.6376805" version="1" changeset="123" /><node id="-76575" lon="123.8308405" lat="9.6377519" version="1" changeset="123" /><node id="-76576" lon="123.8308768" lat="9.6378247" version="1" changeset="123" /><node id="-76577" lon="123.8309243" lat="9.6378988" version="1" changeset="123" /><node id="-76578" lon="123.8309745" lat="9.6379624" version="1" changeset="123" /><node id="-76579" lon="123.8310205" lat="9.6380265" version="1" changeset="123" /><node id="-76580" lon="123.8310679" lat="9.638092" version="1" changeset="123" /><node id="-76581" lon="123.8311158" lat="9.6381534" version="1" changeset="123" /><node id="-76582" lon="123.8311694" lat="9.6382153" version="1" changeset="123" /><node id="-76583" lon="123.8312287" lat="9.638275" version="1" changeset="123" /><node id="-76584" lon="123.8312824" lat="9.6383269" version="1" changeset="123" /><node id="-76585" lon="123.8313443" lat="9.6383825" version="1" changeset="123" /><node id="-76586" lon="123.8314116" lat="9.6384396" version="1" changeset="123" /><node id="-76587" lon="123.8314848" lat="9.6384928" version="1" changeset="123" /><node id="-76588" lon="123.8315547" lat="9.6385426" version="1" changeset="123" /><node id="-76589" lon="123.8316284" lat="9.6385877" version="1" changeset="123" /><node id="-76590" lon="123.8317055" lat="9.638633" version="1" changeset="123" /><node id="-76591" lon="123.8317805" lat="9.6386831" version="1" changeset="123" /><node id="-76592" lon="123.8318528" lat="9.6387326" version="1" changeset="123" /><node id="-76593" lon="123.8319262" lat="9.6387789" version="1" changeset="123" /><node id="-76594" lon="123.8319981" lat="9.6388252" version="1" changeset="123" /><node id="-76595" lon="123.8320763" lat="9.6388747" version="1" changeset="123" /><node id="-76596" lon="123.8321545" lat="9.6389313" version="1" changeset="123" /><node id="-76597" lon="123.8322257" lat="9.6389889" version="1" changeset="123" /><node id="-76598" lon="123.8322912" lat="9.6390503" version="1" changeset="123" /><node id="-76599" lon="123.832363" lat="9.6391033" version="1" changeset="123" /><node id="-76600" lon="123.8324381" lat="9.6391517" version="1" changeset="123" /><node id="-76601" lon="123.8325074" lat="9.6391987" version="1" changeset="123" /><node id="-76602" lon="123.8325763" lat="9.6392452" version="1" changeset="123" /><node id="-76603" lon="123.8326441" lat="9.6392944" version="1" changeset="123" /><node id="-76604" lon="123.8327192" lat="9.6393465" version="1" changeset="123" /><node id="-76605" lon="123.8327969" lat="9.6393998" version="1" changeset="123" /><node id="-76606" lon="123.8328729" lat="9.6394609" version="1" changeset="123" /><node id="-76607" lon="123.8329484" lat="9.6395298" version="1" changeset="123" /><node id="-76608" lon="123.8330197" lat="9.639605" version="1" changeset="123" /><node id="-76609" lon="123.8330895" lat="9.6396797" version="1" changeset="123" /><node id="-76610" lon="123.8331601" lat="9.6397424" version="1" changeset="123" /><node id="-76611" lon="123.8332361" lat="9.6397885" version="1" changeset="123" /><node id="-76612" lon="123.8333108" lat="9.63983" version="1" changeset="123" /><node id="-76613" lon="123.8333849" lat="9.6398673" version="1" changeset="123" /><node id="-76614" lon="123.8334563" lat="9.6399089" version="1" changeset="123" /><node id="-76615" lon="123.8335264" lat="9.6399602" version="1" changeset="123" /><node id="-76616" lon="123.8335924" lat="9.6400228" version="1" changeset="123" /><node id="-76617" lon="123.8336608" lat="9.640093" version="1" changeset="123" /><node id="-76618" lon="123.8337239" lat="9.6401647" version="1" changeset="123" /><node id="-76619" lon="123.8337671" lat="9.640222" version="1" changeset="123" /><node id="-76620" lon="123.8338094" lat="9.6402712" version="1" changeset="123" /><node id="-76621" lon="123.8338576" lat="9.6403276" version="1" changeset="123" /><node id="-76622" lon="123.8339076" lat="9.6403911" version="1" changeset="123" /><node id="-76623" lon="123.8339586" lat="9.6404614" version="1" changeset="123" /><node id="-76624" lon="123.8340065" lat="9.6405264" version="1" changeset="123" /><node id="-76625" lon="123.8340497" lat="9.6405899" version="1" changeset="123" /><node id="-76626" lon="123.8340983" lat="9.6406546" version="1" changeset="123" /><node id="-76627" lon="123.8341562" lat="9.6407151" version="1" changeset="123" /><node id="-76628" lon="123.8342205" lat="9.6407747" version="1" changeset="123" /><node id="-76629" lon="123.8342854" lat="9.6408298" version="1" changeset="123" /><node id="-76630" lon="123.8343478" lat="9.6408654" version="1" changeset="123" /><node id="-76631" lon="123.8344147" lat="9.6408861" version="1" changeset="123" /><node id="-76632" lon="123.8344851" lat="9.6409058" version="1" changeset="123" /><node id="-76633" lon="123.8345607" lat="9.6409299" version="1" changeset="123" /><node id="-76634" lon="123.8346451" lat="9.6409536" version="1" changeset="123" /><node id="-76635" lon="123.8347364" lat="9.6409784" version="1" changeset="123" /><node id="-76636" lon="123.8348299" lat="9.6409971" version="1" changeset="123" /><node id="-76637" lon="123.834917" lat="9.6410135" version="1" changeset="123" /><node id="-76638" lon="123.8349962" lat="9.6410236" version="1" changeset="123" /><node id="-76639" lon="123.835061" lat="9.6410266" version="1" changeset="123" /><node id="-76640" lon="123.8350984" lat="9.6410306" version="1" changeset="123" /><node id="-76641" lon="123.8351042" lat="9.6410321" version="1" changeset="123" /></delete></osmChange>';

var simpleCreate = '<osmChange version="0.3" generator="iD"><create><node id="-1" lon="123.80713073806761" lat="9.623874044911773" version="0" changeset="7"><tag k="leisure" v="park"/><tag k="name" v="New park"/></node></create><modify/><delete if-unused="true"/></osmChange>';
var simpleModify = '<osmChange version="0.3" generator="iD"><create/><modify><node id="165562" lon="123.81275264816284" lat="9.626730050553016" version="0" changeset="9"/></modify><delete if-unused="true"/></osmChange>';
var simpleDestroy = '<osmChange version="0.3" generator="iD"><create/><modify/><delete if-unused="true"><way id="165530" version="0" changeset="10"><nd ref="165562"/><nd ref="165563"/></way><node id="165562" lon="123.8126079" lat="9.6264056" version="0" changeset="10"/><node id="165563" lon="123.8171569" lat="9.6242266" version="0" changeset="10"/></delete></osmChange>';

module.exports = {
  long: {
    createModify: longCreateModify,
    createDestroy: longCreateDestroy
  },
  simple: {
    create: simpleCreate,
    modify: simpleModify,
    delete: simpleDestroy
  },
  modify: {
    xml: xmlNodeModify,
    json: jsonNodeModify
  },
  create: {
    xml: xmlCreateWay,
    json: jsonCreateWay
  }
};

