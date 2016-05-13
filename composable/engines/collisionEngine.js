function ComposableCollisionEngine() {
    var engine = this;
    engine.register = register;
    engine.unRegister = unRegister;
    engine.tick = tick;

    var colliders ={} ;

    function register(collider,group){


        if (collider.getCollisionGroup){
            group = collider.getCollisionGroup();
        }

        if (!colliders[group]){
            colliders[group] = [];
        }
        colliders[group][colliders[group].length] = collider;

    }

    function unRegister(collider){
        var group = "default";
        for (var currentGroup in colliders){
            if (colliders[currentGroup].indexOf(collider)>-1){
                group = currentGroup;
            }
        }
        if (collider.getCollisionGroup){
            group = collider.getCollisionGroup();
        }

        var index = colliders[group].indexOf(collider);
        colliders[group].splice(index,1);
    }

    function tick(delta){
        for(var groupA in colliders) {
            for (var groupB in colliders) {

                if (groupA.localeCompare(groupB) != 0){

                    for(var i =0 ; i < colliders[groupA].length; i++) {
                        for(var j =0 ; j < colliders[groupB].length; j++) {

                            colliders[groupB][j].accept(colliders[groupA][i],delta);

                        }
                    }
                }
            }
        }
    }
}