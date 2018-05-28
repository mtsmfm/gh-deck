import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../environment';
import {Avatar, Button, Grid} from 'material-ui';
import {hot} from 'react-hot-loader'
import GithubEventList from './GithubEventList'

class App extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppQuery {
            viewer { id, image, ...GithubEventList_viewer }
          }
        `}
        variables={{}}
        render={({error, props}) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return <div>
            {
              props.viewer ?
                <Grid container>
                  <Grid item xs={2}>
                    <Avatar src={props.viewer.image} />
                  </Grid>
                  <Grid item xs={10}>
                    <GithubEventList viewer={props.viewer} />
                  </Grid>
                </Grid>
              :
                <Button href="/auth/github">Login via GitHub</Button>
            }
          </div>;
        }}
      />
    );
  }
}

export default hot(module)(App);

if (module.hot) {
  module.hot.accept();

  window.addEventListener('message', e => {
    console.clear();
  });
}
