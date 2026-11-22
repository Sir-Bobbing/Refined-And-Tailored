console.info('GuideME Tweaks Loaded')

ItemEvents.modification(event => {
    event.modify('guideme:guide', item => {
        item.maxStackSize = 1
        item.rarity = 'UNCOMMON'
    })
    event.modify('immersiveenchanting:ancient_book', item => {
        item.maxStackSize = 16
    })
    event.modify('solonion:food_book', item => {
        item.maxStackSize = 1
    })
})
