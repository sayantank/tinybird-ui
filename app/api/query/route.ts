import { getAuthCookie } from "@/lib/auth";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const credentials = await getAuthCookie();
    if (!credentials) {
      return Response.json({ error: "No credentials found" }, { status: 401 });
    }

    const body = await request.json();
    const { sql } = body;

    if (!sql || typeof sql !== "string") {
      return Response.json({ error: "SQL query is required" }, { status: 400 });
    }

    // Append FORMAT JSON if not already present
    const formattedSql = sql.trim().toUpperCase().endsWith("FORMAT JSON")
      ? sql
      : `${sql} FORMAT JSON`;

    console.log(formattedSql);

    const response = await fetch(`${credentials.url}/v0/sql`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${credentials.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formattedSql,
    });

    if (!response.ok) {
      return Response.json(
        { error: `Failed to execute query: ${response.statusText}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    console.log(data);
    return Response.json(data);
  } catch (error) {
    console.error("Error executing query:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
