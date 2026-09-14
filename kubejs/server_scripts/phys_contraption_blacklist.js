let blacklist = [
    'chunkloaders:single_chunk_loader',
    'chunkloaders:basic_chunk_loader',
    'chunkloaders:advanced_chunk_loader',
    'chunkloaders:ultimate_chunk_loader',
]

function preventPlacement(event) {
    let {block} = event
    let pos = block.pos
    if (block.x >= 20479984 && block.z >= 20479984) {
        event.cancel()
    }
}

for (let item of blacklist) {
    BlockEvents.placed(item, preventPlacement)
}