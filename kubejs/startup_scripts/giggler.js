StartupEvents.registry('item', event => {

    const enabled = true
    const range = 8

    function getRandomNearbyCreature( level, pos, user ) {
        let ents = level.getEntitiesWithin(AABB.ofBlock(pos).inflate(range)).filter(ent =>{
            return ent.isLiving() && (!ent.hasCustomName() || ent.isPlayer())
        })
        let random = Math.floor(Math.random()*ents.length)
        return ents[random]
    }

    function popCreature( level, entity, source ) {
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
            const keep = lib.runServerCommand(level,'gamerule keepInventory') == 'Gamerule keepInventory is currently set to: true'
            if (!keep) {lib.runServerCommand(level,'gamerule keepInventory true')}
            entity.damage(10000, new DamageSource['(net.minecraft.core.Holder,net.minecraft.world.entity.Entity)']('kubejs:giggler', source))
            entity.setPos(entity.x, entity.y - 6, entity.z)
            if (!keep) {lib.runServerCommand(level,'gamerule keepInventory false')}
        }
        else {
            entity.setPos(entity.x, -1024, entity.z)
            entity.damage(10000, new DamageSource['(net.minecraft.core.Holder,net.minecraft.world.entity.Entity)']('kubejs:giggler', source))
        }

        level.explode(null, entity.x, centerY, entity.z, 1, "mob")
    }

    let itemBuilder = event.create('giggler')
    .displayName("Giggler")
    .texture('kubejs:item/giggler')
    .parentModel('kubejs:item/giggler.json')
    .rarity('UNCOMMON')
    .tooltip('§e☻ §7laugh with your friends §e☻')
    .useAnimation('bow')
    .useDuration(itemstack => 20)

    if (enabled) {
        itemBuilder.use((level, player, hand) => {
            level[lib.sound](null, player.blockPosition(), "malum:legalize_nuclear_bombs", "master", 1, 2)
            return true
        })
        .finishUsing((itemstack, level, entity) => {
            if (!level.isClientSide()) {
                if (entity.isFakePlayer()) {return itemstack}
                let nearbyEntity = getRandomNearbyCreature(level, entity.blockPosition())
                if (nearbyEntity == null) {nearbyEntity = entity}
                if (nearbyEntity != null) {
                    popCreature( level, nearbyEntity, entity )
                    // Long cooldown if you target yourself with the giggler
                    entity.addItemCooldown("kubejs:giggler", (nearbyEntity == entity ?  20 : 3) * 20)
                    itemstack.shrink(1)
                } 
            }
            return itemstack
        })
        .releaseUsing((itemstack, level, entity) => {
            entity.addItemCooldown("kubejs:giggler", 3 * 20);
        })
    }
    
})
