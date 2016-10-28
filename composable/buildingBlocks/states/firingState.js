/**
 * Created by Thundax on 13/05/2016.
 */

FiringState.prototype = new State();
FiringState.prototype.constructor = FiringState;

function FiringState(gameItem){

    State.call(this);
    var state = this;
    state.getMethodsToPullUp = getMethodsToPullUp;
    state.treatInputs=treatInputs;
    state.treatCollisions=treatCollisions;


    function treatInputs(input){
        this.setActive(input.isFiring());
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
