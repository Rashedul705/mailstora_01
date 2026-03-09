import GenericCrudPage from '../components/GenericCrudPage';

export default function FAQPage() {
    return <GenericCrudPage
        title="FAQ"
        endpoint="/api/faq"
        columns={[
            { key: 'question', label: 'Question', type: 'text' },
            { key: 'answer', label: 'Answer', type: 'textarea' },
            { key: 'category', label: 'Category', type: 'text' },
        ]}
    />;
}
