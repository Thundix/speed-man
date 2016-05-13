/**
 * Created by nd on 7/03/2016.
 */

GameItem.prototype = new Composable();
GameItem.prototype.constructor = GameItem;
GameItem.ComponentTypes = {
    LOCATOR:"Locator",
    COLLIDER:"Collider",
    RENDERER:"Renderer",
    STATE_HANDLER:"StateHandler"
}
function GameItem(x,y) {
    if (x != null && y != null ) {
        Composable.call(this);

        var gameItem = this;

        var componentRoleHelper = new ComponentRoleHelper(gameItem);


        gameItem.addLocator = addLocator;
        gameItem.addCollider = addCollider;
        gameItem.addRenderer = addRenderer;
        gameItem.addStateHandler = addStateHandler;


        /*compose base gameItem*/
        gameItem
            .addComponent(new Locator(gameItem, x, y))
            .doWiring();



        gameItem.doAGameItemThing = doAGameItemThing;




        function addLocator(locator){
            var componentsForRole = componentRoleHelper.getComponentListForRole(GameItem.ComponentTypes.LOCATOR);
            componentRoleHelper.generateComponentListGetterForRole(GameItem.ComponentTypes.LOCATOR);

            /*this is for linking zoneLocator and mobileLocator to previously added locator*/
            if (componentsForRole.length > 0){
                locator.setOriginLocator(componentsForRole[componentsForRole.length-1]);
            }

            componentsForRole.push(locator);
        }

        function addCollider(collider) {


            var componentsForRole = componentRoleHelper.getComponentListForRole(GameItem.ComponentTypes.COLLIDER);
            componentRoleHelper.generateComponentListGetterForRole(GameItem.ComponentTypes.COLLIDER);

            componentsForRole.push(collider);
        }

        function addRenderer(renderer) {

            var componentsForRole = componentRoleHelper.getComponentListForRole(GameItem.ComponentTypes.RENDERER);
            componentRoleHelper.generateComponentListGetterForRole(GameItem.ComponentTypes.RENDERER);

            componentsForRole.push(renderer);
        }

        function addStateHandler(stateHandler) {

            var componentsForRole = componentRoleHelper.getComponentListForRole(GameItem.ComponentTypes.STATE_HANDLER);
            componentRoleHelper.generateComponentListGetterForRole(GameItem.ComponentTypes.STATE_HANDLER);

            componentsForRole.push(stateHandler);
        }

        function doAGameItemThing() {
            console.log("GameItem do a GameItem thing");
        }
    }
}
