StartupEvents.registry('block', event => {

    const playSound = 'playSound(net.minecraft.world.entity.player.Player,net.minecraft.core.BlockPos,net.minecraft.sounds.SoundEvent,net.minecraft.sounds.SoundSource,float,float)'

    const adjacentPositions = [
        BlockPos(1, 0, 0),
        BlockPos(-1, 0, 0),
        BlockPos(0, 1, 0),
        BlockPos(0, -1, 0),
        BlockPos(0, 0, 1),
        BlockPos(0, 0, -1)
    ]

    function positionString( pos ) {
        return pos.x + ' ' + pos.y + ' ' + pos.z
    }

    function tickBlock(block, times) {
        for (let i=0; i < times; i++) {
            block.getBlockState().randomTick(block.level, block.pos, block.level.random)
        }
    }

    event.create("crystal_resonator")
    .randomTick( t => {
        let cr = t.block
        let level = t.level
        let foundBud = false

        for (let pos of adjacentPositions) {
            pos = cr.pos.offset(pos)
            let block = t.level.getBlock(pos)
            if (block.id == "minecraft:budding_amethyst") {
                foundBud = true
                tickBlock(block, 20)
                level.runCommandSilent('particle dust_color_transition{from_color:[0.8,0.61,0.92],to_color:[0.98,0.78,0.87],scale:1.5} ' + positionString(Vec3d(pos.x + 0.5, pos.y + 0.5, pos.z + 0.5)) + ' 0.3 0.3 0.3 0.2 40')
            }
            if (block.id == "nomansland:budding_quartzite") {
                foundBud = true
                tickBlock(block, 20)
                level.runCommandSilent('particle dust_color_transition{from_color:[0.9,0.9,0.9],to_color:[1,1,1],scale:1.5} ' + positionString(Vec3d(pos.x + 0.5, pos.y + 0.5, pos.z + 0.5)) + ' 0.3 0.3 0.3 0.2 40')
            }
        }

        if (foundBud) {
            level[playSound](null, cr.pos, "minecraft:block.amethyst_block.chime", "ambient", 1, Math.random()*0.2+0.9 )
        }
    })
    .soundType('vault')
    .hardness(2)
    .resistance(4)
    .requiresTool(true)
    .tagBlock('minecraft:mineable/pickaxe')
    .renderType('cutout')
    .waterlogged()
    .notSolid()
})
