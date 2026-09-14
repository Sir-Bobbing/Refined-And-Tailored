StartupEvents.registry('item', event => {

  let $DataComponents = Java.loadClass('net.minecraft.core.component.DataComponents')
  let $CustomData = Java.loadClass('net.minecraft.world.item.component.CustomData')
  let $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')

  
  let defaultTag = new $CompoundTag()
  defaultTag.putInt("kubejs:scamppanzer_beacon_charge", 0) 
  defaultTag.putInt("kubejs:scamppanzer_beacon_x", 0)
  defaultTag.putInt("kubejs:scamppanzer_beacon_y", 0)
  defaultTag.putInt("kubejs:scamppanzer_beacon_z", 0)

  let defaultScampData = `{CustomName:'[{"text":"Arcane Scamppanzer","italic":true}]',"attributes":[{"id":"malum:healing_received","base":4}],"active_effects":[{"amplifier":0,"id": "minecraft:resistance","duration":-1,"show_icon":0}],"neoforge:attachments":{"malum:geas_soul_info":{"geasEffects":["malum:pact_of_the_lifeweaver"]}}}`

  function assignDefaultProperties(item) {
    item.tooltip('§7Charge near an active beacon to summon the Scamppanzer.')
    .tooltip('§7Requires sufficient clearance to spawn.')
    .unstackable()
    .useAnimation('bow')
    .useDuration(itemstack => 30)

    //.component($DataComponents.CUSTOM_DATA, $CustomData.of(defaultTag.copy()))
    // For some reason makes it so that the item can't accept further modification of customdata
    // Does not add the base customdata either...
  }

  function useSound(level, entity) {
    level[lib.sound](null, entity.blockPosition(), "malum:ritual_forms", "master", 1, Math.random()*0.1 + 0.2 )
  }

  function chargeSound(level, entity, arcane, charge) {
    if (arcane) {
      level[lib.sound](null, entity.blockPosition(), "malum:ritual_begins", "master", 1, charge*0.1 + 0.6 )
    }
    else {
      level[lib.sound](null, entity.blockPosition(), "malum:spirit_diode_open", "master", 1, charge*0.15 + 0.4 )
    }
  }

  function finishSound(level, entity) {
    level[lib.sound](null, entity.blockPosition(), "malum:ritual_completed", "master", 1, Math.random()*0.1 + 0.7 )
  }

  function failSound(level, entity, arcane) {
    level[lib.sound](null, entity.blockPosition(), arcane ? "malum:ritual_evolves" : "malum:spirit_diode_close", "master", 1, Math.random()*0.1 + 0.4 )
  }

  function searchArea(level, pos, radius, callback) {
    let area = BlockPos.betweenClosed(pos.offset(-radius, -radius, -radius), pos.offset(radius, radius, radius))
    for (let bp of area) {
      let val = callback(level.getBlock(bp))
      if (val) {
        return val
      }
    }
    return false
  }

  function validateBeacon(b) {
    return b.id == "minecraft:beacon" && b.getEntityData().getInt("Levels") > 0
  }

  function locateBeacon(level, pos) {
    let beacon = null
    searchArea(level, pos, 10, function(block) {
      if (validateBeacon(block)) {
        beacon = block
        return true
      }
    })
    return beacon
  }

  function cooldown(player, time) {
    player.addItemCooldown("kubejs:arcane_scamppanzer_beacon", time);
    player.addItemCooldown("kubejs:scamppanzer_beacon", time);
  }

  function useLogic(level, player, hand, arcane) {
    useSound(level, player)
    return true
  }

  function positionString( pos ) {
    return pos.x + ' ' + pos.y + ' ' + pos.z
  }

  function summonScamppanzer(level, bpos, arcane) {
    console.info('summon scguns:scamp_tank '+positionString(bpos)+(arcane ? ' ' + defaultScampData : ''))
    lib.runServerCommand(level,'summon scguns:scamp_tank '+positionString(bpos)+(arcane ? ' ' + defaultScampData : ''))
  }

  function lightningParticles(level, bpos) {
    lib.runServerCommand(level,'particle nomansland:moonlight_spark ' + positionString(bpos) + ' 0.25 0 0.25 0 20')
  }

  function enchantParticles(level, bpos, charge) {
    const comStr = 'particle minecraft:enchant ' + positionString(bpos)
    for (var i = 0; i < 30; i = i + 2) {
      level.server.scheduleInTicks(i, function() {
        lib.runServerCommand(level,comStr + ' 0 5 0 ' + (0.5 + charge*0.25) + ' ' + (10 + charge*5) )
      })
    }
  } 

  function failSummon(reason, level, entity, arcane, itemstack) {
    failSound(level, entity, arcane)
    cooldown(entity, 20)
    entity.tell(Text.darkPurple(reason).italic())
    $CustomData.set($DataComponents.CUSTOM_DATA, itemstack, defaultTag.copy())
    return itemstack
  }

  function finishUsingLogic(itemstack, level, entity, arcane) {
    const effects = entity.potionEffects
    let data = itemstack.has($DataComponents.CUSTOM_DATA) ? itemstack.get($DataComponents.CUSTOM_DATA).copyTag() : defaultTag.copy()
    let charge = data.getInt("kubejs:scamppanzer_beacon_charge") + 1
    data.putInt("kubejs:scamppanzer_beacon_charge", charge)

    if (charge == 1) {
      let beacon = locateBeacon(level, entity.blockPosition())
      if (beacon) {
        data.putInt("kubejs:scamppanzer_beacon_x",beacon.x)
        data.putInt("kubejs:scamppanzer_beacon_y",beacon.y)
        data.putInt("kubejs:scamppanzer_beacon_z",beacon.z)
      }
      else {
        return failSummon("There is no powered beacon nearby...",level,entity,arcane,itemstack)
      }
    }

    let pos = new BlockPos(data.getInt("kubejs:scamppanzer_beacon_x"),data.getInt("kubejs:scamppanzer_beacon_y"),data.getInt("kubejs:scamppanzer_beacon_z"))
    let dist = pos.distSqr(entity.blockPosition())
    if (dist > 225) {
      return failSummon("You are too far from the beacon...",level,entity,arcane,itemstack)
    }

    if (dist < 36) {
      return failSummon("You are too close to the beacon...",level,entity,arcane,itemstack)
    }

    if (!validateBeacon(level.getBlock(pos))) {
      return failSummon("There is no powered beacon nearby...",level,entity,arcane,itemstack)
    }

    if (searchArea(level, pos.offset(0, 4, 0), 3, function(bp) {
      return level.getBlock(bp).id != "minecraft:air"
    })) {
      return failSummon("There is not enough open air around the beacon...",level,entity,arcane,itemstack)
    }

    if (charge == 3 || charge == 4) {
      effects.add("minecraft:levitation", 40, 0, true, false)
    }
    if (charge > 1) {
      level.spawnLightning(pos.x+0.5, pos.y + 1, pos.z+0.5, true)
      lightningParticles(level, pos.offset(0, 1, 0))
    }
    if (charge >= 5) {
      summonScamppanzer(level, pos.offset(0, 1, 0), arcane)
      finishSound(level, entity)
      itemstack.shrink(1)
    }
    else {
      chargeSound(level, entity, arcane, charge)
    }

    enchantParticles(level, pos.offset(0, 6, 0), charge)

    $CustomData.set($DataComponents.CUSTOM_DATA, itemstack, data)
    return itemstack
  } 

  function releaseUsingLogic(itemstack, level, entity, tick, arcane) {
    failSound(level, entity, arcane)
    cooldown(entity, 20)
    $CustomData.set($DataComponents.CUSTOM_DATA, itemstack, defaultTag.copy())
  }

  function registerUseLogic(itembuilder, arcane) {
    itembuilder.use((level, player, hand) => {
      if (level.isClientSide()) {return false}
      return useLogic(level, player, hand, arcane)
    })
    .finishUsing((itemstack, level, entity) => {
      if (level.isClientSide()) {return itemstack}
      return finishUsingLogic( itemstack, level, entity, arcane )
    })
    .releaseUsing((itemstack, level, entity, tick) => {
      if (level.isClientSide()) {return}
      return releaseUsingLogic( itemstack, level, entity, tick, arcane )
    })
  }

  let arcaneBeacon = event.create('arcane_scamppanzer_beacon')
  assignDefaultProperties(arcaneBeacon)
  //arcaneBeacon.use((level) => {})
  arcaneBeacon.tooltip('§5§oInfused arcana subtly empowers the Scamppanzer...')
  arcaneBeacon.texture('scguns:item/beacon_grenade')
  arcaneBeacon.displayName('Arcane Scamppanzer Transmitter')
  arcaneBeacon.rarity("rare")
  registerUseLogic(arcaneBeacon, true)

  let beacon = event.create('scamppanzer_beacon')
  assignDefaultProperties(beacon)
  beacon.texture('scguns:item/cog_locator')
  beacon.displayName('Scamppanzer Transmitter')
  beacon.rarity("rare")
  registerUseLogic(beacon, false)
  
})