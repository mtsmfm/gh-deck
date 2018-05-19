import React from 'react';
import {List, Divider} from 'material-ui';
import {createFragmentContainer, graphql, commitLocalUpdate} from 'react-relay';
import GithubEventCreatedSubscription from '../subscriptions/GithubEventCreatedSubscription'
import GithubEventListItem from './GithubEventListItem'
import moment from 'moment'
import debounceRender from 'react-debounce-render';

class GithubEventList extends React.Component {
  componentDidMount() {
    this.subscription = GithubEventCreatedSubscription(this.props.relay.environment, this.props.viewer.id)
    this.interval = setInterval(this.tick.bind(this), 10000);
  }
  componentWillUnmount() {
    this.subscription.dispose()
    clearInterval(this.interval);
  }

  tick() {
    commitLocalUpdate(this.props.relay.environment, (store) => {
      store.get(this.props.viewer.id).setValue((new Date).toISOString(), 'now');
    })
  }

  render() {
    return (
      <List>
        {
          this.props.viewer.githubEvents.slice(0, 50).map(e =>
            <div key={e.id}>
              <GithubEventListItem githubEvent={e} viewer={this.props.viewer} />
              <Divider />
            </div>
          )
        }
      </List>
    )
  }
}

export default createFragmentContainer(debounceRender(GithubEventList, 300), {
  viewer: graphql`
    fragment GithubEventList_viewer on User {
      _id: id @__clientField(handle: "now")
      id
      ...GithubEventListItem_viewer
      githubEvents {
        id, createdAt, ...GithubEventListItem_githubEvent
      }
    }
  `,
});
