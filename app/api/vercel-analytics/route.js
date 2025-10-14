import { NextResponse } from "next/server";

export async function GET() {
  const vercelToken = process.env.VERCEL_TOKEN; // usa variable de entorno segura
  const apiEndPt = "https://api.vercel.com/v9/projects";

  try {
    let results = [];
    let nextUrl = apiEndPt;

    while (nextUrl) {
      const res = await fetch(nextUrl, {
        headers: {
          Authorization: `Bearer ${vercelToken}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return NextResponse.json(
          { error: `Error en Vercel API: ${res.statusText}` },
          { status: res.status }
        );
      }

      const data = await res.json();
      results.push(...data.projects);
      nextUrl = data.pagination?.next
        ? `${apiEndPt}?until=${data.pagination.next}`
        : null;
    }

    return NextResponse.json({ projects: results });
  } catch (error) {
    console.error("Error al obtener proyectos de Vercel:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
