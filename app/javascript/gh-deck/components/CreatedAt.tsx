import * as React from "react";
import * as moment from "moment";
import { Typography, Tooltip } from "@material-ui/core";

const CreatedAt: React.SFC<{ createdAt: string; now: string }> = ({
  createdAt,
  now
}) => (
  <div style={{ textAlign: "right" }}>
    <Tooltip title={moment(createdAt).format()}>
      <Typography variant="caption" style={{ display: "inline" }}>
        {moment(createdAt).from(now, true)}
      </Typography>
    </Tooltip>
  </div>
);

export default CreatedAt;
