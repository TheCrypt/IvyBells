/**
 * Created by Nicolas on 07/02/2015.
 */

"use strict";

var Game = (function () {
    
    function Game() { }

    Game.prototype.initialize = function() {
        SystemInputSingleton.initialize();

        // Define world size
        phaser.world.setBounds(0, 0, 1900, 1900);

        phaser.camera.x = 400;
        phaser.camera.y = 400;


        this.map = phaser.add.tilemap('map2');
        this.map.addTilesetImage('ground-tileset', 'ground-tileset');
        this.layer1 = this.map.createLayer('Layer1');
        this.layer2 = this.map.createLayer('Layer2');
        this.layerCollider = this.map.createLayer('Collider'); // 48 == blocked
        this.layerCollider.visible = false;

        this.group = phaser.add.group(undefined, "General");

        this.player = phaser.add.sprite(800, 900, 'player', 1);
        this.player.animations.add('left', [8,9], 10, true);
        this.player.animations.add('right', [1,2], 10, true);
        this.player.animations.add('up', [11,12,13], 10, true);
        this.player.animations.add('down', [4,5,6], 10, true);

        phaser.physics.enable(this.player, Phaser.Physics.ARCADE);

        this.player.body.setSize(10, 14, 2, 1);

        // Render order
        this.group.add(this.layer1);
        this.group.add(this.player);
        this.group.add(this.layer2);


        SystemInputSingleton.registerClickHandler(function() {
            this.moveInProgress = 1;
            this.findPathTo(this.layer1.getTileX(this.marker.x), this.layer1.getTileY(this.marker.y));
        }, this);

        SystemInputSingleton.registerHoldHandler(function(dx, dy) {
            phaser.camera.x -= dx;
            phaser.camera.y -= dy;
        });



        this.marker = phaser.add.graphics();
        this.marker.lineStyle(2, 0x000000, 1);
        this.marker.drawRect(0, 0, 32, 32);

        this.moveInProgress = 0;
        this.targetTile = null;
        this.targetMarker = null;
        this.pathfinder = phaser.plugins.add(Phaser.Plugin.PathFinderPlugin);
        this.pathfinder.setGrid(this.map.layers[2].data, [-1]);

        this.playerPath = [];
    };

    Game.prototype.findPathTo = function(tilex, tiley) {
        this.pathfinder.setCallbackFunction(function(path) {
            game.playerPath = path || [];
            game.playerPath = game.playerPath.reverse();
            game.moveInProgress = 2;
        });

        this.pathfinder.preparePathCalculation([this.layer1.getTileX(this.player.body.x), this.layer1.getTileX(this.player.body.y)], [tilex, tiley]);
        this.pathfinder.calculatePath();
    }

    Game.prototype.update = function() {
        var cameraSpeed = 0.5;
        var elapsedTime = phaser.time.elapsed;
        
        this.player.body.velocity.set(0);

        var mousePos = SystemInputSingleton.getMousePosition();
        this.marker.x = this.layer1.getTileX(mousePos.worldX) * 32;
        this.marker.y = this.layer1.getTileY(mousePos.worldY) * 32;

        if (this.moveInProgress == 2) {
            if (this.targetTile == null) {
                this.targetTile = this.playerPath.pop();
            }
            if (this.targetTile == null) {
                this.moveInProgress = 0;
                this.player.animations.stop();
                return;
            }
            if (this.targetTile.x < this.layer1.getTileX(this.player.body.x + 20)) {
                this.player.body.velocity.x = -100;
                this.player.play('left');
            }
            else if (this.targetTile.x  > this.layer1.getTileX(this.player.body.x - 10)) {
                this.player.body.velocity.x = 100;
                this.player.play('right');
            }
            else if (this.targetTile.y < this.layer1.getTileY(this.player.body.y + 20)) {
                this.player.body.velocity.y = -100;
                this.player.play('up');
            }
            else if (this.targetTile.y > this.layer1.getTileY(this.player.body.y - 10)) {
                this.player.body.velocity.y = 100;
                this.player.play('down');
            }
            else {
                this.targetTile = this.playerPath.pop();
            }
            



        }

        // TODO: Linear interpolation
        var xAxis = SystemInputSingleton.getKeyboardXAxis();
        var yAxis = SystemInputSingleton.getKeyboardYAxis();
        var cameraSpeed = 10;
        phaser.camera.x += xAxis * cameraSpeed;
        phaser.camera.y += yAxis * cameraSpeed;

    };

    Game.prototype.render = function() {

    };

    Game.prototype.type = "Game";
    return Game;
})();


