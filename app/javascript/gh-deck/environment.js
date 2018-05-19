import {
  Environment,
  Network,
  RecordSource,
  Store,
  ConnectionHandler,
  ViewerHandler,
} from 'relay-runtime';
import ActionCable from 'actioncable';
import createHandler from 'graphql-ruby-client/subscriptions/createHandler';

const NowHandler = {
  update(store, payload) {
    const record = store.get(payload.dataID);
    record.setValue((new Date).toISOString(), 'now');
  }
};

function handlerProvider(handle) {
  switch (handle) {
    case 'connection': return ConnectionHandler;
    case 'viewer': return ViewerHandler;
    case 'now': return NowHandler;
  }
  throw new Error(
    `handlerProvider: No handler provided for ${handle}`
  );
}

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
  handlerProvider
});

export default environment;
