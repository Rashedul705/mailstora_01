import GenericCrudPage from '../components/GenericCrudPage';

export default function SchedulesPage() {
    return <GenericCrudPage
        title="Schedule Requests"
        endpoint="/api/schedules"
        columns={[
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'whatsapp', label: 'WhatsApp', type: 'text' },
            { key: 'date', label: 'Date', type: 'date' },
            { key: 'time', label: 'Time', type: 'text' },
            { key: 'meetingMethod', label: 'Method', type: 'select', options: ['WhatsApp Call', 'Zoom', 'Google Meet'] },
            { key: 'meetingLink', label: 'Meeting Link', type: 'text' },
            { key: 'status', label: 'Status', type: 'select', options: ['Pending', 'Confirmed', 'Completed', 'Cancelled'] }
        ]}
    />;
}
