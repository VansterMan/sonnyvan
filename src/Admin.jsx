import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import './Admin.css';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcIAQkmyyW7xFkdlZuBB1cABqqcZPmyzk",
  authDomain: "sonnyvan-4f12e.firebaseapp.com",
  projectId: "sonnyvan-4f12e",
  storageBucket: "sonnyvan-4f12e.firebasestorage.app",
  messagingSenderId: "234434414407",
  appId: "1:234434414407:web:0cb66bf043c5eb61e92e62"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Password is stored in environment variable
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rsvps, setRsvps] = useState([]);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [stats, setStats] = useState({
    atlanta: { yes: 0, maybe: 0, no: 0, null: 0 },
    dc: { yes: 0, maybe: 0, no: 0, null: 0 }
  });
  const [showNewInviteModal, setShowNewInviteModal] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);
  const [newInternalComment, setNewInternalComment] = useState('');

  useEffect(() => {
    if (authenticated) {
      loadRsvps();
    }
  }, [authenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const loadRsvps = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'rsvps'));
      const data = [];
      const newStats = {
        atlanta: { yes: 0, maybe: 0, no: 0, null: 0 },
        dc: { yes: 0, maybe: 0, no: 0, null: 0 }
      };

      querySnapshot.forEach((doc) => {
        const rsvp = { id: doc.id, ...doc.data() };
        data.push(rsvp);

        // Calculate stats for invited guests only
        if (rsvp.invited) {
          const atlantaStatus = rsvp.atlantaAttending || 'null';
          const dcStatus = rsvp.dcAttending || 'null';
          newStats.atlanta[atlantaStatus]++;
          newStats.dc[dcStatus]++;
        }
      });

      setRsvps(data);
      setStats(newStats);
    } catch (error) {
      console.error('Error loading RSVPs:', error);
      alert('Error loading data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateInvite = () => {
    const uninvited = rsvps.filter(r => !r.invited);
    if (uninvited.length === 0) {
      alert('All codes have been invited!');
      return;
    }
    
    // Select a random uninvited code
    const randomCode = uninvited[Math.floor(Math.random() * uninvited.length)];
    setSelectedCode(randomCode);
    setNewInternalComment('');
    setShowNewInviteModal(true);
  };

  const handleSaveNewInvite = async () => {
    if (!selectedCode) return;

    try {
      const docRef = doc(db, 'rsvps', selectedCode.id);
      await updateDoc(docRef, {
        invited: true,
        internalComments: newInternalComment || null
      });

      alert(`Invitation created for code: ${selectedCode.id}`);
      setShowNewInviteModal(false);
      loadRsvps(); // Reload data
    } catch (error) {
      console.error('Error saving invite:', error);
      alert('Error saving invitation. Please try again.');
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if clicking same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = async (rsvp) => {
    // Check if RSVP has any response data
    const hasResponseData = 
      rsvp.atlantaAttending || 
      rsvp.dcAttending || 
      rsvp.atlantaGuest1Name || 
      rsvp.dcGuest1Name ||
      rsvp.additionalComments;

    let confirmMessage;
    if (hasResponseData) {
      confirmMessage = `WARNING: This guest has already submitted RSVP data.\n\nCode: ${rsvp.id}\nAtlanta: ${rsvp.atlantaAttending || 'No response'}\nDC: ${rsvp.dcAttending || 'No response'}\n\nAre you SURE you want to permanently delete this invitation and all associated data?`;
    } else {
      confirmMessage = `Delete invitation code "${rsvp.id}"?\n\nThis will permanently remove this code from the database.`;
    }

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'rsvps', rsvp.id));
      alert(`Invitation "${rsvp.id}" has been deleted.`);
      loadRsvps(); // Reload data
    } catch (error) {
      console.error('Error deleting invitation:', error);
      alert('Error deleting invitation. Please try again.');
    }
  };

  const handleExportCSV = () => {
    const invitedRsvps = rsvps.filter(r => r.invited);
    
    if (invitedRsvps.length === 0) {
      alert('No invited guests to export.');
      return;
    }

    // CSV headers
    const headers = [
      'code',
      'invited',
      'internalComments',
      'atlantaAttending',
      'atlantaGuest1Name',
      'atlantaGuest1Email',
      'atlantaGuest1DietaryRestrictions',
      'atlantaGuest2Name',
      'atlantaGuest2Email',
      'atlantaGuest2DietaryRestrictions',
      'dcAttending',
      'dcGuest1Name',
      'dcGuest1Email',
      'dcGuest1DietaryRestrictions',
      'dcGuest2Name',
      'dcGuest2Email',
      'dcGuest2DietaryRestrictions',
      'additionalComments',
      'lastUpdated'
    ];

    // Build CSV content
    let csvContent = headers.join(',') + '\n';
    
    invitedRsvps.forEach(rsvp => {
      const row = headers.map(header => {
        const value = header === 'code' ? rsvp.id : (rsvp[header] || '');
        // Escape commas and quotes
        const escaped = String(value).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvContent += row.join(',') + '\n';
    });

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `wedding-rsvps-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!authenticated) {
    return (
      <div className="admin-container">
        <div className="login-box">
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="password-input"
              autoFocus
            />
            <button type="submit" className="btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-container">
        <div className="spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  const invitedRsvps = rsvps.filter(r => r.invited);

  // Sort the invited RSVPs based on current sort settings
  const sortedRsvps = [...invitedRsvps].sort((a, b) => {
    let aVal = a[sortField] || '';
    let bVal = b[sortField] || '';
    
    // Convert to lowercase for case-insensitive sorting
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Wedding RSVP Admin Dashboard</h1>
        <button onClick={loadRsvps} className="btn-secondary">Refresh Data</button>
      </header>

      {/* Stats Section */}
      <section className="stats-section">
        <h2>Response Statistics (Invited Guests Only)</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Atlanta Reception</h3>
            <div className="stat-row">
              <span className="stat-label yes">Yes:</span>
              <span className="stat-value">{stats.atlanta.yes}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label maybe">Maybe:</span>
              <span className="stat-value">{stats.atlanta.maybe}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label no">No:</span>
              <span className="stat-value">{stats.atlanta.no}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label null">No Response:</span>
              <span className="stat-value">{stats.atlanta.null}</span>
            </div>
          </div>

          <div className="stat-card">
            <h3>DC Reception</h3>
            <div className="stat-row">
              <span className="stat-label yes">Yes:</span>
              <span className="stat-value">{stats.dc.yes}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label maybe">Maybe:</span>
              <span className="stat-value">{stats.dc.maybe}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label no">No:</span>
              <span className="stat-value">{stats.dc.no}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label null">No Response:</span>
              <span className="stat-value">{stats.dc.null}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="actions-section">
        <button onClick={handleGenerateInvite} className="btn-primary">
          Generate New Invitation
        </button>
        <button onClick={handleExportCSV} className="btn-primary">
          Export Responses (CSV)
        </button>
      </section>

      {/* RSVP Table */}
      <section className="table-section">
        <h2>All Invited Guests ({invitedRsvps.length})</h2>
        <div className="table-wrapper">
          <table className="rsvp-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')} className="sortable">
                  Invite Code {sortField === 'id' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort('internalComments')} className="sortable">
                  Internal Comments {sortField === 'internalComments' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort('atlantaAttending')} className="sortable">
                  Atlanta {sortField === 'atlantaAttending' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort('dcAttending')} className="sortable">
                  DC {sortField === 'dcAttending' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedRsvps.map(rsvp => (
                <tr key={rsvp.id}>
                  <td>
                    <a 
                      href={`${window.location.origin}/?code=${rsvp.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="code-link"
                    >
                      {rsvp.id}
                    </a>
                  </td>
                  <td className="comments-cell">{rsvp.internalComments || '-'}</td>
                  <td className={`status-cell ${rsvp.atlantaAttending || 'null'}`}>
                    {rsvp.atlantaAttending || 'No response'}
                  </td>
                  <td className={`status-cell ${rsvp.dcAttending || 'null'}`}>
                    {rsvp.dcAttending || 'No response'}
                  </td>
                  <td>
                    <button 
                      onClick={() => handleDelete(rsvp)}
                      className="btn-delete"
                      title="Delete this invitation"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* New Invite Modal */}
      {showNewInviteModal && selectedCode && (
        <div className="modal-overlay" onClick={() => setShowNewInviteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Generate New Invitation</h2>
            <p><strong>Selected Code:</strong> {selectedCode.id}</p>
            <p className="invite-url">
              <strong>URL:</strong> {window.location.origin}/?code={selectedCode.id}
            </p>
            <div className="form-group">
              <label>Internal Comments (Optional)</label>
              <textarea
                value={newInternalComment}
                onChange={(e) => setNewInternalComment(e.target.value)}
                rows="3"
                placeholder="Add notes about this guest..."
              />
            </div>
            <div className="modal-actions">
              <button onClick={handleSaveNewInvite} className="btn-primary">
                Mark as Invited
              </button>
              <button onClick={() => setShowNewInviteModal(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
