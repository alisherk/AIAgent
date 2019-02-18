import { ApiAiClient } from 'api-ai-javascript';
import { createStore, applyMiddleware } from 'redux';

const accessToken = 'abc489a4a2ce4651b5dc670d2f47011b';
const client = new ApiAiClient({ accessToken });
const ON_MESSAGE = 'ON_MESSAGE';

export const sendMessage = (text, sender) => ({
    type: ON_MESSAGE,
    payload: { text, sender }
});

const messageMiddleware = () => next => action => {

    next(action);

    if (action.type === ON_MESSAGE) {
        const { text } = action.payload;
        client.textRequest(text)
            .then(data => {
                const { speech } = data.result.fulfillment;
                next(sendMessage(speech, 'Brianna'))
            });
    }

}

const MessageReduce = (state = [], action) => {
    switch (action.type) {

        case ON_MESSAGE:
            return [...state, action.payload];

        default:
            return state;
    }
}

export const store = createStore(MessageReduce, applyMiddleware(messageMiddleware));