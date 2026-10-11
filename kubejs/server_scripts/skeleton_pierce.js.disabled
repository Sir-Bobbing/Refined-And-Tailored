// Skeletons love to shoot other mobs. What if they could hit you still?
// Will pierce through shields, beware

EntityEvents.spawned(event => {
    event.level
    let id = event.entity.type
    if (id == "minecraft:stray" || id == "minecraft:bogged") {
        let mob = event.entity
        let item = mob.getItemBySlot('mainhand')
        if (Math.random() < 0.1 && item.id == "minecraft:bow") {
            item.enchant('nova_structures:piercing', 2)
        }
    }
})