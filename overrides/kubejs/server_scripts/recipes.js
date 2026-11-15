ServerEvents.recipes(event => {

    event.remove({ mod: "copycats", not: { output: ["copycats:copycat_box", "copycats:copycat_catwalk"] } })
    event.remove({ output: "create:copycat_panel" })

    function addCopycatRecipes(list, count) {
        let countString = count + 'x '
        for (let id of list) {
            let countId = countString + id
            event.stonecutting(countId, 'create:zinc_ingot')

            event.shapeless(Item.of('create:zinc_ingot'),[countId])
        }
    }

    addCopycatRecipes([
        "copycats:copycat_block",
        "copycats:copycat_ghost_block",
        "copycats:copycat_beam",
        "copycats:copycat_slope",
        "create:copycat_panel",
        "copycats:copycat_door",
        "copycats:copycat_trapdoor",
        "copycats:copycat_fence_gate",
        "copycats:copycat_ladder"
    ], 4)

    addCopycatRecipes([
        "copycats:copycat_layer",
        "copycats:copycat_board",
        "copycats:copycat_wooden_pressure_plate",
        "copycats:copycat_wooden_button",
    ], 8)
})