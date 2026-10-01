import GenericCrudPage from '../components/GenericCrudPage';

export default function PartnersPage() {
    return <GenericCrudPage
        title="Trust Logos (Partners)"
        endpoint="/api/partners"
        columns={[
            { key: 'name', label: 'Company Name', type: 'text' },
            { key: 'image_url', label: 'Logo Image', type: 'image' }
        ]}
    />;
}
