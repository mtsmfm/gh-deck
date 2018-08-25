declare module "react-debounce-render" {
  import { ReactNode } from "react";

  export default function debounceRender<TProps>(
    ComponentToDebounce: React.ComponentClass<TProps>,
    wait?: number
  ): React.ComponentClass<TProps>;
}
