const { SlashCommandBuilder, ChannelType } = require("discord.js");
const { exportLogDeferCommand } = require("../../lib/exportCommand");

module.exports = exportLogDeferCommand({
  data: new SlashCommandBuilder()
    .setName("clonecategory")
    .setDescription("지정한 카테고리의 복사본을 생성합니다.")
    .addChannelOption((option) =>
      option
        .setName("category")
        .setDescription("복사할 카테고리")
        .addChannelTypes(ChannelType.GuildCategory)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("name").setDescription("카테고리의 이름")
    ),
  async execute(interaction, builderLogs) {
    /** @type {import("discord.js").CategoryChannel} */
    const category = interaction.options.getChannel("category", true);
    const name = interaction.options.getString("name");

    const cloneCategory = await interaction.guild.channels.create({
      name: name ? name : category.name,
      type: ChannelType.GuildCategory,
      permissionOverwrites: category.permissionOverwrites.cache,
      topic: category.topic,
      nsfw: category.nsfw,
      bitrate: category.bitrate,
      userLimit: category.userLimit,
      rateLimitPerUser: category.rateLimitPerUser,
      position: category.position,
      rtcRegion: category.rtcRegion,
      videoQualityMode: category.videoQualityMode,
      defaultAutoArchiveDuration: category.defaultAutoArchiveDuration,
    });

    category.children.cache.forEach(async (channel) => {
      await cloneCategory.children.create({
        name: channel.name,
        type: channel.type,
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
    });

    await builderLogs.send(
      `\`${category.name}\`카테고리의 복사본을 생성하였습니다.`
    );
  },
});
