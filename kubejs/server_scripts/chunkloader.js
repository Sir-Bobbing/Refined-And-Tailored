function getSublevelUUID(level, pos) {
    let sublevel = $SableCompanion.INSTANCE.getContaining(level, pos.x, pos.z)
    if (sublevel == null) {
        return $UUID.fromString('00000000-0000-0000-0000-000000000000')
    }
    return sublevel.uniqueId
}

BlockEvents.blockEntityTick('kubejs:jarred_loader', event => {
    let {level, block} = event
    let pos = block.pos
    let data = block.getEntityData().getCompound('data')
    let currentUUID = getSublevelUUID(level, pos)
    let previousUUID = data.getUUID('sub_level')
    if (currentUUID != previousUUID) {
        lib.runServerCommand(level, 'sable forceload remove ' + previousUUID)
        data.putUUID('sub_level', currentUUID)
    }
    lib.runServerCommand(level,`execute positioned ${pos.x} ${pos.y} ${pos.z} run sable forceload add @i`)
})

BlockEvents.broken('kubejs:jarred_loader', event => {
    let {level, block} = event
    let pos = block.pos
    let data = block.getEntityData().getCompound('data')
    lib.runServerCommand(level, 'sable forceload remove ' + data.getUUID('sub_level'))
    lib.runServerCommand(level,`execute positioned ${pos.x} ${pos.y} ${pos.z} run sable forceload remove @i`)
})
