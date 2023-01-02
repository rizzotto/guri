const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { voiceChannelId } = require('../data/config.json')

function splitRandom(data, n) {
	var seen = [];
	var counter = 0;
  
	var shuffle = data.reduce(function(r, e) {
	  function random() {
		var rand = parseInt(Math.random(0, data.length) * data.length);
		if (seen.indexOf(rand) != -1) {
		  return random()
		} else {
		  seen.push(rand)
		  return rand;
		}
	  }
  
	  r[random()] = e;
	  return r;
	}, [])
  
	var split = shuffle.reduce(function(r, e) {
	  var c = counter++;
	  r[c] = r[c].concat(e)
	  counter = counter % n;
	  return r;
	}, Array(n).fill([]))
  
	return split;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mix')
		.setDescription('Mix de 10 players'),
	execute: async ({client, interaction}) => {
		let embed = new EmbedBuilder()

		const members = []
		interaction.guild.channels.fetch(voiceChannelId)
		.then(channel => {
			channel.members.forEach(member => members.push(member.user.username))
			const [ team1, team2 ] = splitRandom(members, 2)
			if(members.length !== 10) interaction.replys("Tem q ter 10 cabeças na call po!")

			embed
			.setTitle(`**MIX DUSGURI**`)
			.addFields(
				{ name: 'Time 1', value: team1.join('\n'), inline: true },
				{ name: 'Time 2', value: team2.join('\n'), inline: true },
			)

			interaction.reply({
				embeds: [embed.setColor(0x7289DA)],
			}).catch(e=>{})

		})
		.catch(console.error);
	},
};