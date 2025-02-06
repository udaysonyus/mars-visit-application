import React from 'react';
import MultiStageForm from './components/MultiStageForm';
import './App.css';

const App = () => {
  return (
    <div className="App">
      {/* Background video */}
      <video autoPlay loop muted className="background-video">
        <source src="./mars-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content on top of the video */}
      <div className="content">
        <h1>Mars Visit Application</h1>
        <MultiStageForm />
      </div>
    </div>
  );
};

export default App;
