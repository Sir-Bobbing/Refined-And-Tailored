StartupEvents.registry('mob_effect', event => {

    let $DimensionTransition = Java.loadClass('net.minecraft.world.level.portal.DimensionTransition')

    event.create('recall')
    .color(0x349988)
    .effectTick((entity, lvl) => {
        if (entity.hasEffect('kubejs:recall_sickness')) {return}
        const effects = entity.potionEffects
        effects.add('kubejs:recall_sickness', 600, 0)
        effects.add('minecraft:blindness', 20, 0, true, true)

        if (entity.isPlayer() & !entity.level.isClientSide()) {
            let transition = entity.findRespawnPositionAndUseSpawnBlock(true, $DimensionTransition.PLAY_PORTAL_SOUND )
            entity.changeDimension(transition)
        }
        
        entity.removeEffect('kubejs:recall')
    })
    .instant(true)

    event.create('recall_sickness')
    .color(0x349988)
    .harmful()
    .modifyAttribute('malum:healing_received','kubejs:recall_sickness_healing', -0.8,'add_multiplied_base')
})

let $BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
let $RegisterBrewingRecipesEvent = Java.loadClass('net.neoforged.neoforge.event.brewing.RegisterBrewingRecipesEvent')

NativeEvents.onEvent($RegisterBrewingRecipesEvent, (event) => {
    let builder = event.getBuilder()
    builder.addMix(
        $BuiltInRegistries.POTION.wrapAsHolder(Registry.of('minecraft:potion').get('minecraft:mundane')),
        Item.of('minecraft:ender_pearl'),
        $BuiltInRegistries.POTION.wrapAsHolder(Registry.of('minecraft:potion').get('kubejs:recall'))
    )
})

StartupEvents.registry('potion',(event) => {
    let recallEffectHolder = $BuiltInRegistries.MOB_EFFECT.wrapAsHolder(Registry.of('minecraft:mob_effect').get('kubejs:recall'))

    event.create('recall')
    .addEffect(MobEffectUtil.of(recallEffectHolder,1))
})
