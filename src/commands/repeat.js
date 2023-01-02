const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('repeat')
		.setDescription('Bota em loop essa porra')
		.addStringOption(option =>
			option.setName("tipo").setDescription("0 = sem loop; 1 = música loop; 2 = fila loop").setRequired(true)
		),
	execute: async ({client, interaction}) => {
		const queue = client.DisTube.getQueue(interaction)
		if (!queue) return interaction.reply(`❌ | There is nothing playing!`)

		const value = await interaction.options.getString("tipo")

		const finalValue = parseInt(value)

		if (isNaN(finalValue)) return interaction.reply(`❌ | Please enter a valid number!`)

		let mode = queue.setRepeatMode(finalValue)
		mode = mode ? (mode === 2 ? 'Repetir fila' : 'Repetir música') : 'Desligado'
		interaction.reply(`🔁 | Modo de repetição: \`${mode}\``).catch(e=>{})
	}
};