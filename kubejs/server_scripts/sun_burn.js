/*

Add player to sun burn
/tag <player> add sun_burn


Remove player from sun burn
/tag <player> remove sun_burn

*/

function isSunBurnTick(ply) {
    if (ply.level.isDay() && !ply.level.isClientSide()) {
        let f = ply.getLightLevelDependentMagicValue()
        let blockpos = BlockPos.containing(ply.getX(), ply.getEyeY(), ply.getZ())
        let flag = ply.isInWaterRainOrBubble()
        if (f > 0.5 && !flag && ply.level.canSeeSky(blockpos)) {
            return true
        }
    }
    return false
}

PlayerEvents.tick( (event) => {
    let ply = event.entity
    for (let tag of ply.getTags()) {
        if (tag == "sun_burn") {
            if (isSunBurnTick(ply)) {
                ply.igniteForSeconds(10)
                ply.attack(ply.damageSources().lava(), 4 )
                console.log("burn")
            }
        }
    }
})