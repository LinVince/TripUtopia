import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import itinerarydata from '@/models/itinerarydata';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();  
    const { email } = body;

    // Check if a document with the user's email already exists
    const existingData = await itinerarydata.findOne({ email });

    if (existingData) {
      // Update the existing document with the new data
      existingData.data = body.data; // Update the 'data' field
      await existingData.save(); // Save the updated document

      return NextResponse.json({ success: true, data: existingData }, { status: 200 });
    } else {
      // Create a new document if no existing one is found
      const newData = await itinerarydata.create(body);
      return NextResponse.json({ success: true, data: newData }, { status: 201 });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ success: false, error: 'Unknown error' }, { status: 400 });
    }
  }
}
