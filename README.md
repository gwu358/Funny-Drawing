# Funny-Drawing

A multi-players drawing game.

This is a multi-players games that every player takes turn to draw something that represent the word he/she receives from the dictionary in 60 seconds. The player who is drawing is the artist. While the artist is drawing, the others try to guess the word and send it on the channel. For those who guess it correctly, the first player will get 3 points, the second player will get 2 points; the others will get 1 points. The artist will get 1 points when every other player got it right.

## Setting up

* `npm install` (or `yarn install`)
* `npm start`

The `start` command will run both the `webpack` process (in watch mode) to build you client-side javascript files, and the Node process for your server with `nodemon`.
