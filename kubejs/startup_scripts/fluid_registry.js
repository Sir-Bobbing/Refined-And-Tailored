const $SoundEvents = Java.loadClass('net.minecraft.sounds.SoundEvents')
const $ParticleTypes = Java.loadClass('net.minecraft.core.particles.ParticleTypes')

const moltenMetals = [
    ["iron", 0xD5D5D5],
    ["gold", 0xFADC5E],
    ["copper", 0xE78F61],
    ["zinc", 0xB7E6BF],
    ["lead", 0x7d9292],
    ["nickel", 0xcfd0c7],
    ["anthralite", 0x8A5F21],
    ["debris", 0x593B15]
]

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function registerMoltenFluid(event, name, color) {
    event.create('molten_' + name, 'thick')
    .displayName('Molten ' + capitalizeFirstLetter( name ))
    .tint(color)
    .tickRate(4)
    .type(type => type
        .stillTexture('kubejs:block/molten_still')
        .flowingTexture('kubejs:block/molten_flow')
        .lightLevel(12)
    )
}

function registerSlurryFluid(event, name, color) {
    event.create('slurry_' + name, 'thin')
    .displayName(capitalizeFirstLetter( name ) + " Slurry")
    .tint(color)
    .type(type => type
    )
}

StartupEvents.registry('fluid', event => {
    for (let i = 0; i < moltenMetals.length; i++) {
        let info = moltenMetals[i]
        registerMoltenFluid(event, info[0], info[1])
        registerSlurryFluid(event, info[0], info[1])
    }
})

BlockEvents.modification(event => {
    for (let i = 0; i < moltenMetals.length; i++) {
        let info = moltenMetals[i]
        event.modify('kubejs:molten_' + info[0], block => {
            block.lightEmission = 12
        })
    }
})
