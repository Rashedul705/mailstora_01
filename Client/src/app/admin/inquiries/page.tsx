import GenericCrudPage from '../components/GenericCrudPage';

export default function InquiriesPage() {
    return <GenericCrudPage
        title="Inquiries"
        endpoint="/api/inquiries"
        columns={[
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'message', label: 'Message', type: 'textarea' },
            { key: 'status', label: 'Status', type: 'select', options: ['Pending', 'Replied', 'Resolved'] }
        ]}
    />;
}
