// Visit the wiki for more info - https://kubejs.com/
console.info('Loaded JEI adjustments')

RecipeViewerEvents.removeEntries('item', event => {
// Enchanted Books

    let enchantmentEntries = {
        minecraft:[
            'mending'
        ],
        nova_structures:[
            'boss_behaviour',
            'photosynthesis',
            'shulker_boss',
            'shulker_miniboss'
        ],
        redomesticate:[
            'amphibious',
            'blazing_protection',
            'blight_curse',
            'bubbling',
            'chain_lightning',
            'charisma',
            'deflection',
            'defusal',
            'disc_jockey',
            'fireproof',
            'frost_fang',
            'gluttonous',
            'healing_aura',
            'health_boost',
            'health_siphon',
            'herding',
            'immaturity_curse',
            'immunity_frame',
            'infamy_curse',
            'intimidation',
            'linked_inventory',
            'magnetic',
            'muffled',
            'ore_scenting',
            'poison_resistance',
            'psychic_wall',
            'rejuvenation',
            'shadow_hands',
            'speedster',
            'tethered_teleport',
            'total_recall',
            'undead_curse',
            'vampire',
            'void_cloud',
            'warping_bite'
        ]
    }

    event.remove('minecraft:enchanted_book')

    for (const [mod, enchants] of Object.entries(enchantmentEntries)) {
        for (let enchant of enchants) {
            event.remove(`immersiveenchanting:ancient_book[stored_enchantments={levels:{"${mod}:${enchant}":1}}]`)
        }
    }
})
// Fluids
RecipeViewerEvents.removeEntries('fluid', event => {
    event.remove('createpropulsion:turpentine')

})
// GuideME
RecipeViewerEvents.addEntries('item', event => {
    event.add('guideme:guide[guideme:guide_id="kubejs:guide"]')
    //event.add('supplementaries:cartographers_quill[supplementaries:quill_structure="malum:weeping_well",custom_name=\'"Sub-terranian Arcane Anomaly"\',supplementaries:quill_search_radius=1000,supplementaries:quill_decoration="supplementaries:waystone",supplementaries:quill_color=-1634752001]')
})
