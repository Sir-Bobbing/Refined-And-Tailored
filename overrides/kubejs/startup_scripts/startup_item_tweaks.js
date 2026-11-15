console.info('GuideME Tweaks Loaded')

ItemEvents.modification(event => {
    event.modify('guideme:guide', item => {
        item.maxStackSize = 1
        item.rarity = 'UNCOMMON'
    })
    event.modify('immersiveenchanting:ancient_book', item => {
        item.maxStackSize = 1
    })
    event.modify('solonion:food_book', item => {
        item.maxStackSize = 1
    })
    event.modify('tfmg:lignite', item => {
        item.burnTime = 400
    })
})
