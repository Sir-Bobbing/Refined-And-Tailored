NativeEvents.onEvent($AnvilUpdateEvent, event => {
    if (event.getLeft().id != "minecraft:player_head") {return}

    let name = event.getName()

    if (name == null) {return}

    name = name + "" // String is actually a java.lang.String not a JavaScript string, this fixes it

    name = name.replace(RegExp('[^a-zA-Z_0-9]','gm'),'')

    if (name.length < 3 || name.length > 16) {return}

    let output = Item.of(`minecraft:player_head[profile={name:"${name}"},lore=['{"extra":[{"extra":["Will not function on navigation tables"],"text":""}],"text":""}']]`)

    output.setCount(event.getLeft().count)

    event.setOutput(output)
})