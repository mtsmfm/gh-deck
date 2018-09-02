import * as React from "react";
import { List, Divider, Fade } from "@material-ui/core";
import GithubEventListItem from "./GithubEventListItem";
import debounceRender from "react-debounce-render";
import gql from "graphql-tag";
import { GithubEventList_query } from "./__generated__/GithubEventList_query";
import { Mutation } from "react-apollo";
import { GithubEventList_githubEvent } from "./__generated__/GithubEventList_githubEvent";

const fragments = {
  query: gql`
    fragment GithubEventList_query on Query {
      ...GithubEventListItem_query
    }
    ${GithubEventListItem.fragments.query}
  `,
  githubEvent: gql`
    fragment GithubEventList_githubEvent on GithubEvent {
      id
      createdAt
      ...GithubEventListItem_githubEvent
    }
    ${GithubEventListItem.fragments.githubEvent}
  `
};

class Interval extends React.Component<{
  func: () => void;
}> {
  private interval: number | undefined;

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.props.func();
  }

  render() {
    return null;
  }
}

class GithubEventList extends React.Component<{
  githubEvents: GithubEventList_githubEvent[];
  query: GithubEventList_query;
  subscribeToMore: () => void;
}> {
  componentDidMount() {
    this.props.subscribeToMore();
  }

  render() {
    return (
      <Mutation
        mutation={gql`
          mutation tick {
            tick @client
          }
        `}
      >
        {tick => (
          <List>
            <Interval func={tick} />
            {this.props.githubEvents.slice(0, 50).map(e => (
              <Fade key={e.id} timeout={1000} in={true}>
                <div>
                  <GithubEventListItem
                    githubEvent={e}
                    query={this.props.query}
                  />
                  <Divider />
                </div>
              </Fade>
            ))}
          </List>
        )}
      </Mutation>
    );
  }
}

export default Object.assign(debounceRender(GithubEventList), { fragments });
