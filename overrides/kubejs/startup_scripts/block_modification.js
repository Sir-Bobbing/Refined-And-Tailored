console.info('Block modifications load.')

BlockEvents.modification(event => {

    // Tom's simple storage

    event.modify('toms_storage:crafting_terminal', block => {
        block.soundType = 'metal'
    })
    event.modify('toms_storage:storage_terminal', block => {
        block.soundType = 'metal'
    })
    event.modify('toms_storage:trim', block => {
        block.soundType = 'metal'
    })
    event.modify('toms_storage:inventory_connector', block => {
        block.soundType = 'metal'
    })
    event.modify('toms_storage:inventory_cable', block => {
        block.soundType = 'metal'
    })
    event.modify('toms_storage:inventory_cable_framed', block => {
        block.soundType = 'metal'
    })
    event.modify('toms_storage:inventory_cable_connector', block => {
        block.soundType = 'metal'
    })
    event.modify('toms_storage:inventory_cable_connector_framed', block => {
        block.soundType = 'metal'
    })
    event.modify('toms_storage:inventory_interface', block => {
        block.soundType = 'metal'
    })
    event.modify('toms_storage:level_emitter', block => {
        block.soundType = 'metal'
    })
    event.modify('toms_storage:inventory_proxy', block => {
        block.soundType = 'metal'
    })
    event.modify('toms_storage:basic_inventory_hopper', block => {
        block.soundType = 'metal'
    })

    // Asphalt

    const asphaltBlocks = [
        'tfmg:asphalt_slab',
        'tfmg:asphalt_stairs',
        'diagonalwalls:tfmg/asphalt_wall',
        'clutternomore:tfmg/vertical_asphalt_slab',
        'clutternomore:tfmg/asphalt_step'
    ]

    event.modify('tfmg:asphalt', block => {
        block.speedFactor = 1.3
        block.friction = 0.55
    })

    for (let id of asphaltBlocks) {
        event.modify(id, block => {
            block.speedFactor = 1.125
            block.friction = 0.5
        })
    }

})
