import json
import os
from copy import deepcopy

enchantPath = './data/immersiveenchanting/enchantment_costs/'
emiAdditionsPath = './assets/emi/recipe/additions/enchantments/'

enchantPaths = os.listdir(enchantPath)
enchantData = {}
baseRecipe = {
    "type": "emi:world_interaction",
    "left": [
        {
            "type": "item",
            "id": "minecraft:chiseled_bookshelf",
            "nbt": "{lore:['{text:\"Place ancient book in bookshelf near an enchanting table\"}']}"
        }
    ],
    "right": []
}

def storedEnchantString(enchant,level):
    return f'stored_enchantments:{{levels:{{"{enchant}":{level}}}}}'

def ancientBookItem(enchant):
    return {
        "type": "item",
        "id": "immersiveenchanting:ancient_book",
        "nbt": "{" + storedEnchantString(enchant,1) + "}"
    }

def enchantedBookItem(enchant, level):
    books = []
    for i in range(level):
        books.append({
        "type": "item",
        "id": "minecraft:enchanted_book",
        "nbt": "{" + storedEnchantString(enchant,i+1) + "}"
    })
    return books

def costItem(item, amount, enchant, level):
    return {
        "type": "item",
        "id": item,
        "amount": amount,
        "nbt": "{" + storedEnchantString(enchant,level) + ",lore:['{text:\"Cost to enchant an item to this level\"}']}"
    }

def costItemData(item, amount, data, enchant, level):
    dataStr = json.dumps(data)[1:-1]
    return {
        "type": "item",
        "id": item,
        "amount": amount,
        "nbt": "{" + storedEnchantString(enchant,level) + ",lore:['{text:\"Cost to enchant an item to this level\"}']," + dataStr + "}"
    }

def appendCosts(list, costs, enchant, level):
    for cost in costs:
        info = cost["item_cost"]
        if "components" in info:
            if "items" in info:
                for item in info['items']:
                    list.append(costItemData(item,info['count'], info["components"], enchant,level))
            else:
                list.append(costItemData(info['item'],info['count'], info["components"], enchant,level))
        else:
            if "items" in info:
                for item in info['items']:
                    list.append(costItem(item,info['count'],enchant,level))
            else:
                list.append(costItem(info['item'],info['count'],enchant,level))

def emiEnchantDir(enchant):
    return emiAdditionsPath + enchant.replace(":","/") + ".json"

for mod in enchantPaths:
    dir = enchantPath + mod + '/'
    enchantFiles = os.listdir(dir)
    for enchant in enchantFiles:
        with open(dir + enchant, 'r') as file:
            enchantData[mod + ':' + os.path.splitext(enchant)[0]] = json.load(file)

for enchant, data in enchantData.items():
    if enchant == 'immersiveenchanting:replicate' or enchant == 'immersiveenchanting:transmute' or enchant == 'immersiveenchanting:enchanting_fuels':
        continue
    if "enabled" in data and not data["enabled"]:
        continue
    newRecipe = deepcopy(baseRecipe)
    newRecipe['left'].insert(0,ancientBookItem(enchant))
    right = newRecipe['right']
    levels = data['levels']
    maxLevel = 0
    for level in range(10):
        key = str(level+1)
        if key in levels:
            maxLevel = level
            appendCosts(right, levels[key], enchant, level + 1)
    newRecipe['output'] = enchantedBookItem(enchant, maxLevel + 1)
    recipePath = emiEnchantDir(enchant)
    os.makedirs(os.path.dirname(recipePath), exist_ok=True)
    with open(recipePath, "w") as file:
        json.dump(newRecipe,file)
    
    
            
