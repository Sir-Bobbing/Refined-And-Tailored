function popCreature( level, entity, source, force ) {
    for (let i = 0; i < 3; i++) {
        level[lib.sound](null, entity.blockPosition(), "supplementaries:item.confetti_popper", "master", 1, 1 )
    }
    level[lib.sound](null, entity.blockPosition(), "minecraft:entity.firework_rocket.twinkle", "master", 1, 1 )

    let centerY = entity.y + entity.bbHeight / 2

    lib.runServerCommand(level,`particle supplementaries:streamer ${entity.x} ${centerY} ${entity.z} 0.1 0.1 0.1 0.3 125 force`)
    lib.runServerCommand(level,`particle supplementaries:confetti ${entity.x} ${centerY} ${entity.z} 0.1 0.1 0.1 0.3 400 force`)
    lib.runServerCommand(level,`particle minecraft:flash ${entity.x} ${centerY} ${entity.z} 0 0 0 0 2 force`)
    lib.runServerCommand(level,`particle minecraft:end_rod ${entity.x} ${centerY} ${entity.z} 0.25 0.25 0.25 0.25 50 force`)

    if (entity.isPlayer()) {
        let gameRules = level.server.getGameRules()
        const keep = (gameRules.get('keepInventory').get() || force == true)
        console.log('Giggler keep',keep)
        if (!keep) {gameRules.set('keepInventory', 'true')}
        entity.damage(10000, new DamageSource['(net.minecraft.core.Holder,net.minecraft.world.entity.Entity)']('kubejs:giggler', source))
        if (force == true && entity.isAlive()) {
            entity.kill()
        }
        entity.setPos(entity.x, entity.y - 6, entity.z)
        if (!keep) {gameRules.set('keepInventory', 'false')}
    }
    else {
        entity.setPos(entity.x, -1024, entity.z)
        entity.damage(10000, new DamageSource['(net.minecraft.core.Holder,net.minecraft.world.entity.Entity)']('kubejs:giggler', source))
    }

    level.explode(null, entity.x, centerY, entity.z, 1, "mob")
}

lib.setFunc('popCreature', popCreature)

NativeEvents.onEvent($AnvilUpdateEvent, event => {

    if (event.getLeft().id != "kubejs:giggler") {return}
    let name = event.getName()
    name = name + "" // String is actually a java.lang.String not a JavaScript string, this fixes it

    if (name.match(RegExp('(v|V|ṽ|Ṽ|ṿ|Ṿ).*(e|E|3|é|É|è|È|ė|Ė|ê|Ê|ë|Ë|ě|Ě|ĕ|Ĕ|ē|Ē|ę|Ȩ|ȩ|Ȩ|ɇ|Ɇ|ḗ|Ḗ|ḕ|Ḕ|ḝ|Ḝ|ȅ|Ȅ|ȇ|Ȇ|ḙ|Ḙ|ḛ|Ḛ).*(r|R|ŕ|Ŕ|ṙ|Ṙ|ř|Ř|ŗ|Ŗ|ɍ|Ɍ|ȑ|Ȑ|ȓ|Ȓ|ṛ|Ṛ|ṟ|Ṟ|ṝ|Ṝ).*(i|I|1|í|Í|ì|Ì|ı|İ|î|Î|ï|Ï|ǐ|Ǐ|ĭ|Ĭ|ī|Ī|ĩ|Ĩ|į|Į|ḯ|Ḯ|ȉ|Ȉ|ȋ|Ȋ|ḭ|Ḭ|l).*(t|T|ṫ|Ṫ|ť|Ť|ţ|Ţ|ṭ|Ṭ|ț|Ț|ṱ|Ṱ|ṯ|Ṯ|ⱦ|Ⱦ|ŧ|Ŧ).*(y|Y|ý|Ý|ỳ|Ỳ|ẏ|Ẏ|ŷ|Ŷ|ÿ|Ÿ|ȳ|Ȳ|ỹ|Ỹ|ɏ|Ɏ|ỷ|Ỷ|ỵ|Ỵ)','gm')) == null) {return}

    if (event.player.level.isClientSide()) {return}

    popCreature(event.player.level, event.player, event.player, true)
})
