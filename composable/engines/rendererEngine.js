function ComposableRendererEngine(canvas,loader) {
    var engine = this;
    engine.register = register;
    engine.unRegister = unRegister;
    engine.tick = tick;



    var renderers =[] ;

    function register(renderer){
        renderers[renderers.length] = renderer;
        if(renderer.getVisualList){
            var visuals = renderer.getVisualList();
            for (var j=0;j< visuals.length;j++){

                if (visuals[j].isActive()){
                    if (!visuals[j].isDisplayed()){
                        canvas.addChild(visuals[j].getGraphicalElement(loader));
                        visuals[j].setDisplayed(true);
                    }
                }
            }
        } else {
            canvas.addChild(renderer.getGraphicalElement(loader));
        }
    }

    function unRegister(renderer){
        if(renderer.getVisualList){
            var visuals = renderer.getVisualList();
            for (var j=0;j< visuals.length;j++){
                canvas.removeChild(visuals[j].getGraphicalElement(loader));
            }
        } else {
            canvas.removeChild(renderer.getGraphicalElement(loader));
        }


        var index = renderers.indexOf(renderer);
        renderers.splice(index,1);


    }

    function tick(event){

        for(var i =0 ; i < renderers.length; i++) {

            renderers[i].tick(event.delta/1000)

            if (renderers[i].getVisualList){

                var visuals = renderers[i].getVisualList();

                for (var j=0;j< visuals.length;j++){

                    if (visuals[j].isActive()){
                        if (!visuals[j].isDisplayed()){
                            canvas.addChild(visuals[j].getGraphicalElement(loader));
                            visuals[j].setDisplayed(true);
                        }
                    }
                    visuals[j].tick(event.delta/1000);



                    if (!visuals[j].isActive()){
                        if (visuals[j].isDisplayed()){
                            canvas.removeChild(visuals[j].getGraphicalElement(loader));
                            visuals[j].setDisplayed(false);
                        }
                    }
                }
            }

        }

        canvas.update(event);
    }
}