/**
 * Created by Massou on 08/02/15.
 */

var SystemInputSingleton = (function()
{
    function SystemInput() { }

    SystemInput.prototype.initialize = function() {

        this.clickHandlers  = [];
        this.holdHandlers   = [];
        this.moveHandlers   = [];

        this.cursors = phaser.input.keyboard.createCursorKeys();

        var _mouseMovedWhileClicked = false;
        var _previousMousePos       = null;

        phaser.input.mouse.callbackContext = this;
        phaser.input.mouse.mouseUpCallback = function() {
            if (!_mouseMovedWhileClicked) {
                for (var i = 0; i < this.clickHandlers.length; ++i) {
                    this.clickHandlers[i].handler.call(this.clickHandlers[i].context);
                }
            } else {
                _mouseMovedWhileClicked = false;
            }
        };

        phaser.input.mouse.mouseMoveCallback = function (event) {
            if (_previousMousePos == null)
                _previousMousePos = event;

            var dx = event.x - _previousMousePos.x;
            var dy = event.y - _previousMousePos.y;

            if (phaser.input.mousePointer.isDown) {
                _mouseMovedWhileClicked = true;
                for (var i = 0; i < this.holdHandlers.length; ++i)
                    this.holdHandlers[i].handler.call(this.holdHandlers[i].context, dx, dy);
            }

            for (var i = 0; i < this.moveHandlers.length; ++i)
                this.moveHandlers[i].handler.call(this.moveHandlers[i].context, dx, dy);

            _previousMousePos = event;
        };
    };


/* Internal */
    SystemInput.prototype._registerHandler = function(list, handler, context) {
        if (handler && typeof handler == "function") {
            list.push({ handler:handler, context:context });
        }
    };
    SystemInput.prototype._unregisterHandler = function(list, handler, context) {
        for (var i = 0; i < list.length; ++i) {
            if (list[i].handler === handler && list[i].context === context) {
                list.slice(i, 1);
                break;
            }
        }
    };

    /* Public */

    SystemInput.prototype.registerClickHandler = function(handler, context) {
        this._registerHandler(this.clickHandlers, handler, context);
    };

    SystemInput.prototype.registerHoldHandler = function(handler, context) {
        this._registerHandler(this.holdHandlers, handler, context);
    };

    SystemInput.prototype.registerMoveHandler = function(handler, context) {
        this._registerHandler(this.moveHandlers, handler, context);
    };

    SystemInput.prototype.unregisterClickHandler = function(handler, context) {
        this._unregisterHandler(this.clickHandlers, handler, context);
    };

    SystemInput.prototype.unregisterHoldHandler = function(handler, context) {
        this._unregisterHandler(this.holdHandlers, handler, context);
    };

    SystemInput.prototype.unregisterMoveHandler = function(handler, context) {
        this._unregisterHandler(this.moveHandlers, handler, context);
    };

    SystemInput.prototype.getKeyboardXAxis = function() {
        var xAxis = 0;
        xAxis -= (this.cursors.left.isDown ? 1 : 0);
        xAxis += (this.cursors.right.isDown ? 1 : 0);
        return xAxis;
    };

    SystemInput.prototype.getKeyboardYAxis = function() {
        var yAxis = 0;
        yAxis -= (this.cursors.up.isDown ? 1 : 0);
        yAxis += (this.cursors.down.isDown ? 1 : 0);
        return yAxis;
    };

    SystemInput.prototype.getMousePosition = function() {
        return {
            worldX:phaser.input.activePointer.worldX,
            worldY:phaser.input.activePointer.worldY,
            x:phaser.input.activePointer.x,
            y:phaser.input.activePointer.y
        };
    };

    return new SystemInput();
})();