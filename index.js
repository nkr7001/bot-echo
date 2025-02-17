const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');

// Create HTTP server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 5000, '127.0.0.1', () => {
    console.log(`\n${server.name} listening to ${server.url}`);
});

// Create adapter
const adapter = new BotFrameworkAdapter({
    appId: 'eea674ec-bfb9-40b2-aafe-4a54123c00d4',
    appPassword: 'zN98Q~0W89ksO5ImJxvhlaWmiKgV_2TcfdMfhba2'
});

// Listen for incoming requests
server.post('/api/messages', (req, res, next) => {
    adapter.processActivity(req, res, async (context) => {
        if (context.activity.type === 'message') {
            await context.sendActivity(`You said: ${context.activity.text}`);
        }
    }).then(() => {
        res.send(200);
        next();
    }).catch((err) => {
        console.error(err);
        res.send(500);
        next();
    });
});

