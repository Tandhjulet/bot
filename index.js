const fs = require('fs');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Collection } = require('discord.js');
const commandList = require("./commands/ping.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commands = [];
client.commands = new Collection();

commands.push(commandList.data.toJSON());
client.commands.set(commandList.data.name, commandList);

const TOKEN = 'TOKEN';

client.on('ready', () => {
    const CLIENT_ID = client.user.id;
    const rest = new REST({ version: '9' }).setToken(TOKEN);

    (async () => {
        try {
			await rest.put(
				Routes.applicationCommands(CLIENT_ID), {
					body: commands
				},
			);
			console.log('Opdaterede kommandoer globalt.');
        } catch (error) {
            if (error) console.error(error);
        }
    })();
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const user = interaction.options.getUser("bruger");
	const message = interaction.options.getString("besked");

	if (user && message) {
		user.send({ content: message })
		interaction.reply({ content: `\`${message}\` er sendt til \`${user.username}#${user.discriminator}\``, ephemeral: true })
	}
})

client.login(TOKEN);