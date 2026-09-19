ClientEvents.lang('en_us', event => {

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    function getOreName(ore) {
        let str = ''
        if (ore.stone) {
            let stoneStrings = ore.stone.split('_')
            for (let stone of stoneStrings) {
                str += capitalizeFirstLetter(stone) + ' '
            }
        }
        return `${str}${capitalizeFirstLetter(ore.id)} ${(ore.vein ? 'Deposit' : 'Ore')}`
    }

    for (let ore of lib.customOres) {
        console.log('LANG WORK',getOreName(ore))
        event.add(`block.kubejs.${ore.name}`, getOreName(ore))
    }

})