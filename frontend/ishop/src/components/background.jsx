// Background.js
import React from 'react';
import '../assets/image/fondo.png'; 

const Background = ({ children }) => {
  return (
    <div className="background">
      {children}
    </div>
  );
};

export default Background;
