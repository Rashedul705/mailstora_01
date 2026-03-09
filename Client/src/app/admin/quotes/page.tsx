import GenericCrudPage from '../components/GenericCrudPage';

export default function QuotesPage() {
    return <GenericCrudPage
        title="Quotes"
        endpoint="/api/quotes"
        columns={[
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'company', label: 'Company', type: 'text' },
            { key: 'service_required', label: 'Service', type: 'text' },
            { key: 'message', label: 'Message', type: 'textarea' },
            { key: 'status', label: 'Status', type: 'select', options: ['Pending', 'Replied', 'Converted'] }
        ]}
    />;
}
