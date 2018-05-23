import React from 'react';
import moment from 'moment'
import {createFragmentContainer, graphql} from 'react-relay';
import {Grid, Typography, ListItemText, ListItem, Divider, Tooltip} from 'material-ui';
import ReactMarkdown from 'react-markdown'

const UnknownEvent = ({githubEvent, viewer}) => (
  <Grid container>
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant='caption'>{githubEvent.githubUser.login} did {githubEvent.type}</Typography>
        </Grid>
        <Grid item xs={4}>
          <div style={{textAlign: 'right'}} >
            <Tooltip title={moment(githubEvent.createdAt).format()}>
              <Typography variant='caption' style={{display: 'inline'}}>{moment(githubEvent.createdAt).from(viewer.now, true)}</Typography>
            </Tooltip>
          </div>
        </Grid>
      </Grid>
      <ReactMarkdown source={githubEvent.body} renderers={{link : props => <a href={props.href} target="_blank">{props.children}</a>}}/>
      <Typography variant='caption' component='a' href={githubEvent.htmlUrl} target="_blank" rel="noreferrer noopener">{githubEvent.htmlUrl}</Typography>
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
      ... on UnknownEvent {
        htmlUrl, createdAt, body, type
        githubUser {
          login
        }
      }
    }
  `,
});
