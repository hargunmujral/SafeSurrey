"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var NewsAPI = require('newsapi');
var newsapi = new NewsAPI(process.env.NEWS_API_KEY);
var client = new discord_js_1["default"].Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES
    ]
});
var channel;
client.on('ready', function () {
    var _a, _b, _c;
    console.log('Ready!');
    var guildID = (_a = process.env.GUILD_ID) === null || _a === void 0 ? void 0 : _a.toString();
    var guild = client.guilds.cache.get(guildID);
    var commands;
    if (guild) {
        commands = guild.commands;
    }
    else {
        commands = (_b = client.application) === null || _b === void 0 ? void 0 : _b.commands;
    }
    commands === null || commands === void 0 ? void 0 : commands.create({
        name: 'help',
        description: 'Displays all commands'
    });
    channel = guild === null || guild === void 0 ? void 0 : guild.channels.cache.get((_c = process.env.CHANNEL_ID) === null || _c === void 0 ? void 0 : _c.toString());
});
client.on('interactionCreate', function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var commandName, options;
    return __generator(this, function (_a) {
        if (!interaction.isCommand()) {
            return [2 /*return*/];
        }
        commandName = interaction.commandName, options = interaction.options;
        if (commandName === 'help') {
            interaction.reply({
                content: 'Here is the function of the bot.',
                ephemeral: true
            });
        }
        return [2 /*return*/];
    });
}); });
client.on('messageCreate', function (message) {
    if (message.content === 'test') {
        message.reply({
            content: 'pass'
        });
    }
});
var query = '(Surrey OR Delta)' +
    ' AND (shoot OR shot OR kill OR gun OR murder OR rape OR' +
    'stab OR threaten OR assault OR attack OR die OR harass)';
function getNews() {
    var date = new Date();
    date.setHours(date.getHours() - 1);
    newsapi.v2.everything({
        q: query,
        searchIn: "title,description",
        from: date.toISOString()
    }).then(function (response) {
        console.log(response);
        if (response.totalResults > 0) {
            channel.send(response.articles[0].url);
        }
    });
}
client.login(process.env.TOKEN);
var cron = require('node-cron');
cron.schedule('0 * * * *', function () {
    getNews();
});
