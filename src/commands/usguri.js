const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('usguri')
		.setDescription('Playlist dusguri'),
	execute: async ({client, interaction}) => {
		const songs = [
			'https://soundcloud.com/ahrystan/wazowski-chapadowski', 
			'https://www.youtube.com/watch?v=NuunFK7y_Ys',
			'https://www.youtube.com/watch?v=BbBQP3YZWKE',
			'https://www.youtube.com/watch?v=F1cDAX1v_cE',
			'https://www.youtube.com/watch?v=-MvhJODhB4s'
		]

		const playlist = await client.DisTube.createCustomPlaylist(songs, {
			member: interaction.member,
			properties: { name: "UsGuri Playlist", source: "custom" },
			parallel: true
		})

		client.DisTube.play(interaction.member.voice.channel, playlist)

		await interaction.reply("🤘 ÉEEEHMMM").catch(e=>{})
	},
};