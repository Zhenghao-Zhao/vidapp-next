import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  console.log(formData);
  const files = formData.getAll("file") as File[];

  if (files.length === 0) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
  const queue = [];
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");
    queue.push(writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    ))
  }
  try {
    await Promise.all(queue)
    return NextResponse.json({ message: "Successful" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}
