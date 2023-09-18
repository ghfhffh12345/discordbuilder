const { SlashCommandBuilder, ChannelType } = require("discord.js");
const { exportLogCommand } = require("../../lib/exportCommand");
const { concepts } = require("../../lib/roleConcepts");

module.exports = exportLogCommand({
  data: new SlashCommandBuilder()
    .setName("overwriteuser")
    .setDescription("채널의 유저 권한을 설정합니다.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("유저 권한을 설정할 채널")
        .addChannelTypes(
          ChannelType.GuildText,
          ChannelType.GuildVoice,
          ChannelType.GuildForum,
          ChannelType.GuildCategory
        )
        .setRequired(true)
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("설정할 유저").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("concept")
        .setDescription("채널에서의 유저 컨셉")
        .addChoices(
          { name: "MANAGER", value: "manager" },
          { name: "SUPPORTER", value: "supporter" },
          { name: "MEMBER", value: "member" },
          { name: "VIEWER", value: "viewer" },
          { name: "EMPTY", value: "empty" }
        )
        .setRequired(true)
    ),
  async execute(interaction, builderLogs) {
    /** @type {import("discord.js").TextChannel | import("discord.js").VoiceChannel | import("discord.js").ForumChannel | import("discord.js").CategoryChannel} */
    const channel = interaction.options.getChannel("channel", true);
    const user = interaction.options.getUser("user", true);
    const concept = interaction.options.getString("concept", true);

    await channel.permissionOverwrites.create(user, concepts.channel[concept]);

    await builderLogs.send(
      `\`${channel.name}\`채널의 \`${
        user.username
      }\`유저 권한을 \`${concept.toUpperCase()}\`로 변경하였습니다.`
    );
  },
});
