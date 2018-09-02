import * as React from "react";
import { List, Grid, Typography, ListItem } from "@material-ui/core";
import GithubRepository from "../../components/GithubRepository";
import CreatedAt from "../../components/CreatedAt";
import gql from "graphql-tag";
import { PushEvent_githubEvent } from "./__generated__/PushEvent_githubEvent";
import { PushEvent_query } from "./__generated__/PushEvent_query";

const fragments = {
  query: gql`
    fragment PushEvent_query on Query {
      now @client
    }
  `,
  githubEvent: gql`
    fragment PushEvent_githubEvent on GithubEvent_PushEvent {
      createdAt
      githubRepository {
        name
      }
      githubUser {
        login
      }
      payload {
        pushRef: ref
        commits {
          message
          sha
        }
      }
    }
  `
};

const PushEvent: React.SFC<{
  githubEvent: PushEvent_githubEvent;
  query: PushEvent_query;
}> = ({ githubEvent, query }) => {
  const branch = githubEvent.payload.pushRef
    .split("/")
    .slice(2)
    .join("/");

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={8}>
            <Typography component="div">
              <div>
                <a
                  href={`https://github.com/${githubEvent.githubUser.login}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  @{githubEvent.githubUser.login}
                </a>
                &nbsp;pushed {githubEvent.payload.commits.length} commits to{" "}
                <a
                  href={`https://github.com/${
                    githubEvent.githubRepository.name
                  }/tree/${branch}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {branch}
                </a>
              </div>

              <List dense={true}>
                {githubEvent.payload.commits.slice(0, 3).map(c => (
                  <ListItem key={c.sha} dense={true}>
                    <Typography noWrap={true} variant="caption">
                      <a
                        href={`https://github.com/${
                          githubEvent.githubRepository.name
                        }/commit/${c.sha}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {c.sha.slice(0, 8)}
                      </a>
                      &nbsp;
                      {c.message}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <CreatedAt now={query.now} createdAt={githubEvent.createdAt} />
          </Grid>
        </Grid>
        <GithubRepository name={githubEvent.githubRepository.name} />
      </Grid>
    </Grid>
  );
};

export default Object.assign(PushEvent, { fragments });
