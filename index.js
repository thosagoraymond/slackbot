const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-521853452784-523997443174-JS6xVd0COM52ugGosBt96eK3',
    name: 'Jokebot'
});

// start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    }

    bot.postMessageToChannel(
        'general', 
        'Get ready to be taken away by jokes',
        params
        );
});

//Erro handler
bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', (data) => {
    if (data.type !== 'message'){
        return;
    }
    
    handleMessage(data.text);
});

//Response to the data and text form handle message
function handleMessage(message){
    if (message.includes(' chucknorris')){
        chuckJoke();
    } else if (message.includes(' yomama')){
        yoMamaJoke();
    } else if (message.includes(' random')){
        randomJoke();
    } else if (message.includes(' help')){
        runHelp();
    }
}

//Calling chuck joke function
function chuckJoke(){
    axios.get('http://api.icndb.com/jokes/random')
    .then(res => {
        const joke = res.data.value.joke;

        const params = {
            icon_emoji: ':laughing:'
        }
    
        bot.postMessageToChannel(
            'general', 
            `Chuck Norris: ${joke}`,
            params
        );
    })
}

//Calling yomama joke function
function yoMamaJoke(){
    axios.get('https://api.yomomma.info')
    .then(res => {
        const joke = res.data.joke;

        const params = {
            icon_emoji: ':laughing:'
        }
    
        bot.postMessageToChannel(
            'general', 
            `Yo Mama : ${joke}`,
            params
        );
    })
}

//Calling a function for Random joke
function randomJoke(){
    const rand = Math.floor(Math.random() * 2) + 1;
    if (rand === 1){
        chuckJoke();
    } else if (random ===2 ){
        yoMamaJoke();
    }
}

//FUnction for running a help 
function runHelp(){
    const params = {
        icon_emoji: ':question:'
    };
    bot.postMessageToChannel('general', `Please type @jokebot with either 'chucknorris', 'yomama', or 'random' to get a joke ` , params);
}