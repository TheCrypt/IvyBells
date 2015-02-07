/**
 * Created by Nicolas on 07/02/2015.
 */

var phaser = new Phaser.Game(800, 600, Phaser.AUTO, 'ivyBell', { preload: preload, create: create, update: update, render: render });
var game = new Game();

function preload() {
    // Load assets
    // Atlas Texture tool : http://www.leshylabs.com/apps/sstool/
    phaser.load.tilemap('map2', 'asset/map/map2.json', null, Phaser.Tilemap.TILED_JSON);
    phaser.load.image('ground-tileset', "asset/image/ground-tileset.png");
   // phaser.load.tilesets()
//    phaser.load.atlasJSONHash('ground-tileset', "asset/image/ground-tileset.png", "asset/image/ground-tileset.json");
}

function create() {
    // Game initialization
    game.initialize();
}

function update() {
    // Main loop
    game.update();
}

function render() {
    game.render();
}