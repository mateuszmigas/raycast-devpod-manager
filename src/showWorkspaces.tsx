import { Color, Icon, List } from "@raycast/api";
import { devPodApi } from "./utils/devPodApi";
import { usePromise } from "@raycast/utils";

export default function Command() {
  const { data } = usePromise(() => devPodApi.getWorkspaces());

  console.log(data);
  return (
    <List>
      {data?.map((workspace) => (
        <List.Item
          accessories={[{ text: workspace.ide }]}
          icon={{
            source: Icon.CheckCircle,
            tintColor: Color.Green,
          }}
          key={workspace.name}
          title={workspace.name}
          subtitle={workspace.source}
        />
      ))}
    </List>
  );
}
