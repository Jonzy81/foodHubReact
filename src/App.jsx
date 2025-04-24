import './App.css'
import React, { useState } from 'react';
import BookingFlow from './Components/BookingFlow';

export default function App() {
  return (
    <div className="min-h-screen bg-green-100">
      <div className="max-w-5xl mx-auto px-4">
        <BookingFlow />
      </div>
    </div>
  );
}

