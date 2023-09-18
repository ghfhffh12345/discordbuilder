const { SlashCommandBuilder } = require("discord.js");
const { exportLogCommand } = require("../../lib/exportCommand");

module.exports = exportLogCommand({
  data: new SlashCommandBuilder()
    .setName("deletechannel")
    .setDescription("지정한 채널을 삭제합니다.")
    .addChannelOption((option) =>
      option.setName("channel").setDescription("삭제할 채널").setRequired(true)
    ),
  async execute(interaction, builderLogs) {
    /** @type {import("discord.js").TextChannel | import("discord.js").VoiceChannel | import("discord.js").CategoryChannel | import("discord.js").ForumChannel} */
    const channel = interaction.options.getChannel("channel", true);

    if (
      !channel.deletable ||
      channel.id == builderLogs.id ||
      channel.id == builderLogs.parentId
    ) {
      await interaction.reply({
        content: `\`${channel.name}\`은(는) 삭제할 수 없는 채널입니다.`,
        ephemeral: true,
      });
      return;
    }

    channel.delete();
    await builderLogs.send(`\`${channel.name}\`채널을 삭제하였습니다.`);
  },
});
