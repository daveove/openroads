// Links to the apps the wrapper is aggregating.
var OR = {
  editor: '//devseed.com/openroads-iD/',
  verification: '//devseed.com/to-fix/',

  // The analytics app uses the same styles and lives in the same repo as
  // the wrapper. Use the full url anyway.
  // For now...
  analytics: '//devseed.com/openroads-analytics/',
};


////////////////////////////////////////////////////////////////////////////////
/// Backbone routes definition
/// 
/// We make the / and the data optional
/// The data will be the url we need to feed to the iframe. For example, in the
/// editor case it will have the map coordinates.
var AppRouter = Backbone.Router.extend({
  routes: {
    "(/)":"analytics",
    "editor(/)(*data)": "editor",
    "verification(/)(*data)": "verification",
    "analytics(/)(*data)": "analytics"
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
  var a = data ? data : '';
  $('#main-frame').attr('src', OR.editor + a);
});

app_router.on('route:verification', function(data) {
  var a = data ? data : '';
  $('#main-frame').attr('src', OR.verification + a);
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
/// is included.
///
///
/// What this actually does:
/// When a the iframe's url changes it is sent via postMessage to the parent. It
/// removes the base portion on the url (defined in the OR object) and stores
/// the rest:
/// - Url on the "verification" changes to:
///     http://devseed.com/to-fix/#/task/devseedexample
/// - Prefix is removed resulting in:
///     #/task/devseedexample
/// - Appended to the current url:
///     http://devseed.com/openroads/#/verification/#/task/devseedexample
/// - When entering the page, everything after (/#/verification/)
///   is sent to the iframe alongside the proper prefix.
///   This is done in section "Backbone route"
///
window.addEventListener("message", function(e) {
  if (e.data.type == 'urlchange') {

    switch(e.data.id) {
      case 'editor':
        var hash = cleanUrl(e.data.url, OR.editor);
        // The editor's url keeps changing. Better to replace instead of
        // adding to history.
        app_router.navigate('#/editor/' + hash, {replace: true});
      break;
      case 'verification':
        var hash = cleanUrl(e.data.url, OR.verification);
        app_router.navigate('#/verification/' + hash);
      break;
      case 'analytics':
        var hash = cleanUrl(e.data.url, OR.analytics);
        app_router.navigate('#/analytics/' + hash);
      break;
    }
  }
}, false);



////////////////////////////////////////////////////////////////////////////////
/// Helpers
/// 

function cleanUrl(url, base) {
  return url.replace(new RegExp('(http:|https:)?' + base), '');
}