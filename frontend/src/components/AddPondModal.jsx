import React, { useState, useRef } from 'react';
import './AddPondModal.css';

export default function AddPondModal({ isOpen, onClose }) {
  const [pondData, setPondData] = useState({
    name: '',
    length: '',
    width: '',
    depth: '',
    fishCount: '',
    fishWeight: ''
  });
  
  // Photo Upload State
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // --- Photo Upload Logic ---
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const clearPhoto = (e) => {
    e.stopPropagation(); // Prevent triggering the click-to-upload
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // --- Form Submission ---
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving new pond:", { ...pondData, photo });
    // Reset and close after submission
    setPhoto(null);
    setPhotoPreview(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* LEFT SIDE: Interactive 9:16 Photo Upload Area */}
        <div 
          className={`modal-left-photo ${isDragging ? 'drag-active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input 
            type="file" 
            accept="image/*" 
            hidden 
            ref={fileInputRef} 
            onChange={handleFileChange} 
          />
          
          {photoPreview ? (
            <>
              <img src={photoPreview} alt="Pond Preview" className="uploaded-photo-preview" />
              <button className="btn-remove-photo" onClick={clearPhoto}>✕</button>
            </>
          ) : (
            <div className="photo-upload-overlay">
              <span className="upload-icon">+</span>
              <span className="upload-text">Click or Drop Photo</span>
              <span className="upload-ratio">9:16 Aspect Ratio</span>
            </div>
          )}
        </div>

        {/* RIGHT SIDE: Form Fields */}
        <div className="modal-right-form">
          <div className="modal-header">
            <h2>Add New Pond</h2>
            <button className="btn-close" onClick={onClose}>✕</button>
          </div>

          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Pond Name</label>
              <input 
                type="text" 
                className="modal-input" 
                placeholder="e.g. Nursery Tank A"
                value={pondData.name}
                onChange={(e) => setPondData({...pondData, name: e.target.value})}
                required 
              />
            </div>

            <div className="form-section-title">Pond Parameters</div>
            <div className="input-row">
              <div className="input-group">
                <label>Length (m)</label>
                <input 
                  type="number" 
                  step="0.1"
                  className="modal-input" 
                  placeholder="0.0"
                  value={pondData.length}
                  onChange={(e) => setPondData({...pondData, length: e.target.value})}
                  required 
                />
              </div>
              <div className="input-group">
                <label>Width (m)</label>
                <input 
                  type="number" 
                  step="0.1"
                  className="modal-input" 
                  placeholder="0.0"
                  value={pondData.width}
                  onChange={(e) => setPondData({...pondData, width: e.target.value})}
                  required 
                />
              </div>
              <div className="input-group">
                <label>Depth (m)</label>
                <input 
                  type="number" 
                  step="0.1"
                  className="modal-input" 
                  placeholder="0.0"
                  value={pondData.depth}
                  onChange={(e) => setPondData({...pondData, depth: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="form-section-title">Livestock Details</div>
            <div className="input-row">
              <div className="input-group">
                <label>Number of Fish</label>
                <input 
                  type="number" 
                  className="modal-input" 
                  placeholder="0"
                  value={pondData.fishCount}
                  onChange={(e) => setPondData({...pondData, fishCount: e.target.value})}
                  required 
                />
              </div>
              <div className="input-group">
                <label>Avg Weight (g)</label>
                <input 
                  type="number" 
                  step="0.1"
                  className="modal-input" 
                  placeholder="0.0"
                  value={pondData.fishWeight}
                  onChange={(e) => setPondData({...pondData, fishWeight: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>CANCEL</button>
              <button type="submit" className="btn-submit">SAVE POND</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}