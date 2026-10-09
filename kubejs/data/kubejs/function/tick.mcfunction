
execute at @s if predicate kubejs:over_to_nether_dismount on vehicle run tp @s ~ ~ ~
execute as @e at @s if predicate kubejs:over_to_nether run effect give @s malum:sky_tether 4 4 true
execute as @e at @s if predicate kubejs:over_to_nether run effect give @s minecraft:slow_falling 4 0 true
execute as @e[type=!#scguns:bullet] at @s if predicate kubejs:over_to_nether in minecraft:the_nether run tp @s ~ 256 ~

execute as @e at @s if predicate kubejs:nether_to_over run effect give @s minecraft:levitation 8 4 true
execute as @e[type=!#scguns:bullet] at @s if predicate kubejs:nether_to_over in minecraft:overworld run tp @s ~ -95 ~
