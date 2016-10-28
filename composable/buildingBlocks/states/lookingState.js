/**
 * Created by Thundax on 13/05/2016.
 */

LookingState.prototype = new State();
LookingState.prototype.constructor = LookingState;

function LookingState(){

    State.call(this);
    this.setActive(true);
    var state = this;
    var look = 1;
    state.getMethodsToPullUp = getMethodsToPullUp;
    state.getLookDirection=getLookDirection;
    state.treatInputs=treatInputs;
    state.treatCollisions=treatCollisions;


    function getLookDirection(){
        return look;
    }

    function treatInputs(input){

        if(input.getMove() != 0){
            look = input.getMove();
        }
    }

    function treatCollisions(collision) {

    }



    function getMethodsToPullUp(){
        return [
            "getMoveDirection"
        ];
    }
}
