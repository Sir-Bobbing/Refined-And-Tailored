EntityEvents.death('minecraft:player', event => {
    let ply = event.entity
    let nbt = ply.getNbt()

    let attachments = nbt["neoforge:attachments"]
    if (attachments == null) { return }

    let foodlist = attachments['solonion:foodlist']
    if (foodlist == null) { return }

    let retainedFoods = []
    let retentionAmount = Math.floor(foodlist.length * 0.75)
    if (retentionAmount > 0) {
        for (let i = 0; i < retentionAmount; i++) {
            console.log(i,foodlist[i])
            retainedFoods.push(foodlist[i])
        }
    }

    ply.mergeNbt({
        "neoforge:attachments": {
            "solonion:foodlist": retainedFoods
        }
    })
})