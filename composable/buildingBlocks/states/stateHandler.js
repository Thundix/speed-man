/**
 * Created by Thundax on 13/05/2016.
 */

StateHandler.prototype = new Composable();
StateHandler.prototype.constructor = StateHandler;
StateHandler.ComponentTypes = {
    STATE:"State"
};
function StateHandler(gameItem) {
    if (gameItem != null){

        Composable.call(this);

        var stateHandler = this;
        var componentRoleHelper = new ComponentRoleHelper(stateHandler);
        var collisionQueue = [];

        stateHandler.addToComposable = addToComposable;
        stateHandler.addState = addState;
        stateHandler.tick = tick;
        stateHandler.treatInputs=treatInputs;
        stateHandler.treatCollisions=treatCollisions;
        stateHandler.addCollision = addCollision;

        function tick(delta){

        }

        function addToComposable(composable){
            if (composable.addStateHandler){
                composable.addStateHandler(stateHandler);
            }
        }
        function addState(state) {

            var componentsForRole = componentRoleHelper.getComponentListForRole(StateHandler.ComponentTypes.STATE);
            componentRoleHelper.generateComponentListGetterForRole(StateHandler.ComponentTypes.STATE);
            componentsForRole.push(state);
        }

        function treatInputs(){
            var componentsForRole = componentRoleHelper.getComponentListForRole(StateHandler.ComponentTypes.STATE);
            for(var i=0; i < componentsForRole.length;  i++){
                componentsForRole[i].treatInputs();
            }
        }

        function treatCollisions() {
            var componentsForRole = componentRoleHelper.getComponentListForRole(StateHandler.ComponentTypes.STATE);
            for(var i=0; i < componentsForRole.length;  i++){
                for(var j=0; j < collisionQueue.length; j++) {
                    componentsForRole[i].treatCollisions(collisionQueue[j]);
                }
            }
            // Reinit
            collisionQueue = [];
        }
        function addCollision(collision){
            collisionQueue[collisionQueue.length] = collision;
        }
    }
}