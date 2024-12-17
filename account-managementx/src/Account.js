import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const initialUser  = JSON.parse(localStorage.getItem('user'));
    const [user, setUser ] = useState(initialUser );
    const [newName, setNewName] = useState(user ? user.name : '');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear user data from local storage
        navigate('/'); // Redirect to login page
    };

    const handleUpdateInfo = (e) => {
        e.preventDefault();
        if (newPassword && newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        setError('');

        // Update user info in local storage
        const updatedUser  = { ...user, name: newName };
        if (newPassword) {
            updatedUser.password = newPassword; 
        }
        localStorage.setItem('user', JSON.stringify(updatedUser ));
        setUser (updatedUser ); // Update the state to reflect changes
        console.log('User  info updated:', updatedUser );
        setNewPassword(''); // Clear the password input field
    };

    return (
        <div className="container">
            <h2>Account Information</h2>
            {user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <form onSubmit={handleUpdateInfo}>
                        <div className="mb-3">
                            <label className="form-label">New Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">New Password (leave blank if not changing)</label>
                            <input
                                type="password"
                                className="form-control"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary">Update Info</button>
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </div>
                    </form>
                </div>
            ) : (
                <p>No user is logged in. Please log in to view your account information.</p>
            )}
        </div>
    );
};

export default Account;