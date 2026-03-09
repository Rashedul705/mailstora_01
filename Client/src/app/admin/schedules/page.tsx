import GenericCrudPage from '../components/GenericCrudPage';

export default function SchedulesPage() {
    return <GenericCrudPage
        title="Schedule Requests"
        endpoint="/api/schedules"
        columns={[
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'meeting_date', label: 'Date', type: 'date' },
            { key: 'meeting_time', label: 'Time', type: 'text' },
            { key: 'topic', label: 'Topic', type: 'text' },
            { key: 'status', label: 'Status', type: 'select', options: ['Pending', 'Scheduled', 'Completed', 'Cancelled'] }
        ]}
    />;
}
