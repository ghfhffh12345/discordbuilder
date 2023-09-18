const { SlashCommandBuilder } = require("discord.js");
const { exportLogCommand } = require("../../lib/exportCommand");

module.exports = exportLogCommand({
  data: new SlashCommandBuilder()
    .setName("deleterole")
    .setDescription("지정한 역할을 삭제합니다.")
    .addRoleOption((option) =>
      option.setName("role").setDescription("삭제할 역할").setRequired(true)
    ),
  async execute(interaction, builderLogs) {
    const role = interaction.options.getRole("role", true);

    if (!role.editable || role.name == "@everyone") {
      await interaction.reply({
        content: `\`${role.name}\`은(는) 삭제할 수 없는 역할입니다.`,
        ephemeral: true,
      });
      return;
    }

    await role.delete();
    await builderLogs.send(`\`${role.name}\`역할을 삭제하였습니다.`);
  },
});
