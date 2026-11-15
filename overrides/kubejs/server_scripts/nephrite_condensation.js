console.info('Respawn Blindness Loaded')

function checkNephriteValidity(event, blockData, bpos) {
    if (event.level.getBlock(bpos.offset(0, -1 ,0)).id != "minecraft:sculk_catalyst") {
        return false
    }
    return blockData.getInt('Charge') >= 10
}

BlockEvents.rightClicked("spelunkery:carved_nephrite", event => {
    const { block, player, hand} = event
    
    if (hand != "MAIN_HAND") return

    const stack = player.getMainHandItem()

    if (stack.id == "spelunkery:nephrite_chunk") {
        let bpos = block.pos
        let blockData = block.getEntityData()

        if ( checkNephriteValidity(event, blockData, bpos) ) {
            event.level[lib.sound](null, bpos, "minecraft:block.sculk.charge", "blocks", 1, 1 )
            lib.runServerCommand(event.level,`particle minecraft:sculk_charge_pop ${bpos.x + 0.5} ${bpos.y+0.5} ${bpos.z+0.5} 0.25 0.25 0.25 0.02 40`)
            lib.runServerCommand(event.level,`particle minecraft:sculk_soul ${bpos.x} ${bpos.y} ${bpos.z} 0.3 0 0.3 0.005 5`)
            blockData.putInt('Charge',blockData.getInt('Charge') - 10)
            block.mergeEntityData(blockData)
            stack.shrink(1)
            player.addItem('malum:refined_brilliance')
        }
        else {
            event.level[lib.sound](null, bpos, "malum:brilliance_ore_hit", "blocks", 1, 1 )
        }
        
    }
})