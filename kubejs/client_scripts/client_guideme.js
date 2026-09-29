console.info('GuideME sounds Loaded')

ItemEvents.rightClicked('guideme:guide',event => {
    event.player.playNotifySound('exposure:misc.bsod', 'PLAYERS', 1, 1.2);
})

