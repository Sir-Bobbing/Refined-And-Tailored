ItemEvents.modifyTooltips(event => {

    event.add("tfmg:asphalt", Text.gray('Increases movement speed'))

    event.add('nomansland:warding_effigy', Text.gray('Prevents hostile mob spawns in a radius, stackable'))

    event.add('simulated:navigation_table', Text.gray('Supports player heads'))

    event.add('tfmg:lead_sword', Text.gray('Attacks apply poison'))
    event.add('tfmg:lead_axe', Text.gray('Attacks apply poison'))

    event.add('tfmg:circuit_board', Text.gray('Dropped by the Scamppanzer boss'))
    event.add('tfmg:steel_mechanism', Text.gray('Rarely dropped by hostile Cog enemies'))
    event.add('powergrid:electrical_gizmo', Text.gray('Rarely dropped by Cog mobs'))

    event.add("minecraft:budding_amethyst", Text.darkPurple('Can be removed with a hammer and chisel'))
    event.add('nomansland:budding_quartzite', Text.darkPurple('Can be removed with a hammer and chisel'))

    event.add('kubejs:crystal_resonator', Text.gray('Accelerates growth of adjacent crystaline budding blocks'))
    event.add('kubejs:loader', Text.gray('Forceloads physics contraptions it is placed on'))

    event.add(['scguns:whispers', 'scguns:echoes_2', 'scguns:sculk_resonator', 'scguns:forlorn_hope'], Text.aqua('Capable of soul shattering'))

    /*
    event.modify('immersiveenchanting:ancient_book', tooltip => {
        tooltip.dynamic('ancient_book_tooltip')
    })
    */

})

/*
ItemEvents.dynamicTooltips('ancient_book_tooltip', event => {
    event.add(Text.gray("Not sure how to pull this off"))
})
*/
