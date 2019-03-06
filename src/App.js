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
      imageURL: '',
      box: [],
    }
  }

  processInput = (event) => {
    this.setState({input: event.target.value});    
  }
  
  calculateFaceCoordinates = (data) => {
    let res = [];

    const inputImage = document.getElementById('inputImg');
    const width = Number(inputImage.width);
    const height = Number(inputImage.height);

    for (let reg of data.outputs[0].data.regions) {

      res.push({
        topRow: height * reg.region_info.bounding_box.top_row,
        bottomRow: height - height*reg.region_info.bounding_box.bottom_row,
        leftCol: width * reg.region_info.bounding_box.left_col,
        rightCol: width - width*reg.region_info.bounding_box.right_col
      });
    }

    return res;
  }

  displayFaceBox = (res) => {
    this.setState({box: res})
  }

  onSubmit = () => {  
    this.setState({imageURL: this.state.input});  

      // Predict the contents of an image by passing in a URL.
      app.models.predict(Clarifai.FACE_DETECT_MODEL,
        
        // this.state.imageURL doesn't work because of how setState() works!
        // See https://reactjs.org/docs/react-component.html#setstate
        this.state.input) 
        .then(response => this.displayFaceBox(this.calculateFaceCoordinates(response)))
        .catch(err => {
          console.log("There was an error:", err);
        });
  }


  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.processInput} onSubmit={this.onSubmit} />
        <FaceRecognition image={this.state.imageURL} box={this.state.box} />
      </div>
    );
  }
}

export default App;
