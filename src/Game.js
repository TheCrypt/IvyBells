/**
 * Created by Nicolas on 07/02/2015.
 */

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

    };

    Game.prototype.update = function() {
        var cameraSpeed = 0.5;
        var elapsedTime = phaser.time.elapsed;

        // TODO: Linear interpolation
        if (this.cursors.up.isDown) {
            phaser.camera.y -= cameraSpeed * elapsedTime;
        }
        else if (this.cursors.down.isDown) {
            phaser.camera.y += cameraSpeed * elapsedTime;
        }
        if (this.cursors.left.isDown) {
            phaser.camera.x -= cameraSpeed * elapsedTime;
        }
        else if (this.cursors.right.isDown) {
            phaser.camera.x += cameraSpeed * elapsedTime;
        }
    };

    Game.prototype.render = function() {

    };

    return Game;
})();


