import GenericCrudPage from '../components/GenericCrudPage';

export default function ServicesPage() {
    return <GenericCrudPage
        title="Services"
        endpoint="/api/services"
        columns={[
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'icon', label: 'Icon SVG/Class', type: 'text' }
        ]}
    />;
}
