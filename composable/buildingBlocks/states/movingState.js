/**
 * Created by Thundax on 13/05/2016.
 */

MovingState.prototype = new State();
MovingState.prototype.constructor = MovingState;

function MovingState(gameItem){

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

    function treatInputs(input){
       move = input.getMove();
        if( move==0 ){
            this.setActive(false);
        }
        else {
            this.setActive(true);
        }
    }

    function treatCollisions(collision) {

        if(collision.getDirection() == Collision.directions.RIGHT || collision.getDirection() == Collision.directions.LEFT) {
            if (collision.getParams().newX) {
                gameItem.setX(collision.getParams().newX);
                gameItem.setDx(0);
            }
        }
    }



    function getMethodsToPullUp(){
        return [
            "getMoveDirection"
        ];
    }
}
