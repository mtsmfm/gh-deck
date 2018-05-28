import React from 'react';
import moment from 'moment'
import {createFragmentContainer, graphql} from 'react-relay';
import {Grid, Typography, ListItemText, ListItem, Divider, Tooltip} from 'material-ui';
import GithubRepository from '../../components/GithubRepository'
import CreatedAt from '../../components/CreatedAt'
import ReactMarkdown from 'react-markdown'

const UnknownEvent = ({githubEvent, viewer}) => (
  <Grid container>
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant='caption'>{githubEvent.githubUser.login} did {githubEvent.type}</Typography>
        </Grid>
        <Grid item xs={4}>
          <CreatedAt now={viewer.now} createdAt={githubEvent.createdAt} />
        </Grid>
      </Grid>
      <ReactMarkdown source={githubEvent.body} renderers={{link : props => <a href={props.href} target="_blank">{props.children}</a>}}/>
      <GithubRepository name={githubEvent.githubRepository.name}/>
    </Grid>
  </Grid>
)

export default createFragmentContainer(UnknownEvent, {
  viewer: graphql`
    fragment UnknownEvent_viewer on User {
      now
    }
  `,
  githubEvent: graphql`
    fragment UnknownEvent_githubEvent on GithubEvent {
      githubRepository {
        name
      }
      ... on GithubEvent_UnknownEvent {
        createdAt, body, type
        githubUser {
          login
        }
      }
    }
  `,
});
