import React from 'react';
import moment from 'moment'
import {Typography, Tooltip} from 'material-ui';

export default ({createdAt, now}) => (
  <div style={{textAlign: 'right'}} >
    <Tooltip title={moment(createdAt).format()}>
      <Typography variant='caption' style={{display: 'inline'}}>{moment(createdAt).from(now, true)}</Typography>
    </Tooltip>
  </div>
)
