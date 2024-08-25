

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import AddWidgetPage from './AddWidgetPage';
import Widget from './Widget';
import { setSearchTerm } from '../widgetSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showAddWidgetPage, setShowAddWidgetPage] = useState(false);
  const searchTerm = useSelector(state => state.widgets.searchTerm);
  const categories = useSelector(state => state.widgets.categories);

  // Filter widgets based on the search term
  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <div>
      <Navbar
        onAddWidgetClick={() => setShowAddWidgetPage(true)}
        onSearchChange={handleSearchChange}
        searchTerm={searchTerm}
      />
      {showAddWidgetPage && (
        <AddWidgetPage
          categories={categories}
          onClose={() => setShowAddWidgetPage(false)}
        />
      )}
      <div className="widgets-container">
        {filteredCategories.map(category => (
          <div key={category.id}>
            <h2>{category.name}</h2>
            <div className="category-container">
              {category.widgets.map(widget => (
                <Widget
                  key={widget.id}
                  categoryId={category.id}
                  widget={widget}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;




