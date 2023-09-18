const { SlashCommandBuilder } = require("discord.js");
const { exportLogDeferCommand } = require("../../lib/exportCommand");

module.exports = exportLogDeferCommand({
  data: new SlashCommandBuilder()
    .setName("deleteroles")
    .setDescription("모든 역할을 삭제합니다."),
  async execute(interaction, builderLogs) {
    const roles = await interaction.guild.roles.fetch();

    roles.forEach(async (role) => {
      if (role.editable && role.name != "@everyone") {
        await role.delete();
        await builderLogs.send(`\`${role.name}\`역할을 삭제하였습니다.`);
      }
    });
  },
});
