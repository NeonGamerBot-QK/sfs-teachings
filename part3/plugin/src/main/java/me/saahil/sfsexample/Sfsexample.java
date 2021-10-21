package me.saahil.sfsexample;

import me.saahil.sfsexample.commands.Ping;
import org.bukkit.plugin.java.JavaPlugin;

import java.util.logging.Logger;

public final class Sfsexample extends JavaPlugin {
public static Logger logger;
public static Sfsexample instance;

    @Override
    public void onEnable() {
        // Plugin startup logic
        logger = getLogger();
        instance = this;
        logger.info("Post Load");
        saveDefaultConfig();
getServer().getPluginManager();
getCommand("ping").setExecutor(new Ping());
    }

    @Override
    public void onDisable() {
        // Plugin shutdown logic
        logger.info("Shutting down");
    }
}
