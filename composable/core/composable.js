/**
 * Created by nd on 7/03/2016.
 */


function Composable () {

    var composable = this;
    
    var componentList = [];
        
    composable.addComponent = addComponent;
    composable.doWiring = doWiring;


    function addComponent(component)  {

        if(component.addToComposable){
            component.addToComposable(composable);
        }

        componentList.push(component);
        return composable;
    }
    
    function doWiring(){
        pullUpMethodsFromComponents();
        pushDownMethodsToComponents();

        return composable;
    }
    
    function pullUpMethodsFromComponents() {

        for(var i=0; i <componentList.length;i++){
            var component = componentList[i];
            if (component.pullUpMethodsFromComponents) {
                component.pullUpMethodsFromComponents();
            }
            if (component.getMethodsToPullUp) {

                var methodsToPullUp = component.getMethodsToPullUp();
                if (methodsToPullUp) {
                    for (var j=0; j< methodsToPullUp.length; j++) {

                        var method = methodsToPullUp[j];
                        if (component[method]){
                            composable[method] = component[method];
                        }
                    }
                }
            }
        }
    }
    
    function pushDownMethodsToComponents () {
        for(var i=0; i <componentList.length;i++){

            var component = componentList[i];
            if (component.getMethodsToPushDown) {

                var methodsToPushDown = component.getMethodsToPushDown();
                if (methodsToPushDown) {
                    for (var j=0; j< methodsToPushDown.length; j++) {

                        var method = methodsToPushDown[j];
                        if (composable[method]) {
                            component[method] = composable[method];
                        }
                    }
                }
            }

            if (component.pushDownMethodsToComponents) {
                component.pushDownMethodsToComponents();
            }
        }
    }
}