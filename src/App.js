import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import './App.css';

// Instantiate a new Clarifai app by passing in your API key.
const app = new Clarifai.App({apiKey: '7922370daa88442f9fc680ce97915902'});

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
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  processInput = (event) => {
    console.log(event.target.value);

  }

  onSubmit = () => {      
      // Predict the contents of an image by passing in a URL.
      app.models.predict(Clarifai.FACE_DETECT_MODEL,
         'https://images.pexels.com/photos/459634/pexels-photo-459634.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });

    console.log('click');
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.processInput} onSubmit={this.onSubmit} />
        <FaceRecognition image={'https://images.pexels.com/photos/459634/pexels-photo-459634.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'} />
      </div>
    );
  }
}

export default App;
