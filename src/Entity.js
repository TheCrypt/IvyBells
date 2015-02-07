/**
 * Created by Massou on 07/02/15.
 */
var Entity = (function () {

    function Entity() {
        this.components = {};
    }

    Entity.prototype.setName = function(name) {
        this.name = name;
        return this;
    }
    Entity.prototype.addComponent = function(component) {
        this.components[component.name] = component;
        return this;
    }
    return Entity;
})();