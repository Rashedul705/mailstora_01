import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const backendRes = await fetch(`${API_BASE}/api/quotes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!backendRes.ok) {
            const errJson = await backendRes.json().catch(() => ({}));
            return NextResponse.json({ error: errJson.error || 'Failed to save quote in backend' }, { status: backendRes.status });
        }

        const data = await backendRes.json();
        return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const backendRes = await fetch(`${API_BASE}/api/quotes`, { cache: 'no-store' });
        const data = await backendRes.json();
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
