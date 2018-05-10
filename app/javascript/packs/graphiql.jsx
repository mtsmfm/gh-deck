import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import '../graphiql/style'

function graphQLFetcher(graphQLParams) {
  return fetch(window.location.origin + '/graphql', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(graphQLParams),
    credentials: 'same-origin'
  }).then(response => response.json());
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div style={{height: '100vh'}}>
      <GraphiQL fetcher={graphQLFetcher} />
    </div>,
    document.body.appendChild(document.createElement('div')),
  )
})
