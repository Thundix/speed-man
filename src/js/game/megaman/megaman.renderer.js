/**
 * Created by Thundax on 28/07/2015.
 */
function MegamanRenderer(megaman){

    var megamanRenderer = this;

    megamanRenderer.getGraphicalElement = getGraphicalElement;
    megamanRenderer.setX = setX;
    megamanRenderer.setY = setY;
    megamanRenderer.getX = getX;
    megamanRenderer.getY = getY;
    megamanRenderer.getWidth = getWidth;
    megamanRenderer.getHeight = getHeight;
    megamanRenderer.getScaleX = getScaleX;
    megamanRenderer.tick = tick;

    var sheetName="spriteSheetMegaman";
    var animationArray = {
        init:[1,1],
        init_down:[2,7,"stand"],
        stand:[15,15],
        move:[32,39,'move2'],
        move2:[40,42,'move'],
        jump_up:[56,59,"jump_stand"],
        jump_stand:[59,59,"jump_stand"],
        jump_down:[59,62,"stand"],
        fire:[48,55,'fire'],
        fire_jump:[67,67,"fire_jump"],
        fire_stand:[16,16,"fire_stand"],
        hit:[27,28,"hit"]
    };
    var sprite;

    var x=0;
    var y=0;
    var h=100;
    var w=100;

    function getGraphicalElement(loader){
        if(!sprite) {
            var data = new createjs.SpriteSheet({
                "images": [loader.getResult(sheetName)],
                "frames": {width: w, height: h},
                "animations": animationArray
            });
            sprite = new createjs.Sprite(data);
            sprite.gotoAndPlay("init");
            sprite.framerate = 36;
        }
            return sprite;
    }
    function tick(delta){

        sprite.scaleX = (megaman.getMove() != 0 ? megaman.getMove() :  sprite.scaleX);
        sprite.x = x + ((sprite.scaleX) < 0 ? w : 0);
        sprite.y = y;
        renderState();

     }

    function renderState(){
        if(megaman.mustSwitchAnimation()){
            if (megaman.isInit()){
                sprite.gotoAndPlay("init");
            }
            if (megaman.getMove() != 0 ){
                if(megaman.isFiring()){
                    sprite.gotoAndPlay("fire");
                }else {
                    sprite.gotoAndPlay("move");
                }
            }
            if (megaman.isStanding()){
                if(megaman.isFiring()){
                    sprite.gotoAndPlay("fire_stand");
                }else {
                    sprite.gotoAndPlay("stand");
                }
            }
            if (megaman.isJumping()){
                if(megaman.isFiring()) {
                    sprite.gotoAndPlay("fire_jump");
                }else {
                    sprite.gotoAndPlay("jump_up");
                }
            }
            if (megaman.isFalling()){
                if(megaman.isFiring()) {
                    sprite.gotoAndPlay("fire_jump");
                }else {
                    sprite.gotoAndPlay("jump_stand");
                }
            }
            megaman.resetSwitchAnimation();
        }
    }


    function setX(newX){

        x=newX-20;
    }

    function setY(newY){
        //if (newY<600){
        //    console.log("megaman.renderer.setY");
        //    console.log(newY);
        //}
        y=newY;
    }

    function getX(){
        return x+20;
    }

    function getY(){
        return y;
    }
    function getHeight(){
        return h-5;
    }
    function getWidth(){
        return w-40;
    }

    function getScaleX(){
        return sprite.scaleX;
    }
}