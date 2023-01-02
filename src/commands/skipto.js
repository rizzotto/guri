const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skipto')
		.setDescription('Escolhe um numero bro')
		.addStringOption(option =>
			option.setName("numero").setDescription("numero da musica").setRequired(true)
		),
	execute: async ({client, interaction}) => {
		const queue = client.DisTube.getQueue(interaction)
		if (!queue) return interaction.reply(`❌ | There is nothing in the queue right now!`)

		const raw = await interaction.options.getString("numero")

		const num = parseInt(raw)

		if (isNaN(num)) return interaction.reply(`❌ | Please enter a valid number!`)
		await client.DisTube.jump(interaction, num).then(song => {
		  interaction.reply({ content: `Skipped to: ${song.name}` }).catch(e=>{})
		})
	}
};