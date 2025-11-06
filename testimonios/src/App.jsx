import React, { useState, useEffect, useRef } from 'react';
import testimonios from './data';
import Testimonial from './components/Testimonial';
import Controls from './components/Controls';
import './styles.css';


const getInitialIndex = () => {
  const savedIndex = localStorage.getItem('testimonialIndex');
  
  return savedIndex ? parseInt(savedIndex, 10) : 0;
};

export default function App() {
  
  
  const [index, setIndex] = useState(getInitialIndex());
  const length = testimonios.length;

  const autoplayRef = useRef(null);

  const next = () => setIndex(prev => (prev + 1) % length);
  const prev = () => setIndex(prev => (prev - 1 + length) % length);
  
  const random = () => {
    let r = Math.floor(Math.random() * length);
    if (r === index) {
      r = (r + 1) % length;
    }
    setIndex(r);
  };

  
  
  useEffect(() => {
    localStorage.setItem('testimonialIndex', index);
  }, [index]);

  
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      next();
    }, 5000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [length]); 

  
  const handleUserAction = (actionFn) => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    actionFn();
  };

  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleUserAction(next);
      }
      if (event.key === 'ArrowLeft') {
        handleUserAction(prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    
  }, [index, prev, next]); 

  return (
    <main className="app">
      <h1>Testimonios</h1>
      
      <div className="card-wrapper">
        <Testimonial 
          key={testimonios[index].id} 
          item={testimonios[index]} 
        />
      </div>
      
      <Controls
        onPrev={() => handleUserAction(prev)}
        onNext={() => handleUserAction(next)}
        onRandom={() => handleUserAction(random)}
      />

      <p className="counter">
        {index + 1} / {length}
      </p>
    </main>
  );
}