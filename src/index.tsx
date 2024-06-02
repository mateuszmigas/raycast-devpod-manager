import { List } from "@raycast/api";
import { devPodApi } from "./devPodApi";
import { usePromise } from "@raycast/utils";

//commands
//Providers
//Workspaces -> options on workspaces
//Create Workspace

export default function Command() {
  const { data } = usePromise(() => devPodApi.getProviders());

  return (
    <List>
      {data?.map((provider) => (
        <List.Item
          key={provider.name}
          title={provider.name}
          subtitle={`${provider.version} - ${provider.description}`}
        />
      ))}
    </List>
  );
}
