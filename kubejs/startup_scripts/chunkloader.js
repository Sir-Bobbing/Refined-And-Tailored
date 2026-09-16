StartupEvents.registry('block', event => {
    const $UUID = Java.loadClass('java.util.UUID')
    const $CompoundTag = Java.loadClass("net.minecraft.nbt.CompoundTag")
    const SoundEvents = Java.loadClass("net.minecraft.sounds.SoundEvents");
    const SoundType = Java.loadClass("net.minecraft.world.level.block.SoundType");
    const SupplementariesSounds = Java.loadClass("net.mehvahdjukaar.supplementaries.reg.ModSounds");

    const ST_LOADER = new SoundType(1.0, 0.95, SupplementariesSounds.JAR_BREAK, SoundEvents.GLASS_STEP, SoundEvents.LODESTONE_PLACE, SoundEvents.GLASS_HIT, SoundEvents.GLASS_HIT )

    event.create("jarred_loader")
    .displayName('Jarred Chunk Loader')
    .blockEntity(entity => {
        const initialData = new $CompoundTag()

        initialData.putUUID('sub_level',$UUID.fromString('00000000-0000-0000-0000-000000000000'))

        entity.serverTicking()
        entity.tickFrequency(100)
        entity.initialData(initialData)
    })
    .soundType(ST_LOADER)
    .hardness(1)
    .resistance(4)
    .renderType('cutout')
    .waterlogged()
    .notSolid()
    .box(1,0,1,15,16,15)
    .tagBlock('sable:end_stones')
    .tagBlock('create:non_movable')
})