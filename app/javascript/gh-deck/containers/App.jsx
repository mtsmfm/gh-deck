import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../environment';
import {Button, Avatar} from 'material-ui';

export default class App extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppQuery {
            viewer {
              id, image
            }
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
                <Avatar src={props.viewer.image} />
              :
                <Button href="/auth/github">Login via GitHub</Button>
            }
          </div>;
        }}
      />
    );
  }
}
