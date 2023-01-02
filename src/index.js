const { Client, GatewayIntentBits, Collection, Events } = require('discord.js')
const { token } = require('./data/config.json')
const fs = require('node:fs');
const path = require('node:path');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
})

client.DisTube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
        emitEventsAfterFetching: true,
        }), 
        new SoundCloudPlugin()],
}) 

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on('ready', () => {
  console.log('The bot is ready')
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute({client, interaction});
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// client.on('messageCreate', async message => {
//     if (message.author.bot || !message.guild) return
//     const prefix = "!"
//     const args = message.content.slice(prefix.length).trim().split(/ +/g)
//     if (!message.content.toLowerCase().startsWith(prefix)) return

//     if(args.shift().toLowerCase() === 'play') {
//         client.DisTube.play(message.member.voice.channel, args.join(" "), {
//             member: message.member,
//             textChannel: message.channel,
//             message
//         })
//     }
    
// })

// client.DisTube.on("playSong", (queue, song) => {
//     queue.textChannel.send(`Now Playing: ${song.name}`)
// })

client.login(token)
