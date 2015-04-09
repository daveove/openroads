// Links to the apps the wrapper is aggregating.
var OR = {
  editor: 'http://devseed.com/openroads-iD',
  verification: 'http://localhost:3000',

  // The analytics app uses the same styles and lives in the same repo as
  // the wrapper.
  // For now...
  analytics: '/analytics/',
};


////////////////////////////////////////////////////////////////////////////////
/// Backbone routes definition
/// 
/// We make the / and the data optional
/// The data will be the url we need to feed to the iframe. For example, in the
/// editor case it will have the map coordinates.
var AppRouter = Backbone.Router.extend({
  routes: {
    "editor(/)(*data)": "editor",
    "verification(/)(:data)": "verification",
    "analytics(/)(:data)": "analytics"
  }
});
// Initiate the router
var app_router = new AppRouter();



////////////////////////////////////////////////////////////////////////////////
/// Backbone route
/// 
/// The only thing they actually do is set the iframe src based on the `data`
/// param from the route.
app_router.on('route:editor', function(data) {
  var a = data ? '#' + data : '';
  $('#main-frame').attr('src', OR.editor + a);
});

app_router.on('route:verification', function(data) {
  $('#main-frame').attr('src', OR.verification);
});

app_router.on('route:analytics', function(data) {
  var a = data ? data : '';
  $('#main-frame').attr('src', OR.analytics + a);
});

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();



////////////////////////////////////////////////////////////////////////////////
/// Message listener (postMessage)
/// 
/// When receiving a message form the iframe, process the url and set it.
/// The url now becomes shareable. The action to take on the url will depend on
/// the app.
/// 
/// The switch is done based on the app id, defined when the OR_frame_notifier
/// is included
window.addEventListener("message", function(e) {
  if (e.data.type == 'urlchange') {

    switch(e.data.id) {
      // The editor is an one-page app, therefore we only need the hash.
      case 'editor':
        var hash = e.data.url.split('#');
        app_router.navigate('/editor/' + hash[1], {replace: true});
      break;
      // Analytics is a multipage app and and since has the same name as our
      // route we only need to remove the domain.
      case 'analytics':
        // Will navigate to something like: analytics/index.html
        app_router.navigate('#/' + rmDomain(e.data.url));
      break;
    }
  }
}, false);



////////////////////////////////////////////////////////////////////////////////
/// Helpers
/// 

function rmDomain(url) {
  var p = document.createElement('a');
  p.href = url;

  var domain = p.protocol + '//' + p.host;

  return url.replace(new RegExp(domain + '\/?'), '');
}