const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Resume the current song!'),
	execute: async ({ client, interaction }) => {

		const queue = client.DisTube.getQueue(interaction)
		if (!queue) return await interaction.reply(`❌ | There is nothing playing!`)
		const q = queue.songs
		  .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)

		  let final = q
		  if(q.length > 16) {
			final = q.slice(0, 17)
			final.push(`**${q.length - 17}** mais fados`)
		  }

		await interaction.reply(`**Server Queue**\n${final.join('\n')}`).catch(e=>{})
	}
};