schedule function kubejs:dimension_transfer 4t replace

execute as @e[predicate=kubejs:over_to_nether] at @s[type=!#kubejs:transfer_blacklist] run function kubejs:over_to_nether
execute as @e[predicate=kubejs:nether_to_over] at @s[type=!#kubejs:transfer_blacklist] run function kubejs:nether_to_over
execute as @e[tag=minecart_transfer] at @s[type=create:contraption] run function kubejs:minecart_transfer