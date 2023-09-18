const { Events, ChannelType } = require("discord.js");

module.exports = {
  name: Events.ChannelCreate,
  /** @param {import("discord.js").NonThreadGuildBasedChannel} channel */
  async execute(channel) {
    if (
      channel.type == ChannelType.GuildCategory &&
      channel.name == "builder_category"
    ) {
    }
  },
};
