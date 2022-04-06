const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("send")
        .setDescription("Sender en besked til en spiller, i DMs.")
		.addUserOption((option) => 
			option
				.setName("bruger")
				.setDescription("Brugeren beskeden skal sendes til.")
				.setRequired(true)
		).addStringOption((option) =>
			option
				.setName("besked")
				.setDescription("Beskeden der skal sendes til spilleren.")
				.setRequired(true)
		),
};