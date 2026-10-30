// priority: 100
global.lib = {}

var lib = global.lib

// Enabling this will make certain scripts generate new assets/data files dynamically
lib.dataGeneration = false
if (lib.dataGeneration) {
    console.warn('KubeJS data generation is enabled. Only needs to be turned on when making modifications!')
}

lib.sound = 'playSound(net.minecraft.world.entity.player.Player,net.minecraft.core.BlockPos,net.minecraft.sounds.SoundEvent,net.minecraft.sounds.SoundSource,float,float)'

lib.funcs = {}

lib.customOres = [
    {
        id: 'coal',
        stone:'tfmg:lignite',
        vein:true,
        exp: [0,2],
        smelted: 'minecraft:coal',
        crushed: 'minecraft:coal'
    },
    {
        id: 'copper',
        stone:'create:veridium',
        vein:true,
        stoneTier:true,
        exp: 0,
        smelted: 'minecraft:copper_ingot',
        crushed: 'create:crushed_raw_copper',
        yield: 7
    },
    {
        id: 'iron',
        stone:'create:crimsite',
        vein:true,
        stoneTier:true,
        exp: 0,
        smelted: 'minecraft:iron_ingot',
        crushed: 'create:crushed_raw_iron'
    },
    {
        id: 'iron',
        stone:'minecraft:tuff',
        vein:true,
        stoneTier:true,
        exp: 0,
        texture:'spelunkery:block/tuff_iron_ore',
        smelted: 'minecraft:iron_ingot',
        crushed: 'create:crushed_raw_iron',
        yield: 2
    },
    {
        id: 'iron',
        stone:'minecraft:dripstone_block',
        stoneTier:true,
        exp: 0,
        smelted: 'minecraft:iron_ingot',
        crushed: 'create:crushed_raw_iron'
    },
    {
        id: 'gold',
        stone:'create:ochrum',
        vein:true,
        ironTier:true,
        exp: 0,
        smelted: 'minecraft:gold_ingot',
        crushed: 'create:crushed_raw_gold',
        yield: 2,
        brilliance: 2
    },
    {
        id: 'gold',
        stone:'nomansland:quartzite',
        ironTier:true,
        exp: 0,
        smelted: 'minecraft:gold_ingot',
        crushed: 'create:crushed_raw_gold',
        brilliance: 2
    },
    {
        id: 'lapis',
        stone:'minecraft:calcite',
        vein:true,
        stoneTier:true,
        exp: [2,5],
        smelted: 'minecraft:lapis_lazuli',
        crushed: 'spelunkery:rough_lazurite',
        yield: 4
    },
    {
        id: 'diamond',
        stone:'minecraft:smooth_basalt',
        vein:true,
        ironTier:true,
        exp: [3,7],
        texture:'spelunkery:block/smooth_basalt_diamond_ore',
        smelted: 'minecraft:diamond',
        crushed: 'spelunkery:rough_diamond',
        yield: 2
    }
]

for (let ore of lib.customOres) {
    if (ore.stone) {
        ore.stone_name = ore.stone.split(':')[1].replace('_block','')
        ore.name = ore.stone_name + '_' + ore.id + '_ore'
    }
    else {
        ore.name = ore.id + '_ore'
    }
    ore.namespace = 'kubejs:' + ore.name
}

lib.runServerCommand = function(level,command) {
    return level.server.runCommandSilent(`execute in ${level.getDimension().toString()} run ${command}`)
}

lib.getFunc = function( id ) {
    let func = lib.funcs[id]
    if (func == null) {
        func = function() {}
    }
    return func
}

lib.setFunc = function( id, func ) {
    lib.funcs[id] = func
}