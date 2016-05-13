function RectangularCollider(gameItem){

    var collider= this;

    var cornerTopLeft = {
        borderXType : RectangularZoneLocator.borderXTypes.LEFT,
        borderYType : RectangularZoneLocator.borderYTypes.TOP
    };

    collider.accept = accept;
    collider.visitRectangularCollider = visitRectangularCollider;
    collider.canCollide = canCollide;
    collider.getX = getX;
    collider.getY = getY;
    collider.getDx = getDx;
    collider.getDy = getDy;
    collider.getNextX = getNextX;
    collider.getNextY = getNextY;
    collider.getWidth = getWidth;
    collider.getHeight = getHeight;
    collider.treatCollisions = treatCollisions;
    collider.getName = gameItem.getName;

    function  treatCollisions(){
        gameItem.treatCollisions();
    }

    function getNextX(delta) {
        return gameItem.getNextX(delta);
    }

    function getNextY(delta) {
        return gameItem.getNextY(delta);
    }

    function getX(calcmodes) {
        return gameItem.getX(calcmodes);
    }

    function getY(calcmodes) {
        return gameItem.getY(calcmodes);
    }

    function getDx(delta) {
        return gameItem.getDx(delta);
    }

    function getDy(delta) {
        return gameItem.getDy(delta);
    }


    function getWidth() {
        return gameItem.getWidth();
    }

    function getHeight() {
        return gameItem.getHeight();
    }



    function accept(secondCollider,delta){
        var collisionType = secondCollider.canCollide(gameItem);
        if(collisionType){
            secondCollider.visitRectangularCollider(collider,delta,collisionType);
        }
    }

    function visitRectangularCollider(secondCollider,delta,collisionType){
        if(detectPossibleCollisions(secondCollider,delta)) {
//            console.log("possible");
            var collisions = {

                up: checkUpCollision(secondCollider,delta,collisionType),
                down: checkDownCollision(secondCollider,delta,collisionType),
                left: checkLeftCollision(secondCollider,delta,collisionType),
                right: checkRightCollision(secondCollider,delta,collisionType),
                inside: checkInsideCollision(secondCollider,delta,collisionType)

            };


            if (gameItem.getY(cornerTopLeft)<600){

               // console.log(collisions);
                //console.log( gameItem.getHeight());
                //console.log("possible");
                //console.log("gameItem.top : " + (gameItem.getY(cornerTopLeft) + Math.min(gameItem.getDy(delta),0) ));
                //console.log("<=");
                //console.log("secondCollider.bottom : " + (secondCollider.getY(cornerTopLeft) + secondCollider.getHeight() + Math.max(0,secondCollider.getDy(delta))));
                //console.log("-------------");
                //console.log("gameItem.bottom : " +(gameItem.getY(cornerTopLeft) + gameItem.getHeight() + Math.max(gameItem.getDy(delta),0)));
                //console.log(">=");
                //console.log("secondCollider.top : " + (secondCollider.getY(cornerTopLeft) + Math.min(0,secondCollider.getDy(delta))));
            }
            var collision = filterCollisions(collisions,secondCollider);
            if(collision){


                gameItem.addCollision(collision);
            }
        }
    }

    function canCollide(secondGameitem){
        return secondGameitem.canCollide(gameItem)
    }

    function filterCollisions(collisions,secondCollider) {

        var min = 1;
        var minKey ='';
        for (var key in collisions){



            if (collisions[key] && collisions[key].params.time < min){

                min = collisions[key].params.time;
                minKey = key;
            }
        }

        return collisions[minKey];
    }



    function detectPossibleCollisions(secondCollider,delta){



        /*
        * no collision ==
        *   gameItem.left > (is more on the right than) secondCollider.right
        *   OR gameItem.right < (is more on the left than) secondCollider.left
        *   OR gameItem.top > (is lower than) secondCollider.bottom
        *   OR gameItem.bottom < (is higher than) secondCollider.top
        *
        * collision ==
        *   gameItem.left <= (is more on the left than) secondCollider.right
        *   AND gameItem.right >=(is on more the right than) secondCollider.left
        *   AND gameItem.top <= (is higher than) secondCollider.bottom
        *   AND gameItem.bottom (is lower than) >= secondCollider.top
        * */

        return (gameItem.getX(cornerTopLeft) + Math.min(gameItem.getDx(delta),0) <= secondCollider.getX(cornerTopLeft) + secondCollider.getWidth() + Math.max(0,secondCollider.getDx(delta)) &&
            gameItem.getX(cornerTopLeft) + gameItem.getWidth() + Math.max(gameItem.getDx(delta),0) >= secondCollider.getX(cornerTopLeft) + Math.min(0,secondCollider.getDx(delta)) &&
            gameItem.getY(cornerTopLeft) + Math.min(gameItem.getDy(delta),0) <= secondCollider.getY(cornerTopLeft) + secondCollider.getHeight() + Math.max(0,secondCollider.getDy(delta)) &&
            gameItem.getY(cornerTopLeft) + gameItem.getHeight() + Math.max(gameItem.getDy(delta),0) >= secondCollider.getY(cornerTopLeft) + Math.min(0,secondCollider.getDy(delta))
        );
    }


    function checkDownCollision(secondCollider,delta,collisionType){

        // Time of impact between left side of second colider
        var difDY  = gameItem.getDy(delta) - secondCollider.getDy(delta);
        var tyPu = (secondCollider.getY(cornerTopLeft) - (gameItem.getY(cornerTopLeft) + gameItem.getHeight())) / difDY;

        //console.log(difDY);
        //console.log(secondCollider.getY(cornerTopLeft));
        //console.log(gameItem.getY(cornerTopLeft));
        //console.log(tyPu);
        if(difDY <= 0 || tyPu < 0 || tyPu > 1 ){
            return null;
        }
        var xyPuGameItemL = gameItem.getX(cornerTopLeft) + gameItem.getDx(delta)*tyPu;
        var xyPuSecondColliderL = secondCollider.getX(cornerTopLeft) + secondCollider.getDx(delta)*tyPu;

//        console.log(secondCollider.getNextY(delta)-gameItem.getHeight());
        if(xyPuGameItemL + gameItem.getWidth() >= xyPuSecondColliderL && xyPuSecondColliderL + secondCollider.getWidth() >= xyPuGameItemL) {
            var params = {
                newY:secondCollider.getNextY(delta)-gameItem.getHeight(),
                time:tyPu,
                direction:Collision.directions.DOWN,
                item:secondCollider
            };
            return new Collision(collisionType, Collision.directions.DOWN, params);
        }
        return null;
    }


    function checkUpCollision(secondCollider,delta,collisionType){

        // Time of impact between left side of second colider
        var difDY  = gameItem.getDy(delta) - secondCollider.getDy(delta);
        var tyPd = ((secondCollider.getY(cornerTopLeft) + secondCollider.getHeight()) - gameItem.getY(cornerTopLeft)) / difDY;

        if(difDY >= 0 || tyPd < 0 || tyPd > 1 ){
            return null;
        }
        var xyPdGameItemL = gameItem.getX(cornerTopLeft) + gameItem.getDx(delta)*tyPd;
        var xyPdSecondColliderL = secondCollider.getX(cornerTopLeft) + secondCollider.getDx(delta)*tyPd;

        if(xyPdGameItemL + gameItem.getWidth() >= xyPdSecondColliderL && xyPdSecondColliderL + secondCollider.getWidth() >= xyPdGameItemL) {
            var params = {
                newY: secondCollider.getNextY(delta) + secondCollider.getHeight(),
                time:tyPd,
                direction:Collision.directions.UP
            };
            return new Collision(collisionType, Collision.directions.UP, params);
        }
        return null;
    }

    function checkRightCollision(secondCollider,delta,collisionType){

        // Time of impact between left side of second colider
        var difDX = gameItem.getDx(delta) - secondCollider.getDx(delta);
        var txPl = (secondCollider.getX(cornerTopLeft) - (gameItem.getX(cornerTopLeft) + gameItem.getWidth())) / difDX;

        if(difDX <= 0 || txPl < 0 || txPl > 1 ){

            return null;
        }


        // Top of megaman when impact with second collider
        var yxPlGameItemU = gameItem.getY(cornerTopLeft) + gameItem.getDy(delta)*txPl;
        var yxPlSecondColliderU = secondCollider.getY(cornerTopLeft) + secondCollider.getDy(delta)*txPl;

        if(yxPlGameItemU + gameItem.getHeight() >= yxPlSecondColliderU && yxPlSecondColliderU + secondCollider.getHeight() >= yxPlGameItemU){
            var params = {
                newX:secondCollider.getNextX(delta)-gameItem.getWidth(),
                time:txPl,
                direction:Collision.directions.RIGHT
            };
            return new Collision(collisionType,Collision.directions.RIGHT,params);
        }
         return null;
    }



    function checkLeftCollision(secondCollider,delta,collisionType) {

        // Time of impact between left side of second colider
        var difDX = gameItem.getDx(delta) - secondCollider.getDx(delta);
        var txPr = (secondCollider.getX(cornerTopLeft)+ secondCollider.getWidth() - (gameItem.getX(cornerTopLeft))) / difDX;

        if(difDX >= 0 || txPr < 0 || txPr > 1 ){

            return null;
        }


        // Top of megaman when impact with second collider
        var yxPrGameItemU = gameItem.getY(cornerTopLeft) + gameItem.getDy(delta)*txPr;
        var yxPrSecondColliderU = secondCollider.getY(cornerTopLeft) + secondCollider.getDy(delta)*txPr;


        if(yxPrGameItemU + gameItem.getHeight() >= yxPrSecondColliderU && yxPrSecondColliderU + secondCollider.getHeight() >= yxPrGameItemU){

            var params = {
                newX:secondCollider.getNextX(delta)+ secondCollider.getWidth(),
                time:txPr,
                direction:Collision.directions.LEFT
            };
            return new Collision(collisionType,Collision.directions.LEFT,params);
        }
        return null;
    }

    function checkInsideCollision(secondCollider,delta,collisionType) {


        if (gameItem.getX(cornerTopLeft)  < secondCollider.getX(cornerTopLeft) + secondCollider.getWidth() &&
            gameItem.getX(cornerTopLeft) + gameItem.getWidth()  > secondCollider.getX(cornerTopLeft) &&
            gameItem.getY(cornerTopLeft)  < secondCollider.getY(cornerTopLeft) + secondCollider.getHeight() &&
            gameItem.getY(cornerTopLeft) + gameItem.getHeight() > secondCollider.getY(cornerTopLeft)
        ){
            var params = {
                newY:secondCollider.getNextY(delta)-gameItem.getHeight(),
                time:1
//                "01-gameItem.Left":gameItem.getX(cornerTopLeft),
//                "02-secondCollider.Right":secondCollider.getX(cornerTopLeft) + secondCollider.getWidth(),
//                "03-gameItem.Left<secondCollider.Right":gameItem.getX(cornerTopLeft)  < secondCollider.getX(cornerTopLeft) + secondCollider.getWidth(),
//                "04-gameItem.Right":gameItem.getX(cornerTopLeft)+ gameItem.getWidth(),
//                "05-secondCollider.Left":secondCollider.getX(cornerTopLeft),
//                "06-gameItem.Right>secondCollider.Left":gameItem.getX(cornerTopLeft) + gameItem.getWidth()  > secondCollider.getX(cornerTopLeft),
//                "07-gameItem.Top":gameItem.getY(cornerTopLeft),
//                "08-secondCollider.Bottom":secondCollider.getY(cornerTopLeft) + secondCollider.getHeight(),
//                "09-gameItem.Top<secondCollider.Bottom":gameItem.getY(cornerTopLeft)  < secondCollider.getY(cornerTopLeft) + secondCollider.getHeight(),
//                "10-gameItem.Bottom":gameItem.getY(cornerTopLeft) + gameItem.getHeight(),
//                "11-secondCollider.Top":secondCollider.getY(cornerTopLeft),
//                "12-gameItem.Bottom>secondCollider.Top":gameItem.getY(cornerTopLeft) + gameItem.getHeight() > secondCollider.getY(cornerTopLeft)
            };
            return new Collision(collisionType, Collision.directions.INSIDE, params);
        }
        return null;

    }


}