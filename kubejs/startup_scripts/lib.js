// priority: 100
global.lib = {}

var lib = global.lib

lib.sound = 'playSound(net.minecraft.world.entity.player.Player,net.minecraft.core.BlockPos,net.minecraft.sounds.SoundEvent,net.minecraft.sounds.SoundSource,float,float)'
lib.funcs = {}

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