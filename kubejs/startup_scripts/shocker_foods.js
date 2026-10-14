StartupEvents.registry('item', event => {
    event.create('shock_dog')
    .displayName('Hot Dog')
    .food(food => food
        .nutrition(9)
        .saturation(0.8)
    )
})
