import React, { useState } from 'react';

const DoubtForum = () => {
  const [doubts, setDoubts] = useState([
    { id: 1, title: "How to use useEffect?", description: "I'm struggling with dependencies.", replies: [], votes: 5 }
  ]);
  const [newDoubt, setNewDoubt] = useState({ title: '', description: '' });

  
  const addDoubt = (e) => {
    e.preventDefault();
    if (!newDoubt.title) return;
    const doubtEntry = { 
      ...newDoubt, 
      id: Date.now(), 
      replies: [], 
      votes: 0 
    };
    setDoubts([doubtEntry, ...doubts]);
    setNewDoubt({ title: '', description: '' });
  };

 
  const addReply = (id, text) => {
    setDoubts(doubts.map(d => 
      d.id === id ? { ...d, replies: [...d.replies, text] } : d
    ));
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h1>Student Doubt Forum</h1>
      
      
      <form onSubmit={addDoubt} style={{ marginBottom: '40px' }}>
        <input 
          placeholder="Doubt Title" 
          value={newDoubt.title}
          onChange={(e) => setNewDoubt({...newDoubt, title: e.target.value})}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <textarea 
          placeholder="Describe your doubt..." 
          value={newDoubt.description}
          onChange={(e) => setNewDoubt({...newDoubt, description: e.target.value})}
          style={{ width: '100%', height: '80px', marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Post Doubt</button>
      </form>

      
      <div>
        {doubts.map(doubt => (
          <div key={doubt.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
            <h3>{doubt.title}</h3>
            <p>{doubt.description}</p>
            <small>Votes: {doubt.votes}</small>
            
            <div style={{ marginTop: '15px', backgroundColor: '#f9f9f9', padding: '10px' }}>
              <strong>Replies:</strong>
              {doubt.replies.length === 0 && <p>No replies yet.</p>}
              <ul>
                {doubt.replies.map((reply, index) => <li key={index}>{reply}</li>)}
              </ul>
              
              
              <input 
                placeholder="Write a solution..." 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addReply(doubt.id, e.target.value);
                    e.target.value = '';
                  }
                }}
                style={{ width: '100%', padding: '5px' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoubtForum;