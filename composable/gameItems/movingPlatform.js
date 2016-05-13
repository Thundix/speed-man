/**
 * Created by nd on 14/03/2016.
 */

MovingPlatform.prototype = new Platform();
MovingPlatform.prototype.constructor = MovingPlatform;

function MovingPlatform (x,y,w,h,fileName,dx,dy) {

    if (x != null && y != null && w != null && h != null ) {
        Platform.call(this, x, y,w,h,fileName);



        var platform = this;

        platform.addComponent(new MobileLocator(platform,dx,dy)).doWiring();


    }
}