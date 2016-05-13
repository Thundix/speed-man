function MovementEngine() {
    var engine = this;
    engine.register = register;
    engine.unRegister = unRegister;
    engine.tick = tick;
    engine.computeNextPositions = computeNextPositions;

    var mobiles =[] ;

    function register(mobile){
        mobiles[mobiles.length] = mobile;
    }

    function unRegister(mobile){
        var index = mobiles.indexOf(mobile);
        mobiles.splice(index,1);
    }

    function computeNextPositions(delta){
        for(var i =0 ; i < mobiles.length; i++) {
            mobiles[i].computeNextPosition(delta);
        }
    }

    function tick(delta){
        for(var i =0 ; i < mobiles.length; i++) {
            mobiles[i].tick(delta);
        }
    }
}