import * as React from "react";
import { Avatar, ListItemText, ListItem } from "material-ui";
import gql from "graphql-tag";
import {
  GithubEventListItem_githubEvent,
  GithubEventListItem_githubEvent_GithubEvent_PushEvent,
  GithubEventListItem_githubEvent_GithubEvent_UnknownEvent,
  GithubEventListItem_githubEvent_GithubEvent_CreateEvent
} from "./__generated__/GithubEventListItem_githubEvent";
import PushEvent from "./github-events/PushEvent";
import { GithubEventListItem_query } from "./__generated__/GithubEventListItem_query";
import UnknownEvent from "./github-events/UnknownEvent";
import CreateEvent from "./github-events/CreateEvent";

interface Props {
  query: GithubEventListItem_query;
  githubEvent: GithubEventListItem_githubEvent;
}

const componentFor = ({ githubEvent, query }: Props) => {
  switch (githubEvent.type) {
    case "PushEvent":
      return (
        <PushEvent
          githubEvent={
            githubEvent as GithubEventListItem_githubEvent_GithubEvent_PushEvent
          }
          query={query}
        />
      );
    case "CreateEvent":
      return (
        <CreateEvent
          githubEvent={
            githubEvent as GithubEventListItem_githubEvent_GithubEvent_CreateEvent
          }
          query={query}
        />
      );
    default:
      return (
        <UnknownEvent
          githubEvent={
            githubEvent as GithubEventListItem_githubEvent_GithubEvent_UnknownEvent
          }
          query={query}
        />
      );
  }
};

const fragments = {
  query: gql`
    fragment GithubEventListItem_query on Query {
      ...PushEvent_query
    }
    ${PushEvent.fragments.query}
  `,
  githubEvent: gql`
    fragment GithubEventListItem_githubEvent on GithubEvent {
      id
      type
      githubUser {
        avatarUrl
        login
      }
      ...PushEvent_githubEvent
      ...CreateEvent_githubEvent
      ...UnknownEvent_githubEvent
    }
    ${PushEvent.fragments.githubEvent}
    ${CreateEvent.fragments.githubEvent}
    ${UnknownEvent.fragments.githubEvent}
  `
};

const GithubEventListItem: React.SFC<Props> = ({ query, githubEvent }) => (
  <ListItem>
    <Avatar
      src={githubEvent.githubUser.avatarUrl}
      component="a"
      {...{
        href: `https://github.com/${githubEvent.githubUser.login}`,
        target: "_blank",
        rel: "noreferrer noopener"
      }}
    />
    <ListItemText>{componentFor({ githubEvent, query })}</ListItemText>
  </ListItem>
);

export default Object.assign(GithubEventListItem, { fragments });
