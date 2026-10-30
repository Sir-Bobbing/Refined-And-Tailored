ClientEvents.tick(event => {
    let ply = event.getPlayer()
    if (ply.isFallFlying()) {
        ply.addDeltaMovement(ply.getDeltaMovement().scale(-0.006 * ply.getAttributeValue('aileron:cloudskipper_drag')))
    }
})