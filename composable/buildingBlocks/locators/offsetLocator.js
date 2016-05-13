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
function OffsetLocator(parent,xOffset,yOffset,originLocator) {
    var locator = this;

    xOffset = xOffset || 0;
    yOffset = yOffset || 0;


    locator.getX = getX;
    locator.setX = setX;
    locator.getY = getY;
    locator.setY = setY;


    locator.getXOffset = getXOffset;
    locator.setXOffset = setXOffset;
    locator.getYOffset = getYOffset;
    locator.setYOffset = setYOffset;


    locator.getOriginLocator = getOriginLocator;
    locator.setOriginLocator = setOriginLocator;


    locator.addToComposable = addToComposable;
    locator.getMethodsToPullUp = getMethodsToPullUp;


    function getXOffset() {
        return xOffset
    }

    function setXOffset(xParam){
        xOffset = xParam;
    }

    function getYOffset() {
        return yOffset
    }

    function setYOffset(yParam){
        yOffset = yParam;
    }

    /***
     * return absolute x position
     * note : the value returned should be the same whether origin locator is set or not
     * @returns int
     */
    function getX(calculationModes) {
        if (!originLocator){
            return false;
        }
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
        return originLocator.getX(newCalculationModes)+ xOffset;
    }

    /***
     * set absolute x position
     * note : the value passed should be the same whether origin locator is set or not
     * @param xParam
     */
    function setX(xParam,calculationModes) {
        if (!originLocator){
            return false;
        }

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
        originLocator.setX(xParam - xOffset,newCalculationModes);
    }

    /***
     * return absolute y position
     * note : the value returned should be the same whether origin locator is set or not
     * @returns int
     */
    function getY(calculationModes) {
        if (!originLocator){
            return false;
        }

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
        return originLocator.getY(newCalculationModes)+ yOffset;
    }

    /***
     * set absolute y position
     * note : the value passed should be the same whether origin locator is set or not
     * @param yParam
     */
    function setY(yParam,calculationModes) {
        if (!originLocator){
            return false;
        }

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
        originLocator.setY(yParam - yOffset, newCalculationModes);
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

        originLocator = locator;


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
            "getXOffset",
            "getYOffset",
            "setXOffset",
            "setYOffset",
            "getOriginLocator",
            "setOriginLocator",
            "resetOriginLocator"
        ];
    }

}
