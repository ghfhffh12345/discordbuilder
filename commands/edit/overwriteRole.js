const { SlashCommandBuilder, ChannelType } = require("discord.js");
const { exportLogCommand } = require("../../lib/exportCommand");
const { concepts } = require("../../lib/roleConcepts");

module.exports = exportLogCommand({
  data: new SlashCommandBuilder()
    .setName("overwriterole")
    .setDescription("채널의 역할 권한을 설정합니다.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("역할 권한을 설정할 채널")
        .addChannelTypes(
          ChannelType.GuildText,
          ChannelType.GuildVoice,
          ChannelType.GuildForum,
          ChannelType.GuildCategory
        )
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option.setName("role").setDescription("설정할 역할").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("concept")
        .setDescription("채널에서의 역할 컨셉")
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
    const role = interaction.options.getRole("role", true);
    const concept = interaction.options.getString("concept", true);

    await channel.permissionOverwrites.create(role, concepts.channel[concept]);

    await builderLogs.send(
      `\`${channel.name}\`채널의 \`${
        role.name
      }\`역할 권한을 \`${concept.toUpperCase()}\`로 변경하였습니다.`
    );
  },
});
