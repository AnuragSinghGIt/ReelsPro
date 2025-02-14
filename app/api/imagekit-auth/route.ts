import ImageKit from "imagekit"
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET() 
{
  try {
const authenticationParam =imagekit.getAuthenticationParameters();
    return NextResponse.json(authenticationParam);
  } catch (error) {
    return NextResponse.json(
      {error : "Imagekit Auth Failed"},
      {status : 500}
    ) 
  }
  
} 