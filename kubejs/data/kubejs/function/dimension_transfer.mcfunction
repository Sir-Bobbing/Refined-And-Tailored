schedule function kubejs:dimension_transfer 4t replace

execute as @e[type=!#kubejs:transfer_blacklist,predicate=kubejs:over_to_nether] at @s run function kubejs:over_to_nether
execute as @e[type=!#kubejs:transfer_blacklist,predicate=kubejs:nether_to_over] at @s run function kubejs:nether_to_over
execute as @e[type=create:contraption,tag=minecart_transfer] at @s run function kubejs:minecart_transfer
