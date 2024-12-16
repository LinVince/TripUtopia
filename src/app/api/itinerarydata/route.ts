import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import itinerarydata from '@/models/itinerarydata';

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const tripID = searchParams.get('tripID');
    
    // Validate email
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // if only email is provided
    if (email && !tripID) {
      const tripData = await itinerarydata.find({email});

      return NextResponse.json(
        { success: true, data: tripData },
        { status: 200 }
      );
    }

    // Find the data by tripID and email
    const existingData = await itinerarydata.findOne({ tripID, email });
    console.log(existingData)
    if (existingData) {
      // Return the found data
      return NextResponse.json(
        { success: true, data: existingData },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: true , message: 'Giving default data' },
        { status: 201 }
      );
    }
  } catch (error) {
    // Handle any other errors
    return NextResponse.json(
      { success: false, message: 'An error occurred', error: 'Unable to get data'},
      { status: 500 }
    );
  }
}


export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();  
    console.log(body)
    const { tripID, tripName, description, email } = body;


    const existingData = await itinerarydata.findOne({ email, tripID });

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

export async function DELETE(request: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const tripID = searchParams.get('tripID');

    if (!tripID) {
      return NextResponse.json(
        { success: false, message: 'tripID is required' },
        { status: 400 }
      );
    }

    const deletedData = await itinerarydata.findOneAndDelete({ tripID });

    if (deletedData) {
      return NextResponse.json(
        { success: true, message: 'Trip deleted successfully', data: deletedData },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'Trip not found' },
        { status: 404 }
      );
    }
  } catch (error:any) {
    return NextResponse.json(
      { success: false, message: 'An error occurred', error: error.message },
      { status: 500 }
    );
  }
}