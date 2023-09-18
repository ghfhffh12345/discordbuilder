const { SlashCommandBuilder, ChannelType } = require("discord.js");
const { exportLogCommand } = require("../../lib/exportCommand");

module.exports = exportLogCommand({
  data: new SlashCommandBuilder()
    .setName("createcategory")
    .setDescription("새로운 카테고리를 생성합니다.")
    .addStringOption((option) =>
      option.setName("name").setDescription("카테고리의 이름").setRequired(true)
    ),
  async execute(interaction, builderLogs) {
    const name = interaction.options.getString("name", true);

    const channel = await interaction.guild.channels.create({
      name,
      type: ChannelType.GuildCategory,
    });

    await builderLogs.send(`\`${channel.name}\`카테고리를 생성하였습니다.`);
  },
});
