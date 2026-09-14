BlockEvents.blockEntityTick('kubejs:jarred_loader', event => {
    let {level, block} = event
    let pos = block.pos
    lib.runServerCommand(level,`execute positioned ${pos.x} ${pos.y} ${pos.z} run sable forceload add @i`)
})

BlockEvents.broken('kubejs:jarred_loader', event => {
    let {level, block} = event
    let pos = block.pos
    lib.runServerCommand(level,`execute positioned ${pos.x} ${pos.y} ${pos.z} run sable forceload remove @i`)
})
