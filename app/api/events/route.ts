import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const greeting = 'In Events';
	const json = {
		greeting,
	};

	return NextResponse.json(json);
}
