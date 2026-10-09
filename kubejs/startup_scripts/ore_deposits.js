let $Item$Properties = Java.loadClass("net.minecraft.world.item.Item$Properties");
let $BlockBehaviour$Properties = Java.loadClass('net.minecraft.world.level.block.state.BlockBehaviour$Properties');
let $DropExperienceBlock = Java.loadClass('net.minecraft.world.level.block.DropExperienceBlock')
let $BlockItem = Java.loadClass("net.minecraft.world.item.BlockItem")

let $NMLBlocks = Java.loadClass('com.farcr.nomansland.common.registry.blocks.NMLBlocks')

const oreProperties = {
    "lignite_coal":$BlockBehaviour$Properties.ofFullCopy(Blocks.TUFF),
    "veridium_copper":$BlockBehaviour$Properties.ofFullCopy(Blocks.TUFF),
    "crimsite_iron":$BlockBehaviour$Properties.ofFullCopy(Blocks.DEEPSLATE),
    "tuff_iron":$BlockBehaviour$Properties.ofFullCopy(Blocks.TUFF),
    "dripstone_iron":$BlockBehaviour$Properties.ofFullCopy(Blocks.DRIPSTONE_BLOCK),
    "ochrum_gold":$BlockBehaviour$Properties.ofFullCopy(Blocks.CALCITE),
    "quartzite_gold":$BlockBehaviour$Properties.ofFullCopy(Blocks.CALCITE),
    "calcite_lapis":$BlockBehaviour$Properties.ofFullCopy(Blocks.CALCITE),
    "smooth_basalt_diamond":$BlockBehaviour$Properties.ofFullCopy(Blocks.SMOOTH_BASALT),
}

function addOreBlockExp(event, ore) {
    let name = ore.name
    name = name.substring(0,name.length-4)
    return event.createCustom(ore.name, () => new $DropExperienceBlock( ore.exp,
        oreProperties[name]
        .destroyTime(1.25)
    ))
}

function addOreBlockItem(event, name, block) {
    event.createCustom(name, () => new $BlockItem(block.get(), new $Item$Properties()));
}

let oreBlocks = {}

StartupEvents.registry('block', event => {
    oreProperties["quartzite_gold"] = $NMLBlocks.QUARTZITE.value().properties()
    for (let ore of lib.customOres) {
        oreBlocks[ore.name] = addOreBlockExp(event, ore)
    }
})

StartupEvents.registry("item", event => {
    for (let [name, block] of Object.entries(oreBlocks)) {
        addOreBlockItem(event, name, block)
    }
});