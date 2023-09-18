const { SlashCommandBuilder, RichPresenceAssets } = require("discord.js");
const { exportLogCommand } = require("../../lib/exportCommand");
const { getRolePermission } = require("../../lib/roleConcepts");

module.exports = exportLogCommand({
  data: new SlashCommandBuilder()
    .setName("editrole")
    .setDescription("지정한 역할을 수정합니다.")
    .addRoleOption((option) =>
      option.setName("role").setDescription("수정할 역할").setRequired(true)
    )
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
    )
    .addStringOption((option) =>
      option.setName("name").setDescription("역할의 이름")
    )
    .addBooleanOption((option) =>
      option.setName("hoist").setDescription("역할 맴버를 다른 맴버와 분리")
    )
    .addRoleOption((option) =>
      option.setName("position").setDescription("역할의 위치")
    ),
  async execute(interaction, builderLogs) {
    const role = interaction.options.getRole("role", true);
    const concept = interaction.options.getString("concept");
    const name = interaction.options.getString("name");
    const hoist = interaction.options.getBoolean("hoist");
    const positionRole = interaction.options.getRole("position");

    if (!role.editable || role.name == "@everyone") {
      await interaction.reply({
        content: `\`${role.name}\`은(는) 수정할 수 없습니다.`,
        ephemeral: true,
      });
      return;
    }

    if (concept) {
      await role.setPermissions(getRolePermission(concept));
      await builderLogs.send(
        `\`${
          role.name
        }\`역할의 권한을 \`${concept.toUpperCase()}\`로 변경하였습니다.`
      );
    }

    if (hoist != null) {
      await role.setHoist(hoist);
      await builderLogs.send(
        `\`${role.name}\`역할의 hoist 여부를 ${hoist}로 변경하였습니다.`
      );
    }

    if (positionRole) {
      if (!positionRole.editable || positionRole.name == "@everyone") {
        await interaction.reply({
          content: `\`${positionRole.name}\`역할은 위치로 지정할 수 없습니다.`,
          ephemeral: true,
        });
        return;
      }

      await role.edit({ position: positionRole.position });
      await builderLogs.send(
        `\`${role.name}\`역할의 위치를 \`${positionRole.name}\`역할의 위치로 변경하였습니다.`
      );
    }

    if (name) {
      await role.edit({ name });
      await builderLogs.send(
        `\`${role.name}\`의 이름을 ${name}(으)로 변경하였습니다.`
      );
    }
  },
});
