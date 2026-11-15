ClientEvents.tick(event => {
    let ply = event.getPlayer()
    if (ply.isFallFlying()) {
        let vel = ply.getDeltaMovement()

        let drag = -0.006 * ply.getAttributeValue('aileron:cloudskipper_drag')
        let dragForce = vel.multiply(drag, 0, drag)

        let verticalResistance = Math.max(vel.y(), 0) * 0.015
        let altitudeDownforce = Math.min(Math.max(ply.getY() - 150, 0) / 10000, 0.01)
        let downForce = Vec3d(0, -altitudeDownforce - verticalResistance, 0 )

        ply.addDeltaMovement(downForce.add(dragForce))
    }
})