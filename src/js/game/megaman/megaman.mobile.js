/**
 * Created by Thundax on 28/07/2015.
 */
function MegamanMobile(megaman){

    var mobile = this;
    var dX=0;
    var dY=0;
    var aY=GRAVITY;

    mobile.computeNextPosition = computeNextPosition;
    mobile.tick = tick;
    mobile.getNextX = getNextX;
    mobile.getNextY = getNextY;
    mobile.setDx = setDx;
    mobile.setDy = setDy;
    mobile.getDx = getDx;
    mobile.getDy = getDy;


    function computeNextPosition(delta){

        // TODO Handle Jumping
        //currentState.tick(delta);
        dY += aY*delta;
        if(dY >= MEGAMAN_DY_MAX){
            dY = MEGAMAN_DY_MAX;
        }
        //console.log(dY);
        dX = megaman.getMove()*MEGAMAN_DX*delta;
    }

    function tick(delta){
        //console.log("megaman.mobile.tick");

        megaman.setX( megaman.getX() + dX*delta);
        megaman.setY( megaman.getY() + dY*delta);


    }

    function getNextX(delta){
        return megaman.getX() + dX*delta;
    }

    function getNextY(delta){
        return megaman.getY() + dY*delta;
    }

    function setDx(newDx){
        dX = newDx;
    }

    function setDy(newDy){
        dY = newDy;
    }

    function getDx(delta){
        return dX*delta;
    }

    function getDy(delta){
       return dY*delta;
    }
}