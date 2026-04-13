import { connectDB } from "@/lib/mongoose";

export async function GET() {
  await connectDB();

  console.log("API call and DB connect");

  return Response.json({
    message: "DB connection fine on terminal",
  });
}
