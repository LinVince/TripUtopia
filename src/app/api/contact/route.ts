import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Contact from '../../../models/contact';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const contact = await Contact.create(body);
    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ success: false, error: 'Unknown error' }, { status: 400 });
    }
  }
}
