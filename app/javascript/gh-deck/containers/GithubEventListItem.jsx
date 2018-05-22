import React from 'react';
import {Avatar, Grid, Typography, ListItemText, ListItem, Divider, Tooltip} from 'material-ui';
import {createFragmentContainer, graphql} from 'react-relay';
import moment from 'moment'
import ReactMarkdown from 'react-markdown'

const GithubEventListItem = ({githubEvent, viewer}) => (
  <ListItem>
    <Avatar src={githubEvent.githubUser.avatarUrl} component='a' href={`https://github.com/${githubEvent.githubUser.login}`} target="_blank" rel="noreferrer noopener"/>
    <ListItemText>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant='caption'>{githubEvent.githubUser.login}</Typography>
            </Grid>
            <Grid item xs={6}>
              <div style={{textAlign: 'right'}} >
                <Tooltip title={moment(githubEvent.createdAt).format()}>
                  <Typography variant='caption' style={{display: 'inline'}}>{moment(githubEvent.createdAt).from(viewer.now)}</Typography>
                </Tooltip>
              </div>
            </Grid>
          </Grid>
          <Typography variant='caption'>{githubEvent.type}</Typography>
          <ReactMarkdown source={githubEvent.body} renderers={{link : props => <a href={props.href} target="_blank">{props.children}</a>}}/>
          <Typography variant='caption' component='a' href={githubEvent.htmlUrl} target="_blank" rel="noreferrer noopener">{githubEvent.htmlUrl}</Typography>
        </Grid>
      </Grid>
    </ListItemText>
  </ListItem>
)

export default createFragmentContainer(GithubEventListItem, {
  viewer: graphql`
    fragment GithubEventListItem_viewer on User {
      now
    }
  `,
  githubEvent: graphql`
    fragment GithubEventListItem_githubEvent on GithubEvent {
      id, type, htmlUrl, createdAt, body
      githubUser {
        id, avatarUrl, login
      }
    }
  `,
});