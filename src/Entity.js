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
    Entity.prototype.addComponent = function(component, tag) {
        if (tag != null) {
            this.components[component.name] = {};
            this.components[component.name][tag] = component;
        }
        else
            this.components[component.name] = component;
        return this;
    }

    Entity.prototype.getComponent = function (type, tag){
        component = null;
        if (tag == null && typeof this.components[type] == type)
            component =  this.components[type];
        else if (typeof this.components[type][tag] == type)
            component = this.components[type][tag];
        return component;
    }
    return Entity;
})();