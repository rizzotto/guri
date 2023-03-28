const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('usguri')
		.setDescription('Playlist dusguri'),
	execute: async ({client, interaction}) => {
		const songs = [
			'https://www.youtube.com/watch?v=gddPOTsX4i0&list=OLAK5uy_kj3jyOrWssJjOSu63foGi9NwZfvV9ZoiA',
			'https://www.youtube.com/watch?v=kaDOIFghKkY&list=OLAK5uy_kj3jyOrWssJjOSu63foGi9NwZfvV9ZoiA&index=2',
			'https://www.youtube.com/watch?v=tXC3Ud5QDPE&list=OLAK5uy_kj3jyOrWssJjOSu63foGi9NwZfvV9ZoiA&index=3',
			'https://www.youtube.com/watch?v=EhiWWAdDGzA&list=OLAK5uy_kj3jyOrWssJjOSu63foGi9NwZfvV9ZoiA&index=4',
			'https://www.youtube.com/watch?v=8ovJLd2ZDJk&list=OLAK5uy_kj3jyOrWssJjOSu63foGi9NwZfvV9ZoiA&index=5',
			'https://www.youtube.com/watch?v=BvgiJPXZIy4&list=OLAK5uy_kj3jyOrWssJjOSu63foGi9NwZfvV9ZoiA&index=6',
			'https://www.youtube.com/watch?v=zy81fLgyVW0&list=OLAK5uy_kj3jyOrWssJjOSu63foGi9NwZfvV9ZoiA&index=7',
			'https://www.youtube.com/watch?v=hj_LH_t7cro&list=OLAK5uy_kj3jyOrWssJjOSu63foGi9NwZfvV9ZoiA&index=8',
			'https://www.youtube.com/watch?v=oOqI2ZPmn7U&list=OLAK5uy_kj3jyOrWssJjOSu63foGi9NwZfvV9ZoiA&index=9',
			'https://soundcloud.com/ahrystan/wazowski-chapadowski', 
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
