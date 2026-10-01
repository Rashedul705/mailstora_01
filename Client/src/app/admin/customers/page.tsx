import GenericCrudPage from '../components/GenericCrudPage';

export default function CustomersPage() {
    return <GenericCrudPage
        title="Customers"
        endpoint="/api/customers"
        columns={[
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'phone', label: 'Phone', type: 'text' },
            { key: 'company_name', label: 'Company Name', type: 'text' },
            { key: 'source', label: 'Source', type: 'select', options: ['order', 'quote', 'inquiry', 'schedule'] },
            { key: 'total_orders', label: 'Total Orders', type: 'number' }
        ]}
    />;
}
