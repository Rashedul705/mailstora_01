import GenericCrudPage from '../components/GenericCrudPage';

export default function OrdersPage() {
    return <GenericCrudPage
        title="Orders"
        endpoint="/api/orders"
        columns={[
            { key: 'customer', label: 'Customer ID', type: 'text' },
            { key: 'details', label: 'Details', type: 'text' },
            { key: 'amount', label: 'Amount ($)', type: 'number' },
            { key: 'status', label: 'Status', type: 'select', options: ['Pending', 'In Progress', 'Completed', 'Delivered', 'Cancelled'] }
        ]}
    />;
}
