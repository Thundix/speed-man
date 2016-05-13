function CollisionEngine() {
    var engine = this;
    engine.register = register;
    engine.unRegister = unRegister;
    engine.tick = tick;

    var colliders =[] ;

    function register(collider){
        console.log(collider);
        colliders[colliders.length] = collider;
    }

    function unRegister(collider){
        var index = colliders.indexOf(collider);
        colliders.splice(index,1);
    }

    function tick(delta){
        for(var i =0 ; i < colliders.length; i++) {
            for(var j =0 ; j < colliders.length; j++) {
                if(i != j){
                    colliders[j].accept(colliders[i],delta);

                }
            }
        }
    }
}