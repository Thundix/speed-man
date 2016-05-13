/**
 * Created by nd on 10/03/2016.
 */

Platform.prototype = new GameItem();
Platform.prototype.constructor = Platform;

function Platform (x,y,w,h,fileName) {

    if (x != null && y != null && w != null && h != null) {

        GameItem.call(this, x, y);


        var platform = this;


        var collider = new ComposableRectangularCollider(platform,0,0,w,h);



        var renderer = new Renderer(platform,0,0);
        renderer.addComponent(new BitmapVisual(renderer,0,0,fileName,w,h)).doWiring();


        platform
            .addComponent(collider)
            .addComponent(renderer)
            .doWiring();





        platform.canCollide = canCollide;

        function canCollide(secondGameitem){
            if (secondGameitem.canCollideForegroundItem){
                return secondGameitem.canCollideForegroundItem(platform);
            }
            return false;
        }
    }
}