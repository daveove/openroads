var ORFrameNotifier = function(id) {
  if (window == window.parent) {
    console.warn('Not inside an iframe. ORFrameNotifier won\'t be initialized.');
    return;
  }

  function notify_parent() {
    window.parent.postMessage({
      id: id,
      type: 'urlchange',
      url: window.location.href
    }, '*');
  }

  // Whenever the hash changes.
  window.addEventListener("hashchange", function() {
    notify_parent();
  }, false);
  // On page load. Vanilla equivalent of $(document).ready
  document.addEventListener('DOMContentLoaded', function() {
    notify_parent();
  }, false);

};