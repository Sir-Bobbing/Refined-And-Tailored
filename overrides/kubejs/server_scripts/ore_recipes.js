function generateCrushingRecipe(input, out, amount, exp, stone) {
    return {
        "type": "create:crushing",
        "ingredients": [
            {
            "item": input
            }
        ],
        "processing_time": 250,
        "results": [
            {
                "count": amount,
                "id": out
            },
            {
                "count": 1,
                "chance": amount > 1 ? 0.25 : 0.75,
                "id": out
            },
            {
                "count": exp,
                "chance": 0.75,
                "id": "malum:refined_brilliance"
            },
            {
                "count": 1,
                "chance": 0.125,
                "id": stone
            }
        ]
    }
}

ServerEvents.recipes(event => {
    for (let ore of lib.customOres) {
        event.blasting(Item.of(ore.smelted),ore.namespace,0.7)
        event.smelting(Item.of(ore.smelted),ore.namespace,0.7)
        event.custom(generateCrushingRecipe(
            ore.namespace,
            ore.crushed,
            ore.yield ? ore.yield : 1,
            ore.brilliance ? ore.brilliance : 1,
            ore.stone
        ))
    }

    for (let blockId of Block.getTypeList()) {

        if (blockId.match('spelunkery:.*_coal_ore')) {
            event.custom(generateCrushingRecipe(
                blockId,
                'minecraft:coal',
                1,
                1,
                'minecraft:' + blockId.replace('spelunkery:', '').replace('_coal_ore', '')
            ))
        }

        if (blockId.match('spelunkery:.*_iron_ore')) {
            event.custom(generateCrushingRecipe(
                blockId,
                'create:crushed_raw_iron',
                1,
                1,
                'minecraft:' + blockId.replace('spelunkery:', '').replace('_iron_ore', '')
            ))
        }

        if (blockId.match('spelunkery:.*_copper_ore')) {
            event.custom(generateCrushingRecipe(
                blockId,
                'create:crushed_raw_copper',
                5,
                1,
                'minecraft:' + blockId.replace('spelunkery:', '').replace('_copper_ore', '')
            ))
        }

        if (blockId.match('spelunkery:.*_gold_ore')) {
            event.custom(generateCrushingRecipe(
                blockId,
                'create:crushed_raw_gold',
                1,
                2,
                'minecraft:' + blockId.replace('spelunkery:', '').replace('_gold_ore', '')
            ))
        }

        if (blockId.match('spelunkery:.*_zinc_ore')) {
            event.custom(generateCrushingRecipe(
                blockId,
                'create:crushed_raw_zinc',
                1,
                1,
                'minecraft:' + blockId.replace('spelunkery:', '').replace('_zinc_ore', '')
            ))
        }
    }
})