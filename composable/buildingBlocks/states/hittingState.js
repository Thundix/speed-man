/**
 * Created by Thundax on 13/05/2016.
 */

HittingState.prototype = new State();
HittingState.prototype.constructor = HittingState;

function HittingState(gameItem){

    State.call(this);
    var state = this;
    state.getMethodsToPullUp = getMethodsToPullUp;
    state.treatInputs=treatInputs;
    state.treatCollisions=treatCollisions;


    function treatInputs(input){

    }

    function treatCollisions(collision) {

        if(collision.Type() == Collision.directions.DOWN){
            state.setActive(true);

            if(collision.getParams().newY){
                gameItem.setY(collision.getParams().newY);
                gameItem.setDy(0);
            }
        }
    }
}
