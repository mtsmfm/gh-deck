import React from 'react';
import moment from 'moment'
import {createFragmentContainer, graphql} from 'react-relay';
import {List, Grid, Typography, ListItem, Tooltip} from 'material-ui';
import GithubRepository from '../../components/GithubRepository'
import CreatedAt from '../../components/CreatedAt'

const PushEvent = ({githubEvent, viewer}) => {
  const branch = githubEvent.payload.ref.split('/').slice(2).join('/')

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={8}>
            <Typography component='div'>
              <div>
                <a href={`https://github.com/${githubEvent.githubUser.login}`} target="_blank" rel="noreferrer noopener">@{githubEvent.githubUser.login}</a>
                &nbsp;pushed {githubEvent.payload.commits.length} commits to <a href={`https://github.com/${githubEvent.githubRepository.name}/tree/${branch}`} target="_blank" rel="noreferrer noopener">{branch}</a>
              </div>

              <List dense={true}>
                {
                  githubEvent.payload.commits.slice(0, 3).map(c =>
                    <ListItem key={c.sha} dense={true}>
                      <Typography noWrap={true} variant='caption'>
                        <a href={`https://github.com/${githubEvent.githubRepository.name}/commit/${c.sha}`} target="_blank" rel="noreferrer noopener">
                          {c.sha.slice(0, 8)}
                        </a>
                        &nbsp;
                        {c.message}
                      </Typography>
                    </ListItem>
                  )
                }
              </List>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <CreatedAt now={viewer.now} createdAt={githubEvent.createdAt} />
          </Grid>
        </Grid>
        <GithubRepository name={githubEvent.githubRepository.name}/>
      </Grid>
    </Grid>
  )
}

export default createFragmentContainer(PushEvent, {
  viewer: graphql`
    fragment PushEvent_viewer on User {
      now
    }
  `,
  githubEvent: graphql`
    fragment PushEvent_githubEvent on GithubEvent {
      createdAt
      githubRepository {
        name
      }
      ... on GithubEvent_PushEvent {
        githubUser {
          login
        }
        payload {
          ref
          commits {
            message
            sha
          }
        }
      }
    }
  `,
});
