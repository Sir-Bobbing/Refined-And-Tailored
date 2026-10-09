gamerule mobExplosionDropDecay false
gamerule blockExplosionDropDecay false
gamerule commandBlockOutput false
gamerule playersSleepingPercentage 50
gamerule doImmediateRespawn true
gamerule doInsomnia false

execute store result storage kubejs:first_world_load daylight_cycle byte 1 run gamerule doDaylightCycle
neoforge day speed set 0.5
execute if data storage kubejs:first_world_load {daylight_cycle:0b} run gamerule doDaylightCycle false

data merge storage kubejs:first_world_load {first_world_load:1b}
