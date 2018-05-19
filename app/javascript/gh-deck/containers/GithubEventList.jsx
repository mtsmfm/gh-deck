import React from 'react';
import {List, Divider} from 'material-ui';
import {createFragmentContainer, graphql} from 'react-relay';
import GithubEventCreatedSubscription from '../subscriptions/GithubEventCreatedSubscription'
import GithubEventListItem from './GithubEventListItem'
import moment from 'moment'

class GithubEventList extends React.Component {
  componentDidMount() {
    this.subscription = GithubEventCreatedSubscription(this.props.relay.environment, this.props.viewer.id)
  }
  componentWillUnmount() {
    this.subscription.dispose()
  }

  render() {
    return (
      <List>
        {
          this.props.viewer.githubEvents.slice(0, 50).map(e =>
            <div key={e.id}>
              <GithubEventListItem githubEvent={e} />
              <Divider />
            </div>
          )
        }
      </List>
    )
  }
}

export default createFragmentContainer(GithubEventList, {
  viewer: graphql`
    fragment GithubEventList_viewer on User {
      id
      githubEvents {
        id, createdAt, ...GithubEventListItem_githubEvent
      }
    }
  `,
});
