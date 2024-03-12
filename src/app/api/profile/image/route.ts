import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";
import { ENV } from "@/app/env";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const supabase = createRouteSupabaseClient();

  const file = formData.get("file");
  if (!file)
    return NextResponse.json(
      { message: "Missing upload file" },
      { status: 500 }
    );
  const filename = randomUUID();
  const res = await fetch(ENV.R2_BUCKET_URL + "/" + filename, {
    method: 'PUT',
    headers: {
      "X-Custom-Auth-Key": ENV.R2_CUSTOM_AUTH_KEY,
    },
    body: file
  })
  if (!res.ok) return NextResponse.json({ message: "Failed" }, { status: 500 });
  const {error} = await supabase.from("Images").insert({ filename });
  return NextResponse.json({ message: "Successful" }, { status: 200 });
}
