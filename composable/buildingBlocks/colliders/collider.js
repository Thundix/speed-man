/**
 * Created by nd on 15/03/2016.
 */

/**
 * Created by nd on 7/03/2016.
 */

ComposableCollider.prototype = new Composable();
ComposableCollider.prototype.constructor = ComposableCollider;
ComposableCollider.ComponentTypes = {
    LOCATOR:"Locator"
}
function ComposableCollider(gameItem,offsetX,offsetY) {
    if (offsetX != null && offsetY != null) {

        Composable.call(this);

        var collider = this;
        var componentRoleHelper = new ComponentRoleHelper(collider);

        collider.addToComposable = addToComposable;


        collider.addLocator = addLocator;

        collider.canCollide = canCollide;



        /*compose base gameItem*/
        collider
            .addComponent(new OffsetLocator(collider, offsetX, offsetY, gameItem))
            // ugly fix to use both old code and new code
            .addComponent(new MobileLocator(collider,0,0))
            .doWiring();


        function canCollide(secondGameItem){
            //TODO : change the name of the gameItem.canCollide to gameItem.canBeCollidedBy
            return secondGameItem.canCollide(gameItem)
        }


        function addLocator(locator){
            var componentsForRole = componentRoleHelper.getComponentListForRole(GameItem.ComponentTypes.LOCATOR);
            componentRoleHelper.generateComponentListGetterForRole(GameItem.ComponentTypes.LOCATOR);

            /*this is for linking zoneLocator and mobileLocator to previously added locator*/
            if (componentsForRole.length > 0){
                locator.setOriginLocator(componentsForRole[componentsForRole.length-1]);
            }

            componentsForRole.push(locator);
        }






        function addToComposable(composable){
            if (composable.addCollider){
                composable.addCollider(collider);
            }
        }
    }
}

