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
                    entity.addItemCooldown("kubejs:giggler", (nearbyEntity == entity ?  20 : 3) * 20)
                    lib.getFunc('popCreature')(level, nearbyEntity, entity)
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
