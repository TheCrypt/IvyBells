/**
 * Created by Massou on 07/02/15.
 */
var EntityManager = (function () {
    function EntityManager() {
        this.entities = [];
    }

    EntityManager.prototype.addEntity = function(entity) {
        this.entities.push(entity);
        return this;
    }

    return new EntityManager();
})();