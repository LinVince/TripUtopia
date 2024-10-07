import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) { 
  try {
    // Parse the JSON body from the request
    const body = await req.json();

    // Extract the 'consent' value from the parsed body
    const consent = body.consent;

    if (!consent) {
      return NextResponse.json({ success: false, message: 'Consent value missing' }, { status: 400 });
    }

    cookies().set({
      name: 'consent',
      value: consent,
      httpOnly: true,
      path: '/',
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
