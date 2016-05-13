/**
 * Created by Thundax on 31/07/2015.
 */
function MegamanStateHandler(megaman){

    var handler = this;
    var collisionQueue = [];
    var switchAnimation=false;
    var move=0;
    var jump = false;
    var needToFall=true;
    var fire=false;
    var states = {

        INIT:{

            treatCollision:function (collision){

                if (collision.getDirection() != Collision.directions.INSIDE){

                    if(collision.getDirection() == Collision.directions.DOWN){
                        needToFall = false;
                    }
                    // TODO Treat this stuff correctly
//                    console.log(collision);
                    if(collision.getParams().newY){

                        megaman.setY(collision.getParams().newY);
                        megaman.setDy(0);
                    }
                    if(collision.getParams().newX){
                        megaman.setX(collision.getParams().newX);
                        megaman.setDx(0);
                    }
                    states.STANDING.enterState();
                }
            },
            name:"INIT"
        },

        STANDING:{

            treatInput:function(input) {
                move = input.getMove();
                jump = input.isJumping();

                if(fire != input.isFiring()){
                    switchAnimation=true;
                }

                fire = input.isFiring();


                // Need to check to jump here
                if (jump) {
                    states.JUMPING.enterState();
                }

                // If input told us to move, we move
                if (move != 0) {
                    states.MOVING.enterState();
                }
            },

            treatCollision:function (collision){
  //              console.log(collision);
                if(collision.getDirection() == Collision.directions.DOWN){
                    needToFall = false;
                }
                if(collision.getParams().newY){
                    megaman.setY(collision.getParams().newY);
                    megaman.setDy(0);
                }
                if(collision.getParams().newX){
                    megaman.setX(collision.getParams().newX);
                    megaman.setDx(0);
                }
            },

            enterState:function (){
                // TODO Treat this stuff correctly
             //   console.log("ENTERING STANDING");
                switchAnimation=true;
                currentState = states.STANDING;

            },
            name:"STAND"
        },


        MOVING:{

            treatInput:function(input) {
               move = input.getMove();
               jump = input.isJumping();

                if(fire != input.isFiring()){
                    switchAnimation=true;
                }

                fire = input.isFiring();

                // Need to check to jump here
                if (jump) {
                    states.JUMPING.enterState();
                }
                // If input told us to stand, we stand
                else if (move == 0) {
                    states.STANDING.enterState();
                }
            },

            treatCollision:function (collision){
                if(collision.getDirection() == Collision.directions.DOWN){
                    needToFall = false;
                }
                if(collision.getParams().newY){
                    megaman.setY(collision.getParams().newY);
                    megaman.setDy(0);
                }
                if(collision.getParams().newX){
                    megaman.setX(collision.getParams().newX);
                    megaman.setDx(0);
                }
            },

            enterState:function (){
                // TODO Treat this stuff correctly
               // console.log("ENTERING MOVING");
                switchAnimation=true;
                currentState = states.MOVING;

            },

            getMove:function(){
                return move;
            },
            name:"MOVE"
        },
        FALLING: {

            treatInput:function(input) {
                move = input.getMove();

                if(fire != input.isFiring()){
                    switchAnimation=true;
                }

                fire = input.isFiring();

            },

            treatCollision: function (collision) {
                // TODO Treat this stuff correctly
                if (collision.getParams().newY) {
                    megaman.setY(collision.getParams().newY);
                    megaman.setDy(0);
                }
                if (collision.getParams().newX) {
                    megaman.setX(collision.getParams().newX);
                    megaman.setDx(0);
                }
                if(collision.getDirection() == Collision.directions.DOWN){
                    needToFall = false;
                    if (move != 0) {
                        states.MOVING.enterState();
                    } else {
                        states.STANDING.enterState();
                    }
                }

            },

            enterState: function () {
                // TODO Treat this stuff correctly
               // console.log("ENTERING FALLING");
                switchAnimation = true;
                currentState = states.FALLING;
            },

            getMove:function(){
                return move;
            },
            name: "FALL"
        },
        JUMPING:{

            treatInput:function(input) {
                move = input.getMove();

                if(fire != input.isFiring()){
                    switchAnimation=true;
                }

                fire = input.isFiring();
            },

            treatCollision:function (collision){
                needToFall = false;
                if(collision.getParams().newY){
                    megaman.setY(collision.getParams().newY);
                    megaman.setDy(0);
                }
                if(collision.getParams().newX){
                    megaman.setX(collision.getParams().newX);
                    megaman.setDx(0);
                }
            },

            enterState:function (){
                // TODO Treat this stuff correctly
               // console.log("ENTERING JUMPING");
                switchAnimation=true;
                currentState = states.JUMPING;
                megaman.setDy(-1600)

            },

            getMove:function(){
                return move;
            },

            tick:function(delta){
                if(megaman.getDy(delta) > 0){
                    states.FALLING.enterState();
                }
            },
            name:"JUMPING"
        }
    };
    var currentState = states.INIT;

    handler.addCollision = addCollision;
    handler.treatCollisions = treatCollisions;
    handler.treatInputs = treatInputs;
    handler.mustSwitchAnimation = mustSwitchAnimation;
    handler.isStanding = isStanding;
    handler.isInit = isInit;
    handler.isFalling = isFalling;
    handler.isJumping = isJumping;
    handler.isFiring = isFiring;
    handler.resetSwitchAnimation =resetSwitchAnimation;
    handler.getMove =getMove;
    handler.tick = tick;

    function addCollision(collision){
        collisionQueue[collisionQueue.length] = collision
    }

    function treatCollisions(){
        var cornerTopLeft = {
            borderXType : RectangularZoneLocator.borderXTypes.LEFT,
            borderYType : RectangularZoneLocator.borderYTypes.TOP
        };

        //if (megaman.getY(cornerTopLeft)<600){
        //    console.log("stateHandler.treatCollisisons");
        //    console.log(collisionQueue);
        //}

        needToFall = true;
        //TODO handle multiple collision at the same time
        for(var j =0 ; j < collisionQueue.length; j++) {
            // If collision is enemy or out of bound -> restart
            if(collisionQueue[j].getType() == Collision.types.ENEMY || collisionQueue[j].getType() == Collision.types.OUTOFBOUND || collisionQueue[j].getType() == Collision.types.BULLET){
                megaman.restartGame();
            }

            currentState.treatCollision(collisionQueue[j]);
        }
        //TODO
        if(needToFall && currentState != states.INIT &&  currentState != states.JUMPING && currentState != states.FALLING){
            states.FALLING.enterState();
        }
        // Reinit
        collisionQueue = [];
    }

    function treatInputs(){
        var input = megaman.getInput();
        if(currentState.treatInput){
            currentState.treatInput(input);
        }
    }

    function tick(delta){
        treatCollisions();
        if(currentState.tick){
            currentState.tick(delta);
        }
    }


    function mustSwitchAnimation(){
        return switchAnimation;
    }
    function resetSwitchAnimation(){
        switchAnimation = false;
    }

    function isStanding(){
        return currentState == states.STANDING;
    }

    function isInit(){
        return currentState == states.INIT;
    }

    function isFalling(){
        return currentState == states.FALLING;
    }

    function isJumping (){
        return currentState == states.JUMPING;
    }

    function isFiring(){
        return fire;
    }

    function getMove(){
        if(currentState.getMove){
            return currentState.getMove();
        }
        return 0;
    }
}