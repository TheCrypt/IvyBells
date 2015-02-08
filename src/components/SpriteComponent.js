/**
 * Created by Sam on 08/02/15.
 */

var SpriteComponent = (function () {

    function SpriteComponent(
    	position,
    	spriteName, 
    	animations
    	) {
        this.name = "SpriteComponent";

        this.unit = phaser.add.sprite(position.x, position.y, spriteName, 1);
        for (var animation in animations) {
        	animation = animations[animation];
        	this.unit.animations.add(
        		animation.name,
        		animation.frames,
        		animation.fps,
        		animation.loop
        	)
        }
    }

    SpriteComponent.prototype.setPhysics = function(size) {
    	this.unit.body.setSize(size.width, size.height, size.a, size.b);
    }

    return SpriteComponent;
})();
