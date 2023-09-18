const { ChannelType } = require("discord.js");

/**
 * @param {import("discord.js").ChatInputCommandInteraction<import("discord.js").CacheType>} interaction
 * @returns {Promise<import("discord.js").CategoryChannel | null | undefined>}
 */
const getBuilderCategory = async (interaction) => {
  const channels = await interaction.guild.channels.fetch();

  return channels.find(
    (channel) =>
      channel.name == "builder_category" &&
      channel.type == ChannelType.GuildCategory
  );
};

/**
 * @param {import("discord.js").ChatInputCommandInteraction<import("discord.js").CacheType>} interaction
 * @returns {Promise<import("discord.js").TextChannel | null | undefined>}
 */
const getBuilderLogs = async (interaction) => {
  const channels = await interaction.guild.channels.fetch();

  return channels.find(
    (channel) =>
      channel.name == "builder_logs" &&
      channel.parent.name == "builder_category"
  );
};

module.exports = { getBuilderCategory, getBuilderLogs };
