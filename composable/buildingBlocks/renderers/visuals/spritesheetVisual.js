/**
 * Created by nd on 10/03/2016.
 */

SpritesheetVisual.prototype = new Visual();
SpritesheetVisual.prototype.constructor = SpritesheetVisual;

function SpritesheetVisual(parent,offsetX,offsetY,fileName,w,h,animationArray,frameRate) {

    if (offsetX != null && offsetY != null && w != null && h != null) {
        console.log("SpritesheetVisual() with full params");
        Visual.call(this, parent, offsetX, offsetY,fileName);

        var visual= this;

        visual.addComponent(new RectangularZoneLocator(visual, w,h)).doWiring();

        visual.getGraphicalElement = getGraphicalElement;
        visual.tick = tick;


        var sprite=false;

        function tick(delta){
            if(sprite){
                var cornerTopLeft = {
                    borderXType : RectangularZoneLocator.borderXTypes.LEFT,
                    borderYType : RectangularZoneLocator.borderYTypes.TOP
                }
                sprite.x = visual.getX(cornerTopLeft);
                sprite.y = visual.getY(cornerTopLeft);
            }
        }

        function getGraphicalElement(loader){
            if(!sprite) {
                var data = new createjs.SpriteSheet({
                    "images": [loader.getResult(fileName)],
                    "frames": {width: w, height: h},
                    "animations": animationArray
                });
                sprite = new createjs.Sprite(data);
                sprite.framerate = frameRate;
            }
            return sprite;
        }



    }
}