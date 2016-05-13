/**
 * Created by Thundax on 17/01/2016.
 */
function WeaponEngine() {
    var engine = this;
    engine.register = register;
    engine.unRegister = unRegister;
    engine.tick = tick;

    var weapons =[] ;

    function register(weapon){
        weapons[weapons.length] = weapon;
    }

    function unRegister(weapon){
        var index = weapons.indexOf(weapon);
        weapons.splice(index,1);
    }

    function tick(delta){
        for(var i =0 ; i < weapons.length; i++) {
            weapons[i].tick(delta);
        }
    }
}