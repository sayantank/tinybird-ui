import { getAuthCookie } from "./auth";

interface EngineConfig {
  engine: string;
  engine_sorting_key: string;
  engine_partition_key: string;
  engine_primary_key: string;
}

interface ColumnDefinition {
  name: string;
  type: string;
  codec: string | null;
  default_value: string | null;
  jsonpath: string | null;
  nullable: boolean;
  normalized_name: string;
}

interface Statistics {
  bytes: number;
  row_count: number;
}

export interface Datasource {
  id: string;
  name: string;
  cluster: string;
  tags: Record<string, any>;
  created_at: string;
  updated_at: string;
  replicated: boolean;
  version: number;
  project: string | null;
  headers: Record<string, any>;
  shared_with: string[];
  engine: EngineConfig;
  description: string;
  used_by: any[];
  type: string;
  columns: ColumnDefinition[];
  statistics: Statistics;
  new_columns_detected: Record<string, any>;
  quarantine_rows: number;
}

export async function getDatasources(): Promise<Datasource[]> {
  const credentials = await getAuthCookie();
  if (!credentials) {
    throw new Error("No credentials found");
  }

  const response = await fetch(`${credentials.url}/v0/datasources`, {
    headers: {
      Authorization: `Bearer ${credentials.token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch datasources: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.datasources == null) {
    console.error("Invalid response for datasources", data);
    return [];
  }

  return data.datasources;
}
