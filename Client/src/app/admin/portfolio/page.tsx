import GenericCrudPage from '../components/GenericCrudPage';

export default function PortfolioPage() {
    return <GenericCrudPage
        title="Portfolio"
        endpoint="/api/portfolio"
        columns={[
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'category', label: 'Category', type: 'text' },
            { key: 'image_url', label: 'Image URL', type: 'text' },
            { key: 'project_url', label: 'Project URL', type: 'text' }
        ]}
    />;
}
