import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Use service role key on the server side to bypass RLS
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

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

        const files = formData.getAll('attachments') as File[];

        let attachment_urls: string[] = [];

        if (files && files.length > 0) {
            const uploadPromises = files.map(async (file) => {
                const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
                
                const { error: uploadError } = await supabaseAdmin.storage
                    .from('mailstora')
                    .upload(`quotes/${fileName}`, file, {
                        contentType: file.type,
                        upsert: false
                    });

                if (uploadError) {
                    throw new Error('Failed to upload file: ' + uploadError.message);
                }

                const { data: publicUrlData } = supabaseAdmin.storage
                    .from('mailstora')
                    .getPublicUrl(`quotes/${fileName}`);

                return publicUrlData.publicUrl;
            });

            try {
                attachment_urls = await Promise.all(uploadPromises);
            } catch (error: any) {
                return NextResponse.json({ error: error.message }, { status: 400 });
            }
        }

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
            attachments: attachment_urls
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
