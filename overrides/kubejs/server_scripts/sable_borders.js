const BORDER_SABLE_INSTANCE = $SableCompanion.INSTANCE
const DEPTH_GRADIENT = -1
const START_Y = 250

function getAllSubLevels(level) {
    let bounds = new $BoundingBox3d(-30_000_000, -10_000, -30_000_000, 30_000_000, 10_000, 30_000_000)
    return BORDER_SABLE_INSTANCE.getAllIntersecting(level, bounds)
}

NativeEvents.onEvent($ForgeSablePrePhysicsTickEvent, (event) => {
    let physicsSystem = event.getPhysicsSystem()
    let level = physicsSystem.getLevel()
    if (level.getDimension() != "minecraft:the_nether") {
        return
    }
    let timeStep = event.getTimeStep()

    let tempLinearVelocity = new $Vector3d(0, 0, 0)
    let tempAngularVelocity = new $Vector3d(0, 0, 0)

    for (let subLevel of getAllSubLevels(level)) {
        let pose = subLevel.logicalPose()
        let pos = pose.position()
        
        let depth = (START_Y - pos.y) * DEPTH_GRADIENT

        if (depth < 0) {
            continue
        }

        let massTracker = subLevel.getMassTracker()
        let centerOfMass = massTracker.getCenterOfMass()

        if (centerOfMass == null) {
            continue;
        }

        let handle = physicsSystem.getPhysicsHandle(subLevel)
        let gravity = new $Vector3d(0,-11,0) // Nether gravity, didn't bother querying from the data driven stuff

        let dragGroup = subLevel.getOrCreateQueuedForceGroup($ForceGroups.DRAG.get())
        let levitationGroup = subLevel.getOrCreateQueuedForceGroup($ForceGroups.LEVITATION.get())

        let linearDrag = handle.getLinearVelocity(tempLinearVelocity).mul(-timeStep * 3.5)
        let angularDrag = handle.getAngularVelocity(tempAngularVelocity).mul(-timeStep * 3)
        pose['transformNormalInverse(org.joml.Vector3d)'](linearDrag).mul(massTracker.getMass())
        massTracker.getInertiaTensor().transform(pose['transformNormalInverse(org.joml.Vector3d)'](angularDrag))
        dragGroup.recordPointForce(new $Vector3d["(org.joml.Vector3dc)"](centerOfMass), linearDrag)
        dragGroup.getForceTotal().applyLinearAndAngularImpulse(linearDrag, angularDrag)

        let levitationImpulse = pose['transformNormalInverse(org.joml.Vector3d)'](gravity.negate(new $Vector3d())
            .mul(Math.sign(DEPTH_GRADIENT) * depth * timeStep * massTracker.getMass()));
        levitationGroup.applyAndRecordPointForce(centerOfMass, levitationImpulse)
    }
})