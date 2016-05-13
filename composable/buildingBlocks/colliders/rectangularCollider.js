/**
 * Created by nd on 16/03/2016.
 */

ComposableRectangularCollider.prototype = new ComposableCollider();
ComposableRectangularCollider.prototype.constructor = ComposableRectangularCollider;

function ComposableRectangularCollider (gameItem,offsetX,offsetY,w,h) {

    if (offsetX != null && offsetY != null && w != null && h != null ) {

        ComposableCollider.call(this, gameItem, offsetX, offsetY);


        var collider = this;

        var cornerTopLeft = {
            borderXType : RectangularZoneLocator.borderXTypes.LEFT,
            borderYType : RectangularZoneLocator.borderYTypes.TOP
        };


        collider.accept = accept;
        collider.visitRectangularCollider = visitRectangularCollider;


        collider.addComponent(new RectangularZoneLocator(collider,w,h)).doWiring();



        function accept(otherCollider,delta){
            var collisionType = otherCollider.canCollide(gameItem);
            if(collisionType){

                otherCollider.visitRectangularCollider(collider,delta,collisionType);
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

                console.log("ComposableRectangularCollider collisions");
                console.log(collisions);

                var collision = filterCollisions(collisions,secondCollider);
                if(collision){

                    gameItem.addCollision(collision);
                }
            }
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

            return (collider.getX(cornerTopLeft) + Math.min(collider.getDx(delta),0) <= secondCollider.getX(cornerTopLeft) + secondCollider.getWidth() + Math.max(0,secondCollider.getDx(delta)) &&
            collider.getX(cornerTopLeft) + collider.getWidth() + Math.max(collider.getDx(delta),0) >= secondCollider.getX(cornerTopLeft) + Math.min(0,secondCollider.getDx(delta)) &&
            collider.getY(cornerTopLeft) + Math.min(collider.getDy(delta),0) <= secondCollider.getY(cornerTopLeft) + secondCollider.getHeight() + Math.max(0,secondCollider.getDy(delta)) &&
            collider.getY(cornerTopLeft) + collider.getHeight() + Math.max(collider.getDy(delta),0) >= secondCollider.getY(cornerTopLeft) + Math.min(0,secondCollider.getDy(delta))
            );
        }


        function checkDownCollision(secondCollider,delta,collisionType){

            // Time of impact between left side of second colider
            var difDY  = collider.getDy(delta) - secondCollider.getDy(delta);
            var tyPu = (secondCollider.getY(cornerTopLeft) - (collider.getY(cornerTopLeft) + collider.getHeight())) / difDY;


            if(difDY <= 0 || tyPu < 0 || tyPu > 1 ){
                return null;
            }
            var xyPuGameItemL = collider.getX(cornerTopLeft) + collider.getDx(delta)*tyPu;
            var xyPuSecondColliderL = secondCollider.getX(cornerTopLeft) + secondCollider.getDx(delta)*tyPu;

            if(xyPuGameItemL + collider.getWidth() >= xyPuSecondColliderL && xyPuSecondColliderL + secondCollider.getWidth() >= xyPuGameItemL) {
                var params = {
                    newY:secondCollider.getNextY(delta)-collider.getHeight(),
                    time:tyPu
                };
                return new Collision(collisionType, Collision.directions.DOWN, params);
            }
            return null;
        }


        function checkUpCollision(secondCollider,delta,collisionType){

            // Time of impact between left side of second colider
            var difDY  = collider.getDy(delta) - secondCollider.getDy(delta);
            var tyPd = ((secondCollider.getY(cornerTopLeft) + secondCollider.getHeight()) - collider.getY(cornerTopLeft)) / difDY;

            if(difDY >= 0 || tyPd < 0 || tyPd > 1 ){
                return null;
            }
            var xyPdGameItemL = collider.getX(cornerTopLeft) + collider.getDx(delta)*tyPd;
            var xyPdSecondColliderL = secondCollider.getX(cornerTopLeft) + secondCollider.getDx(delta)*tyPd;

            if(xyPdGameItemL + collider.getWidth() >= xyPdSecondColliderL && xyPdSecondColliderL + secondCollider.getWidth() >= xyPdGameItemL) {
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
            var difDX = collider.getDx(delta) - secondCollider.getDx(delta);
            var txPl = (secondCollider.getX(cornerTopLeft) - (collider.getX(cornerTopLeft) + collider.getWidth())) / difDX;

            if(difDX <= 0 || txPl < 0 || txPl > 1 ){

                return null;
            }


            // Top of megaman when impact with second collider
            var yxPlGameItemU = collider.getY(cornerTopLeft) + collider.getDy(delta)*txPl;
            var yxPlSecondColliderU = secondCollider.getY(cornerTopLeft) + secondCollider.getDy(delta)*txPl;

            if(yxPlGameItemU + collider.getHeight() >= yxPlSecondColliderU && yxPlSecondColliderU + secondCollider.getHeight() >= yxPlGameItemU){
                var params = {
                    newX:secondCollider.getNextX(delta)-collider.getWidth(),
                    time:txPl
                };
                return new Collision(collisionType,Collision.directions.RIGHT,params);
            }
            return null;
        }



        function checkLeftCollision(secondCollider,delta,collisionType) {

            // Time of impact between left side of second colider
            var difDX = collider.getDx(delta) - secondCollider.getDx(delta);
            var txPr = (secondCollider.getX(cornerTopLeft)+ secondCollider.getWidth() - (collider.getX(cornerTopLeft))) / difDX;

            if(difDX >= 0 || txPr < 0 || txPr > 1 ){

                return null;
            }


            // Top of megaman when impact with second collider
            var yxPrGameItemU = collider.getY(cornerTopLeft) + collider.getDy(delta)*txPr;
            var yxPrSecondColliderU = secondCollider.getY(cornerTopLeft) + secondCollider.getDy(delta)*txPr;


            if(yxPrGameItemU + collider.getHeight() >= yxPrSecondColliderU && yxPrSecondColliderU + secondCollider.getHeight() >= yxPrGameItemU){

                var params = {
                    newX:secondCollider.getNextX(delta)+ secondCollider.getWidth(),
                    time:txPr
                };
                return new Collision(collisionType,Collision.directions.LEFT,params);
            }
            return null;
        }


        function checkInsideCollision(secondCollider,delta,collisionType) {

            if (collider.getX(cornerTopLeft)  < secondCollider.getX(cornerTopLeft) + secondCollider.getWidth() &&
                collider.getX(cornerTopLeft) + collider.getWidth()  > secondCollider.getX(cornerTopLeft) &&
                collider.getY(cornerTopLeft)  > secondCollider.getY(cornerTopLeft) + secondCollider.getHeight() &&
                collider.getY(cornerTopLeft) + collider.getHeight() < secondCollider.getY(cornerTopLeft)
            ){
                var params = {
                    newY:secondCollider.getNextY(delta)-collider.getHeight(),
                    time:0
                };
                return new Collision(collisionType, Collision.directions.INSIDE, params);
            }
            return null;

        }


    }
}
