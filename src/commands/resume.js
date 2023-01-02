const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resume the current song!'),
	execute: async ({ client, interaction }) => {

		const queue = client.DisTube.getQueue(interaction)
		if (!queue) return interaction.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
		if (queue.paused) {
		  queue.resume()
		  await interaction.reply(`Resumed the song for you :)`).catch(e=>{})
		} else {
		  await interaction.reply(`The queue is not paused!`)
		}
	}
};