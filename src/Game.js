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

        phaser.camera.x = 600;
        phaser.camera.y = 700;


        this.map = phaser.add.tilemap('map2');
        this.map.addTilesetImage('ground-tileset', 'ground-tileset');
        this.layer1 = this.map.createLayer('Layer1');
        this.layer2 = this.map.createLayer('Layer2');


        this.player = phaser.add.sprite(900, 900, 'player', 1);
        this.player.animations.add('left', [8,9], 10, true);
        this.player.animations.add('right', [1,2], 10, true);
        this.player.animations.add('up', [11,12,13], 10, true);
        this.player.animations.add('down', [4,5,6], 10, true);

        phaser.physics.enable(this.player, Phaser.Physics.ARCADE);

        this.player.body.setSize(10, 14, 2, 1);

        var previous_mouse_pos = null;
        var mouse_sensitivity = 30;
        phaser.input.mouse.onMouseMove = function (evt) {
            if (phaser.input.mousePointer.isUp)
                previous_mouse_pos = null;
            if (phaser.input.mousePointer.isDown) {
                if (previous_mouse_pos == null)
                    previous_mouse_pos = evt;
                var dx = evt.x - previous_mouse_pos.x;
                var dy = evt.y - previous_mouse_pos.y;
                previous_mouse_pos = evt;
                phaser.camera.x -= dx * mouse_sensitivity * phaser.time.physicsElapsed;
                phaser.camera.y -= dy * mouse_sensitivity * phaser.time.physicsElapsed;       
            }

        };


        this.marker = phaser.add.graphics();
        this.marker.lineStyle(2, 0x000000, 1);
        this.marker.drawRect(0, 0, 32, 32);


    };

    Game.prototype.update = function() {
        var cameraSpeed = 0.5;
        var elapsedTime = phaser.time.elapsed;

        this.marker.x = this.layer1.getTileX(phaser.input.activePointer.worldX) * 32;
        this.marker.y = this.layer1.getTileY(phaser.input.activePointer.worldY) * 32;

        if (phaser.input.mousePointer.isDown)
        {
            if (phaser.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
            {
                var currentTile = this.map.getTile(this.layer1.getTileX(this.marker.x), this.layer1.getTileY(this.marker.y));
                console.log(currentTile);
            }
        }
        // TODO: Linear interpolation
        this.player.body.velocity.set(0);

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


