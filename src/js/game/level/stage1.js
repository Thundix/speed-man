function Stage1(stageContext){
    var stage = this;

    var manifest = [
        {id:"music1", src:"./../resources/sounds/stage1.mp3"},
        {id:"primaryBg", src:"./../resources/sprites/primaryBg.png"},
        {id:"ground", src:"./../resources/sprites/stage/ground2.png"},
        {id:"decor1", src:"./../resources/sprites/stage/decor1.png"},
        {id:"decor2", src:"./../resources/sprites/stage/decor2.png"},
        {id:"loading", src:"./../resources/sprites/stage/decor2.png"},
        {id:"enemy1", src:"./../resources/sprites/stage/test.png"},
        {id:"boss1", src:"./../resources/sprites/stage/metalmantest.png"},
        {id:"bossGate", src:"./../resources/sprites/stage/bossGate.png"},
        {id:"metalGear", src:"./../resources/sprites/stage/metalGear.png"}
    ];


    stage.init = init;



    function init() {
        createjs.Sound.stop();
        stageContext.loadManifest(manifest,completeResourceLoad);
        var loading = new LoadingScreen(stageContext);
       // loading.draw();
    }

    function completeResourceLoad(){
    //        createjs.Sound.play("music1", {interrupt:createjs.Sound.INTERRUPT_NONE, loop:-1});
        createForeGround();

    }

    function createForeGround(){
        stageContext.resetCanvas();

        // Create background black
        var shape = new BackgroundItem(0, 0, stageContext.getCanvasWidth()*16, stageContext.getCanvasHeight(),"primaryBg");
        stageContext.addGameItem(shape,"background");

        // Set megaman position (default 0,0 for test)
        stageContext.initMegaman(100,100);


        // Create wall
        var wall = new ForegroundItem(0,0, 50,  stageContext.getCanvasHeight()-200,"ground","wall");
        stageContext.addGameItem(wall,"platform");

        // Create wall2
        var wall2 = new ForegroundItem(0,stageContext.getCanvasHeight()-100, 50,  stageContext.getCanvasHeight()-100,"ground","wall");
        stageContext.addGameItem(wall2,"platform");

        // Create ground
        var ground = new ForegroundItem(0, stageContext.getCanvasHeight()-80, stageContext.getCanvasWidth()+100, 16*5,"ground","ground");
        stageContext.addGameItem(ground,"platform");




        // Create Plateform
        var composablePalteform = new MovingPlatform(100, stageContext.getCanvasHeight()-280, 16*10, 16*3,"ground",0,0);
        stageContext.addGameItem(composablePalteform,"platform");





        // Create Plateform
        var palteform4 = new ForegroundItem(2000, stageContext.getCanvasHeight()-300, 16*10, 16*3,"ground","palteform4");
        stageContext.addGameItem(palteform4,"platform");

        // Create Plateform
        var palteform7 = new ForegroundItem(2300, stageContext.getCanvasHeight()-400, 16*10, 16*3,"ground","palteform7");
        stageContext.addGameItem(palteform7,"platform");

        // Create Plateform
        var palteform8 = new ForegroundItem(2800, stageContext.getCanvasHeight()-400, 16*10, 16*3,"ground","palteform8");
        stageContext.addGameItem(palteform8,"platform");

        // Create Plateform
        var palteform9 = new ForegroundItem(3200, stageContext.getCanvasHeight()-450, 16*10, 16*3,"ground","palteform9");
        stageContext.addGameItem(palteform9,"platform");

        // Create Plateform
        var palteform10 = new ForegroundItem(3750, stageContext.getCanvasHeight()-350, 16*10, 16*3,"ground","palteform10");
        stageContext.addGameItem(palteform10,"platform");

        // Create Plateform
        var palteform11 = new ForegroundItem(4250, stageContext.getCanvasHeight()-350, 16*10, 16*3,"ground","palteform10");
        stageContext.addGameItem(palteform11,"platform");


        // Create Plateform
        var palteform12 = new ForegroundItem(4650, stageContext.getCanvasHeight()-450, 16*10, 16*3,"ground","palteform10");
        stageContext.addGameItem(palteform12,"platform");

        // Create Plateform
        var palteform13 = new ForegroundItem(5000, stageContext.getCanvasHeight()-350, 16*10, 16*3,"ground","palteform10");
        stageContext.addGameItem(palteform13,"platform");

        // Create ground2
        var ground2 = new ForegroundItem(5400, stageContext.getCanvasHeight()-80, stageContext.getCanvasWidth()+100, 16*5,"ground","ground");
        stageContext.addGameItem(ground2,"platform");

        // Create wall3
        var wall3 = new ForegroundItem(END_OF_STAGE_X-50+stageContext.getCanvasWidth(),stageContext.getCanvasHeight()-100, 50,100,"ground","wall");
        stageContext.addGameItem(wall3,"platform");

        // Create wall
        var wall4 = new ForegroundItem(END_OF_STAGE_X-50+stageContext.getCanvasWidth(),0, 50,  stageContext.getCanvasHeight()-300,"ground","wall");
        stageContext.addGameItem(wall4,"platform");

        // Create bossGate
        var bossGate = new ForegroundItem(END_OF_STAGE_X-50+stageContext.getCanvasWidth(),stageContext.getCanvasHeight()-300, 50,  200,"bossGate","bossGate");
        stageContext.addGameItem(bossGate,"platform");

        // Create enemy
  //      var enemy1 = new StaticEnemy1Item(1000, stageContext.getCanvasHeight()-230,171, 150,"enemy1","enemy1",stageContext);
//        stageContext.addGameItem(enemy1);

        // Create enemy2
        var enemy2 = new StaticEnemy1Item(2800, stageContext.getCanvasHeight()-550,171, 150,"enemy1","enemy1",stageContext);
        stageContext.addGameItem(enemy2,"enemy");

        // Create enemy2
        var enemy3 = new StaticEnemy1Item(3750, stageContext.getCanvasHeight()-500,171, 150,"enemy1","enemy1",stageContext);
        stageContext.addGameItem(enemy3,"enemy");

        // Create enemy
        var enemy6 = new StaticEnemy1Item(5000, stageContext.getCanvasHeight()-500,171, 150,"enemy1","enemy1",stageContext);
        stageContext.addGameItem(enemy6,"enemy");
        // Create first boss
        var boss = new Boss1Item(1000, stageContext.getCanvasHeight()-400,79, 100,"boss1","boss1",stageContext);
       stageContext.addGameItem(boss,"enemy");

        var screenBorderBottom = new ScreenBorderItem(-1,stageContext.getCanvasHeight(), stageContext.getCanvasWidth()*16, 1);
        var screenBorderTop = new ScreenBorderItem(-1,-1, stageContext.getCanvasWidth(), 1);
        var screenBorderLeft = new ScreenBorderItem(-1,-1, 1, stageContext.getCanvasHeight());
        var screenBorderRight = new ScreenBorderItem(stageContext.getCanvasWidth()+5100,-1, 1, stageContext.getCanvasHeight());


        stageContext.addGameItem(screenBorderTop,"border");
        stageContext.addGameItem(screenBorderBottom,"border");
        stageContext.addGameItem(screenBorderRight,"border");
        stageContext.addGameItem(screenBorderLeft,"border");


    }

}