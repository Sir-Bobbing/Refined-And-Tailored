execute on passengers run ride @s[type=!create:contraption] dismount

effect give @s minecraft:levitation 8 4 true

execute as @s[type=#c:minecarts] on passengers run tag @s[type=create:contraption] add minecart_transfer
execute as @s[type=#c:minecarts] on passengers as @s[type=create:contraption] on vehicle run tag @s add minecart_transfer
execute as @s[type=#c:minecarts] on passengers at @s in minecraft:overworld run tp @s[type=create:contraption] ~ -95 ~
execute in minecraft:overworld run tp @s ~ -95 ~