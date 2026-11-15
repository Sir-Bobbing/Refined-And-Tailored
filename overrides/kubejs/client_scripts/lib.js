// priority: 100
var lib = global.lib

function genOreBlockState(namespace) {
    return {"variants":{"":{"model":namespace}}}
}

function genOreBlockModel(ore) {
    if (ore.texture) {
        return {"parent":"minecraft:block/cube_all","textures":{"all":ore.texture}}
    }
    return {"parent":"minecraft:block/cube_all","textures":{"all":'kubejs:block/' + ore.name}}
}

function genOreItemModel(namespace) {
    return {"parent":namespace}
}

if (lib.dataGeneration == true) {

    console.info('Generating data for ore deposits')

    for (let ore of lib.customOres) {
        let namespace = 'kubejs:block/' + ore.name
        JsonIO.write(`kubejs/assets/kubejs/blockstates/${ore.name}.json`, genOreBlockState(namespace))
        JsonIO.write(`kubejs/assets/kubejs/models/block/${ore.name}.json`, genOreBlockModel(ore))
        JsonIO.write(`kubejs/assets/kubejs/models/item/${ore.name}.json`, genOreItemModel(namespace))
    }
}