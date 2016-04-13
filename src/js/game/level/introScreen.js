function IntroScreen(stageContext, menuHandler) {
    var stage = this;

    var manifest = [
        {id: "imageIntro", src: "./../resources/sprites/stage/mega_man_2_intro.jpg"},
        {id: "music", src: "./../resources/sounds/intro.mp3"}
    ];

    stage.initIntro = initIntro;


    function initIntro() {
        createjs.Sound.stop();
        stageContext.loadManifest(manifest, completeResourceLoad1);
    }

    function completeResourceLoad1() {
        //    createjs.Sound.play("music", {interrupt:createjs.Sound.INTERRUPT_NONE, loop:-1});
        var bitmap = new BitmapItem("imageIntro");
        stageContext.addGameItem(bitmap);
        stageContext.addGameItem(new TextItem("Start Game", 704, 500));
        stageContext.addGameItem(new TextItem("Enter Code", 704, 590));
        stageContext.addGameItem(new TextItem("Options", 704, 680));
        stageContext.addGameItem(new MovableTextItem(">", 644, menuHandler, [500, 590, 680]));

        // Remove all listener to avoid reused this method after execution
    }
}