import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import './App.css';

const particleOptions={
  particles: {
     number:{
        value:120,
        density: {
           enable:true,
           value_area:800
        }
     },
     color: {
        value: "#ffffff"
     },
  },
  interactivity: {
     detect_on: "window",
     events: {
        onhover: {
           enable: true,
           mode: "grab"
        },
        onclick: {
           enable: true,
           mode: "push"
        },
        resize: true
     },
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
    {/*    <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
