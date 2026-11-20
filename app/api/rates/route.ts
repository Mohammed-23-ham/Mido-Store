import { getRates } from "@/lib/currency/rates";

export async function GET() {
  return Response.json(await getRates());
}
