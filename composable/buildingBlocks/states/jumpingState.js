/**
 * Created by Thundax on 13/05/2016.
 */

JumpingState.prototype = new State();
JumpingState.prototype.constructor = JumpingState;

function JumpingState(gameItem){

    State.call(this);
    var state = this;
    state.getMethodsToPullUp = getMethodsToPullUp;
    state.treatInputs=treatInputs;
    state.treatCollisions=treatCollisions;


    function treatInputs(input){
        //TODO change setDy -> getImpulse from game item
        if(input.isJumping() && !state.isActive() && gameItem.getDy() <= 0){
            state.setActive(true);
            gameItem.setDy(-1600);
        }

        if( gameItem.getDy() > 0){
            state.setActive(false);
        }

    }

    function treatCollisions(collision) {

        if(collision.getDirection() == Collision.directions.UP ){
            state.setActive(false);

            if(collision.getParams().newY){
                gameItem.setY(collision.getParams().newY);
                gameItem.setDy(0);
            }
        }
    }
}
