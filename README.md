# RestfulApi-playground-
Vanilla node.js
 - The api listens on a port and accepts incoming HTTP requests for POST, GET, PUT DELETE and HEAD
- The api allows a client to connect, then create a new user, then edit and delete that user.
- The api allows a user to "sign in" which gives them a token that they can use for subsequent authenticated requests
- The API allows the user to "sign out" which invalidates thier token
- The api allows a signed-in user to use their token to create a new "check"
- The api allows a signed-in user to edit or delete any of their checks
- In the background, workers perform all the "checks: at the appropriate times, and send alerts to the users when a check changes its state from "up" to "down", or vice versa

