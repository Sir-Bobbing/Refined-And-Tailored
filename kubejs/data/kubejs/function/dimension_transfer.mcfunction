schedule function kubejs:dimension_transfer 4t replace

execute as @e[type=!#kubejs:transfer_blacklist] run function kubejs:transfer_non_blacklisted
execute as @e[type=create:contraption,tag=minecart_transfer] at @s run function kubejs:minecart_transfer
