const { SlashCommandBuilder } = require("discord.js");
const { exportLogCommand } = require("../../lib/exportCommand");
const { getRolePermission } = require("../../lib/roleConcepts");

module.exports = exportLogCommand({
  data: new SlashCommandBuilder()
    .setName("createrole")
    .setDescription("새로운 역할을 생성합니다.")
    .addStringOption((option) =>
      option
        .setName("concept")
        .setDescription("역할의 컨셉")
        .addChoices(
          { name: "ADMINISTRATOR", value: "administrator" },
          { name: "MANAGER", value: "manager" },
          { name: "SUPPORTER", value: "supporter" },
          { name: "MEMBER", value: "member" },
          { name: "VIEWER", value: "viewer" },
          { name: "EMPTY", value: "empty" }
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("name").setDescription("역할의 이름").setRequired(true)
    )
    .addBooleanOption((option) =>
      option.setName("hoist").setDescription("역할 맴버를 다른 맴버와 분리")
    )
    .addRoleOption((option) =>
      option.setName("position").setDescription("역할의 위치")
    ),
  async execute(interaction, builderLogs) {
    const concept = interaction.options.getString("concept", true);
    const name = interaction.options.getString("name", true);
    const hoist = interaction.options.getBoolean("hoist", false);
    const positionRole = interaction.options.getRole("position");

    const role = await interaction.guild.roles.create({
      name,
      permissions: getRolePermission(concept),
      hoist,
    });

    if (positionRole) {
      if (!positionRole.editable || positionRole.name == "@everyone") {
        await interaction.reply({
          content: `\`${positionRole.name}\`역할은 위치로 지정할 수 없습니다.`,
          ephemeral: true,
        });
        role.delete();
        return;
      }

      await role.edit({ position: positionRole.position });
    }

    await builderLogs.send(`\`${role.name}\`역할을 생성하였습니다.`);
  },
});
