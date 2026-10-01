import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const backendRes = await fetch(`${API_BASE}/api/quotes/${id}`);
        const data = await backendRes.json();
        return NextResponse.json(data, { status: backendRes.status });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const backendRes = await fetch(`${API_BASE}/api/quotes/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await backendRes.json();
        return NextResponse.json(data, { status: backendRes.status });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

