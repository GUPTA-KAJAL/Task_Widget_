
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget, removeWidget } from '../widgetSlice';

const AddWidgetPage = ({ categories, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.widgets.categories); // Fetch categories from Redux store

  const handleAddWidget = () => {
    if (!selectedCategory) {
      setError('Please select a category.');
      return;
    }
    if (!widgetName) {
      setError('Please enter a widget name.');
      return;
    }
    if (!widgetText) {
      setError('Please enter widget text.');
      return;
    }

    const widget = {
      id: Date.now().toString(),
      name: widgetName,
      text: widgetText,
      categoryId: selectedCategory // Store categoryId along with widget data
    };

    dispatch(addWidget({ categoryId: selectedCategory, widget }));
    setWidgetName('');
    setWidgetText('');
    setSelectedCategory('');
    setError('');
  };

  const handleRemoveWidget = (widgetId, categoryId) => {
    dispatch(removeWidget({ widgetId, categoryId })); // Dispatch action to remove widget
  };

  return (
    <div className="add-widget-page">
      <button className="close-button" onClick={onClose}>Close</button>
      <h2>Add Widget</h2>
      
      {error && <p className="error-message">{error}</p>}
      
      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Widget Name"
        value={widgetName}
        onChange={(e) => setWidgetName(e.target.value)}
      />

      <textarea
        placeholder="Widget Text"
        value={widgetText}
        onChange={(e) => setWidgetText(e.target.value)}
      />

      <button onClick={handleAddWidget} disabled={!selectedCategory || !widgetName || !widgetText}>
        Add Widget
      </button>

      <h3>Widgets in All Categories</h3>
      {allCategories.map(category => (
        <div key={category.id}>
          <h4>{category.name}</h4>
          {category.widgets.length > 0 ? (
            <ul className="no-marker">
              {category.widgets.map(widget => (
                <li key={widget.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked
                      onChange={() => handleRemoveWidget(widget.id, category.id)}
                    />
                    {widget.name}
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <p>No widgets in this category.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddWidgetPage;
