const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Limpa a fila'),
	execute: async ({client, interaction}) => {
		const queue = client.DisTube.getQueue(interaction)
		if (!queue) return await interaction.reply(`❌ | There is nothing playing!`)

		queue.songs = []

		await interaction.reply("Fila limpa BRO").catch(e=>{})
	},
};