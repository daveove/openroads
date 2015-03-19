# Users

The current strategy:

- government employee makes changes in iD. On save, they are prompted to log in.
- they login using OSM credentials, or make new credentials through OSM OAuth.
- after they save their changes, a changeset creation command goes to our Sails API.
- if the API doesn't detect a user with the user's id, just create a new user using that id.
- continue editing as normal.

This saves us from having to even store emails, which can be bad if leaked. All we store are OSM uid and user name (plus when the account is created).