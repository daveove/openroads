// Basic color palette, from which variations will be derived.
@motorway:          #fc8;
@main:              #fea;
@street:            #fff;
@street_limited:    #f3f3f3;

@land:              #E8E0D8;

// ---------------------------------------------------------------------

 #crid-data-bohol {
  
  // casing/outlines & single lines
  ::case[zoom>=6]['mapnik::geometry_type'=2] {
    [RD_CLASS='NATIONAL'],[RD_CLASS='National'] {
      line-join:round;
      line-color: mix(@motorway, #800, 75);
      #road { line-cap: round; }
      #tunnel { line-dasharray:3,2; }
      [zoom>=6]  { line-width:0.4; }
      [zoom>=7]  { line-width:0.6; }
      [zoom>=8] { line-width:1.5; }
      [zoom>=10]  { line-width:3; }
      [zoom>=13] { line-width:3.5;  }
      [zoom>=14] { line-width:5; }
      [zoom>=15] { line-width:7; }
      [zoom>=16] { line-width:9; }
    }
    [RD_CLASS='PROVINCIAL'],[RD_CLASS='Provincial'] {
      line-join:round;
      line-color: mix(@main, #800, 75);
      #road { line-cap: round; }
      #tunnel { line-dasharray:3,2; }
      [zoom>=6] { line-width:0.2; }
      [zoom>=7] { line-width:0.4; }
      [zoom>=8] { line-width:1.5; }
      [zoom>=10] { line-width:2.4; }
      [zoom>=13] { line-width:2.5; }
      [zoom>=14] { line-width:4; }
      [zoom>=15] { line-width:5; }
      [zoom>=16] { line-width:8; }
    }
    [RD_CLASS='MUNICIPAL'][zoom>=12],[RD_CLASS='Municipal'][zoom>=12],[RD_CLASS='BARANGAY'][zoom>=12],[RD_CLASS='Barangay'][zoom>=12] {
      line-join:round;
      #road { line-cap: round; }
      #tunnel { line-dasharray:3,2; }
      line-color: @land * 0.8;
      [zoom>=12] { line-width:0.5; }
      [zoom>=14] { line-width:1; }
      [zoom>=15] { line-width:4; }
      [zoom>=16] { line-width:6.5; }
    }
  }
  
  // fill/inlines
  ::fill[zoom>=6]['mapnik::geometry_type'=2] {
    [RD_CLASS='NATIONAL'][zoom>=8],[RD_CLASS='National'][zoom>=8] {
      line-join:round;
      #road, #bridge { line-cap:round; }
      line-color:@motorway;
      #tunnel { line-color:lighten(@motorway,4); }
      [zoom>=8] { line-width:0.5; }
      [zoom>=10] { line-width:1; }
      [zoom>=13] { line-width:2; }
      [zoom>=14] { line-width:3.5; }
      [zoom>=15] { line-width:5; }
      [zoom>=16] { line-width:7; }
    }
    [RD_CLASS='PROVINCIAL'][zoom>=8],[RD_CLASS='Provincial'][zoom>=8] {
      line-join:round;
      #road, #bridge { line-cap: round; }
      line-color:@main;
      #tunnel { line-color:lighten(@main,4); }
      [zoom>=8] { line-width:0.5; }
      [zoom>=10] { line-width:1; }
      [zoom>=13] { line-width:1.5; }
      [zoom>=14] { line-width:2.5; }
      [zoom>=15] { line-width:3.5; }
      [zoom>=16] { line-width:6; }
    }
    [RD_CLASS='MUNICIPAL'][zoom>=15],[RD_CLASS='Municipal'][zoom>=15] {
      line-join:round;
      #road, #bridge { line-cap: round; }
      [zoom>=15] { line-width:2.5; line-color:#fff; }
      [zoom>=16] { line-width:4; }
    }
    [RD_CLASS='BARANGAY'][zoom>=15],[RD_CLASS='Barangay'][zoom>=15] {
      line-join:round;
      #road, #bridge { line-cap: round; }
      [zoom>=15] { line-width:2.5; line-color:#eee; }
      [zoom>=16] { line-width:4; }
    }
  }
}

 #bohol-fmr-polyline {
  
  // casing/outlines & single lines
  ::case[zoom>=6]['mapnik::geometry_type'=2] {
    [zoom>=15] {
      line-join:round;
      #road { line-cap: round; }
      #tunnel { line-dasharray:3,2; }
      line-color: @land * 0.9;
      [zoom>=15] { line-width:1; }
      [zoom>=16] { line-width:4; }
    }
  }
    
  // fill/inlines
  ::fill[zoom>=6]['mapnik::geometry_type'=2] {
    [zoom>=16] {
      line-join:round;
      #road { line-cap: round; }
      [zoom>=16] { line-width:2; line-color:#fff; }
    }
  }
}


// Labels


@name: '[ROAD_NAME]';

// regular labels
#crid-data-bohol['mapnik::geometry_type'=2] {
  // Longer roads get a label earlier as they are likely to be more
  // important. This especially helps label density in rural/remote areas.
  // This z14 filter is *not* redundant to logic in SQL queries. Because z14
  // includes all data for z14+ via overzooming, the streets included in a
  // z14 vector tile include more features than ideal for optimal performance.
  [RD_CLASS='NATIONAL'][zoom>=12],[RD_CLASS='National'][zoom>=12],
  [RD_CLASS='PROVINCIAL'][zoom>=12],[RD_CLASS='Provincial'][zoom>=12],
  [RD_CLASS='MUNICIPAL'][zoom<=14][len>2500],[RD_CLASS='Municipal'][zoom<=14][len>2500],
  [RD_CLASS='MUNICIPAL'][zoom>=15],[RD_CLASS='Municipal'][zoom>=15],
  [RD_CLASS='BARANGAY'],[RD_CLASS='Barangay'] {
    text-avoid-edges: true;
    text-transform: uppercase;
    text-name: @name;
    text-character-spacing: 0.25;
    text-placement: line;
    text-face-name: @sans;
    text-fill: #444;
    text-size: 8;
    text-halo-fill: @road_halo;
    text-halo-radius: 1.5;
    text-halo-rasterizer: fast;
    text-min-distance: 200; // only for labels w/ the same name
    [zoom>=14] { text-size: 9; }
    [zoom>=16] { text-size: 11; }
    [zoom>=18] { text-size: 12; }
    [RD_CLASS='NATIONAL'],[RD_CLASS='National'],
    [RD_CLASS='PROVINCIAL'],[RD_CLASS='Provincial'] {
      [zoom>=14] { text-size: 10; }
      [zoom>=16] { text-size: 11; text-face-name: @sans_bold; }
      [zoom>=17] { text-size: 12; }
      [zoom>=18] { text-size: 14; }
    }
  }
}