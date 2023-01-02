const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('pauses the current song!'),
	execute: async ({ client, interaction }) => {

		const queue = client.DisTube.getQueue(interaction)
		if (!queue) return interaction.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
		if (queue.paused) {
		  queue.resume()
		  return await interaction.reply(`Resumed the song for you :)`)
		}
		queue.pause()

		await interaction.reply(`Paused the song for you :)`).catch(e=>{})
	}
};