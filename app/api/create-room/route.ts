import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { ROOM_NAME } = await request.json();
  console.log("ROOM_NAME sent to server", ROOM_NAME);
  const EXTERNAL_API_ENDPOINT = process.env.EXTERNAL_API_ENDPOINT;
  const API_KEY = process.env.API_KEY;

  try {
    const externalResponse = await fetch(EXTERNAL_API_ENDPOINT!, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        // ...(API_KEY && { 'Authorization': `Bearer ${API_KEY}` }),
      },
      // body: JSON.stringify({ roomName: ROOM_NAME }),
    });

    if (!externalResponse.ok) {
      const errorMessage = await externalResponse.text();
      return NextResponse.json({ error: errorMessage }, { status: externalResponse.status });
    }

    const data = await externalResponse.json();
    const chatroomUrl = data.room_url;
    console.log("chatroomUrl", chatroomUrl);

    return NextResponse.json({ chatroomUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create chatroom' }, { status: 500 });
  }
}
