import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../widgetSlice';

const Widget = ({ categoryId, widget }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  return (
  
    <div className="widget">
      <h3>{widget.name}</h3>
      <p>{widget.text}</p>
      <button onClick={handleRemove}>X</button>
    </div>
  

  );
};

export default Widget;
