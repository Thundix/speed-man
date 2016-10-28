/**
 * Created by Thundax on 13/05/2016.
 */

FallingState.prototype = new State();
FallingState.prototype.constructor = FallingState;

function FallingState(gameItem){

    State.call(this);
    var state = this;
    state.getMethodsToPullUp = getMethodsToPullUp;
    state.treatInputs=treatInputs;
    state.treatCollisions=treatCollisions;


    function treatInputs(){
        if( gameItem.getDy() >0){
            state.setActive(true);
        }
    }

    function treatCollisions(collision) {

        if(collision.getDirection() == Collision.directions.DOWN) {
            state.setActive(false);
            if(collision.getParams().newY){
                gameItem.setY(collision.getParams().newY);
                gameItem.setDy(0);
            }
        }
    }
}
