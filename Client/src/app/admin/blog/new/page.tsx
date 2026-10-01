import PostEditor from '../../components/PostEditor';

export const metadata = {
  title: 'New Post - Admin',
};

export default function NewPostPage() {
    return (
        <div className="admin-page">
            <PostEditor />
        </div>
    );
}
