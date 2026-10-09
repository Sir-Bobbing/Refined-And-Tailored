// priority: 100
var lib = global.lib

const $AnvilUpdateEvent = Java.loadClass("net.neoforged.neoforge.event.AnvilUpdateEvent");
const $SableCompanion = Java.loadClass('dev.ryanhcode.sable.companion.SableCompanion')
const $BoundingBox3d = Java.loadClass("dev.ryanhcode.sable.companion.math.BoundingBox3d")
const $SubLevelContainer = Java.loadClass('dev.ryanhcode.sable.api.sublevel.SubLevelContainer')
const $ForceGroups = Java.loadClass('dev.ryanhcode.sable.api.physics.force.ForceGroups')
const $ForgeSablePrePhysicsTickEvent = Java.loadClass('dev.ryanhcode.sable.neoforge.event.ForgeSablePrePhysicsTickEvent')
const $UUID = Java.loadClass('java.util.UUID')
const $Vector3d = Java.loadClass('org.joml.Vector3d')