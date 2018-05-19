import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import ActionCable from 'actioncable';
import createHandler from 'graphql-ruby-client/subscriptions/createHandler';

const subscriptionHandler = createHandler({
  cable: ActionCable.createConsumer(),
});

function fetchQuery(
  operation,
  variables,
) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
    credentials: 'same-origin'
  }).then(response => {
    return response.json();
  });
}

const environment = new Environment({
  network: Network.create(fetchQuery, subscriptionHandler),
  store: new Store(new RecordSource()),
});

export default environment;
