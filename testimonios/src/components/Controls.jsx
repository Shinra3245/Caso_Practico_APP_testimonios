// src/components/Controls.jsx

import React from 'react';

export default function Controls({ onPrev, onNext, onRandom }) {
  
  return (
    <div className="controls">
      
      <button onClick={onPrev} aria-label="Anterior">
        &lt; {/* Símbolo < */}
      </button>
      
      <button onClick={onNext} aria-label="Siguiente">
        &gt; {/* Símbolo > */}
      </button>
      
      <button onClick={onRandom} aria-label="Aleatorio">
        Aleatorio
      </button>
    </div>
  );
}