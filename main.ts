namespace SpriteKind {
    export const particle = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    canDash = true
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (playerSprite.isHittingTile(CollisionDirection.Bottom)) {
        playerSprite.vy = -140
    } else {
        if (canDash == true) {
            animation.runImageAnimation(
            playerSprite,
            [img`
                9 9 9 9 9 
                9 9 9 9 9 
                9 9 9 9 9 
                9 9 9 9 9 
                9 9 9 9 9 
                `,img`
                1 1 1 1 1 
                1 1 1 1 1 
                1 1 1 1 1 
                1 1 1 1 1 
                1 1 1 1 1 
                `],
            200,
            false
            )
            playerSprite.setVelocity(0, -330)
            scene.cameraShake(2, 100)
            for (let index = 0; index < 10; index++) {
                dashParticle1 = sprites.create(img`
                    . 9 . 
                    9 9 9 
                    . 9 . 
                    `, SpriteKind.particle)
                dashParticle1.setPosition(playerSprite.x, playerSprite.y)
                animation.runImageAnimation(
                dashParticle1,
                [img`
                    . 9 . 
                    9 9 9 
                    . 9 . 
                    `,img`
                    9 . 9 
                    . 9 . 
                    9 . 9 
                    `],
                250,
                true
                )
                dashParticle1.setFlag(SpriteFlag.AutoDestroy, true)
                dashParticle1.setFlag(SpriteFlag.GhostThroughWalls, true)
                dashParticle1.setFlag(SpriteFlag.GhostThroughTiles, true)
                dashParticle1.setFlag(SpriteFlag.GhostThroughSprites, true)
                dashParticle1.setVelocity(0, 20)
                pause(10)
            }
            canDash = false
        }
    }
})
let dashParticle1: Sprite = null
let playerSprite: Sprite = null
let canDash = false
controller.configureRepeatEventDefaults(0, 0)
canDash = true
playerSprite = sprites.create(img`
    1 1 1 1 1 
    1 1 1 1 1 
    1 1 1 1 1 
    1 1 1 1 1 
    1 1 1 1 1 
    `, SpriteKind.Player)
controller.moveSprite(playerSprite, 130, 0)
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(playerSprite)
tiles.placeOnTile(playerSprite, tiles.getTileLocation(1, 14))
playerSprite.ay = 500
