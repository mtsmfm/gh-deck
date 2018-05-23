import React from 'react';
import moment from 'moment'
import {createFragmentContainer, graphql} from 'react-relay';
import {Grid, Typography, ListItemText, ListItem, Divider, Tooltip} from 'material-ui';
import ReactMarkdown from 'react-markdown'

const PushEvent = ({githubEvent, viewer}) => (
  <Grid container>
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={8}>
          <Typography>
            <a href={`https://github.com/${githubEvent.githubUser.login}`} target="_blank" rel="noreferrer noopener">{githubEvent.githubUser.login}</a>
            &nbsp;pushed to&nbsp;
            <a href={`https://github.com/${githubEvent.githubRepository.name}`} target="_blank" rel="noreferrer noopener">{githubEvent.githubRepository.name}</a>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <div style={{textAlign: 'right'}} >
            <Tooltip title={moment(githubEvent.createdAt).format()}>
              <Typography variant='caption' style={{display: 'inline'}}>{moment(githubEvent.createdAt).from(viewer.now, true)}</Typography>
            </Tooltip>
          </div>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

export default createFragmentContainer(PushEvent, {
  viewer: graphql`
    fragment PushEvent_viewer on User {
      now
    }
  `,
  githubEvent: graphql`
    fragment PushEvent_githubEvent on GithubEvent {
      ... on PushEvent {
        createdAt
        githubUser {
          login
        }
        githubRepository {
          name
        }
      }
    }
  `,
});
