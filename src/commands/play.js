const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song!')
		.addStringOption(option =>
			option.setName("search").setDescription("search keywords").setRequired(true)
		),
	execute: async ({ client, interaction }) => {
			let embed = new EmbedBuilder()

			if (!interaction.member.voice.channel) return interaction.reply("You need to be in a Voice Channel to play a song.");

			const query = interaction.options.getString("search")

			client.DisTube.play(interaction.member.voice.channel, query, {
				member: interaction.member,
				textChannel: interaction.channel,
				interaction
			})

			const result = await interaction.client.DisTube.search(query);
			const song = result[0]

			embed
			.setTitle(`**${song.name}** - \`${song.formattedDuration}\``)
			.setAuthor({ name: song.uploader.name })
			.setDescription(`**url**: ${song.url}
							 **views**: ${song.views}`)
			.setThumbnail(song.thumbnail)
			.setFooter({ text: `Guri que pediu: ${interaction.user.username}`})


			await interaction.reply({
				embeds: [embed],
			}).catch(e=>{})
		
		}
};