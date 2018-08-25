declare module "react-page-visibility" {
  import * as React from "react";

  interface Props {
    children?: (isVisible: boolean) => React.ReactNode;
  }
  export default class extends React.Component<Props> {}
}
