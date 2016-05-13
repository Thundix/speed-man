/**
 * Created by nd on 8/03/2016.
 */


/***
 *
 * @param parent (required)
 * @param x
 * @param y
 * @param originLocator
 * @constructor
 */
function Locator(parent,x,y,originLocator) {
    var locator = this;

    x = x || 0;
    y = y || 0;


    locator.getX = getX;
    locator.setX = setX;
    locator.getY = getY;
    locator.setY = setY;



    locator.getOriginLocator = getOriginLocator;
    locator.setOriginLocator = setOriginLocator;
    locator.resetOriginLocator = resetOriginLocator;

    locator.addToComposable = addToComposable;
    locator.getMethodsToPullUp = getMethodsToPullUp;


    /***
     * return absolute x position
     * note : the value returned should be the same whether origin locator is set or not
     * @returns int
     */
    function getX(calculationModes) {
        if (calculationModes){

            var newCalculationModes = {};
            for (var calcMode in calculationModes){
                if (calculationModes[calcMode]){
                    newCalculationModes[calcMode] = calculationModes[calcMode];
                }
            }
            if (newCalculationModes["borderXType"]){
                newCalculationModes["borderXType"] = 0;
            }
        }
        return (originLocator ? originLocator.getX(newCalculationModes) : 0) + x;
    }

    /***
     * set absolute x position
     * note : the value passed should be the same whether origin locator is set or not
     * @param xParam
     */
    function setX(xParam,calculationModes) {
        if (calculationModes){

            var newCalculationModes = {};
            for (var calcMode in calculationModes){
                if (calculationModes[calcMode]){
                    newCalculationModes[calcMode] = calculationModes[calcMode];
                }
            }
            if (newCalculationModes["borderXType"]){
                newCalculationModes["borderXType"] = 0;
            }
        }
        x = xParam - (originLocator ? originLocator.getX(newCalculationModes) : 0);
    }

    /***
     * return absolute y position
     * note : the value returned should be the same whether origin locator is set or not
     * @returns int
     */
    function getY(calculationModes) {
        if (calculationModes){
            var newCalculationModes = {};
            for (var calcMode in calculationModes){
                if (calculationModes[calcMode]){
                    newCalculationModes[calcMode] = calculationModes[calcMode];
                }
            }
            if (newCalculationModes["borderYType"]){
                newCalculationModes["borderYType"] = 0;
            }
        }
        return (originLocator ? originLocator.getY(newCalculationModes) : 0) + y;
    }

    /***
     * set absolute y position
     * note : the value passed should be the same whether origin locator is set or not
     * @param yParam
     */
    function setY(yParam,calculationModes) {
        if (calculationModes){
            var newCalculationModes = {};
            for (var calcMode in calculationModes){
                if (calculationModes[calcMode]){
                    newCalculationModes[calcMode] = calculationModes[calcMode];
                }
            }
            if (newCalculationModes["borderYType"]){
                newCalculationModes["borderYType"] = 0;
            }
        }
        y = yParam - (originLocator ? originLocator.getY(newCalculationModes) : 0);
    }


    function getOriginLocator () {
        return originLocator;
    }

    /***
     * set the origin locator for relative positioning.
     * note : values returned by getX() and getY() must remain unchanged after changing the origin locator.
     * @param locator
     */
    function setOriginLocator (locator) {
        var currentX = getX(), currentY = getY();

        originLocator = locator;

        setX(currentX);
        setY(currentY);
    }

    /***
     * unset the origin locator for absolute positioning.
     * note : values returned by getX() and getY() must remain unchanged after changing the origin locator.
     */
    function resetOriginLocator () {
        var currentX = getX(), currentY = getY();

        originLocator = null;

        setX(currentX);
        setY(currentY);
    }


    function addToComposable(composable){
        if (composable.addLocator){
            composable.addLocator(locator);
        }
    }

    function getMethodsToPullUp(){
        return [
            "getX",
            "getY",
            "setX",
            "setY",
            "getOriginLocator",
            "setOriginLocator",
            "resetOriginLocator"
        ];
    }

}
