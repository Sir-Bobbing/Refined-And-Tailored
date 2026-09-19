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
        stone:'lignite',
        vein:true,
        exp: [0,2]
    },
    {
        id: 'copper',
        stone:'veridium',
        vein:true,
        stoneTier:true,
        exp: 0
    },
    {
        id: 'iron',
        stone:'crimsite',
        vein:true,
        stoneTier:true,
        exp: 0
    },
    {
        id: 'iron',
        stone:'tuff',
        vein:true,
        stoneTier:true,
        exp: 0,
        texture:'spelunkery:block/tuff_iron_ore'
    },
    {
        id: 'iron',
        stone:'dripstone',
        stoneTier:true,
        exp: 0
    },
    {
        id: 'gold',
        stone:'ochrum',
        vein:true,
        ironTier:true,
        exp: 0
    },
    {
        id: 'gold',
        stone:'quartzite',
        ironTier:true,
        exp: 0
    },
    {
        id: 'lapis',
        stone:'calcite',
        vein:true,
        stoneTier:true,
        exp: [2,5]
    },
    {
        id: 'diamond',
        stone:'smooth_basalt',
        vein:true,
        ironTier:true,
        exp: [3,7],
        texture:'spelunkery:block/smooth_basalt_diamond_ore'
    }
]

for (let ore of lib.customOres) {
    if (ore.stone) {
        ore.name = ore.stone + '_' + ore.id + '_ore'
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