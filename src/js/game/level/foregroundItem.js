function ForegroundItem(x,y,w,h,imageName,name){
    var item = this;

    item.getRenderer = getRenderer;
    item.getCollider = getCollider;

    var renderer = new ForegroundRenderer(x,y,w,h,imageName);
    var collider = new RectangularCollider(item);
    var name1 = name;
    item.getName = getName;
    item.getX = renderer.getX;
    item.getY = renderer.getY;
    item.getWidth = renderer.getWidth;
    item.getHeight = renderer.getHeight;
    item.getNextX = getNextX;
    item.getNextY = getNextY;
    item.getDx = getDx;
    item.getDy = getDy;


    item.treatCollisions = function(){};
    item.canCollide = canCollide ;

    function getRenderer(){
        return renderer;
    }

    function getCollider(){
        return collider;
    }

    function getName(){
        return name1;
    }

    function canCollide(secondGameitem){

        if (secondGameitem.canCollideForegroundItem){
            return secondGameitem.canCollideForegroundItem(item);
        }
        return false;
    }

    function getNextX(delta){
        return x;
    }

    function getNextY(delta){
        return y;
    }

    function getDx(delta){
        return 0;
    }

    function getDy(delta){
        return 0;
    }

    /*internal class*/
    function ForegroundRenderer(x,y,w,h,imageName){

        var foregroundRenderer = this;
        foregroundRenderer.getGraphicalElement = getGraphicalElement;
        foregroundRenderer.getX = getX;
        foregroundRenderer.getY = getY;
        foregroundRenderer.getWidth = getWidth;
        foregroundRenderer.getHeight = getHeight;
        foregroundRenderer.tick = tick;

        var shape = new createjs.Shape();

        function getGraphicalElement(loader){

            var groundImg = loader.getResult(imageName);
            shape.graphics.beginBitmapFill(groundImg).drawRect(x, y, w, h);

            return shape;
        }
        function tick(delta){

        }
        function getX(){
            return x;
        }

        function getY(){
            return y;
        }



        function getHeight(){
            return h;
        }
        function getWidth(){
            return w;
        }
    }

}