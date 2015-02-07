/**
 * Created by Nicolas on 07/02/2015.
 */

var Game = (function () {
    
    function Game() {
        this.cursors;
    }

    Game.prototype.initialize = function() {
        // Define world size
        phaser.world.setBounds(-600, -700, 2000, 2000);

        this.cursors = phaser.input.keyboard.createCursorKeys();

        this.tile = phaser.add.sprite(0, 0, 'ground-atlas', 'sprite1');
        this.tile.width = 40;
        this.tile.height = 40;

        this.tile1 = phaser.add.sprite(40, 0, 'ground-atlas', 'sprite2');
        this.tile1.width = 40;
        this.tile1.height = 40;

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


