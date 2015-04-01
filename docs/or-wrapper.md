## How it's working
from developmentseed/openroads#116

> Design a small wrapper-app (similar to what we have now) and load the apps through an iframe.
This allows us to keep the contexts separated as there won't be any css or js conflicts but requires some extra care when it comes to routing.
Direct communication between an iframe and its parent is not possible unless they are on the same domain. However this is easy to overcome by implementing the postMessage() method.


## Setup

Add the following code to the app that's going to be loaded through the iframe:
```
<script src="http://localhost:9898/assets/scripts/OR_frame_notifier.js" type="text/javascript"></script>
<script>new ORFrameNotifier(app_id_here);</script>
```
> Be sure to replace `http://localhost:9898` with the **url** to the wrapper app, and add a **unique id** for the app.

Check the `/assets/scripts/main.js` to add new routes.