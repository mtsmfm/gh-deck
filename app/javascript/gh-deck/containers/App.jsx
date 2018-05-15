import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../environment';
import {Button, Avatar, Grid, Typography, ListItemText, List, ListItem, Divider} from 'material-ui';
import {hot} from 'react-hot-loader'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'

class App extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppQuery {
            viewer {
              id, image
              githubEvents {
                id, type, htmlUrl, createdAt, body
                githubUser {
                  id, avatarUrl, login
                }
              }
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
                <Grid container>
                  <Grid item xs={2}>
                    <Avatar src={props.viewer.image} />
                  </Grid>
                  <Grid item xs={10}>
                    <List>
                      {
                        props.viewer.githubEvents.map(e =>
                          <div key={e.id}>
                            <ListItem>
                                <Avatar src={e.githubUser.avatarUrl} component='a' href={`https://github.com/${e.githubUser.login}`} target="_blank" rel="noreferrer noopener"/>
                                <ListItemText>
                                  <Grid container>
                                    <Grid item xs={12}>
                                      <Grid container>
                                        <Grid item xs={6}>
                                          <Typography variant='caption'>{e.githubUser.login}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Typography variant='caption' style={{textAlign: 'right'}}>{moment(e.createdAt).fromNow()}</Typography>
                                        </Grid>
                                      </Grid>
                                      <Typography variant='caption'>{e.type}</Typography>
                                      <ReactMarkdown source={e.body} renderers={{link : props => <a href={props.href} target="_blank">{props.children}</a>}}/>
                                      <Typography variant='caption' component='a' href={e.htmlUrl} target="_blank" rel="noreferrer noopener">{e.htmlUrl}</Typography>
                                    </Grid>
                                  </Grid>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                          </div>
                        )
                      }
                    </List>
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
