const { SlashCommandBuilder, ChannelType } = require("discord.js");
const { exportLogDeferCommand } = require("../../lib/exportCommand");

module.exports = exportLogDeferCommand({
  data: new SlashCommandBuilder()
    .setName("clonechannel")
    .setDescription("지정한 채널의 복사본을 생성합니다.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("복사할 채널")
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildVoice)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("name").setDescription("채널의 이름")
    )
    .addChannelOption((option) =>
      option
        .setName("category")
        .setDescription("채널의 카테고리")
        .addChannelTypes(ChannelType.GuildCategory)
    ),
  async execute(interaction, builderLogs) {
    /** @type {import("discord.js").TextChannel | import("discord.js").VoiceChannel} */
    const channel = interaction.options.getChannel("channel", true);
    const name = interaction.options.getString("name");
    /** @type {import("discord.js").CategoryChannel | null} */
    const parent = interaction.options.getChannel("category");

    await interaction.guild.channels.create({
      name: name ? name : channel.name,
      type: channel.type,
      parent,
      permissionOverwrites: channel.permissionOverwrites.cache,
      topic: channel.topic,
      nsfw: channel.nsfw,
      bitrate: channel.bitrate,
      userLimit: channel.userLimit,
      rateLimitPerUser: channel.rateLimitPerUser,
      position: channel.position,
      rtcRegion: channel.rtcRegion,
      videoQualityMode: channel.videoQualityMode,
      defaultAutoArchiveDuration: channel.defaultAutoArchiveDuration,
    });

    await builderLogs.send(
      `\`${channel.name}\`채널의 복사본을 생성하였습니다.`
    );
  },
});
