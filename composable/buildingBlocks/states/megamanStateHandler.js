/**
 * Created by Thundax on 13/05/2016.
 */

MegamanStateHandler.prototype = new StateHandler();
MegamanStateHandler.prototype.constructor = MegamanStateHandler;

function MegamanStateHandler(gameItem) {

    if (gameItem != null) {

       StateHandler.call(this,gameItem);
       var megamanStateHandler = this;
        megamanStateHandler.addComponent(new MovingState());

    }
}