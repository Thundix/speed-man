/**
 * Created by nd on 7/03/2016.
 */
//var gameItem = new GameItem(5,5);
//gameItem.addComponent(GameItem.ComponentTypes.COMPONENT1,new Component1()).doWiring();

//    )
//    .addComponent(new Component2())
//    .doWiring();



//console.log(gameItem.getX());
/*
gameItem.doSomething();
gameItem.doAGameItemThing();
gameItem.doSomethingElse();
 */
/*
console.log(gameItem instanceof GameItem);
console.log(gameItem instanceof Composable);
console.log(gameItem.getLocatorList());
*/
console.log("creating platform1");
var platform1 = new MovingPlatform(150,200,100,20,"platform",5,10);
console.log("platform1 instanceof Platform : "+(platform1 instanceof Platform));
console.log("platform1 instanceof GameItem : "+(platform1 instanceof GameItem));
console.log("platform1 instanceof Composable : "+(platform1 instanceof Composable));
console.log("platform1.getLocatorList() : ");
console.log(platform1.getLocatorList());
console.log("platform1 : ");
console.log(platform1);


/*
 console.log("creating platform2");
 var platform2 = new Platform(400,400,200,20);
 console.log("platform2 instanceof Platform : "+(platform2 instanceof Platform));
 console.log("platform2 instanceof GameItem : "+(platform2 instanceof GameItem));
 console.log("platform2 instanceof Composable : "+(platform2 instanceof Composable));
 console.log("platform2.getLocatorList() : ");
 console.log(platform2.getLocatorList());
 console.log("platform2 : ");
 console.log(platform2.getX(RectangularZoneLocator.borderXTypes.LEFT));
 console.log(platform2.getX(RectangularZoneLocator.borderXTypes.RIGHT));


 */

var platformCollider = platform1.getColliderList()[0];

var cornerTopLeft = {
    borderXType : RectangularZoneLocator.borderXTypes.LEFT,
    borderYType : RectangularZoneLocator.borderYTypes.TOP,
    movementCalculationXType : MobileLocator.movementCalculationXTypes.CURRENT,
    movementCalculationYType : MobileLocator.movementCalculationYTypes.CURRENT

};
console.log(platformCollider.getX(cornerTopLeft));
console.log(platformCollider.getY(cornerTopLeft));
platformCollider.setX(50);
platformCollider.setY(500);
console.log(platformCollider.getX(cornerTopLeft));
console.log(platformCollider.getY(cornerTopLeft));

var renderer = platform1.getRendererList()[0];
console.log(renderer);
var visual = renderer.getVisualList()[0];
console.log(visual);
console.log(visual.getX(cornerTopLeft));
console.log(visual.getY(cornerTopLeft));

/*
function Component1(){
    var component1 = this;
    component1.doSomething = doSomething;

    component1.getMethodsToPullUp = getMethodsToPullUp;
    component1.getMethodsToPushDown = getMethodsToPushDown;

    function doSomething () {
        console.log("Component1.doSomething()")
    }


    function getMethodsToPullUp(){
        return [
          "doSomething"
        ];
    }

    function getMethodsToPushDown(){
        return [
            "doSomethingElse"
        ];
    }
}
*/


/*

function Component2(){
    var component2 = this;
    component2.doSomethingElse = doSomethingElse;

    component2.getMethodsToPullUp = getMethodsToPullUp;
    component2.getMethodsToPushDown = getMethodsToPushDown;

    function doSomethingElse () {
        console.log("Component2.doSomethingElse()");
    }


    function getMethodsToPullUp(){
        return [
            "doSomethingElse"
        ];
    }

    function getMethodsToPushDown(){
        return [
            "doSomething"
        ];
    }
}

*/

