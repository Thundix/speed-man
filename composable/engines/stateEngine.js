function StateEngine() {
    var engine = this;
    engine.register = register;
    engine.unRegister = unRegister;
    engine.treatInputs = treatInputs;
    engine.tick = tick;

    var states =[] ;

    function register(state){
        states[states.length] = state;
    }

    function unRegister(state){
        var index = states.indexOf(state);
        states.splice(index,1);
    }

    function treatInputs(delta){
        for(var i =0 ; i < states.length; i++) {
            if(states[i].treatInputs){
                states[i].treatInputs(delta);
            }
        }
    }

    function tick(delta){
        for(var i =0 ; i < states.length; i++) {
            states[i].tick(delta);
        }
    }

}