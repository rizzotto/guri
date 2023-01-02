const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Vaza do server irmão'),
	execute: async ({client, interaction}) => {
		client.DisTube.voices.leave(interaction)
	},
};