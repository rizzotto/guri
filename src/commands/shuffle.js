const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('EMBARALHARRR'),
	execute: async ({client, interaction}) => {
		const queue = client.DisTube.getQueue(interaction)
		if (!queue) return interaction.channel.send(`❌ | There is nothing in the queue right now!`)
		queue.shuffle()
		interaction.channel.send('Shuffled songs in the queue')	},
};