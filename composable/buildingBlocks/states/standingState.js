/**
 * Created by Thundax on 13/05/2016.
 */

StandingState.prototype = new State();
StandingState.prototype.constructor = StandingState;

function StandingState(gameItem){

    State.call(this);
    var state = this;
    state.getMethodsToPullUp = getMethodsToPullUp;
    state.treatInputs=treatInputs;
    state.treatCollisions=treatCollisions;


    function treatInputs(input){
        if(input.isJumping() || gameItem.getDy() != 0){
            state.setActive(false);
        }
    }

    function treatCollisions(collision) {

        if(collision.getDirection() == Collision.directions.DOWN){
            state.setActive(true);

            if(collision.getParams().newY){
                gameItem.setY(collision.getParams().newY);
                gameItem.setDy(0);
            }
        }
    }
}
