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
      imageURL: ''
    }
  }

  processInput = (event) => {
    this.setState({input: event.target.value});    
  }
  
  onSubmit = () => {  
    this.setState({imageURL: this.state.input});  

      // Predict the contents of an image by passing in a URL.
      app.models.predict(Clarifai.FACE_DETECT_MODEL,
         this.state.input) // this.state.imageURL doesn't work because of how setState() works!
        .then(response => {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
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
        <FaceRecognition image={this.state.imageURL} />
      </div>
    );
  }
}

export default App;
