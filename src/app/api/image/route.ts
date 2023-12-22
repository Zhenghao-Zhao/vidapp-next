import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}