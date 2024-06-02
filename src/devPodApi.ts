import { executeShell } from "./shell";

type TableRow = string[];

const tableFormat = {
  headerRows: 2,
  columnSeparator: "|",
};

const parseStringAsTable = (table: string): TableRow[] => {
  const lines = table.split("\n");
  return lines
    .filter((line) => line.trim().length > 0)
    .splice(tableFormat.headerRows)
    .map((row) => row.split(tableFormat.columnSeparator).map((cell) => cell.trim()));
};

const parseBoolean = (value: string): boolean => {
  return value.toLowerCase() === "true";
};

type DevPodProviderName = "docker";
type DevPodIdeName = "vscode";

export type DevPodProvider = {
  name: DevPodProviderName;
  version: string;
  default: boolean;
  initialized: boolean;
  description: string;
};

export type DevPodWorkspace = {
  name: DevPodIdeName;
  source: string;
  machine: string;
  provider: DevPodProviderName;
  ide: DevPodIdeName;
  lastUsed: string;
  age: string;
};

const getProviders = async (): Promise<DevPodProvider[]> => {
  const command = "devpod provider list";
  const shellResult = await executeShell(command);
  const table = parseStringAsTable(shellResult);

  return table.map(
    (row) =>
      ({
        name: row[0],
        version: row[1],
        default: parseBoolean(row[2]),
        initialized: parseBoolean(row[3]),
        description: row[4],
      }) as DevPodProvider,
  );
};

// const createWorkspace = async (location: string, name: string, provider: DevPodProviderName, ide: DevPodIdeName) => {
//   const command = `devpod create ${location} --name=${name} --provider=${provider} --ide=${ide}`;
//   //   await executeShell(command);
// };

export const devPodApi = {
  getProviders,
};
