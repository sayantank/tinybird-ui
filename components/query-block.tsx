"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface QueryResponse {
  meta: {
    name: string;
    type: string;
  }[];
  data: Record<string, any>[];
  rows: number;
  statistics: {
    elapsed: number;
    rows_read: number;
    bytes_read: number;
  };
}

export function QueryBlock({ className }: { className?: string }) {
  const [sql, setSql] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QueryResponse | null>(null);

  const runQuery = async () => {
    if (!sql.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to execute query");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to execute query");
    } finally {
      setLoading(false);
    }
  };

  // Filter out columns starting with __
  const visibleColumns = result?.meta.filter((column) => !column.name.startsWith("__")) ?? [];

  return (
    <div className={cn("space-y-4 max-w-4xl", className)}>
      <div className="space-y-2">
        <Textarea
          value={sql}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSql(e.target.value)}
          placeholder="Enter your SQL query..."
          className="font-mono min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button
            onClick={runQuery}
            disabled={loading}
          >
            {loading ? "Running..." : "Run Query"}
          </Button>
        </div>
      </div>

      {error && <div className="p-4 bg-destructive/10 text-destructive rounded-md">{error}</div>}

      {result && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <TypographySmall>
              {result.rows} row{result.rows !== 1 ? "s" : ""}
            </TypographySmall>
            <TypographyMuted>
              {(result.statistics.elapsed / 1000).toFixed(2)}s elapsed
            </TypographyMuted>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {visibleColumns.map((column) => (
                    <TableHead key={column.name}>
                      {column.name}
                      <span className="ml-1 text-muted-foreground">({column.type})</span>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.data.map((row, i) => (
                  <TableRow key={i}>
                    {visibleColumns.map((column) => (
                      <TableCell key={column.name}>{JSON.stringify(row[column.name])}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
