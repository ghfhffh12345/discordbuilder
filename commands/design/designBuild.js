const { SlashCommandBuilder } = require("discord.js");
const { exportLogDeferCommand } = require("../../lib/exportCommand");
const mentionChannel = /^\<#([0-9]+)\>$/;

module.exports = exportLogDeferCommand({
  data: new SlashCommandBuilder()
    .setName("designbuild")
    .setDescription("'builder_category'의 모든 디자인을 적용합니다."),
  async execute(interaction, builderLogs) {
    const builderCategory = builderLogs.parent;

    builderCategory.children.cache.forEach(async (parentChannel) => {
      const messages = await parentChannel.messages.fetch({ limit: 100 });

      messages.forEach(async (message) => {
        const captures = message.content.match(mentionChannel);

        if (captures[1]) {
          const childChannel = await interaction.guild.channels.fetch(
            captures[1]
          );

          if (childChannel) {
            childChannel.permissionOverwrites.set(
              parentChannel.permissionOverwrites.cache
            );
          }
        }
      });
    });

    builderLogs.send("`builder_category`의 모든 디자인을 적용했습니다.");
  },
});
