// event.add('tag', 'item')
// event.remove('tag', 'item')

console.info('Tags Loaded')

function get_items_by_block_tag(block_tag){
    let item_list = []
    Block.getTaggedIds(block_tag).forEach(block=>{
        item_list.push(Block.getBlock(block).asItem().getId())
    })
    return item_list
}

ServerEvents.tags('item', event => {

// Spawn egg
    event.add('kubejs:spawn_egg', /.*_spawn_egg/)

//Ingredient Flattening
    event.add('c:dusts/sulfur', 'spelunkery:sulfur')
    event.remove('c:dusts/sulfur', 'tfmg:sulfur_dust')
    event.remove('c:dusts/sulfur', 'scguns:sulfur_dust')
    event.add('c:dusts/niter', 'spelunkery:saltpeter')
    event.add('c:dusts/saltpeter', 'spelunkery:saltpeter')
    event.remove('c:nuggets/copper', 'copper_tools_armor_backport:copper_nugget')
    event.remove('c:nuggets/copper', 'spelunkery:copper_nugget')
    event.remove('c:dusts/saltpeter', 'tfmg:nitrate_dust')
    event.remove('c:dusts/saltpeter', 'scguns:niter_dust')
    event.remove('c:dusts/niter', 'tfmg:nitrate_dust')
    event.remove('c:dusts/niter', 'scguns:niter_dust')
    event.remove('c:gems/quartz', 'malum:natural_quartz')
    event.remove('c:ingots/cast_iron', 'createbigcannons:cast_iron_ingot')
    event.remove('c:nuggets/cast_iron', 'createbigcannons:cast_iron_nugget')
    event.remove('malum:void_soulstone_material', 'createpropulsion:raw_platinum')
    event.add('c:fuel', 'nomansland:resin_oil')
    event.add('c:fuel', 'nomansland:resin_oil_bottle')

// Bookshelf
    event.add('minecraft:bookshelf_books', 'guideme:guide')

// Malum Soul Shattering
    event.add('malum:soul_shatter_capable_weapon', '#scguns:deep_dark_gun_tier')

// Enchanting Fuel
    event.add('neoforge:enchanting_fuels', 'tfmg:copper_sulfate')

// Spirit Catalysts
    event.add('kubejs:wicked_spirit_catalyst', 'minecraft:flint')
    event.add('kubejs:wicked_spirit_catalyst', 'tfmg:copper_sulfate')
    event.add('kubejs:sacred_spirit_catalyst', 'minecraft:quartz')
    event.add('kubejs:sacred_spirit_catalyst', 'tfmg:copper_sulfate')
    event.add('kubejs:arcane_spirit_catalyst', 'minecraft:amethyst_shard')
    event.add('kubejs:arcane_spirit_catalyst', 'tfmg:copper_sulfate')
    event.add('kubejs:aerial_spirit_catalyst', 'minecraft:pointed_dripstone')
    event.add('kubejs:aerial_spirit_catalyst', 'tfmg:copper_sulfate')

// Sapling Categories
    event.add('kubejs:hot_saplings', 'minecraft:jungle_sapling')
    event.add('kubejs:hot_saplings', 'minecraft:bamboo')
    event.add('kubejs:hot_saplings', 'minecraft:cactus')
    event.add('kubejs:hot_saplings', 'minecraft:acacia_sapling')
    event.add('kubejs:hot_saplings', 'nomansland:willow_sapling')
    event.add('kubejs:temperate_saplings', 'minecraft:oak_sapling')
    event.add('kubejs:temperate_saplings', 'minecraft:birch_sapling')
    event.add('kubejs:temperate_saplings', 'minecraft:dark_oak_sapling')
    event.add('kubejs:temperate_saplings', 'minecraft:mangrove_propagule')
    event.add('kubejs:temperate_saplings', 'minecraft:cherry_sapling')
    event.add('kubejs:temperate_saplings', 'nomansland:pale_cherry_sapling')
    event.add('kubejs:temperate_saplings', 'nomansland:autumnal_oak_sapling')
    event.add('kubejs:temperate_saplings', 'nomansland:yellow_birch_sapling')
    event.add('kubejs:temperate_saplings', 'nomansland:maple_sapling')
    event.add('kubejs:temperate_saplings', 'malum:runewood_sapling')
    event.add('kubejs:cold_saplings', 'minecraft:spruce_sapling')
    event.add('kubejs:cold_saplings', 'nomansland:red_maple_sapling')
    event.add('kubejs:cold_saplings', 'nomansland:pine_sapling')
    event.add('kubejs:cold_saplings', 'nomansland:walnut_sapling')
    event.add('kubejs:cold_saplings', 'malum:azure_runewood_sapling')

// Itemize Coral Block Tags
    let corals = get_items_by_block_tag("minecraft:corals")
    corals.forEach(function(item, index) {
        event.add('minecraft:corals', item)
    })
    corals = get_items_by_block_tag("minecraft:coral_blocks")
    corals.forEach(function(item, index) {
        event.add('minecraft:coral_blocks', item)
    })

// Steel Tools
    event.add('kubejs:steel_tools', 'tfmg:steel_sword')
    event.add('kubejs:steel_tools', 'tfmg:steel_pickaxe')
    event.add('kubejs:steel_tools', 'tfmg:steel_axe')
    event.add('kubejs:steel_tools', 'tfmg:steel_shovel')
    event.add('kubejs:steel_tools', 'tfmg:steel_hoe')
    event.add('kubejs:steel_tools', 'prospectingpicks:steel_prospector_pick')

// Scorched Guns Bullet Materials
    event.removeAll('scguns:advanced_bullet_material')
    event.removeAll('scguns:advanced_bullet_tips')
    event.removeAll('scguns:stan_bullet_tips')
    event.removeAll('scguns:standard_bullet_material')
    event.add('scguns:advanced_bullet_material', 'scguns:treated_iron_ingot')
    event.add('scguns:advanced_bullet_material', '#c:ingots/steel')
    event.add('scguns:advanced_bullet_tips', 'scguns:hardened_bullet')
    event.add('scguns:advanced_bullet_tips', 'scguns:treated_iron_nugget')
    event.add('scguns:advanced_bullet_tips', '#c:nuggets/steel')
    event.add('scguns:stan_bullet_tips', '#c:nuggets/lead')
    event.add('scguns:stan_bullet_tips', 'scguns:standard_bullet')
    event.add('scguns:standard_bullet_material', '#c:ingots/lead')
})

ServerEvents.tags('fluid', event => {
    event.add('c:fuel', 'nomansland:resin_oil')
    event.add('c:fuel', 'nomansland:resin_oil_bottle')
})

ServerEvents.tags('block', event => {

    // Cinnabar_wire_blacklist
    event.add('kubejs:cinnabar_protected', 'minecraft:lava')
    event.add('kubejs:cinnabar_protected', 'minecraft:water')

// Prospecting pick ore tagging
    event.add('c:ores', 'malum:primordial_soup')
    event.add('c:ores/weeping', 'malum:primordial_soup')
    event.add('c:ores', 'tfmg:crude_oil')
    event.add('c:ores', 'tfmg:oil_deposit')
    event.add('c:ores/oil', 'tfmg:crude_oil')
    event.add('c:ores/oil', 'tfmg:oil_deposit')
    event.add('c:ores/deposits/redstone', 'spelunkery:calcite_redstone_ore')

// Chunkloader Tagging
    event.add('kubejs:chunkloaders', 'chunkloaders:single_chunk_loader')
    event.add('kubejs:chunkloaders', 'chunkloaders:basic_chunk_loader')
    event.add('kubejs:chunkloaders', 'chunkloaders:advanced_chunk_loader')
    event.add('kubejs:chunkloaders', 'chunkloaders:ultimate_chunk_loader')
    event.add('simulated:non_movable', '#kubejs:chunkloaders')
    event.add('create:non_movable', '#kubejs:chunkloaders')

// Rubbery
    event.add('stoat:rubbery', 'tfmg:asphalt')
    event.add('stoat:rubbery', 'tfmg:asphalt_slab')
    event.add('stoat:rubbery', 'tfmg:asphalt_stairs')
    event.add('stoat:rubbery', 'clutternomore:tfmg/vertical_asphalt_slab')
    event.add('stoat:rubbery', 'clutternomore:tfmg/asphalt_step')

// Enderman pickup blacklist
    event.removeAll('minecraft:enderman_holdable')

// Chisel Tags
    event.add('spelunkery:chisel_immune', 'nomansland:moon_carving')
    event.remove('spelunkery:chisel_immune', 'minecraft:budding_amethyst')

// Logs
    event.add('minecraft:logs', 'malum:runewood_log')
    event.add('minecraft:logs', 'malum:runewood')
    event.add('minecraft:logs', 'malum:exposed_runewood_log')
    event.add('minecraft:logs', 'malum:revealed_runewood_log')

// Molten Metals
    event.add('kubejs:molten_metals', 'kubejs:molten_iron')
    event.add('kubejs:molten_metals', 'kubejs:molten_gold')
    event.add('kubejs:molten_metals', 'kubejs:molten_copper')
    event.add('kubejs:molten_metals', 'kubejs:molten_zinc')
    event.add('kubejs:molten_metals', 'kubejs:molten_lead')
    event.add('kubejs:molten_metals', 'kubejs:molten_nickel')
    event.add('kubejs:molten_metals', 'kubejs:molten_anthralite')

// Carver Tweaks
    event.remove('minecraft:overworld_carver_replaceables', 'minecraft:obsidian')
    event.remove('minecraft:overworld_carver_replaceables', 'minecraft:crying_obsidian')

// No Spring Break
    event.remove('spelunkery:spring_geyser_breakable', '#minecraft:overworld_carver_replaceables')
    event.remove('spelunkery:spring_geyser_breakable', 'spelunkery:rock_salt_block')
    event.remove('spelunkery:spring_geyser_breakable', '#minecraft:snow')
    event.remove('spelunkery:spring_geyser_breakable', 'minecraft:smooth_basalt')
    event.remove('spelunkery:spring_geyser_breakable', 'minecraft:blue_ice')


// Tom's Simple Storage
    event.remove('minecraft:mineable/axe', 'toms_storage:crafting_terminal')
    event.remove('minecraft:mineable/axe', 'toms_storage:storage_terminal')
    event.remove('minecraft:mineable/axe', 'toms_storage:trim')
    event.remove('minecraft:mineable/axe', 'toms_storage:inventory_connector')
    event.remove('minecraft:mineable/axe', 'toms_storage:inventory_cable')
    event.remove('minecraft:mineable/axe', 'toms_storage:inventory_cable_framed')
    event.remove('minecraft:mineable/axe', 'toms_storage:inventory_cable_connector')
    event.remove('minecraft:mineable/axe', 'toms_storage:inventory_cable_connector_framed')
    event.remove('minecraft:mineable/axe', 'toms_storage:inventory_interface')
    event.remove('minecraft:mineable/axe', 'toms_storage:level_emitter')
    event.remove('minecraft:mineable/axe', 'toms_storage:inventory_proxy')
    event.remove('minecraft:mineable/axe', 'toms_storage:basic_inventory_hopper')

    event.add('minecraft:mineable/pickaxe', 'toms_storage:crafting_terminal')
    event.add('minecraft:mineable/pickaxe', 'toms_storage:storage_terminal')
    event.add('minecraft:mineable/pickaxe', 'toms_storage:trim')
    event.add('minecraft:mineable/pickaxe', 'toms_storage:inventory_connector')
    event.add('minecraft:mineable/pickaxe', 'toms_storage:inventory_cable')
    event.add('minecraft:mineable/pickaxe', 'toms_storage:inventory_cable_framed')
    event.add('minecraft:mineable/pickaxe', 'toms_storage:inventory_cable_connector')
    event.add('minecraft:mineable/pickaxe', 'toms_storage:inventory_cable_connector_framed')
    event.add('minecraft:mineable/pickaxe', 'toms_storage:inventory_interface')
    event.add('minecraft:mineable/pickaxe', 'toms_storage:level_emitter')
    event.add('minecraft:mineable/pickaxe', 'toms_storage:inventory_proxy')
    event.add('minecraft:mineable/pickaxe', 'toms_storage:basic_inventory_hopper')

    event.add('create:wrench_pickup', 'toms_storage:crafting_terminal')
    event.add('create:wrench_pickup', 'toms_storage:storage_terminal')
    event.add('create:wrench_pickup', 'toms_storage:trim')
    event.add('create:wrench_pickup', 'toms_storage:inventory_connector')
    event.add('create:wrench_pickup', 'toms_storage:inventory_cable')
    event.add('create:wrench_pickup', 'toms_storage:inventory_cable_framed')
    event.add('create:wrench_pickup', 'toms_storage:inventory_cable_connector')
    event.add('create:wrench_pickup', 'toms_storage:inventory_cable_connector_framed')
    event.add('create:wrench_pickup', 'toms_storage:inventory_interface')
    event.add('create:wrench_pickup', 'toms_storage:level_emitter')
    event.add('create:wrench_pickup', 'toms_storage:inventory_proxy')
    event.add('create:wrench_pickup', 'toms_storage:basic_inventory_hopper')
    event.add('create:wrench_pickup', 'toms_storage:open_crate')
    event.add('create:wrench_pickup', 'toms_storage:filing_cabinet')

    // Fix break
    event.remove('minecraft:mineable/pickaxe', 'drivebysable:advanced_cable_hub')

    // Lootr Blacklist
    event.removeAll('lootr:convert/sands')
    event.removeAll('lootr:convert/gravels')

    // Metal Detector
    event.add('scguns:metal_detectable', '#c:ores/iron')
    event.add('scguns:metal_detectable', '#c:ores/copper')
    event.add('scguns:metal_detectable', '#c:ores/gold')
    event.add('scguns:metal_detectable', '#c:ores/zinc')
    event.add('scguns:metal_detectable', '#c:ores/anthralite')
    event.add('scguns:metal_detectable', '#c:ores/lead')
    event.add('scguns:metal_detectable', '#c:ores/nickel')
    event.add('scguns:metal_detectable', '#c:storage_blocks/raw_iron')
    event.add('scguns:metal_detectable', '#c:storage_blocks/raw_copper')
    event.add('scguns:metal_detectable', '#c:storage_blocks/raw_gold')
    event.add('scguns:metal_detectable', '#c:storage_blocks/raw_zinc')
    event.add('scguns:metal_detectable', '#c:storage_blocks/raw_anthralite')
    event.add('scguns:metal_detectable', '#c:storage_blocks/raw_lead')
    event.add('scguns:metal_detectable', '#c:storage_blocks/raw_nickel')
    event.add('scguns:metal_detectable', 'spelunkery:raw_magnetite_block')
    event.add('scguns:metal_detectable', 'malum:cthonic_gold_ore')
    event.add('scguns:metal_detectable', 'tfmg:bauxite')

    // Prospecting Pick Stones
    event.add('c:stones', 'minecraft:blackstone')
    event.add('c:stones', 'minecraft:dripstone')
    event.add('c:stones', 'minecraft:calcite')
    event.add('c:stones', 'nomansland:quartzite')
    event.add('c:stones', 'malum:smooth_twisted_rock')
    event.add('c:stones', 'architects_palette:warpstone')
    event.add('c:stones', 'scguns:phosphorite')
    event.add('c:stones', 'create:limestone')
    event.add('c:stones', 'create:scoria')
    event.add('c:stones', 'create:crimsite')
    event.add('c:stones', 'create:veridium')
    event.add('c:stones', 'create:ochrum')
    event.add('c:stones', 'create:asurine')
    event.add('c:stones', 'tfmg:lignite')
    event.add('c:stones', 'tfmg:galena')

    // Custom ore tagging

    for (let ore of lib.customOres) {
        console.log('PLEASE WORK',ore)
        event.add('minecraft:mineable/pickaxe', ore.namespace)
        event.add('c:ores', ore.namespace)
        event.add('c:ores/' + ore.id, ore.namespace)
        if (ore.vein) { event.add('c:ores/deposits/' + ore.id, ore.namespace) }
        if (ore.stoneTier) { event.add('minecraft:needs_stone_tool', ore.namespace) }
        if (ore.ironTier) { event.add('minecraft:needs_iron_tool', ore.namespace) }
    }
})

ServerEvents.tags('entity_type', event => {
// Cage and Jar Entities
        event.add('supplementaries:jar_catchable', 'minecraft:silverfish')
        event.add('supplementaries:jar_catchable', 'endermanoverhaul:spirit')
        event.add('supplementaries:jar_catchable', 'endermanoverhaul:scarab')
        event.add('supplementaries:jar_catchable', 'minecraft:endermite')
        event.add('supplementaries:jar_catchable', 'scguns:swarm')
        event.add('supplementaries:jar_baby_catchable', 'minecraft:turtle')
        event.add('supplementaries:jar_baby_catchable', 'minecraft:chicken')
        event.add('supplementaries:jar_baby_catchable', 'nomansland:goose')
        event.add('supplementaries:cage_catchable', 'scguns:scampler')
        event.add('supplementaries:cage_catchable', 'minecraft:silverfish')
        event.add('supplementaries:cage_catchable', 'endermanoverhaul:spirit')
        event.add('supplementaries:cage_catchable', 'endermanoverhaul:scarab')
        event.add('supplementaries:cage_catchable', 'minecraft:wolf')
        event.add('supplementaries:cage_catchable', 'nomansland:goose')
        event.add('supplementaries:cage_catchable', 'envelope:pigeon')
        event.add('supplementaries:cage_baby_catchable', 'minecraft:camel')
        event.add('supplementaries:cage_baby_catchable', 'nomansland:deer')
        event.add('supplementaries:cage_baby_catchable', 'minecraft:panda')
        event.add('supplementaries:cage_baby_catchable', 'minecraft:llama')
        event.add('supplementaries:cage_baby_catchable', 'minecraft:trader_llama')
        event.add('supplementaries:cage_baby_catchable', 'minecraft:drowned')
        event.add('supplementaries:cage_baby_catchable', 'minecraft:mooshroom')
        event.add('supplementaries:cage_baby_catchable', 'nomansland:tortoise')
        event.add('supplementaries:cage_baby_catchable', 'minecraft:strider')
        event.add('supplementaries:cage_baby_catchable', 'minecraft:villager')
        event.add('supplementaries:cage_baby_catchable', 'minecraft:zombie')
        event.add('supplementaries:cage_baby_catchable', 'minecraft:zombie_villager')
        event.add('supplementaries:cage_baby_catchable', 'minecraft:turtle')
        event.add('supplementaries:cage_baby_catchable', 'kobolds:kobold_child')
        event.add('supplementaries:cage_baby_catchable', 'minecraft:husk')
        event.add('supplementaries:cage_baby_catchable', 'minecraft:zombified_piglin')

// Bullet Projectiles
        event.add('scguns:bullet', 'scguns:advanced_round_projectile')
        event.add('scguns:bullet', 'scguns:basic_bullet_projectile')
        event.add('scguns:bullet', 'scguns:bearpack_shell_projectile')
        event.add('scguns:bullet', 'scguns:beowulf_projectile')
        event.add('scguns:bullet', 'scguns:blaze_rod_projectile')
        event.add('scguns:bullet', 'scguns:buckshot_projectile')
        event.add('scguns:bullet', 'scguns:fire_round_projectile')
        event.add('scguns:bullet', 'scguns:gibbs_round_projectile')
        event.add('scguns:bullet', 'scguns:hardened_bullet_projectile')
        event.add('scguns:bullet', 'scguns:hog_round_projectile')
        event.add('scguns:bullet', 'scguns:krahg_round_projectile')
        event.add('scguns:bullet', 'scguns:osborne_slug_projectile')
        event.add('scguns:bullet', 'scguns:plasma_projectile')
        event.add('scguns:bullet', 'scguns:projectile')
        event.add('scguns:bullet', 'scguns:ramrod_projectile')
        event.add('scguns:bullet', 'scguns:shatter_round_projectile')
        event.add('scguns:bullet', 'scguns:shotball_projectile')
        event.add('scguns:bullet', 'scguns:shulkshot_projectile')
        event.add('scguns:bullet', 'scguns:syringe_projectile')
        event.add('scguns:bullet', 'scguns:fire_grenade_round')
        event.add('scguns:bullet', 'scguns:bouncy_grenade_round')
        event.add('scguns:bullet', 'scguns:gas_grenade_round')
        event.add('scguns:bullet', 'scguns:he_grenade_round')
        event.add('scguns:bullet', 'scguns:microjet')
        event.add('scguns:bullet', 'scguns:rocket')
        event.add('scguns:bullet', 'scguns:scamp_rocket')

// Gunner blacklist
        event.remove('scguns:gunner', 'minecraft:zombie')
        event.remove('scguns:gunner', 'minecraft:zombie_villager')
        event.remove('scguns:gunner', 'minecraft:zombified_piglin')
        event.remove('scguns:gunner', 'minecraft:husk')
        event.remove('scguns:gunner', 'minecraft:wither_skeleton')

})

// Categorize all ruins into one tag
ServerEvents.tags('worldgen/structure', event => {
    event.add('kubejs:ruins', 'minecraft:trail_ruins')
    event.add('kubejs:ruins', '#minecraft:ocean_ruin')
    event.add('kubejs:ruins', 'nomansland:alchemist_ruins')
    event.add('kubejs:ruins', 'nomansland:desert_ruin')
    event.add('kubejs:ruins', 'nova_structures:conduit_ruin')
    event.add('kubejs:ruins', 'nova_structures:desert_ruins')
    event.add('kubejs:ruins', 'nova_structures:jungle_ruins')
    event.add('kubejs:ruins', 'nova_structures:remnant_ruin_farmer')
    event.add('kubejs:ruins', 'nova_structures:remnant_ruin_smith')
    event.add('kubejs:ruins', 'nova_structures:ruin_town')
    event.add('kubejs:ruins', 'nova_structures:wild_ruin')
})

ServerEvents.tags('enchantment', event => {
    

    event.add('nova_structures:positive', "nova_structures:antidote")
    event.add('nova_structures:positive', "nova_structures:ghasted")
    event.add('nova_structures:positive', "nova_structures:gravity")
    event.add('nova_structures:positive', "nova_structures:illagers_bane")
    event.add('nova_structures:positive', "nova_structures:multishot")
    event.add('nova_structures:positive', "nova_structures:outreach")
    event.add('nova_structures:positive', "nova_structures:piercing")
    event.add('nova_structures:positive', "nova_structures:power")
    event.add('nova_structures:positive', "nova_structures:traveler")
    event.add('nova_structures:positive', "nova_structures:wax_wings")
    event.add('nova_structures:positive', "nova_structures:wither_coated")

    event.add('minecraft:on_mob_spawn_equipment', 'nova_structures:gravity')
    event.add('minecraft:on_mob_spawn_equipment', 'nova_structures:multishot')
    event.add('minecraft:on_mob_spawn_equipment', 'nova_structures:piercing')
    event.add('minecraft:on_mob_spawn_equipment', 'nova_structures:power')
    event.add('minecraft:on_mob_spawn_equipment', 'nova_structures:wither_coated')
    event.add('minecraft:on_mob_spawn_equipment', 'nova_structures:conductivity_curse')
    
    event.add('minecraft:on_traded_equipment', '#nova_structures:positive')
    event.add('minecraft:on_random_loot', '#nova_structures:positive')

    let resetTags = [
        'nova_structures:antidote',
        //'nova_structures:conductivity_curse' // for some reason bricks everything
        'nova_structures:end_castle',
        'nova_structures:ghasted',
        'nova_structures:gravity',
        'nova_structures:illagers_bane',
        'nova_structures:multishot',
        'nova_structures:outreach',
        'nova_structures:photosynthesis',
        'nova_structures:piercing',
        'nova_structures:power',
        'nova_structures:shrine',
        'nova_structures:toxic',
        'nova_structures:traveler',
        'nova_structures:wax_wings',
        'nova_structures:wither_coated'
    ]

    for (let tag of resetTags) {
        event.removeAll(tag)
        event.add(tag, '#minecraft:on_random_loot')
    }

    let removeEnchants = [
        'minecraft:mending',
        "nova_structures:shulker_boss",
        "nova_structures:shulker_miniboss",
        "nova_structures:boss_behaviour",
        "nova_structures:photosynthesis"
    ]

    event.remove('minecraft:tradeable', removeEnchants)
    event.remove('minecraft:treasure', removeEnchants)
    event.remove('minecraft:on_traded_equipment', removeEnchants)
    event.remove('minecraft:on_random_loot', removeEnchants)
    event.remove('minecraft:on_mob_spawn_equipment', removeEnchants)

})

ServerEvents.tags('damage_type', event => {
	const id = 'kubejs:giggler'
	event.add('minecraft:bypasses_armor',id)
	event.add('minecraft:bypasses_resistance',id)
	event.add('minecraft:bypasses_effects',id)
	event.add('minecraft:bypasses_enchantments',id)
	event.add('minecraft:bypasses_shield',id)
	event.add('minecraft:bypasses_cooldown',id)
})
