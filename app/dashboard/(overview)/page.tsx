import { QueryBlock } from "@/components/query-block";
import { Separator } from "@/components/ui/separator";
import { TypographyH3, TypographySmall } from "@/components/ui/typography";
import { type Datasource, getDatasources } from "@/lib/data";

export default async function DashboardPage() {
  let datasources: Datasource[] = [];
  let errorMessage: string | null = null;

  try {
    datasources = await getDatasources();
  } catch (e) {
    console.error(e);
    errorMessage = "Failed to fetch datasources";
  }

  return (
    <div className="flex flex-col gap-8">
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      <div>
        <TypographyH3>Datasources</TypographyH3>
        <div className="w-full overflow-x-auto mt-4">
          <div className="flex items-center gap-2">
            {datasources.map((datasource) => (
              <div
                key={datasource.id}
                className="px-4 py-2 border border-border rounded-md flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <TypographySmall className="font-mono">{datasource.name}</TypographySmall>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Separator />
      <div>
        <TypographyH3>Query</TypographyH3>
        <QueryBlock className="mt-4" />
      </div>
    </div>
  );
}
