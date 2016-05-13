/**
 * Created by nd on 18/03/2016.
 */

/**
 * Created by nd on 15/03/2016.
 */

/**
 * Created by nd on 7/03/2016.
 */

Visual.prototype = new Composable();
Visual.prototype.constructor = Visual;
Visual.ComponentTypes = {
    LOCATOR:"Locator"
}
function Visual(parent,offsetX,offsetY,fileName) {
    if (offsetX != null && offsetY != null) {

        Composable.call(this);


        var visual = this;
        var componentRoleHelper = new ComponentRoleHelper(visual);
        var active = true;
        var displayed = false;

        visual.addToComposable = addToComposable;


        visual.addLocator = addLocator;
        visual.isActive = isActive;
        visual.setActive = setActive;
        visual.isDisplayed = isDisplayed;
        visual.setDisplayed = setDisplayed;
        visual.getFileName = getFileName;


        /*compose base gameItem*/
        visual
            .addComponent(new OffsetLocator(visual, offsetX, offsetY, parent))
            .doWiring();


        function isActive(){
            return active;
        }

        function setActive(activeParam){
            active = activeParam;
        }

        function isDisplayed(){
            return displayed;
        }

        function setDisplayed(displayedParam){
            displayed = displayedParam;
        }

        function getFileName(){
            return fileName;
        }


        function addLocator(locator){
            var componentsForRole = componentRoleHelper.getComponentListForRole(Visual.ComponentTypes.LOCATOR);
            componentRoleHelper.generateComponentListGetterForRole(Visual.ComponentTypes.LOCATOR);

            /*this is for linking zoneLocator and mobileLocator to previously added locator*/
            if (componentsForRole.length > 0){
                locator.setOriginLocator(componentsForRole[componentsForRole.length-1]);
            }

            componentsForRole.push(locator);
        }


        function addToComposable(composable){
            if (composable.addVisual){
                composable.addVisual(visual);
            }
        }
    }
}


