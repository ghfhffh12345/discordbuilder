const { SlashCommandBuilder, ChannelType } = require("discord.js");
const { exportLogCommand } = require("../../lib/exportCommand");

module.exports = exportLogCommand({
  data: new SlashCommandBuilder()
    .setName("createchannel")
    .setDescription("새로운 채널을 생성합니다.")
    .addIntegerOption((option) =>
      option
        .setName("type")
        .setDescription("채널의 종류")
        .setRequired(true)
        .addChoices(
          { name: "Text", value: ChannelType.GuildText },
          { name: "Voice", value: ChannelType.GuildVoice }
        )
    )
    .addStringOption((option) =>
      option.setName("name").setDescription("채널의 이름").setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("category")
        .setDescription("채널의 카테고리")
        .addChannelTypes(ChannelType.GuildCategory)
    ),
  async execute(interaction, builderLogs) {
    const name = interaction.options.getString("name", true);
    const type = interaction.options.getInteger("type", true);
    const parent = interaction.options.getChannel("category");

    const channel = await interaction.guild.channels.create({
      name,
      type,
      parent,
    });

    await builderLogs.send(`\`${channel.name}\`채널을 생성하였습니다.`);
  },
});
