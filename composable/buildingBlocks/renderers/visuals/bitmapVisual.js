/**
 * Created by nd on 10/03/2016.
 */

BitmapVisual.prototype = new Visual();
BitmapVisual.prototype.constructor = BitmapVisual;

function BitmapVisual (parent,offsetX,offsetY,fileName,w,h) {

    if (offsetX != null && offsetY != null && w != null && h != null) {
        console.log("BitmapVisual() with full params");
        Visual.call(this, parent, offsetX, offsetY,fileName);

        var visual= this;

        visual.addComponent(new RectangularZoneLocator(visual, w,h)).doWiring();

        visual.getGraphicalElement = getGraphicalElement;
        visual.tick = tick;


        var shape=false;

        function tick(delta){
            if(shape){
                var cornerTopLeft = {
                    borderXType : RectangularZoneLocator.borderXTypes.LEFT,
                    borderYType : RectangularZoneLocator.borderYTypes.TOP
                }
                shape.x = visual.getX(cornerTopLeft);
                shape.y = visual.getY(cornerTopLeft);
            }
        }

        function getGraphicalElement(loader){

            if (!shape){
                var cornerTopLeft = {
                    borderXType : RectangularZoneLocator.borderXTypes.LEFT,
                    borderYType : RectangularZoneLocator.borderYTypes.TOP
                }
                shape = new createjs.Shape();
                var groundImg = loader.getResult(fileName);

                shape.graphics.beginBitmapFill(groundImg).drawRect(visual.getX(cornerTopLeft), visual.getY(cornerTopLeft), w, h);
            }

            return shape;
        }

    }
}