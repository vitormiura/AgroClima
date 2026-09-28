import { NextRequest, NextResponse } from "next/server";
import { locationSearchQuerySchema, locationsResponseSchema } from "@/schemas/location";
import { searchLocations } from "@/lib/weather/providers/open-meteo-geocoding";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    const validation = locationSearchQuerySchema.safeParse({ query: query ?? "" });

    if (!validation.success) {
      return NextResponse.json(
        { error: "Parâmetro de busca inválido", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const locations = await searchLocations(validation.data.query);

    const response = locationsResponseSchema.parse({ locations });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Erro na API de localidades:", error);

    if (error instanceof Error && error.name === "TimeoutError") {
      return NextResponse.json(
        { error: "Tempo limite excedido ao buscar localidades" },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno ao buscar localidades" },
      { status: 500 }
    );
  }
}