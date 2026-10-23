execute on passengers run ride @s[type=!create:contraption] dismount

effect give @s malum:sky_tether 4 4 true
effect give @s minecraft:slow_falling 4 0 true

execute as @s[type=#c:minecarts] on passengers run tag @s[type=create:contraption] add minecart_transfer
execute as @s[type=#c:minecarts] on passengers as @s[type=create:contraption] on vehicle run tag @s add minecart_transfer
execute as @s[type=#c:minecarts] on passengers at @s in minecraft:the_nether run tp @s[type=create:contraption] ~ 256 ~
execute in minecraft:the_nether run tp @s ~ 256 ~