import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
import './App.css';

const particleOptions = {
  "fps_limit": 30,
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
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
      resize: true
    },
  }
};

const initialState = {
  input: '',
  imageURL: '',
  box: [],
  route: 'signin', // Keeps track if what page the user is on
  isSignedIn: false,
  user: {
    id: 0,
    name: '',
    email: '',
    facecount: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: [],
      route: 'signin', // Keeps track if what page the user is on
      isSignedIn: false,
      user: {
        id: 0,
        name: '',
        email: '',
        facecount: 0,
        joined: ''
      }
    }
  }

  processInput = (event) => {
    this.setState({ input: event.target.value });
  }

  calculateFaceCoordinates = (data) => {
    let res = [];

    const inputImage = document.getElementById('inputImg');
    const width = Number(inputImage.width);
    const height = Number(inputImage.height);

    for (let reg of data.outputs[0].data.regions) {

      res.push({
        topRow: height * reg.region_info.bounding_box.top_row,
        bottomRow: height - height * reg.region_info.bounding_box.bottom_row,
        leftCol: width * reg.region_info.bounding_box.left_col,
        rightCol: width - width * reg.region_info.bounding_box.right_col
      });
    }

    return res;
  }

  displayFaceBox = (res) => {
    this.setState({ box: res })
  }

  onPictureSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) { // got a response from the API
          const facesFound = response.rawData.outputs[0].data.regions.length
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id,
              facesFound: facesFound
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {facecount:count}));
            })
            .catch(console.log);
        } 
        this.displayFaceBox(this.calculateFaceCoordinates(response))
  })}

  onRouteChange = (route) => {
    this.setState({route: route});

    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
  }

  loadUser = currentUser => {

    this.setState({user: {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      facecount: currentUser.facecount,
      joined: currentUser.joined
    }});
  }

  render() {
    const {isSignedIn, imageURL, box} = this.state;
    return (
      <div className="App">
     {/*   <Particles className="particles" params={particleOptions} /> */}
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {
          this.state.route === 'home'
            ? <div>
                <Logo />
                <Rank name={this.state.user.name} facecount={this.state.user.facecount} /> 
                <ImageLinkForm onInputChange={this.processInput} onPictureSubmit={this.onPictureSubmit} />
                <FaceRecognition image={imageURL} box={box} />
              </div>
            : (
              this.state.route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
