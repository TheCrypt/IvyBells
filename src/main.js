/**
 * Created by Nicolas on 07/02/2015.
 */

var phaser = new Phaser.Game(800, 600, Phaser.AUTO, 'ivyBell', { preload: preload, create: create, update: update, render: render });
var game = new Game();

function preload() {
    // Load assets
    // Atlas Texture tool : http://www.leshylabs.com/apps/sstool/
    phaser.load.atlasJSONHash('ground-atlas', "asset/image/ground-tileset.png", "asset/image/ground-tileset.json");
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