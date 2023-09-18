const { getBuilderLogs } = require("./builderChannels");

/**
 * @param {{data: import("discord.js").SlashCommandBuilder | Omit<import("discord.js").SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, execute: (interaction: import("discord.js").ChatInputCommandInteraction<import("discord.js").CacheType>) => Promise<void>}} command
 */
const exportCommand = (command) => {
  return command;
};

/**
 * @param {{data: import("discord.js").SlashCommandBuilder | Omit<import("discord.js").SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, execute: (interaction: import("discord.js").ChatInputCommandInteraction<import("discord.js").CacheType>, builderLogs: import("discord.js").TextChannel) => Promise<void>}} command
 * @returns {{data: import("discord.js").SlashCommandBuilder | Omit<import("discord.js").SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, execute: (interaction: import("discord.js").ChatInputCommandInteraction<import("discord.js").CacheType>) => Promise<void>}}
 */
const exportLogCommand = (command) => {
  return {
    data: command.data,
    execute: async (interaction) => {
      const builderLogs = await getBuilderLogs(interaction);

      if (!builderLogs) {
        await interaction.reply("`builder_logs`가 없습니다.");
        return;
      }

      await command.execute(interaction, builderLogs);

      if (!interaction.replied) {
        await interaction.reply({
          content: `<#${builderLogs.id}>`,
          ephemeral: true,
        });
      }
    },
  };
};

/**
 * @param {{data: import("discord.js").SlashCommandBuilder | Omit<import("discord.js").SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, execute: (interaction: import("discord.js").ChatInputCommandInteraction<import("discord.js").CacheType>, builderLogs: import("discord.js").TextChannel) => Promise<void>}} command
 * @returns {{data: import("discord.js").SlashCommandBuilder | Omit<import("discord.js").SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, execute: (interaction: import("discord.js").ChatInputCommandInteraction<import("discord.js").CacheType>) => Promise<void>}}
 */
const exportLogDeferCommand = (command) => {
  return {
    data: command.data,
    execute: async (interaction) => {
      const builderLogs = await getBuilderLogs(interaction);

      if (!builderLogs) {
        await interaction.reply("`builder_logs`가 없습니다.");
        return;
      }

      await interaction.deferReply({ ephemeral: true });

      await command.execute(interaction, builderLogs);

      if (!interaction.replied) {
        await interaction.editReply(`<#${builderLogs.id}>`);
      }
    },
  };
};

module.exports = { exportCommand, exportLogCommand, exportLogDeferCommand };
