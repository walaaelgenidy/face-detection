import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import Imagelinkform from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import Facerecognition from './components/facerecognition/facerecognition';
import SignIn from './components/signin/signin';
import Register from './components/register/Register';
import './App.css';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
  apiKey: '46667303b64c4cb2a1a8a560a30985d0'
 });
 
 
const particlesoptions={
  "particles": {
    "number": {
      "value": 30,
      "density": {
        "enable": true,
        "value_area": 400
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}


class App extends Component {
  constructor(){
     super();
     this.state = {
       input: '' ,
       imgurl:'',
       box:{},
       route: 'signin',
       isSignedIn: false
     }
  }
   
  calculateFaceLocation =(data)=>{
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputimage');
   const width = Number(image.width); //string but we want to perform caculations
   const height = Number(image.height);
   // console.log(width , height);
   return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
   
  }

  displayFaceBox = (box) => {
  //  console.log(box)
    this.setState({box: box});
  }

   onInputChange = (event)=>{
     this.setState({input: event.target.value});
   }
   onButtonSubmit = ()=>{
     this.setState({imgurl: this.state.input})

     app.models
      .predict(Clarifai.FACE_DETECT_MODEL,
             this.state.input)
    .then(response =>this.displayFaceBox(this.calculateFaceLocation(response))) 
    //So this 'calculateFaceLocation' takes a response 
    // returns this object and that returned object is now going into 'displayFacebox'.
    .catch(err=> console.log(err));
   
    }
   onRouteChange =(route)=>{
     if(route==='signout'){
      this.setState({isSignedIn:false})
     }else if(route ==='home'){
       this.setState({isSignedIn:'true'})
     }
     this.setState({route : route});  // dynamically our route is going to be where we give it. 
     
   }


  render()
  {
  const  {isSignedIn , box , imgurl , route} = this.state;
    return(
      <div className="App">
        <Particles className='particles' 
                params={particlesoptions}
         />

       <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
       {route==='home' 
       ? 
       <div>
       <Logo />
       <Rank />
       <Imagelinkform 
         onInputChange={this.onInputChange}
         onButtonSubmit={this.onButtonSubmit} />
       <Facerecognition 
         imgurl={imgurl} 
         box={box}  />
         </div>
         :(
         route==='signin'
         ?<SignIn onRouteChange={this.onRouteChange} />
         :<Register onRouteChange={this.onRouteChange} />
       )
     }
        </div>
    );
  }
}

export default App;
