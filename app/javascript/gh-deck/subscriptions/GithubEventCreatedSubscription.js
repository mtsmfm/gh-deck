import { graphql, requestSubscription } from 'react-relay';
import moment from 'moment'

const subscription = graphql`
  subscription GithubEventCreatedSubscription {
    githubEventCreated { id, ...GithubEventListItem_githubEvent }
  }
`;

function subscribe(environment, viewerId) {
  return requestSubscription(
    environment,
    {
      subscription,
      variables: {},
      updater: (store, {githubEventCreated}) => {
        const viewer = store.get(viewerId)
        const events = [
          store.get(githubEventCreated.id, 'GithubEvent'),
          ...viewer.getLinkedRecords('githubEvents')
        ].sort((a, b) =>
          moment(b.getValue('createdAt')).unix() - moment(a.getValue('createdAt')).unix()
        )
        viewer.setLinkedRecords(events, 'githubEvents')
      }
    },
  );
}

export default subscribe;
