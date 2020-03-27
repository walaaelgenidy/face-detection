import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import Imagelinkform from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import Facerecognition from './components/facerecognition/facerecognition';
import './App.css';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
  apiKey: '46667303b64c4cb2a1a8a560a30985d0'
 });
 
const particlesoptions={
  "particles": {
    "number": {
      "value": 66,
      "density": {
        "enable": true,
        "value_area": 631.3480069132609
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
     }
  }
   onInputChange = (event)=>{
     console.log(event.target.value);
   }
   onButtonSubmit = ()=>{

     console.log('click');

     app.models.predict("a403429f2ddf4b49b307e318f00e528b",
      "https://samples.clarifai.com/face-det.jpg")
      .then(
    function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
   }

  render()
  {
    return(
      <div className="App">
        <Particles className='particles' 
                params={particlesoptions}
         />
       <Navigation />
       <Logo />
       <Rank />
       <Imagelinkform 
         onInputChange={this.onInputChange}
         onButtonSubmit={this.onButtonSubmit} />
      <Facerecognition />

      </div>
    );
  }
}

export default App;
