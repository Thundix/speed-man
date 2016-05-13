function RectangularCollider(gameItem){

    var collider= this;

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

    function getX() {
        return gameItem.getX();
    }

    function getY() {
        return gameItem.getY();
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
            var collisions = {

                up: checkUpCollision(secondCollider,delta,collisionType),
                down:  checkDownCollision(secondCollider,delta,collisionType),
                left: checkLeftCollision(secondCollider,delta,collisionType),
                right: checkRightCollision(secondCollider,delta,collisionType),
                inside: checkInsideCollision(secondCollider,delta,collisionType)

            };


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

        return (gameItem.getX() + Math.min(gameItem.getDx(delta),0) <= secondCollider.getX() + secondCollider.getWidth() + Math.max(0,secondCollider.getDx(delta)) &&
            gameItem.getX() + gameItem.getWidth() + Math.max(gameItem.getDx(delta),0) >= secondCollider.getX() + Math.min(0,secondCollider.getDx(delta)) &&
            gameItem.getY() + Math.min(gameItem.getDy(delta),0) <= secondCollider.getY() + secondCollider.getHeight() + Math.max(0,secondCollider.getDy(delta)) &&
            gameItem.getY() + gameItem.getHeight() + Math.max(gameItem.getDy(delta),0) >= secondCollider.getY() + Math.min(0,secondCollider.getDy(delta))
        );
    }


    function checkDownCollision(secondCollider,delta,collisionType){

        // Time of impact between left side of second colider
        var difDY  = gameItem.getDy(delta) - secondCollider.getDy(delta);
        var tyPu = (secondCollider.getY() - (gameItem.getY() + gameItem.getHeight())) / difDY;

        if(difDY <= 0 || tyPu < 0 || tyPu > 1 ){
            return null;
        }
        var xyPuGameItemL = gameItem.getX() + gameItem.getDx(delta)*tyPu;
        var xyPuSecondColliderL = secondCollider.getX() + secondCollider.getDx(delta)*tyPu;

        if(xyPuGameItemL + gameItem.getWidth() >= xyPuSecondColliderL && xyPuSecondColliderL + secondCollider.getWidth() >= xyPuGameItemL) {
            var params = {
                newY:secondCollider.getNextY(delta)-gameItem.getHeight(),
                time:tyPu
            };
            return new Collision(collisionType, Collision.directions.DOWN, params);
        }
        return null;
    }


    function checkUpCollision(secondCollider,delta,collisionType){

        // Time of impact between left side of second colider
        var difDY  = gameItem.getDy(delta) - secondCollider.getDy(delta);
        var tyPd = ((secondCollider.getY() + secondCollider.getHeight()) - gameItem.getY()) / difDY;

        if(difDY >= 0 || tyPd < 0 || tyPd > 1 ){
            return null;
        }
        var xyPdGameItemL = gameItem.getX() + gameItem.getDx(delta)*tyPd;
        var xyPdSecondColliderL = secondCollider.getX() + secondCollider.getDx(delta)*tyPd;

        if(xyPdGameItemL + gameItem.getWidth() >= xyPdSecondColliderL && xyPdSecondColliderL + secondCollider.getWidth() >= xyPdGameItemL) {
            var params = {
                newY: secondCollider.getNextY(delta) + secondCollider.getHeight(),
                time:tyPd
            };
            return new Collision(collisionType, Collision.directions.UP, params);
        }
        return null;
    }

    function checkRightCollision(secondCollider,delta,collisionType){

        // Time of impact between left side of second colider
        var difDX = gameItem.getDx(delta) - secondCollider.getDx(delta);
        var txPl = (secondCollider.getX() - (gameItem.getX() + gameItem.getWidth())) / difDX;

        if(difDX <= 0 || txPl < 0 || txPl > 1 ){

            return null;
        }


        // Top of megaman when impact with second collider
        var yxPlGameItemU = gameItem.getY() + gameItem.getDy(delta)*txPl;
        var yxPlSecondColliderU = secondCollider.getY() + secondCollider.getDy(delta)*txPl;

        if(yxPlGameItemU + gameItem.getHeight() >= yxPlSecondColliderU && yxPlSecondColliderU + secondCollider.getHeight() >= yxPlGameItemU){
            var params = {
                newX:secondCollider.getNextX(delta)-gameItem.getWidth(),
                time:txPl
            };
            return new Collision(collisionType,Collision.directions.RIGHT,params);
        }
         return null;
    }

    function checkInsideCollision(secondCollider,delta,collisionType) {

        if (gameItem.getX()  < secondCollider.getX() + secondCollider.getWidth() &&
            gameItem.getX() + gameItem.getWidth()  > secondCollider.getX() &&
            gameItem.getY()  < secondCollider.getY() + secondCollider.getHeight() &&
            gameItem.getY() + gameItem.getHeight() > secondCollider.getY()
            ){
            var params = {
                newY:secondCollider.getNextY(delta)-gameItem.getHeight(),
                time:0
            };
            return new Collision(collisionType, Collision.directions.INSIDE, params);
        }
        return null;

    }

        function checkLeftCollision(secondCollider,delta,collisionType) {

        // Time of impact between left side of second colider
        var difDX = gameItem.getDx(delta) - secondCollider.getDx(delta);
        var txPr = (secondCollider.getX()+ secondCollider.getWidth() - (gameItem.getX())) / difDX;

        if(difDX >= 0 || txPr < 0 || txPr > 1 ){

            return null;
        }


        // Top of megaman when impact with second collider
        var yxPrGameItemU = gameItem.getY() + gameItem.getDy(delta)*txPr;
        var yxPrSecondColliderU = secondCollider.getY() + secondCollider.getDy(delta)*txPr;


        if(yxPrGameItemU + gameItem.getHeight() >= yxPrSecondColliderU && yxPrSecondColliderU + secondCollider.getHeight() >= yxPrGameItemU){

            var params = {
                newX:secondCollider.getNextX(delta)+ secondCollider.getWidth(),
                time:txPr
            };
            return new Collision(collisionType,Collision.directions.LEFT,params);
        }
        return null;
    }


}