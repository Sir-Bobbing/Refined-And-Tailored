ServerEvents.recipes(event => {

    const spiritCatalysts = {
        "malum:sacred": {"tag":'kubejs:sacred_spirit_catalyst'},
        "malum:wicked": {"tag":'kubejs:wicked_spirit_catalyst'},
        "malum:arcane": {"tag":'kubejs:arcane_spirit_catalyst'},
        "malum:eldritch": {"item":'architects_palette:unobtanium'},
        "malum:aerial": {"tag":'kubejs:aerial_spirit_catalyst'},
        "malum:aqueous": {"item":'minecraft:clay_ball'},
        "malum:earthen": {"tag":'spelunkery:pebbles'},
        "malum:infernal": {"item":'minecraft:glowstone_dust'}
    }

    const spawnableCreatures = {
        "minecraft:enderman":{"item": 'minecraft:ender_pearl', "hostile":true},
        "endermanoverhaul:badlands_enderman":{"item": 'minecraft:ender_pearl', "hostile":true},
        "endermanoverhaul:cave_enderman":{"item": 'minecraft:ender_pearl', "hostile":true},
        "endermanoverhaul:crimson_forest_enderman":{"item": 'endermanoverhaul:crimson_pearl', "hostile":true},
        "endermanoverhaul:dark_oak_enderman":{"item": 'minecraft:ender_pearl', "hostile":true},
        "endermanoverhaul:desert_enderman":{"item": 'minecraft:ender_pearl', "hostile":true},
        "endermanoverhaul:end_enderman":{"item": 'endermanoverhaul:corrupted_pearl', "hostile":true},
        "endermanoverhaul:end_islands_enderman":{"item": 'endermanoverhaul:ancient_pearl', "hostile":true},
        "endermanoverhaul:flower_fields_enderman":{"item": 'minecraft:ender_pearl', "hostile":true},
        "endermanoverhaul:ice_spikes_enderman":{"item": 'endermanoverhaul:icy_pearl', "hostile":true},
        "endermanoverhaul:mushroom_fields_enderman":{"item": 'minecraft:ender_pearl', "hostile":true},
        "endermanoverhaul:nether_wastes_enderman":{"item": 'minecraft:ender_pearl', "hostile":true},
        "endermanoverhaul:coral_enderman":{"item": 'endermanoverhaul:bubble_pearl', "hostile":true},
        "endermanoverhaul:savanna_enderman":{"item": 'minecraft:ender_pearl', "hostile":true},
        "endermanoverhaul:snowy_enderman":{"item": 'endermanoverhaul:icy_pearl', "hostile":true},
        "endermanoverhaul:soulsand_valley_enderman":{"item": 'endermanoverhaul:soul_pearl', "hostile":true},
        "endermanoverhaul:swamp_enderman":{"item": 'endermanoverhaul:summoner_pearl', "hostile":true},
        "endermanoverhaul:warped_forest_enderman":{"item": 'endermanoverhaul:warped_pearl', "hostile":true},
        "endermanoverhaul:windswept_hills_enderman":{"item": 'endermanoverhaul:summoner_pearl', "hostile":true},

        "minecraft:cow":{"item": 'minecraft:beef'},
        "minecraft:mooshroom":{"item": 'minecraft:beef'},
        "minecraft:horse":{"item": 'nomansland:raw_horse'},
        "minecraft:llama":{"item": 'minecraft:leather'},
        "minecraft:pig":{"item": 'minecraft:porkchop'},
        "minecraft:sheep":{"item": 'minecraft:mutton'},
        "minecraft:goat":{"item": 'minecraft:mutton'},
        "minecraft:chicken":{"item": 'minecraft:chicken'},
        "minecraft:parrot":{"item": 'minecraft:feather'},
        "minecraft:rabbit":{"item": 'minecraft:rabbit'},
        "minecraft:rabbit":{"item": 'minecraft:rabbit'},
        "minecraft:cod":{"item": 'minecraft:cod'},
        "minecraft:salmon":{"item": 'minecraft:salmon'},
        "minecraft:pufferfish":{"item": 'minecraft:pufferfish'},
        "minecraft:tropical_fish":{"item": 'minecraft:tropical_fish'},
        "minecraft:glow_squid":{"item": 'minecraft:glow_ink_sac'},
        "minecraft:strider":{"item": 'minecraft:string'},
        "minecraft:cat":{"item": 'minecraft:string'},
        "minecraft:squid":{"item": 'minecraft:ink_sac'},
        "minecraft:glow_squid":{"item": 'minecraft:glow_ink_sac'},
        "minecraft:villager":{"item": 'spelunkery:rough_emerald_block'},
        "minecraft:wandering_trader":{"item": 'spelunkery:rough_emerald_block'},
        "nomansland:deer":{"item": 'nomansland:raw_venison'},
        "nomansland:billhook_bass":{"item": 'nomansland:billhook_bass'},

        "minecraft:wither_skeleton":{"item": 'architects_palette:withered_bone', "hostile":true},
        "minecraft:spider":{"item": 'minecraft:string', "hostile":true},
        "minecraft:cave_spider":{"item": 'minecraft:spider_eye', "hostile":true},
        "minecraft:phantom":{"item": 'minecraft:phantom_membrane', "hostile":true},
        "minecraft:blaze":{"item": 'minecraft:blaze_rod', "hostile":true},
        "minecraft:ghast":{"item": 'minecraft:ghast_tear', "hostile":true},
        "minecraft:shulker":{"item": 'minecraft:shulker_shell', "hostile":true},
        "minecraft:skeleton":{"item": 'minecraft:bone', "hostile":true},
        "minecraft:stray":{"item": 'minecraft:bone', "hostile":true},
        "minecraft:slime":{"item": 'minecraft:slime_ball', "hostile":true},
        "minecraft:zombie":{"item": 'minecraft:rotten_flesh', "hostile":true},
        "minecraft:drowned":{"item": 'minecraft:rotten_flesh', "hostile":true},
        "minecraft:husk":{"item": 'minecraft:rotten_flesh', "hostile":true},
        "minecraft:zombified_piglin":{"item": 'minecraft:rotten_flesh', "hostile":true},
        "minecraft:breeze":{"item": 'minecraft:breeze_rod', "hostile":true},
        "minecraft:creeper":{"item": 'minecraft:gunpowder', "hostile":true},
        "minecraft:endermite":{"item": 'aeronautics:end_stone_powder', "hostile":true},
        "minecraft:guardian":{"item": 'minecraft:prismarine_shard', "hostile":true},
        "minecraft:magma_cube":{"item": 'minecraft:magma_cream', "hostile":true},
        "minecraft:vindicator":{"item": 'minecraft:emerald', "hostile":true},
        "minecraft:witch":{"item": 'minecraft:redstone', "hostile":true},
        "minecraft:hoglin":{"item": 'minecraft:porkchop', "hostile":true},

        "artifacts:mimic":{
            "input": {
                "tag": "artifacts:artifacts"
            },
            "result": {
                "count": 1,
                "id": "artifacts:mimic_spawn_egg",
                "components": {
                    "minecraft:custom_data": {"creature_conjuration": 1},
                    "minecraft:enchantments": {
                        "levels":{"malum:haunted": 10},
                        "show_in_tooltip": false
                    },
                    "entity_data": {
                        "id": "artifacts:mimic",
                        "attributes": [
                            {"id": "minecraft:generic.movement_speed", "base": 1.25},
                            {"id": "minecraft:generic.jump_strength", "base": 0.6},
                            {"id": "lodestone:magic_resistance", "base": 2},
                            {"id": "malum:malignant_aegis_recovery_rate", "base": 4},
                            {"id": "malum:malignant_aegis_recovery_gain", "base": 1},
                            {"id": "malum:malignant_aegis_capacity", "base": 3}
                        ],
                        "neoforge:attachments": {
                            "malum:geas_soul_info": {
                                "geasEffects": [
                                    "malum:pact_of_the_berserker",
                                    "malum:pact_of_patience_repaid"
                                ]
                            }
                        },
                        "active_effects": [
                            {"amplifier": 3, "id": "minecraft:regeneration", "duration": -1, "show_icon": 0},
                            {"amplifier": 3, "id": "minecraft:resistance", "duration": -1, "show_icon": 0}
                        ]
                    },
                    "lore": [
                        '{"text":"Will spawn immediately when craft is done","italic":false}',
                        '{"text":"Requires extra spirits to conjure","italic":false}',
                        '{"text":"Prepare. For it is formidable to even the strongest...","underlined":true,"color":"dark_red"}'
                    ]
                }
            },
            "spirits": [
                {
                    "type": "malum:eldritch",
                    "count": 24
                },
                {
                    "type": "malum:arcane",
                    "count": 24
                }
            ],
            "hostile":true
        }
    }

    function spiritCount(info, spirits) {
        let total = 0
        spirits.forEach((spirit) => {
            total += spirit["count"]
        })
        return Math.max(Math.floor(total / 1.2),1)
    }

    function getCatalysts(info, spirits) {
        const catalysts = [info.extra]
        spirits.forEach((spirit) => {
            let cat = {
                "count": spirit["count"]
            }
            let inputType = spiritCatalysts[spirit["type"]]
            if (inputType.item) {cat.item = inputType.item}
            if (inputType.tag) {cat.tag = inputType.tag}
            catalysts.push(cat)
        })
        return catalysts
    }

    function getSpawnEgg(id, info) {
        let result = info.result
        if (result == null) {
            let idInfo = id.split(":")
            result = {
                "count": 1,
                "id": idInfo[0] + ":" + idInfo[1] + "_spawn_egg",
                "components": {
                    "minecraft:custom_data": {"creature_conjuration": 0},
                    "entity_data": {"id": id},
                    "lore": ['{"text":"Will spawn immediately when craft is done","italic":false}']
                }
            }
        }
        return result
    }

    function getEntitySpirits(id) {
        const idInfo = id.split(":")
        let spirits;
        if (idInfo[0] == "minecraft") {
            spirits = JSON.parse(KJSTweaks.readJsonFromMod("malum", "spirit_data/entity/" + idInfo[1]).toString())["spirits"]
        }
        else {
            spirits = JSON.parse(KJSTweaks.readJsonFromMod("malum", "spirit_data/entity/" + idInfo[0] + "/" + idInfo[1]).toString())["spirits"]
        }
        spirits.forEach((spirit) => {
            spirit["type"] = spirit["spirit"]
        })
        return spirits
    }

    function registerRecipe(event, id, info) {
        let spirits = null
        if (!info.spirits) {
            spirits = getEntitySpirits(id)
        }
        else {
            spirits = info.spirits
        }

        if (!info.input) {
            info.input = {
                "count": 1,
                "item": info.item
            }
        }

        if (!info.extra) {
            if (info.hostile) {
                info.extra = {
                    "count": spiritCount(info, spirits),
                    "item": 'malum:mnemonic_fragment'
                }
            }
            else {
                info.extra = {
                    "count": spiritCount(info, spirits),
                    "item": 'malum:refined_brilliance'
                }
            }
            info.hostile = null
        }
        event.custom({
            type: "malum:spirit_infusion",
            "extraInputs": getCatalysts(info, spirits),
            "input": info.input,
            "result": getSpawnEgg(id, info),
            "spirits": spirits
        })
    }
    
    for ( let id in spawnableCreatures ) {
        let info = spawnableCreatures[id]
        registerRecipe( event, id, info )
    }
})

function positionString( entity ) {
    return `${entity.getX()} ${entity.getY()} ${entity.getZ()}`
}

EntityEvents.spawned(event => {
    let {level, entity} = event
    if (entity.isItem()) {
        let i = entity.getItem()
        let c = i.getComponentMap()
        let customData = c.get("custom_data")
        if (customData != null && customData.contains("creature_conjuration")) {
            let entityData = c.get("entity_data").copyTag()
            let cd = customData.copyTag()
            console.log(cd.getByte("creature_conjuration"))
            if (cd.getByte("creature_conjuration") == 1) {
                lib.runServerCommand(level,'summon '+entityData.getString("id")+' '+positionString(entity)+' '+entityData.toString())
                event.cancel()
            }
            else {
                lib.runServerCommand(level,'summon '+entityData.getString("id")+' '+positionString(entity))
                event.cancel()
            }
        }
    }
})
