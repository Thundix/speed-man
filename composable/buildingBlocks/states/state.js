/**
 * Created by Thundax on 13/05/2016.
 */

function State() {
    var enabled;
    var active;
    var  state = this;
    state.isEnabled = isEnabled;
    state.setEnabled = setEnabled;
    state.isActive = isActive;
    state.setActive = setActive;


    function isEnabled(){
        return enabled;
    }

    function setEnabled(enabled1){
        enabled = enabled1;
    }

    function isActive(){
        return active;
    }
    function setActive(active1){
        active = active1;
    }



}