## Ludum Dare 34 - Goblinheart

Goblinheart is an 8-bit dungeon crawler with unconventional mechanics. Instead of fighting, the player must travel through the dungeon armed only with the POWER OF LOVE!

Entry: http://ludumdare.com/compo/ludum-dare-34/?action=preview&uid=35875

### Controls
* up, down, left, right - Move
* spacebar - Charm NPCs

### Comments
We didn't quite get to where we wanted with this one. The dungeon works, pathfinding mostly works, and the core mechanic (charming your enemies) is there, but we had loftier goals! Namely the player would have an "influence" counter and would only be able to charm low-level enemies until their influence counter got larger. Eventually you'd be able to charm the entire dungeon, effectively <em>growing</em> your posse (see, it fits the theme!) to an incredible size.

Oh but for more time and/or Mondays off work. Still, pretty happy with where we got this time. Resources are credited on the game page.

### Credits
Assets in asset folder come from [http://luciddesign.tk/](http://luciddesign.tk/).

### Dev Notes
Goblinheart is written in JavaScript (ES2015) and uses [Phaser](http://phaser.io/), [Babel](https://babeljs.io/) and [webpack](https://webpack.github.io/).
```
$ git clone git@github.com:ninjascribble/LudumDare34.git && cd LudumDare34
$ npm install
$ npm start
```
