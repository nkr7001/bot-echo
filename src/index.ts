import * as restify from 'restify';
import { BotFrameworkAdapter, TurnContext } from 'botbuilder';

// Create HTTP server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 5000, '127.0.0.1', () => {
    console.log(`\n${server.name} listening to ${server.url}`);
});

// Create adapter
const adapter = new BotFrameworkAdapter({
    appId: process.env.APPID,
    appPassword: process.env.APPPASSWORD
});

// Listen for incoming requests
server.post('/api/messages', (req: restify.Request, res: restify.Response, next: restify.Next) => {
    adapter.processActivity(req, res, async (context: TurnContext) => {
        if (context.activity.type === 'message') {
            await context.sendActivity(`You said: ${context.activity.text}`);
        }
    }).then(() => {
        res.send(200);
        next();
    }).catch((err: Error) => {
        console.error(err);
        res.send(500);
        next();
    });
});

