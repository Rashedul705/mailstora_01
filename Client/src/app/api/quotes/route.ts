import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const whatsapp = formData.get('whatsapp') as string;
        const company = formData.get('company') as string;
        const website = formData.get('website') as string;
        const service_type = formData.get('service_type') as string;
        const email_types_str = formData.get('email_types') as string;
        const email_types = email_types_str ? JSON.parse(email_types_str) : [];
        const template_quantity = formData.get('template_quantity') as string;
        const esp = formData.get('esp') as string;
        const esp_custom = formData.get('esp_custom') as string;
        const design_status = formData.get('design_status') as string;
        const design_brief = formData.get('design_brief') as string;
        const project_description = formData.get('project_description') as string;

        const payload = {
            name,
            email,
            whatsapp,
            company,
            website,
            service_type,
            email_types,
            template_quantity,
            esp,
            esp_custom,
            design_status,
            design_brief,
            project_description,
            attachments: []
        };

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
        const backendRes = await fetch(`${apiUrl}/api/quotes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
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
