import React from 'react';
import moment from 'moment'
import {createFragmentContainer, graphql} from 'react-relay';
import {List, Grid, Typography, ListItem, Tooltip} from 'material-ui';
import GithubRepository from '../../components/GithubRepository'
import CreatedAt from '../../components/CreatedAt'

const CreateEvent = ({githubEvent, viewer}) => {
  return (
    <Grid container>
      <Grid item xs={8}>
        <Typography component='div'>
          <a href={`https://github.com/${githubEvent.githubUser.login}`} target="_blank" rel="noreferrer noopener">@{githubEvent.githubUser.login}</a>
          &nbsp;created {githubEvent.payload.refType}
          &nbsp;<a href={`https://github.com/${githubEvent.githubRepository.name}/tree/${githubEvent.payload.ref}`} target="_blank" rel="noreferrer noopener">{githubEvent.payload.ref}</a>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <CreatedAt now={viewer.now} createdAt={githubEvent.createdAt} />
      </Grid>
      <GithubRepository name={githubEvent.githubRepository.name}/>
    </Grid>
  )
}

export default createFragmentContainer(CreateEvent, {
  viewer: graphql`
    fragment CreateEvent_viewer on User {
      now
    }
  `,
  githubEvent: graphql`
    fragment CreateEvent_githubEvent on GithubEvent {
      ... on GithubEvent_CreateEvent {
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
    }
  `,
});
