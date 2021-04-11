const responses = {}; // Filled in init()

class Intent {
    constructor(triggers, responses) {
        this.triggers = triggers;
        this.responses = responses;
    }
}

function parseIntent(text) {
    let stripped = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').replace(/\s+/g, ' ');

    for (let value of Object.keys(responses)) {
        let intent = responses[value];

        for (let trigger of intent.triggers) {
            if (stripped.includes(trigger)) {
                return intent.responses[Math.floor(Math.random() * intent.responses.length)];
            }
        }
    }

    return 'Sorry, I\'m not sure I understand.';
}

function appendNode(divId, input) {
    let node = document.createElement('p');
    let text = document.createTextNode(input);
    node.appendChild(text);
    document.getElementById(divId).appendChild(node);
}

function main(input) {
    if (input.length == 0) return;
    let response = parseIntent(input);

    let history = document.getElementById('history');
    if (history.childNodes.length > 17) {
        history.removeChild(history.childNodes[0]);
        history.removeChild(history.childNodes[0]);
    }

    appendNode('history', `You: ${input}`);
    appendNode('history', `FRIEND: ${response}`);
}

document.onkeydown = function(event) {
    if (event.key === "Enter") {
        main(document.getElementById('chat').value);
        document.getElementById('chat').value = '';
    }
};

function init() {
    responses.depression = new Intent([
        'depressed',
        'depression',
        'sad',
    ], [
        'If you\'ve been feeling down lately, know you\'re not alone.',
        'Try drinking some water, taking a walk and listening to your favourite music to get your mind off things.',
        'Things will get better. They always do.',
    ]);

    responses.anxiety = new Intent([
        'anxious',
        'anxiety',
    ], [
        'Take a deep breath in through your nose, hold it for 5 seconds and exhale through your mouth slowly. Repeat this 5 times or until you feel like you need to.',
    ]);

    responses.tired = new Intent([
        'tired',
    ], [
        'Doing a physical activity could help you feel more energized. Would you like to do a quick physical activity?',
    ]);

    responses.lonely = new Intent([
        'lonely',
        'alone',
    ], [
        'Maybe try talking to one of your team members so you could get to know each other and possibly open up to them about your problems. But if not, you can always talk to me.',
        'I\'m always here for you, maybe tell a team member you trust how you feel.',
    ]);

    responses.conversation = new Intent([
        'lets talk',
        'i want to talk',
    ], [
        'Okay, how’s your day going?',
    ]);

    responses.bad = new Intent([
        'im doing bad',
        'im bad',
        'feeling down',
        'bad day',
        'feeling bad',
    ], [
        'Things will get better. They always do.',
        'What went wrong, I\'m sure some things must have been nice? Always try to focus on the positives, everything happens for a reason.',
    ]);

    responses.good = new Intent([
        'im doing good',
        'im good',
        'feeling good',
        'good day',
    ], [
        'That\'s very nice to hear!',
    ]);

    responses.regret = new Intent([
        'regret this',
        'regret going',
        'wish i never went',
    ], [
        'You have been training for a very long time and are the most capable person on the planet, I know you can do it.',
        'It may not seem like the best decision now, but in the future you will look back and think of the great time you had.',
    ]);

    responses.howareyou = new Intent([
        'how are you',
    ], [
        'I\'m doing well, how about you?',
        'I\'m doing great, how about you?!',
        'I\'m doing good, how about you?'
    ]);
    
    responses.thanks = new Intent([
        'thanks',
        'thank you',
    ], [
        'No problem!',
        'Glad I could help!',
        'My pleasure!',
        'You\'re welcome!',
    ]);

    responses.hello = new Intent([
        'hey',
        'hello',
    ], [
        'Hello!',
        'Hi!',
        'Hello there!',
    ]);

    responses.goodbye = new Intent([
        'bye',
        'seeya',
    ], [
        'Goodbye!',
        'Bye!',
        'See you!',
    ]);
}

init();