const $ItemEnchantments$Mutable = Java.loadClass('net.minecraft.world.item.enchantment.ItemEnchantments$Mutable')
const $EnchantmentHelper = Java.loadClass('net.minecraft.world.item.enchantment.EnchantmentHelper')
const $Enchantment = Java.loadClass('net.minecraft.world.item.enchantment.Enchantment')

function clampItemEnchants(item) {
    if (!item.isEnchanted()) {return false}

    let itemCopy = item.copy()
    let enchants = item.getEnchantments()

    let modified = false

    const newEnchants = new $ItemEnchantments$Mutable($EnchantmentHelper.getEnchantmentsForCrafting(itemCopy))

    enchants.entrySet().forEach(entry => {
        let enchHolder = entry.getKey()
        let enchantment = enchHolder.value()
        let enchLvl = entry.getIntValue()

        if (enchLvl > enchantment.getMaxLevel()) {
            modified = true
        }

        if (itemCopy.supportsEnchantment(enchHolder)) {
            newEnchants.set(enchHolder, Math.min(enchLvl, enchantment.getMaxLevel()))
        }
        else {
            modified = true
            newEnchants.set(enchHolder, 0)
        }
        
    })

    if (!modified) {return false}

    $EnchantmentHelper.setEnchantments(item, newEnchants.toImmutable())

    return true
}

PlayerEvents.inventoryChanged('minecraft:elytra',event => {
    let item = event.getItem()
    clampItemEnchants(item)
})