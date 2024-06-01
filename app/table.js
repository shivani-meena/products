"use client";
import React, { useState, useEffect } from 'react';
import Modal from './modal';
import Cookies from 'js-cookie';

function Table({ onLogout }) {
  const [entries, setEntries] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const themePreference = Cookies.get('theme');
    if (themePreference) {
      setIsDarkTheme(themePreference === 'dark-theme');
      document.body.className = themePreference;
    } else {
      document.body.className = 'light-theme';
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme ? 'dark-theme' : 'light-theme';
    setIsDarkTheme(!isDarkTheme);
    document.body.className = newTheme;
    Cookies.set('theme', newTheme);
  };

  const toggleModal = (entry = null, editMode = false) => {
    setShowModal(!showModal);
    setSelectedEntry(entry);
    setIsEditMode(editMode);
  };

  const handleFormSubmit = (newEntry) => {
    if (isEditMode) {
      const updatedEntries = entries.map(entry =>
        entry === selectedEntry ? newEntry : entry
      );
      setEntries(updatedEntries);
      setFilteredProducts(updatedEntries);
    } else {
      const updatedEntries = [...entries, newEntry];
      setEntries(updatedEntries);
      setFilteredProducts(updatedEntries);
    }
    toggleModal();
  };

  const filterProducts = (status) => {
    let filtered = entries.filter(function (entry) {
      if (status === 'active') {
        return !entry.isPaid;
      } else if (status === 'completed') {
        return entry.isPaid;
      }
    });
    setFilteredProducts(filtered);
  };

  return (
    <>
      <div className="box">
        <button onClick={toggleTheme} className="theme-toggle-button">
          {isDarkTheme ? 'Switch Theme' : 'Switch Theme'}
        </button>
        <div className='buttons'>
          <button className="active" onClick={() => filterProducts('active')}>Active sale</button>
          <button className="completed" onClick={() => filterProducts('completed')}>Completed sale</button>
          <button className="toggleModal sale-order" onClick={() => toggleModal()}>+ sale-order</button>
        </div>
      </div>
      <div className="table-container">
        <table className="table table-bordered table-striped">
          <thead className='thead-dark'>
            <tr>
              <th>customer IDs</th>
              <th>Customer Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Is Paid</th>
              <th>Edit/view</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((entry, index) => (
              <tr key={index}>
                <td>{entry.customer.id}</td>
                <td>{entry.customer.customer_profile.name}</td>
                <td>{entry.quantity}</td>
                <td>{entry.price * entry.quantity}</td>
                <td>{entry.isPaid ? 'Yes' : 'No'}</td>
                <td>
                  <button className='edit' onClick={() => toggleModal(entry, true)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      {showModal && <Modal handleFormSubmit={handleFormSubmit} entry={selectedEntry} editMode={isEditMode} />}
    </>
  );
}

export default Table;
