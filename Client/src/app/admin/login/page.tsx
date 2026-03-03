'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Redirect if already logged in
        if (localStorage.getItem('adminAuth') === 'true') {
            router.push('/admin/dashboard');
        }
    }, [router]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Hardcoded credentials from implementation plan
        if (username === 'admin' && password === 'mailstora2024') {
            localStorage.setItem('adminAuth', 'true');
            router.push('/admin/dashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h1><span>MailStora</span> Admin</h1>
                    <p>Enter your credentials to manage the platform</p>
                </div>

                {error && <div className="login-error">{error}</div>}

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        Sign In to Dashboard
                    </button>
                </form>

                <div className="login-footer">
                    &copy; {new Date().getFullYear()} MailStora Professional Email Solutions
                </div>
            </div>
        </div>
    );
}
