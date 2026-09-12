console.info('Item modifications load.')

let $ArmorItem = Java.loadClass('net.minecraft.world.item.ArmorItem')

ItemEvents.modification(event => {

  event.modify('architects_palette:entrails', item => {
    item.modifyFood(food => {
        food.alwaysEdible(true)
        food.nutrition(4)
        food.saturation(0.5)
        food.eatSeconds(0.2)
        food.effect("minecraft:hunger",300,79,1)
        food.effect("minecraft:slowness",100,0,1)
        food.effect("minecraft:nausea",80,0,0.2)
        food.effect("minecraft:blindness",80,0,0.2)
    })
  })

  event.modify('architects_palette:rotten_flesh_block', item => {
    item.modifyFood(food => {
        food.alwaysEdible(true)
        food.nutrition(2)
        food.saturation(0.5)
        food.eatSeconds(0.25)
        food.effect("minecraft:hunger",200,79,1)
        food.effect("minecraft:nausea",80,0,0.2)
    })
  })

  event.modify('scguns:metal_detector', item => {
    item.setMaxDamage(512)
  })

  function modifyAluminumItem(id, attackDamage, attackSpeed) {
    event.modify(id, item => {
    item.setUnbreakableWithTooltip()
    item.setBaseAttackDamage(attackDamage-1)
    item.setBaseAttackSpeed(attackSpeed-4)
    item.addAttributeModifier("minecraft:player.block_break_speed",{amount:-0.4,id:"kubejs:aluminum_mine_penalty",operation:"add_multiplied_base"},"mainhand")
    item.setTier(tier => {
        tier.setSpeed(3)
        tier.setIncorrectBlocksForDropsTag("minecraft:incorrect_for_iron_tool")
      })
    })
  }

  // Same tier as iron tools
  // Between stone/wood stats wise
  // Has a 40% mining speed penalty
  // Unbreakable
  modifyAluminumItem('tfmg:aluminum_sword', 4.5, 1.6)
  modifyAluminumItem('tfmg:aluminum_pickaxe', 2.5, 1.2)
  modifyAluminumItem('tfmg:aluminum_axe', 8, 0.8)
  modifyAluminumItem('tfmg:aluminum_shovel', 3, 1)
  modifyAluminumItem('tfmg:aluminum_hoe', 1, 1.5)


  function modifySteelItem(id, attackDamage, attackSpeed) {
    event.modify(id, item => {
    item.setBaseAttackDamage(attackDamage-1)
    item.setBaseAttackSpeed(attackSpeed-4)
    item.setTier(tier => {
        tier.setSpeed(7)
        tier.setIncorrectBlocksForDropsTag("minecraft:incorrect_for_diamond_tool")
      })
    })
  }

  // Same tier as diamond tools
  // Between iron/diamond stats wise

  modifySteelItem('tfmg:steel_sword', 6.5, 1.6)
  modifySteelItem('tfmg:steel_pickaxe', 4.5, 1.2)
  modifySteelItem('tfmg:steel_axe', 9, 0.85)
  modifySteelItem('tfmg:steel_shovel', 5, 1)
  modifySteelItem('tfmg:steel_hoe', 1, 3.5)


  const slotMap = {
    head: "minecraft:armor.helmet",
    chest: "minecraft:armor.chestplate",
    legs: "minecraft:armor.leggings",
    feet: "minecraft:armor.boots"
  }

  function simpleArmorModification(itemId, slot, armor, toughness, knockbackResistance) {
    event.modify(itemId, item => {
      let id = slotMap[slot]
      item.addAttributeModifier("minecraft:generic.armor", {amount: armor, id: id, operation: "add_value"}, slot)
      item.addAttributeModifier("minecraft:generic.armor_toughness", {amount: toughness, id: id, operation: "add_value"}, slot)
      item.addAttributeModifier("minecraft:generic.knockback_resistance", {amount: knockbackResistance, id: id, operation: "add_value"}, slot)
    })
  }

  function armorModification(itemId, slot, armor, toughness, knockbackResistance, attributes) {
    event.modify(itemId, item => {
      let id = slotMap[slot]
      item.addAttributeModifier("minecraft:generic.armor", {amount: armor, id: id, operation: "add_value"}, slot)
      item.addAttributeModifier("minecraft:generic.armor_toughness", {amount: toughness, id: id, operation: "add_value"}, slot)
      item.addAttributeModifier("minecraft:generic.knockback_resistance", {amount: knockbackResistance, id: id, operation: "add_value"}, slot)
      for (let attribute of attributes) {
        let modifier = attribute[1]
        modifier.id = id
        item.addAttributeModifier(attribute[0], modifier, slot)
      }
    })
  }

  simpleArmorModification('scguns:anthralite_chestplate', 'chest', 6, 1, 0.05)
  simpleArmorModification('scguns:anthralite_leggings', 'legs', 5, 1, 0.05)

  simpleArmorModification('scguns:adrien_helm', 'head', 2.5, 1.5, 0.1)
  simpleArmorModification('scguns:adrien_chestplate', 'chest', 6.5, 1.5, 0.1)
  simpleArmorModification('scguns:adrien_leggings', 'legs', 5.5, 1.5, 0.1)
  simpleArmorModification('scguns:adrien_boots', 'feet', 2.5, 1.5, 0.1)

  armorModification('scguns:cog_knight_helmet', 'head', 3, 2, 0.25, [["minecraft:generic.movement_speed", {amount: -0.1, operation: "add_multiplied_total"}]])
  armorModification('scguns:cog_knight_chestplate', 'chest', 8, 2, 0.25, [
    ["minecraft:generic.movement_speed", {amount: -0.1, operation: "add_multiplied_total"}],
    ["minecraft:generic.attack_knockback", {amount: 1.25, operation: "add_value"}]
  ])
  armorModification('scguns:cog_knight_leggings', 'legs', 6, 2, 0.25, [["minecraft:generic.movement_speed", {amount: -0.1, operation: "add_multiplied_total"}]])
  armorModification('scguns:cog_knight_boots', 'feet', 3, 2, 0.25, [["minecraft:generic.movement_speed", {amount: -0.1, operation: "add_multiplied_total"}]])
  
  armorModification('scguns:scrap_helmet', 'head', 2.5, 1, 0, [["scguns:bullet_damage_multiplier", {amount: 0.15, operation: "add_value"}]])
  armorModification('scguns:scrap_chestplate', 'chest', 6.5, 1, 0, [["scguns:reload_speed", {amount: 1, operation: "add_value"}]])
  armorModification('scguns:scrap_leggings', 'legs', 5.5, 1, 0, [["scguns:spread_multiplier", {amount: -0.3, operation: "add_value"}]])
  armorModification('scguns:scrap_boots', 'feet', 2.5, 1, 0, [["scguns:spread_multiplier", {amount: -0.3, operation: "add_value"}]])

  armorModification('scguns:treated_brass_helmet', 'head', 2, 1, 0, [
    ["minecraft:player.block_interaction_range", {amount: 4, operation: "add_value"}],
    ["minecraft:player.entity_interaction_range", {amount: 0.5, operation: "add_value"}]
  ])
  armorModification('scguns:treated_brass_chestplate', 'chest', 5, 1, 0, [
    ["minecraft:player.mining_efficiency", {amount: 2, operation: "add_value"}],
    ["minecraft:player.submerged_mining_speed", {amount: 0.3, operation: "add_value"}]
  ])
  armorModification('scguns:treated_brass_leggings', 'legs', 4, 1, 0, [
    ["minecraft:player.sneaking_speed", {amount: 0.3, operation: "add_value"}],
    ["artifacts:generic.sprinting_speed", {amount: 0.2, operation: "add_value"}]
  ])
  armorModification('scguns:treated_brass_boots', 'feet', 2, 1, 0, [
    ["minecraft:generic.movement_efficiency", {amount: 0.5, operation: "add_value"}],
    ["minecraft:generic.water_movement_efficiency", {amount: 0.75, operation: "add_value"}]
  ])

  armorModification('scguns:diamond_steel_helmet', 'head', 3, 4, 0, [
    ["lodestone:magic_resistance", {amount: 0.15, operation: "add_value"}],
    ["artifacts:player.entity_experience", {amount: 0.15, operation: "add_value"}],
    ["artifacts:generic.invincibility_ticks", {amount: 0.25, operation: "add_value"}]
  ])
  armorModification('scguns:diamond_steel_chestplate', 'chest', 8, 4, 0, [
    ["lodestone:magic_resistance", {amount: 0.15, operation: "add_value"}],
    ["artifacts:player.entity_experience", {amount: 0.15, operation: "add_value"}],
    ["artifacts:generic.invincibility_ticks", {amount: 0.25, operation: "add_value"}]
  ])
  armorModification('scguns:diamond_steel_leggings', 'legs', 6, 4, 0, [
    ["lodestone:magic_resistance", {amount: 0.15, operation: "add_value"}],
    ["artifacts:player.entity_experience", {amount: 0.15, operation: "add_value"}],
    ["artifacts:generic.invincibility_ticks", {amount: 0.25, operation: "add_value"}]
  ])
  armorModification('scguns:diamond_steel_boots', 'feet', 3, 4, 0, [
    ["lodestone:magic_resistance", {amount: 0.15, operation: "add_value"}],
    ["artifacts:player.entity_experience", {amount: 0.15, operation: "add_value"}],
    ["artifacts:generic.invincibility_ticks", {amount: 0.25, operation: "add_value"}]
  ])

  simpleArmorModification('nomansland:ancient_bronze_mask', 'head', 2, 3, 0)
  armorModification('scguns:brass_mask', 'head', 2, 3, 0, [["malum:healing_received", {amount: 0.25, operation: "add_value"}]])
  armorModification('scguns:iron_mask', 'head', 2, 3, 0, [["minecraft:generic.max_health", {amount: 0.25, operation: "add_multiplied_base"}]])

  // Multiply armor durability
  event.modify("*", item => {
    if (item.item() instanceof $ArmorItem) {
      item.maxDamage = item.get('minecraft:max_damage') * 3
    }
  })

})