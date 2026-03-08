'use client';

import { useState, useEffect } from 'react';
import '../admin.css';

interface PortfolioProject {
    _id?: string;
    project_title: string;
    category: string;
    description: string;
    company_name: string;
    client_name: string;
    client_position: string;
    main_image: string;
    desktop_image: string;
    tablet_image: string;
    mobile_image: string;
}

export default function PortfolioAdmin() {
    const [projects, setProjects] = useState<PortfolioProject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState<PortfolioProject | null>(null);
    const [formData, setFormData] = useState<PortfolioProject>({
        project_title: '',
        category: '',
        description: '',
        company_name: '',
        client_name: '',
        client_position: '',
        main_image: '',
        desktop_image: '',
        tablet_image: '',
        mobile_image: ''
    });

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/portfolio');
            if (res.ok) {
                setProjects(await res.json());
            }
        } catch (error) {
            console.error('Failed to fetch Portfolio', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (project?: PortfolioProject) => {
        if (project) {
            setCurrentProject(project);
            setFormData(project);
        } else {
            setCurrentProject(null);
            setFormData({
                project_title: '',
                category: '',
                description: '',
                company_name: '',
                client_name: '',
                client_position: '',
                main_image: '',
                desktop_image: '',
                tablet_image: '',
                mobile_image: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentProject(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = currentProject
                ? `http://localhost:5000/api/portfolio/${currentProject._id}`
                : 'http://localhost:5000/api/portfolio';

            const method = currentProject ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (res.ok) {
                fetchPortfolio();
                handleCloseModal();
            } else {
                alert('Failed to save project');
            }
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Error saving project');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/portfolio/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (res.ok) {
                setProjects(prev => prev.filter(p => p._id !== id));
            } else {
                alert('Failed to delete project');
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Error deleting project');
        }
    };

    if (isLoading) return <div className="admin-loading">Loading Portfolio Gallery...</div>;

    return (
        <div className="admin-page">
            <header className="admin-header">
                <div>
                    <h1 className="admin-title">Manage Portfolio Gallery</h1>
                    <p style={{ color: 'var(--admin-text-muted)', marginTop: '0.5rem' }}>Upload images of your best email designs.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={() => handleOpenModal()}>+ Add Project</button>
            </header>

            <div className="admin-card">
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Category</th>
                                <th>Main Image Link</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center' }}>No portfolio projects uploaded yet.</td>
                                </tr>
                            ) : (
                                projects.map((p) => (
                                    <tr key={p._id}>
                                        <td><strong>{p.project_title || p.title}</strong></td>
                                        <td><span className="badge badge-completed">{p.category}</span></td>
                                        <td><a href={p.main_image || p.images?.main} target="_blank" rel="noreferrer" style={{ color: 'var(--admin-primary)' }}>View Image</a></td>
                                        <td>
                                            <button className="admin-btn" style={{ marginRight: '10px' }} onClick={() => handleOpenModal(p)}>Edit</button>
                                            <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(p._id!)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal" style={{ maxWidth: '600px' }}>
                        <h2>{currentProject ? 'Edit Project' : 'Add New Project'}</h2>
                        <form onSubmit={handleSave}>
                            <div className="admin-form-group">
                                <label className="admin-label">Project Title *</label>
                                <input className="admin-input" type="text" name="project_title" required value={formData.project_title} onChange={handleInputChange} />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label">Category *</label>
                                <input className="admin-input" type="text" name="category" required value={formData.category} onChange={handleInputChange} />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label">Description *</label>
                                <textarea className="admin-input" name="description" rows={3} required value={formData.description} onChange={handleInputChange} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div className="admin-form-group">
                                    <label className="admin-label">Company Name</label>
                                    <input className="admin-input" type="text" name="company_name" value={formData.company_name} onChange={handleInputChange} />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Client Name</label>
                                    <input className="admin-input" type="text" name="client_name" value={formData.client_name} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label">Client Position</label>
                                <input className="admin-input" type="text" name="client_position" value={formData.client_position} onChange={handleInputChange} />
                            </div>

                            <div className="admin-form-group">
                                <label className="admin-label">Main Image URL *</label>
                                <input className="admin-input" type="url" name="main_image" required value={formData.main_image} onChange={handleInputChange} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                                <div className="admin-form-group">
                                    <label className="admin-label">Desktop Image URL</label>
                                    <input className="admin-input" type="url" name="desktop_image" value={formData.desktop_image} onChange={handleInputChange} />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Tablet Image URL</label>
                                    <input className="admin-input" type="url" name="tablet_image" value={formData.tablet_image} onChange={handleInputChange} />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Mobile Image URL</label>
                                    <input className="admin-input" type="url" name="mobile_image" value={formData.mobile_image} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="admin-modal-actions" style={{ marginTop: '20px' }}>
                                <button type="button" className="admin-btn" onClick={handleCloseModal}>Cancel</button>
                                <button type="submit" className="admin-btn admin-btn-primary">Save Project</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
