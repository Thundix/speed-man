function Boss1Item(x,y,w,h,sheetName,name,stageContext) {
    var boss = this;

    boss.getRenderer = getRenderer;
    boss.getCollider = getCollider;
    boss.getStateHandler = getStateHandler;
    boss.getMobile = getMobile;
    boss.getInputHandler = getInputHandler;

    var weaponHandler = new  Boss1WeaponHandler(boss, stageContext);
    var inputHandler = new Boss1InputGenerator();
    var renderer = new Boss1Renderer(x, y, w, h, sheetName, boss);
    var collider = new RectangularCollider(boss);
    var stateHandler = new Boss1StateHandler(boss, stageContext);
    var mobile = new Boss1Mobile(boss, stageContext);
    var name1 = name;
    var firingAnimation = false;
    boss.getInput = inputHandler.getInput;
    boss.getWeaponHandler = getWeaponHandler ;
    boss.getName = getName;
    boss.getX = renderer.getX;
    boss.getY = renderer.getY;
    boss.setX = renderer.setX;
    boss.setY = renderer.setY;
    boss.getWidth = renderer.getWidth;
    boss.getHeight = renderer.getHeight;
    boss.playDeadAnimation = renderer.playDeadAnimation;
    boss.getNextX = getNextX;
    boss.getNextY = getNextY;
    boss.getDx = mobile.getDx;
    boss.getDy = mobile.getDy;
    boss.setDx = mobile.setDx;
    boss.setDy = mobile.setDy;
    boss.canCollideBulletItem = canCollideBulletItem;
    boss.canCollideForegroundItem = canCollideForegroundItem;
    boss.addCollision = stateHandler.addCollision;
    boss.treatCollisions = stateHandler.treatCollisions;
    boss.canCollide = canCollide;
    boss.isStanding = stateHandler.isStanding;
    boss.isJumping = stateHandler.isJumping;
    boss.isFalling = stateHandler.isFalling;
    boss.isFiring = stateHandler.isFiring;




    function getRenderer() {
        return renderer;
    }

    function getCollider() {
        return collider;
    }

    function getStateHandler() {
        return stateHandler;
    }

    function getMobile() {
        return mobile;
    }

    function getInputHandler() {
        return inputHandler;
    }
    function getWeaponHandler() {
        return weaponHandler;
    }


    function getName() {
        return name1;
    }

    function canCollideForegroundItem(secondGameitem) {
        return Collision.types.PLATFORM;
    }

    function canCollide(secondGameitem) {
        if (secondGameitem.canCollideStaticEnemy) {
            return secondGameitem.canCollideStaticEnemy(boss);
        }
        return false;
    }

    function canCollideBulletItem(secondGameitem) {
        return Collision.types.BULLET;
    }

    function getNextX(delta) {
        return x;
    }

    function getNextY(delta) {
        return y;
    }

    /*internal class*/
    function Boss1Renderer(x, y, w, h, sheetName, boss) {

        var boss1Renderer = this;

        boss1Renderer.getGraphicalElement = getGraphicalElement;
        boss1Renderer.setX = setX;
        boss1Renderer.setY = setY;
        boss1Renderer.getX = getX;
        boss1Renderer.getY = getY;
        boss1Renderer.getWidth = getWidth;
        boss1Renderer.getHeight = getHeight;
        boss1Renderer.tick = tick;

        var animationArray = {stand: [1, 1], jump_stand: [0, 0, "jump_stand"], fire: [3, 3, "fire"], fire_jump: [7, 8, "fire_jump"], fire_stand: [9, 9, "fire_stand"], hit: [27, 28, "hit"]};
        var sprite;

        function getGraphicalElement(loader) {
            if (!sprite) {
                var data = new createjs.SpriteSheet({
                    "images": [loader.getResult(sheetName)],
                    "frames": {width: w, height: h},
                    "animations": animationArray
                });
                sprite = new createjs.Sprite(data);
                sprite.framerate = 5;
            }
            return sprite;
        }

        function tick(delta) {
            sprite.x = x;
            sprite.y = y;
            renderState();

        }

        function renderState() {

            if (boss.isStanding()) {
                if (boss.isFiring()) {
                    sprite.gotoAndPlay("fire_stand");
                } else {
                    sprite.gotoAndPlay("stand");
                }
            }
            if (boss.isJumping()) {
                if (boss.isFiring()) {
                    if (!firingAnimation) {
                        return;
                    }
                    sprite.gotoAndPlay("fire_jump");
                } else {
                    sprite.gotoAndPlay("jump_stand");
                }
            }
            if (boss.isFalling()) {
                if (boss.isFiring()) {
                    if (!firingAnimation) {
                        return;
                    }
                    sprite.gotoAndPlay("fire_jump");
                } else {
                    sprite.gotoAndPlay("jump_stand");
                }
            }
        }


        function setX(newX) {
            x = newX;
        }

        function setY(newY) {
            y = newY;
        }

        function getX() {
            return x;
        }

        function getY() {
            return y;
        }

        function getHeight() {
            return h;
        }

        function getWidth() {
            return w;
        }


    }

    function Boss1StateHandler(boss1, stageContext) {

        var handler = this;
        var collisionQueue = [];
        var jump = false;
        var needToFall = true;
        var fire = false;
        var life = 10;
        var states = {

            STANDING: {

                treatInput: function (input) {
                    jump = input.isJumping();
                    fire = input.isFiring();

                    // Need to check to jump here
                    if (jump) {
                        states.JUMPING.enterState();
                    }
                },

                treatCollision: function (collision) {
                    if (collision.getParams().newY) {
                        boss1.setY(collision.getParams().newY);
                        boss1.setDy(0);
                    }
                    if (collision.getParams().newX) {
                        boss1.setX(collision.getParams().newX);
                        boss1.setDx(0);
                    }
                },

                enterState: function () {
                    currentState = states.STANDING;

                },
                name: "STAND"
            },

            FALLING: {

                treatInput: function (input) {
                    fire = input.isFiring();
                    if (fire != input.isFiring()) {
                        firingAnimation = true;
                    } else {
                        firingAnimation = !input.isFiring();
                    }

                },

                treatCollision: function (collision) {
                    if (collision.getParams().newY) {
                        boss1.setY(collision.getParams().newY);
                        boss1.setDy(0);
                    }
                    needToFall = false;
                    states.STANDING.enterState();
                },

                enterState: function () {
                    currentState = states.FALLING;
                },
                name: "FALL"
            },
            JUMPING: {

                treatInput: function (input) {
                    if (fire != input.isFiring()) {
                        firingAnimation = true;
                    } else {
                        firingAnimation = !input.isFiring();
                    }
                    fire = input.isFiring();
                },

                treatCollision: function (collision) {
                    needToFall = false;
                    if (collision.getParams().newY) {
                        boss1.setY(collision.getParams().newY);
                        boss1.setDy(0);
                    }
                    if (collision.getParams().newX) {
                        boss1.setX(collision.getParams().newX);
                        boss1.setDx(0);
                    }
                },

                enterState: function () {
                    currentState = states.JUMPING;
                    boss1.setDy(BOSS1_JUMP_IMPULSE)

                },

                tick: function (delta) {
                    if (boss1.getDy(delta) > 0) {
                        states.FALLING.enterState();
                    }
                },
                name: "JUMPING"
            }
        };
        var currentState = states.STANDING;

        handler.addCollision = addCollision;
        handler.treatCollisions = treatCollisions;
        handler.treatInputs = treatInputs;
        handler.isStanding = isStanding;
        handler.isFalling = isFalling;
        handler.isJumping = isJumping;
        handler.isFiring = isFiring;
        handler.tick = tick;

        function addCollision(collision) {
            collisionQueue[collisionQueue.length] = collision
        }

        function treatCollisions() {
            for (var j = 0; j < collisionQueue.length; j++) {
                // If collision is enemy or out of bound -> restart
                //TODO Fix Life shit
                if (collisionQueue[j].getType() == Collision.types.BULLET) {
                    life--;
                    if(life == 0){
                        stageContext.removeGameItem(boss);
                    }
                }

                currentState.treatCollision(collisionQueue[j]);
            }
            //TODO
            if (needToFall && currentState != states.JUMPING && currentState != states.FALLING) {
                states.FALLING.enterState();
            }
            // Reinit
            collisionQueue = [];
        }

        function treatInputs() {
            var input = boss1.getInput();
            if (currentState.treatInput) {
                currentState.treatInput(input);
            }
        }

        function tick(delta) {
            treatCollisions();
            if (currentState.tick) {
                currentState.tick(delta);
            }
        }

        function isStanding() {
            return currentState == states.STANDING;
        }

        function isFalling() {
            return currentState == states.FALLING;
        }

        function isJumping() {
            return currentState == states.JUMPING;
        }

        function isFiring() {
            return fire;
        }
    }

    function Boss1Mobile(bossItem,stageContext) {

        var mobile = this;
        var dX = 0;
        var dY = 0;
        var aY = GRAVITY;

        mobile.computeNextPosition = computeNextPosition;
        mobile.tick = tick;
        mobile.getNextX = getNextX;
        mobile.getNextY = getNextY;
        mobile.setDx = setDx;
        mobile.setDy = setDy;
        mobile.getDx = getDx;
        mobile.getDy = getDy;


        function computeNextPosition(delta) {

            // Call each tick -> generateMovement
            inputHandler.tick();

            // TODO Handle Jumping
            dY += aY * delta;
            if (dY >= BOSS1_DY_MAX) {
                dY = BOSS1_DY_MAX;
            }
            dX =  0;
        }

        function tick(delta) {
            bossItem.setX(bossItem.getX() + dX * delta);
            bossItem.setY(bossItem.getY() + dY * delta);
        }

        function getNextX(delta) {
            return bossItem.getX() + dX * delta;
        }

        function getNextY(delta) {
            return bossItem.getY() + dY * delta;
        }

        function setDx(newDx) {
            dX = newDx;
        }

        function setDy(newDy) {
            dY = newDy;
        }

        function getDx(delta) {
            return dX * delta;
        }

        function getDy(delta) {
            return dY * delta;
        }
    }

    function Boss1WeaponHandler() {
        var weaponHandler = this;
        var currentWeapon= new MetalGear();
        var stageContext;

        weaponHandler.tick = tick;
        weaponHandler.setCurrentWeapon = setCurrentWeapon;
        weaponHandler.setStageContext = setStageContext;


        function tick(delta) {
            currentWeapon.coolDown(delta);
            if (boss.isFiring() && currentWeapon.canCreateBullet()) {
                var bullet = new BulletItem(
                    boss.getX()- currentWeapon.getXRelativePostion(),
                        boss.getY() - currentWeapon.getYRelativePostion(),
                    -1,
                    currentWeapon.bulletMobileFactory,
                    currentWeapon.bulletStateHandlerFactory,
                    currentWeapon.getBulletData(),
                    stageContext
                );
                stageContext.addGameItem(bullet);
            }
        }

        function setCurrentWeapon(weapon) {
            currentWeapon = weapon;
        }

        function setStageContext(context) {
            stageContext = context;
        }
    }
}
