require("dotenv").config();
console.log(process.env.TOKEN)
const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
} = require("discord.js");

const YoutubePoster = require("discord-youtube");

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

const { handleEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: false,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});
client.ytp = new YoutubePoster(client, {
    loop_delay_in_min: 1
})
client.commands = new Collection()

module.exports = client;
console.log(handleEvents)
client.login(process.env.TOKEN).then(() => {
    handleEvents(client);
    loadCommands(client);
});

