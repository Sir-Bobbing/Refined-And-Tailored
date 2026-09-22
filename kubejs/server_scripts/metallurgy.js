const moltenMetals = [
    ["iron","minecraft:iron_ingot", "create:crushed_raw_iron", "tfmg:limesand", "malum:iron_node"],
    ["gold","minecraft:gold_ingot", "create:crushed_raw_gold", "create:powdered_obsidian", "malum:gold_node"],
    ["copper","minecraft:copper_ingot", "create:crushed_raw_copper", "tfmg:limesand", "malum:copper_node"],
    ["zinc","create:zinc_ingot", "create:crushed_raw_zinc", "create:cinder_flour", "malum:iron_node"],
    ["lead","tfmg:lead_ingot", "create:crushed_raw_lead", "tfmg:limesand", "malum:lead_node"],
    ["nickel", "tfmg:nickel_ingot", "create:crushed_raw_nickel", "create:cinder_flour", "malum:nickel_node"],
    ["anthralite", "scguns:anthralite_ingot", "scguns:crushed_raw_anthralite", "tfmg:limesand",],
    ["debris", "minecraft:netherite_scrap", "minecraft:ancient_debris", "aeronautics:end_stone_powder"]
    // Name, Crushed Item Mod, Ingot Item Mod
]

function getMoltenID( metalInfo ) {
    return "kubejs:molten_" + metalInfo[0]
}

function getSlurryID( metalInfo ) {
    return "kubejs:slurry_" + metalInfo[0]
}

function getIngotID( metalInfo ) {
    return metalInfo[1]
}

function getCrushedID( metalInfo ) {
    return metalInfo[2]
}

function getFluxID( metalInfo ) {
    return metalInfo[3]
}

function getNodeID( metalInfo ) {
    return metalInfo[4]
}

function registerCasting( event, metalInfo ) {
    event.custom({
        type: 'tfmg:casting',
        ingredients: [{
            "type": "neoforge:single",
            "amount": 144,
            "fluid": getMoltenID( metalInfo )
        }],
        "processing_time": 50,
        "results": [{
            "id": getIngotID(metalInfo)
        }]
    })
}

function registerBlasting( event, metalInfo ) {
    event.custom({
        type: 'tfmg:industrial_blasting',
        ingredients: [
            { item:getCrushedID(metalInfo) },
            { item:getFluxID(metalInfo) }
        ],
        "processing_time": 100,
        "results": [
            {
                "amount": 288,
                "id": getMoltenID(metalInfo)
            },
            {
                "amount": 300,
                "id": "tfmg:molten_slag"
            },
            {
                "amount": 200,
                "id": "tfmg:furnace_gas"
            }
        ]
    })
}

function registerVatLow( event, metalInfo ) {
    event.custom({
        type: "tfmg:vat_machine_recipe",
        "allowed_vat_types": [
            "tfmg:steel_vat",
            "tfmg:firebrick_lined_vat"
        ],
        "heat_requirement": "heated",
        "machines": [
            "tfmg:electrode",
            "tfmg:electrode",
            "tfmg:mixing"
        ],
        "min_size": 8,
        "processing_time": 40,
        "ingredients": [
            {
                "item": getCrushedID(metalInfo)
            },
            {
                "item": getFluxID(metalInfo)
            },
            {
                "item": getFluxID(metalInfo)
            }
        ],
        "results": [
            {
                "amount": 432,
                "id": getMoltenID(metalInfo)
            },
            {
                "amount": 200,
                "id": "tfmg:molten_slag"
            }
        ]
    })
}

function registerVatHigh( event, metalInfo ) {
    event.custom({
        type: "tfmg:vat_machine_recipe",
        "allowed_vat_types": [
            "tfmg:firebrick_lined_vat"
        ],
        "heat_requirement": "superheated",
        "machines": [
            "tfmg:graphite_electrode",
            "tfmg:graphite_electrode",
            "tfmg:graphite_electrode",
            "tfmg:mixing"
        ],
        "min_size": 9,
        "processing_time": 20,
        "ingredients": [
            {
                "type": "neoforge:single",
                "amount": 144,
                "fluid": getSlurryID( metalInfo )
            }
        ],
        "results": [
            {
                "amount": 288,
                "id": getMoltenID(metalInfo)
            },
            {
                "amount": 100,
                "id": "tfmg:molten_slag"
            }
        ]
    })
}

function registerSlurry(event, metalInfo) {
    event.custom({
        type: "tfmg:vat_machine_recipe",
        "allowed_vat_types": [
            "tfmg:steel_vat",
            "tfmg:firebrick_lined_vat"
        ],
        "heat_requirement": "heated",
        "machines": [
            "tfmg:mixing"
        ],
        "min_size": 1,
        "processing_time": 20,
        "ingredients": [
            {
                "item": getCrushedID(metalInfo)
            },
            {
                "item": getFluxID(metalInfo)
            },
            {
                "type": "neoforge:single",
                "amount": 100,
                "fluid": "tfmg:sulfuric_acid"
            }
        ],
        "results": [
            {
                "amount": 288,
                "id": getSlurryID(metalInfo)
            }
        ]
    })
}

function registerNodeConversion(event, metalInfo) {
    event.custom({
        type: "malum:spirit_infusion",
        "extraInputs": [{
            "count": 1,
            "item": "minecraft:clay_ball"
        }],
        "input": {
            "count": 2,
            "item": getNodeID(metalInfo)
        },
        "result": {
            "count": 1,
            "id": getCrushedID(metalInfo)
        },
        "spirits": [
            {
            "type": "malum:aqueous",
            "count": 2
            }
        ]
    })
}

ServerEvents.recipes(event => {
    let len = moltenMetals.length
    for (let i = 0; i < len; i++) {
        let metalInfo = moltenMetals[i]
        registerCasting(event, metalInfo)
        registerBlasting(event, metalInfo)
        registerVatLow(event, metalInfo)
        registerVatHigh(event, metalInfo)
        registerSlurry(event, metalInfo)
        if (metalInfo[4] != null) {
            registerNodeConversion(event, metalInfo)
        }
    }
})

PlayerEvents.tick(event=>{
    let player = event.player;
    if(isNaN(player.health)) player.setHealth(0)
    if([player.block, player.block.up].some(b => b.hasTag("kubejs:molten_metals"))){
        event.entity.attack(player.damageSources().lava(), 10 ) // Damage amount
    }
})
