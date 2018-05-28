import React from 'react';
import {Typography} from 'material-ui';

export default ({name}) => (
  <Typography variant='caption' component='a' href={`https://github.com/${name}`} target="_blank" rel="noreferrer noopener">
    {name}
  </Typography>
)
