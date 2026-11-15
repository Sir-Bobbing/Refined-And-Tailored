console.info('Respawn Blindness Loaded')

PlayerEvents.respawned(event => {
    if (event.isEndConquered()) return
    const {entity} = event;
    entity.playNotifySound('malum:a_soul_shatters', 'neutral', 1, 0.5);
    entity.sendData("respawn_fade", {})
    entity.mergeNbt({"neoforge:attachments":{"malum:touch_of_darkness":{touchOfDarkness:60}}})
})
