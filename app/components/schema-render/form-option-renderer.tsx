import { ActionIcon, rem, Select, Switch } from "@mantine/core";
import type { ComboboxData } from "@mantine/core/lib/components/Combobox/Combobox.types";

export function FormOptionRenderer(props: any) {
  const Component = props.component;
  switch (props.component) {
    case "select":
      return (
        <Select
          {...(props.componentProps ?? {})}
          data={(props.dataSource as ComboboxData) ?? []}
        ></Select>
      );
    case "switch":
      return <Switch {...(props.componentProps ?? {})} w={rem(38)}></Switch>;
    case "icon":
      return (
        <ActionIcon {...(props.componentProps ?? {})}>
          <i className={props.icon}></i>
        </ActionIcon>
      );
    default:
      return <Component />;
  }
}
