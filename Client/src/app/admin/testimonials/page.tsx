import GenericCrudPage from '../components/GenericCrudPage';

export default function TestimonialsPage() {
    return <GenericCrudPage
        title="Testimonials"
        endpoint="/api/testimonials"
        columns={[
            { key: 'client_name', label: 'Client Name', type: 'text' },
            { key: 'company', label: 'Company', type: 'text' },
            { key: 'role', label: 'Role', type: 'text' },
            { key: 'content', label: 'Review', type: 'textarea' },
            { key: 'rating', label: 'Rating (1-5)', type: 'number' }
        ]}
    />;
}
