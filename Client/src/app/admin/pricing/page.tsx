import GenericCrudPage from '../components/GenericCrudPage';

export default function PricingPage() {
    return <GenericCrudPage
        title="Pricing Packages"
        endpoint="/api/pricing"
        columns={[
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'price', label: 'Price ($)', type: 'number' },
            { key: 'billing_cycle', label: 'Type', type: 'select', options: ['project', 'package'] },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'is_popular', label: 'Most Popular', type: 'boolean' }
        ]}
    />;
}
