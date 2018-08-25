import * as React from "react";
import { Typography } from "material-ui";

const GithubRepository: React.SFC<{ name: string }> = ({ name }) => (
  <Typography
    variant="caption"
    component="a"
    {...{
      href: `https://github.com/${name}`,
      target: "_blank",
      rel: "noreferrer noopener"
    }}
  >
    {name}
  </Typography>
);

export default GithubRepository;
