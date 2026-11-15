scoreboard objectives add whats_this dummy
advancement revoke @s only minecraft:whats_this/whats_this

execute store result score whats_this whats_this run random value 0..2
execute if score whats_this whats_this matches 0 run advancement revoke @s only minecraft:story/whats_this
