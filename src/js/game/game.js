
/**
 * Created by Thundax on 30/09/2014.
 */

function initGame() {

    var game = this;
    // Boolean handling the menu state (for keyboard handler)
    var inMenu = true;
    // Megaman game item, stored at game level because translevel (power,item,...)
    var megaman = new Megaman(game);
    game.restartGame = restartGame;
    game.startStage = startStage;
    game.isInMenu = isInMenu;

    if (window.top != window) {
        document.getElementById("header").style.display = "none";
    }

    if (!createjs.Sound.initializeDefaultPlugins()) {
        document.getElementById("error").style.display = "block";
        document.getElementById("content").style.display = "none";
        return;
    }

    if (createjs.Sound.BrowserDetect.isIOS || createjs.Sound.BrowserDetect.isAndroid) {
        document.getElementById("mobile").style.display = "block";
        document.getElementById("content").style.display = "none";
        return;
    }

    var canvas = new createjs.Stage("megaManCanvas");
    createjs.Sound.alternateExtensions = ["mp3"];

    resizeToWindow();

    var manifest = [
        {id:"spriteSheetMegaman",   src:"./../resources/sprites/megaman/megamanSpriteSheet.png"},
        {id:"primaryBg", src:"./../resources/sprites/primaryBg.png"},
        {id:"pCannonBullet", src:"./../resources/sprites/megaman/pCannon_bullet.png"}
    ];

    var loader = new createjs.LoadQueue(false);
    loader.installPlugin(createjs.Sound);
    loader.addEventListener("complete", completeResourceLoad);
    loader.loadManifest(manifest);

    var menuHandler = new MenuKeyboardHandler(game);
    var multiplexHandler = new MultiplexKeyboardHandler();

    multiplexHandler.register(menuHandler);
    multiplexHandler.register(megaman.getInputHandler());

    var collisionEngine = new ComposableCollisionEngine();
    var movementEngine = new MovementEngine();
    var rendererEngine = new ComposableRendererEngine(canvas,loader);
    var stateEngine = new StateEngine();
    var weaponEngine = new WeaponEngine();

    function completeResourceLoad() {
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick", tick);

        var stageContext = new StageContext(loader,canvas,collisionEngine,movementEngine,rendererEngine,megaman);
        var currentStage = new IntroScreen(stageContext,menuHandler);

        currentStage.initIntro();
    }

    function tick(event) {
        // Treat states change coming from input
        stateEngine.treatInputs();

        // Movement Engine computeNextPosition;
        movementEngine.computeNextPositions(event.delta/1000);

        // Collision Engine Tick (of game)
        collisionEngine.tick(event.delta/1000);

        // Treat states change coming from collisions
        stateEngine.tick(event.delta/1000);

        // Movement Engine Tick
        movementEngine.tick(event.delta/1000);

        moveCanvas();

        // Renderer engine Tick
        rendererEngine.tick(event);

        // Weapon engine Tick
        weaponEngine.tick(event.delta/1000);


    }

    function startStage() {
        var stageContext = new StageContext(loader,canvas,collisionEngine,movementEngine,rendererEngine,stateEngine,weaponEngine,megaman);
        var currentStage = new Stage1(stageContext);
        inMenu = false;

        stageContext.resetCanvas();
        currentStage.init();
    }

    function isInMenu(){
        return inMenu;
    }

    function moveCanvas(){
        var calculatedCanvaX = megaman.getX() - canvas.canvas.width/2;

        if(calculatedCanvaX > END_OF_STAGE_X){
            return;
        }

        if(calculatedCanvaX < 0){
            canvas.x = 0;
        }else {
            canvas.x = -calculatedCanvaX;
        }
    }

    function restartGame(){
        location.reload(false); // todo that's not really the best way
    }

    function resizeToWindow() {
        var canvas = document.getElementById("megaManCanvas");

        function resize() {
            var widthZoom = window.innerWidth / (canvas.width + canvas.width/50);
            var heightZoom = window.innerHeight / (canvas.height + canvas.height/50);
            canvas.style.zoom = widthZoom < heightZoom ? widthZoom : heightZoom;
        }

        window.onresize = resize;
        resize();
    }
}