/**
 * Created by Nicolas on 07/02/2015.
 */

"use strict";

var Game = (function () {
    
    function Game() {
        this.cursors;

    }

    Game.prototype.initialize = function() {
        // Define world size
        phaser.world.setBounds(0, 0, 1900, 1900);

        this.cursors = phaser.input.keyboard.createCursorKeys();

        phaser.camera.x = 400;
        phaser.camera.y = 400;


        this.map = phaser.add.tilemap('map2');
        this.map.addTilesetImage('ground-tileset', 'ground-tileset');
        this.layer1 = this.map.createLayer('Layer1');
        this.layer2 = this.map.createLayer('Layer2');
        this.layerCollider = this.map.createLayer('Collider'); // 48 == blocked


        this.player = phaser.add.sprite(800, 900, 'player', 1);
        this.player.animations.add('left', [8,9], 10, true);
        this.player.animations.add('right', [1,2], 10, true);
        this.player.animations.add('up', [11,12,13], 10, true);
        this.player.animations.add('down', [4,5,6], 10, true);

        phaser.physics.enable(this.player, Phaser.Physics.ARCADE);

        this.player.body.setSize(10, 14, 2, 1);

        var previous_mouse_pos = null;
        var mouse_sensitivity = 30;

        var mouseMovedWhileClicked = false;
        phaser.input.mouse.mouseMoveCallback = function (evt) {
            if (phaser.input.mousePointer.isUp)
                previous_mouse_pos = null;
            if (phaser.input.mousePointer.isDown) {
                mouseMovedWhileClicked = true;
                if (previous_mouse_pos == null)
                    previous_mouse_pos = evt;
                var dx = evt.x - previous_mouse_pos.x;
                var dy = evt.y - previous_mouse_pos.y;
                previous_mouse_pos = evt;
                phaser.camera.x -= dx * mouse_sensitivity * phaser.time.physicsElapsed;
                phaser.camera.y -= dy * mouse_sensitivity * phaser.time.physicsElapsed;
            }
        }
        phaser.input.mouse.callbackContext = this;
        phaser.input.mouse.mouseUpCallback = function() {
            if (!mouseMovedWhileClicked && this.moveInProgress == 0)
            {
                this.moveInProgress = 1;
                this.findPathTo(this.layer1.getTileX(this.marker.x), this.layer1.getTileY(this.marker.y));
            } else {
                mouseMovedWhileClicked = false;
            }
        };


        this.marker = phaser.add.graphics();
        this.marker.lineStyle(2, 0x000000, 1);
        this.marker.drawRect(0, 0, 32, 32);

        this.moveInProgress = 0;
        this.targetTile = null;
        this.targetMarker = null;
        this.pathfinder = phaser.plugins.add(Phaser.Plugin.PathFinderPlugin);
        this.pathfinder.setGrid(this.map.layers[0].data, [11]);

        this.playerPath = [];
    };

    Game.prototype.findPathTo = function(tilex, tiley) {

        this.pathfinder.setCallbackFunction(function(path) {
            game.playerPath = path || [];
            for(var i = 0, ilen = game.playerPath.length; i < ilen; i++) {
                game.map.putTile(46, game.playerPath[i].x, game.playerPath[i].y);
            }
            game.playerPath = game.playerPath.reverse();
            game.moveInProgress = 2;
        });

        this.pathfinder.preparePathCalculation([this.layer1.getTileX(this.player.body.x),this.layer1.getTileX(this.player.body.y)], [tilex,tiley]);
        this.pathfinder.calculatePath();
    }

    Game.prototype.update = function() {
        var cameraSpeed = 0.5;
        var elapsedTime = phaser.time.elapsed;
        
        this.player.body.velocity.set(0);
        this.marker.x = this.layer1.getTileX(phaser.input.activePointer.worldX) * 32;
        this.marker.y = this.layer1.getTileY(phaser.input.activePointer.worldY) * 32;

        if (this.moveInProgress == 2) {
            if (this.targetTile == null) {
                this.targetTile = this.playerPath.pop();
            }
            if (this.targetTile == null) {
                this.moveInProgress = 0;
                this.player.animations.stop();
                return;
            }
            if (this.targetTile.x < this.layer1.getTileX(this.player.body.x)) {
                this.player.body.velocity.x = -100;
                this.player.play('left');
            }
            else if (this.targetTile.x  > this.layer1.getTileX(this.player.body.x)) {
                this.player.body.velocity.x = 100;
                this.player.play('right');
            }
            else if (this.targetTile.y < this.layer1.getTileY(this.player.body.y)) {
                this.player.body.velocity.y = -100;
                this.player.play('up');
            }
            else if (this.targetTile.y > this.layer1.getTileY(this.player.body.y)) {
                this.player.body.velocity.y = 100;
                this.player.play('down');
            }
            else {
                this.targetTile = this.playerPath.pop();
            }
            



        }

        // TODO: Linear interpolation
        

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -100;
            this.player.play('left');
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 100;
            this.player.play('right');
        }
        else if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -100;
            this.player.play('up');
        }
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y = 100;
            this.player.play('down');
        }
        else {
            this.player.animations.stop();
        }
    };

    Game.prototype.render = function() {

    };

    Game.prototype.type = "Game";
    return Game;
})();


