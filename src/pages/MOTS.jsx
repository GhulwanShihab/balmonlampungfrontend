// src/pages/MOTS.jsx
import React, { useState } from 'react';
import './MOTS.css';

const MOTS = () => {
  const [selectedList, setSelectedList] = useState(null);

  const listContent = {
    list1: 'Deskripsi untuk list 1',
    list2: 'Deskripsi untuk list 2',
    list3: 'Deskripsi untuk list 3',
  };

  return (
    <div className="mots-container mb-4">
      <div className="mots-header">
        <h1 className="mots-title">MOTS</h1>
      </div>
      <div className="mots-content">
        <div className="mots-list">
          <ul>
            <li onClick={() => setSelectedList('list1')}>List 1</li>
            <li onClick={() => setSelectedList('list2')}>List 2</li>
            <li onClick={() => setSelectedList('list3')}>List 3</li>
          </ul>
        </div>
        <div className="mots-description">
          {selectedList && <p>{listContent[selectedList]}</p>}
        </div>
      </div>
    </div>
  );
};

export default MOTS;
