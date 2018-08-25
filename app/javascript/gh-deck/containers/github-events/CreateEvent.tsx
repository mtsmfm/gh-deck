import * as React from "react";
import { Grid, Typography } from "material-ui";
import GithubRepository from "../../components/GithubRepository";
import CreatedAt from "../../components/CreatedAt";
import gql from "graphql-tag";
import { CreateEvent_githubEvent } from "./__generated__/CreateEvent_githubEvent";
import { CreateEvent_query } from "./__generated__/CreateEvent_query";

const fragments = {
  query: gql`
    fragment CreateEvent_query on Query {
      now @client
    }
  `,
  githubEvent: gql`
    fragment CreateEvent_githubEvent on GithubEvent_CreateEvent {
      createdAt
      githubUser {
        login
      }
      githubRepository {
        name
      }
      payload {
        ref
        refType
      }
    }
  `
};

const CreateEvent: React.SFC<{
  githubEvent: CreateEvent_githubEvent;
  query: CreateEvent_query;
}> = ({ githubEvent, query }) => {
  return (
    <Grid container>
      <Grid item xs={8}>
        <Typography component="div">
          <a
            href={`https://github.com/${githubEvent.githubUser.login}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            @{githubEvent.githubUser.login}
          </a>
          &nbsp;created {githubEvent.payload.refType}
          &nbsp;
          <a
            href={`https://github.com/${
              githubEvent.githubRepository.name
            }/tree/${githubEvent.payload.ref}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            {githubEvent.payload.ref}
          </a>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <CreatedAt now={query.now} createdAt={githubEvent.createdAt} />
      </Grid>
      <GithubRepository name={githubEvent.githubRepository.name} />
    </Grid>
  );
};

export default Object.assign(CreateEvent, { fragments });
