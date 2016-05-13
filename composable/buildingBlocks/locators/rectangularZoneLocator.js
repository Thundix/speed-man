/**
 * Created by nd on 8/03/2016.
 */


RectangularZoneLocator.borderXTypes = {
    LEFT : -1,
    CENTER : 0,
    RIGHT : 1
};
RectangularZoneLocator.borderYTypes={
    TOP : -1,
    CENTER : 0,
    BOTTOM : 1
};

/***
 *
 * @param parent
 * @param w
 * @param h
 * @param originLocator
 * @constructor
 */
function RectangularZoneLocator (parent,w,h,originLocator) {

    if (w != null && h != null){


        var zone = this;



        zone.getX = getX;
        zone.setX = setX;
        zone.getY = getY;
        zone.setY = setY;

        zone.getWidth = getWidth;
        zone.setWidth = setWidth;
        zone.getHeight = getHeight;
        zone.setHeight = setHeight;

        zone.getOriginLocator = getOriginLocator;
        zone.setOriginLocator = setOriginLocator;

        zone.addToComposable = addToComposable;
        zone.getMethodsToPullUp = getMethodsToPullUp;



        function getX(calculationModes){
            if (!originLocator){
                return false;
            }
            /*
             var newCalculationModes = {};
             for (var calcMode in calculationModes){
             if (calculationModes[calcMode]){
             newCalculationModes[calcMode] = calculationModes[calcMode];
             }
             }
             if (newCalculationModes["borderXTypes"]){
             newCalculationModes["borderXTypes"] = 0;
             }
             */

            var borderType = 0;
            if (calculationModes && calculationModes.borderXType){
                borderType = calculationModes.borderXType;
            }
            return originLocator.getX(calculationModes) + borderType*w/2;
        }
        function setX(xParam,calculationModes){
            if (!originLocator){
                return false;
            }
            /*
             var newCalculationModes = {};
             for (var calcMode in calculationModes){
             if (calculationModes[calcMode]){
             newCalculationModes[calcMode] = calculationModes[calcMode];
             }
             }
             if (newCalculationModes["borderXTypes"]){
             newCalculationModes["borderXTypes"] = 0;
             }
             */

            var borderType = 0;
            if (calculationModes && calculationModes.borderXType){
                borderType = calculationModes.borderXType;
            }

            originLocator.setX(xParam - borderType*w/2,calculationModes);
            return true;
        }

        function getY(calculationModes){
            if (!originLocator){
                return false;
            }
            /*
             var newCalculationModes = {};
             for (var calcMode in calculationModes){
             if (calculationModes[calcMode]){
             newCalculationModes[calcMode] = calculationModes[calcMode];
             }
             }
             if (newCalculationModes["borderYTypes"]){
             newCalculationModes["borderYTypes"] = 0;
             }
             */

            var borderType = 0;
            if (calculationModes && calculationModes.borderYType){
                borderType = calculationModes.borderYType;
            }

            return originLocator.getY(calculationModes) + h*borderType/2;
        }

        function setY(yParam,calculationModes){
            if (!originLocator){
                return false;
            }
            /*
             var newCalculationModes = {};
             for (var calcMode in calculationModes){
             if (calculationModes[calcMode]){
             newCalculationModes[calcMode] = calculationModes[calcMode];
             }
             }
             if (newCalculationModes["borderYTypes"]){
             newCalculationModes["borderYTypes"] = 0;
             }
             */

            var borderType = 0;
            if (calculationModes && calculationModes.borderYType){
                borderType = calculationModes.borderYType;
            }

            originLocator.setY(yParam - h*borderType/2,calculationModes);
            return true;
        }

        function getWidth() {
            return w;
        }
        function setWidth(wParam) {
            w = wParam;
        }

        function getHeight() {
            return h;
        }
        function setHeight(hParam) {
            h = hParam;
        }

        function getOriginLocator () {
            return originLocator;
        }

        function setOriginLocator (locator) {

            originLocator = locator;

        }


        function addToComposable(composable){
            if (composable.addLocator){
                composable.addLocator(zone);
            }
        }

        function getMethodsToPullUp(){
            return [
                "getX",
                "getY",
                "setX",
                "setY",
                "getWidth",
                "getHeight",
                "setWidth",
                "setHeight"
            ];
        }
    }

}