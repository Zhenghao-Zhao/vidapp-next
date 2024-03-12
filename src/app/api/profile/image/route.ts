import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";
import { uploadCloudImage } from "@/app/api/_utils";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const supabase = createRouteSupabaseClient();

  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json(
      { message: "Missing upload file" },
      { status: 500 }
    );
  }
  const filename = randomUUID();
  const res = await uploadCloudImage(filename, file);
  if (!res.ok) return NextResponse.json({ message: "Failed" }, { status: 500 });
  const { error } = await supabase.from("Images").insert({ filename });
  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ message: "Successful" }, { status: 200 });
}
