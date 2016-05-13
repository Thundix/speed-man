/**
 * Created by nd on 15/03/2016.
 */

/**
 * Created by nd on 7/03/2016.
 */

Renderer.prototype = new Composable();
Renderer.prototype.constructor = Renderer;
Renderer.ComponentTypes = {
    LOCATOR:"Locator",
    VISUAL:"Visual"
}
function Renderer(gameItem,offsetX,offsetY) {
    if (gameItem != null){

        Composable.call(this);

        var renderer = this;
        var componentRoleHelper = new ComponentRoleHelper(renderer);

        renderer.addToComposable = addToComposable;

        renderer.addLocator = addLocator;
        renderer.addVisual = addVisual;


        renderer.tick = tick;


        /*compose base gameItem*/
        renderer
            .addComponent(new OffsetLocator(renderer, offsetX, offsetY,gameItem))
            .doWiring();


        function tick(delta){
            if(renderer.renderState){
                renderer.renderState(delta);
            }

        }

        function addLocator(locator){
            var componentsForRole = componentRoleHelper.getComponentListForRole(Renderer.ComponentTypes.LOCATOR);
            componentRoleHelper.generateComponentListGetterForRole(Renderer.ComponentTypes.LOCATOR);

            /*this is for linking zoneLocator and mobileLocator to previously added locator*/
            if (componentsForRole.length > 0){
                locator.setOriginLocator(componentsForRole[componentsForRole.length-1]);
            }

            componentsForRole.push(locator);
        }

        function addVisual(visual){

            var componentsForRole = componentRoleHelper.getComponentListForRole(Renderer.ComponentTypes.VISUAL);
            componentRoleHelper.generateComponentListGetterForRole(Renderer.ComponentTypes.VISUAL);

            componentsForRole.push(visual);
        }

        function addToComposable(composable){
            if (composable.addRenderer){
                composable.addRenderer(renderer);
            }
        }
    }
}

/**
 * Created by nd on 17/03/2016.
 */
