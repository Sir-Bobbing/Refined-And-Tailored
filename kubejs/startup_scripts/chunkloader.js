StartupEvents.registry('block', event => {

    event.create("jarred_loader")
    .displayName('Physics Chunk Loader')
    .blockEntity(entity => {
        entity.serverTicking()
        entity.tickFrequency(100)
    })
    .soundType('lodestone')
    .hardness(2)
    .resistance(4)
    .requiresTool(true)
    .tagBlock('minecraft:mineable/pickaxe')
    .renderType('cutout')
    .waterlogged()
    .notSolid()
})


