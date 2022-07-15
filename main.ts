namespace SpriteKind {
    export const Decoration = SpriteKind.create();
    export const Powerup = SpriteKind.create();
}

console.log("Initializing game...");

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(mySprite, assets.animation`shooting shark`, 100, false);
    pause(500);
    projectile = sprites.createProjectileFromSprite(assets.image`laser`, mySprite, 100, 0);
    music.pewPew.play();
    animation.runImageAnimation(mySprite, assets.animation`Swim Right`, 200, true);
});

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(mySprite, assets.animation`Shooting shark 2`, 100, false);
    pause(500);
    projectile = sprites.createProjectileFromSprite(assets.image`laser`, mySprite, -100, 0);
    music.pewPew.play();
    animation.runImageAnimation(mySprite, assets.animation`Swim Left`, 200, true);
});

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(mySprite, assets.animation`Swim Left`, 200, true);
});

info.onCountdownEnd(function () {
    game.over(true);
});

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(mySprite, assets.animation`Swim Right`, 200, true);
});

info.onLifeZero(function () {
    mySprite.destroy(effects.spray, 500);
    game.over(false);
});

sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy(effects.spray, 100);
    info.changeScoreBy(1);
    music.powerUp.play();

    console.log("[Game] Eat fish.");
});

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.startEffect(effects.spray);
    otherSprite.destroy();
    info.changeScoreBy(5);
    music.baDing.play();
    info.startCountdown(35);
    sprite.destroy();

    console.log("[Game] Fire projectile.");
});

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.bigCrash.play();
    info.changeLifeBy(-1);
    otherSprite.destroy(effects.spray, 500);

    console.log("[Game] Enemy hit player.");
});

let myEnemy: Sprite = null;
let myFood: Sprite = null;
let projectile: Sprite = null;
let MyDecor2: Sprite = null;
let myDecor: Sprite = null;
let mySprite: Sprite = null;

scene.setBackgroundColor(8);
scene.setBackgroundImage(assets.image`ocean1`);
mySprite = sprites.create(assets.image`shark`, SpriteKind.Player);
controller.moveSprite(mySprite);
mySprite.setStayInScreen(true);
info.startCountdown(35);

for (let index = 0; index < 10; index++) {
    myDecor = sprites.create(assets.image`decoration`, SpriteKind.Decoration);
    myDecor.setPosition(randint(0, 160), 96);
    MyDecor2 = sprites.create(assets.image`Decor`, SpriteKind.Decoration);
    MyDecor2.setPosition(randint(0, 160), 96);
}

animation.runImageAnimation(mySprite, assets.animation`Swim Right`, 200, true);

music.playMelody("D E F E F D E G ", 120);
music.playTone(262, music.beat(BeatFraction.Half));
info.setLife(3);

game.onUpdateInterval(1000, function () {
    myFood = sprites.create(assets.image`food`, SpriteKind.Food);
    myFood.setPosition(scene.screenWidth(), randint(5, 115));
    myFood.vx = -75;
    animation.runImageAnimation(myFood, assets.animation`animated food`, 200, true);
});

game.onUpdateInterval(3000, function () {
    myEnemy = sprites.create(assets.image`enemy`, SpriteKind.Enemy);
    myEnemy.setPosition(scene.screenWidth(), randint(5, 115));
    myEnemy.vx = -50;
    // animation.runImageAnimation(
    // myEnemy,
    // [img`
    //     . . . . . . . . . . . . . . . . 
    //     . . . . . . . . . . . . . . . . 
    //     . . . . . . . . . . . . . . . . 
    //     . . . . . . . . . . . . . . . . 
    //     . . . . . . . . . . . . . . . . 
    //     . . . . . . . . . . . . . . . . 
    //     . . . . . . . . . . . . . . . . 
    //     . . . . . . . . . . . . . . . . 
    //     . . . . . . . . . . . . . . . . 
    //     . . . . . . . . . . . . . . . . 
    //     . . . . . . . . . . . . . . . . 
    //     . . . . . . . . . . . . . . . . 
    //     . . . . . . . . . . . . . . . . 
    //     . . . . . . . . . . . . . . . . 
    //     . . . . . . . . . . . . . . . . 
    //     . . . . . . . . . . . . . . . . 
    //     `],
    // 50,
    // true
    // );
});
