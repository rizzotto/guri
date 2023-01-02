const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Vamo de next'),
	execute: async ({client, interaction}) => {
		const queue = client.DisTube.getQueue(interaction)
		console.log(client)

		if (!queue) return await interaction.reply(`❌ | There is nothing in the queue right now!`)
		try {
		  const song = await queue.skip()
		  await interaction.reply(`✅ | Skipped! Now playing:\n${song.name}`).catch(e=>{})
		} catch (e) {
			await interaction.reply(`❌ | There is nothing in the queue right now!`)
		}	},
};