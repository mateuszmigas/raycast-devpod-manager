import { List, Icon } from "@raycast/api";
import { devPodApi } from "./utils/devPodApi";
import { usePromise } from "@raycast/utils";

export default function Command() {
  const { data } = usePromise(() => devPodApi.getProviders());

  return (
    <List>
      {data?.map((provider) => (
        <List.Item
          key={provider.name}
          title={provider.name}
          subtitle={`${provider.version} - ${provider.description}`}
          icon={{
            source: Icon.CheckCircle,
            tintColor: provider.default ? "#00FF00" : undefined,
          }}
        />
      ))}
    </List>
  );
}
