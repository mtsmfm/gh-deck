import React from 'react';
import {Avatar, ListItemText, ListItem} from 'material-ui';
import {createFragmentContainer, graphql} from 'react-relay';
import PushEvent from './github-events/PushEvent'
import UnknownEvent from './github-events/UnknownEvent'
import CreateEvent from './github-events/CreateEvent'

const componentFor = ({githubEvent, viewer}) => {
  switch(githubEvent.type) {
    case 'PushEvent':
      return <PushEvent githubEvent={githubEvent} viewer={viewer} />;
    case 'CreateEvent':
      return <CreateEvent githubEvent={githubEvent} viewer={viewer} />;
    default:
      return <UnknownEvent githubEvent={githubEvent} viewer={viewer} />;
  }
}

const GithubEventListItem = ({githubEvent, viewer}) => (
  <ListItem>
    <Avatar src={githubEvent.githubUser.avatarUrl} component='a' href={`https://github.com/${githubEvent.githubUser.login}`} target="_blank" rel="noreferrer noopener"/>
    <ListItemText>
      {componentFor({githubEvent, viewer})}
    </ListItemText>
  </ListItem>
)

export default createFragmentContainer(GithubEventListItem, {
  viewer: graphql`
    fragment GithubEventListItem_viewer on User {
      now
      ...PushEvent_viewer
      ...CreateEvent_viewer
      ...UnknownEvent_viewer
    }
  `,
  githubEvent: graphql`
    fragment GithubEventListItem_githubEvent on GithubEvent {
      id, type
      githubUser {
        avatarUrl, login
      }
      ...PushEvent_githubEvent
      ...CreateEvent_githubEvent
      ...UnknownEvent_githubEvent
    }
  `,
});
