import * as React from "react";
import { Grid, Typography } from "material-ui";
import GithubRepository from "../../components/GithubRepository";
import CreatedAt from "../../components/CreatedAt";
import * as ReactMarkdown from "react-markdown";
import gql from "graphql-tag";
import { UnknownEvent_githubEvent } from "./__generated__/UnknownEvent_githubEvent";
import { UnknownEvent_query } from "./__generated__/UnknownEvent_query";

const fragments = {
  query: gql`
    fragment UnknownEvent_query on Query {
      now @client
    }
  `,
  githubEvent: gql`
    fragment UnknownEvent_githubEvent on GithubEvent_UnknownEvent {
      githubRepository {
        name
      }
      createdAt
      body
      type
      githubUser {
        login
      }
    }
  `
};

const UnknownEvent: React.SFC<{
  githubEvent: UnknownEvent_githubEvent;
  query: UnknownEvent_query;
}> = ({ githubEvent, query }) => (
  <Grid container>
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="caption">
            {githubEvent.githubUser.login} did {githubEvent.type}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <CreatedAt now={query.now} createdAt={githubEvent.createdAt} />
        </Grid>
      </Grid>
      <ReactMarkdown
        source={githubEvent.body || ""}
        renderers={{
          link: props => (
            <a href={props.href} target="_blank">
              {props.children}
            </a>
          )
        }}
      />
      <GithubRepository name={githubEvent.githubRepository.name} />
    </Grid>
  </Grid>
);

export default Object.assign(UnknownEvent, { fragments });
