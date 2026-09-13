function registerNavigationTarget(name, item, getTarget) {
    if (!Platform.isLoaded('simulated')) return;
    let $Simulated = Java.loadClass('dev.simulated_team.simulated.Simulated');
    let $NavigationTarget = Java.loadClass('dev.simulated_team.simulated.content.blocks.nav_table.navigation_target.NavigationTarget');
    let navigation = new JavaAdapter($NavigationTarget, {
        getTarget: getTarget,
    });
    let navTarget = 'navTarget(java.lang.String,com.tterrag.registrate.util.nullness.NonNullSupplier,java.util.function.Supplier)';
    $Simulated.getRegistrate()[navTarget](name, () => navigation, () => Item.of(item).item);
}

// Track an online player with their head
if (Platform.isLoaded('simulated')) {
    registerNavigationTarget('player_head', 'minecraft:player_head', (navBE, self) => {
        let profile = self.getComponents().get('minecraft:profile');
        if (profile == null || !profile.id().isPresent()) return null;
        let player = navBE.getLevel().getServer().getPlayerList().getPlayer(profile.id().get());
        if (player == null) return null;
        if (String(player.getLevel().dimension) != String(navBE.getLevel().dimension)) return null;
        return player.position();
    });
}