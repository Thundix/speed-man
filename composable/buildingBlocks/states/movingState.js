/**
 * Created by Thundax on 13/05/2016.
 */

MovingState.prototype = new State();
MovingState.prototype.constructor = MovingState;

function MovingState(){

    State.call(this);
    var state = this;
    var  move = 0;
    state.getMethodsToPullUp = getMethodsToPullUp;
    state.getMoveDirection=getMoveDirection;
    state.treatInputs=treatInputs;
    state.treatCollisions=treatCollisions;


    function getMoveDirection(){
        return move;
    }

    function treatInputs(){

    }

    function treatCollisions() {

    }



    function getMethodsToPullUp(){
        return [
            "getMoveDirection"
        ];
    }
}
