const {
  SlashCommandBuilder,
  ChannelType,
  PermissionsBitField,
} = require("discord.js");
const {
  getBuilderLogs,
  getBuilderCategory,
} = require("../../lib/builderChannels");
const { exportCommand } = require("../../lib/exportCommand");

module.exports = exportCommand({
  data: new SlashCommandBuilder()
    .setName("designinit")
    .setDescription(
      "서버 건축을 도와주는 'builder_category'카테고리를 생성합니다."
    ),
  async execute(interaction) {
    let builderCategory = await getBuilderCategory(interaction);
    const builderLogs = await getBuilderLogs(interaction);

    if (builderCategory && builderLogs) {
      await interaction.reply({
        content: "`builder_category`가 이미 존재합니다.",
        ephemeral: true,
      });
      return;
    }

    if (builderCategory && !builderLogs) {
      await interaction.guild.channels.create({
        name: "builder_logs",
        type: ChannelType.GuildText,
        parent: builderCategory,
      });

      await interaction.reply({
        content: "`builder_logs`를 생성하였습니다.",
        ephemeral: true,
      });
      return;
    }

    builderCategory = await interaction.guild.channels.create({
      name: "builder_category",
      type: ChannelType.GuildCategory,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
      ],
    });

    await interaction.guild.channels.create({
      name: "builder_logs",
      type: ChannelType.GuildText,
      parent: builderCategory,
    });

    await interaction.reply({
      content: "`builder_category`를 생성하였습니다.",
      ephemeral: true,
    });
  },
});
