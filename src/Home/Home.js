import React, { Component } from 'react';
import logo from '../Home/mic.svg';
import ReactLoading  from 'react-loading';
import SpeechRecognition from 'react-speech-recognition';
// import ReactTimeout from 'react-timeout'
import Loader from '../Loader/Loader';
import axios from 'axios';
import { RingLoader, BeatLoader } from 'react-spinners';
import './Home.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
  var red = '#FF0000';
  var blue = '#0A5F8E';
  var green = '#00FF00';

 
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { color: red,
                   display: false,
                   display2: false,
                  listening: false,
                  loading: false,
                  title:"",
                  mic:true,
                  search:"" 
                  
              };
    
    this.changeColor = this.changeColor.bind(this);
  }
  componentDidMount () {

    this.fetchResults();
  }

  
fetchResults = ()=> {
    const url = 'https://jsonplaceholder.typicode.com/todos/';
    this.setState({loading:true});
    // in axios access data with .data
    axios.get(url)
      .then(response => {
        this.setState({
          title: response.data[1].title,
          

        });
        console.log(response);
       
      })
      .catch(error => {
        console.log(error);
      });
    }
  changeListening(){
    this.setState({listening: true});
  }
  
  changeMic(){
    this.setState({mic: false});
  }
  changeLoading(){
    this.setState({loading: false});
  }
  changeDisplay(){
    this.setState({display: false});
  }
  changeDisplay2(){
    this.setState({display2: false});
  }
  changeColor(){
    var newColor = this.state.color === green ? green : green;
  this.setState({color: newColor})
  }
 
  handleClick = (e) => {
      setTimeout(() => {
          this.setState({
            color: red,
          listening: false,
          display: true,
          mic:true
        })
      }, 5000);
    
  
  }
  handleClick3 = (e) => {

    setTimeout(() => {this.fetchResults()}, 10000);
  }
  handleClick2 = (e) => {

    setTimeout(() => {
      this.setState({
        color: red,
      listening: false,
      display: false,
      display2: true,
     
    })
   
  }, 10000);
}

// search(e) {
//   const query = e.target.querySelector(
//     'input[type="text"]').value;
    
//   let newSearch = query == this.state.search;
//   this.setState({search: newSearch});
// }
makeSearch(e){
  const query = e.target.querySelector('input[type="text"]').value;
  this.setState({search: query});
}


 
 
  render() {
      const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props
      const Listen = (
        <div className="liste">{this.state.listening} 
          <ReactLoading 
              type={"bars"} 
              color={"#fff"} 
              height={'30%'} 
              width={'30%'} 
              className="loader"
              listening={this.state.listening}/>
          <p className="pl" >{this.state.listening}Listening </p> 
          <p className="pl">{transcript} {this.state.listening} 
            <input className="input" type="text" value={transcript}/>
          </p>
         
        </div>
      );
      const notListen =(
        <h3 className="h3"> {this.state.listening} </h3>
      );
      const Loader = (
        <div className='sweet-loading'>
        <RingLoader
          color={'#ffffff'} 
          size={100}
          style={{margin:"auto"}}
          display={this.state.display}
        />
        <p className="p" >Searching For</p>
        {/* <p className="pn"  onChange={this.makeSearch} > </p> */}
        <p className="pn" >{transcript}</p>
        </div>

      );
      const notLoader =(
        <div> {this.state.display} 
        <p className="h1" >Hi!</p>
        <p className="h1" >Search for Anybody</p>
        </div>
      );
      const Display = (
        <div className="display"> 
            <p className="pl" >{this.state.display2}Result Page </p> 
            <p>{this.state.title}</p>
        

              {/* <button className="btn btn-lg btn-warning displayButton" onClick={this.handleClick2()}>Search Again</button> */}
             
          
        </div>
      );
      const notDisplay =(
        <h3 className="h3"> {this.state.display2} </h3>
      );

      const pulsate = (
        <div className="mic" onClick = {()=>{this.changeColor();this.changeDisplay();this.changeMic();this.changeListening();this.handleClick();this.handleClick2();this.changeDisplay2()}} style={{backgroundColor:this.state.color}}>
            <img src={logo} className="App-logo" alt="logo" onClick={resetTranscript} />
        </div>
      );
      const notPulsate =(
        <div className="mica" onClick = {()=>{this.changeColor();this.changeDisplay();this.changeListening();this.handleClick();this.handleClick2();this.changeDisplay2()}} style={{backgroundColor:this.state.color}}>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      );

     
        
      
    return (
      <div className="App">
      {/* {this.state.display2 ? Display : notDisplay} */}
            <div className="circle">
                <a>
                  {
                    this.state.mic ? pulsate : notPulsate
                  }
                </a>
                <div className="spinner">
                  {
                    this.state.listening ? Listen : notListen
                  }
                </div>
                
            </div>
            <div className="signa">{this.state.display2 ? Display : notDisplay}
                  {
                    this.state.display ? Loader : notLoader
                  }
                 

            </div>
         
      </div>
    );
  }
}

// export default Home;
export default SpeechRecognition(Home);
// export default ReactTimeout(Home);
