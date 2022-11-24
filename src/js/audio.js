/*This it to practice using the audio WebAPI tools with Welsh text to speech*/
/*file was originally textToSpeech.js becuase that's what I want the class name to be
but i liked the short names in webpack.config for our lab 6*/

//as in lab 6
import './general';
const regeneratorRuntime = require("regenerator-runtime");

const apiName =' Coqui Speech Server API';
const api_Key = '81771ec0-a119-4c09-a5ba-594daa068e3f';
const URL= 'https://tts.techiaith.cymru/coqui-tts/api/v1';

/*pattern for GET requests*/
//https://tts.techiaith.cymru/coqui-tts/api/v1?testun=Dw i eisau glywed rhywbeth&siaradwr=&api_key=6ec83e1b-9879-4bc8-b28a-134fa218a5ed
//${URL}?testun=${text to convert}&siaradwr=&api_Key=${api_KEY}

class TextToSpeech{
    constructor() {
        this.audioContext = new AudioContext();
        this.audio;
        //make class variables
        //this.TextToConvert="",
        //this.WelshText = "",
        //this.WelshAudio="Assets/demo.wav",

        //name elements on page
        this.audioElement = document.getElementById("audio-area");
        this.submitElement = document.getElementById("submit-text");
        this.inputElement =document.getElementById("input-text");
        this.playElement = document.getElementById("play");
        //bind methods
        this.BuildPlayer=this.BuildPlayer.bind(this);
        this.GetWavFile=this.GetWavFile.bind(this);
        this.GetTestWavFile=this.GetTestWavFile.bind(this); 
        this.GetFileByFetch=this.GetFileByFetch.bind(this);
        //assign event handlers
        this.submitElement.onclick=this.OnFormSubmit.bind(this);
        this.playElement.onclick=this.Playback.bind(this);

    }
    OnFormSubmit(event){
        //prevent default
        event.preventDefault();
        //get the input
        const textToSubmit = this.inputElement.value;
        //build the string
        const string = `${URL}?testun=${textToSubmit}&siaradwr=&api_key=${api_Key}`;
        
        //make api get request and store the wav file
        //this.GetWavFile(string);
        this.GetFileByFetch();
        //this.GetTestWavFile();
    }
    GetTestWavFile(){
        const filename ="";
        fetch(filename)
        .then((response) => {response.arrayBuffer()})
        .then((buffer) => this.audioContext.decodeAudioData(buffer))
        .then((decodedData) => {
          const source = new AudioBufferSourceNode();
          source.buffer = decodedData;
          source.connect(audioCtx.destination);
          return source;
        })
        .catch(error => {
            alert('There was a problem getting the sound file!')
            }
        );
    }

    GetFileByFetch(){
        const string='https://tts.techiaith.cymru/coqui-tts/api/v1?testun=Dw%20i%20eisau%20bywta%20tatws&siaradwr=&api_key=6ec83e1b-9879-4bc8-b28a-134fa218a5ed'
        fetch(string)
            .then((response) => { return response.blob(); })
            .then((data) => {
                var a = document.createElement("a");
                a.href = window.URL.createObjectURL(data);
                a.download = "FILENAME";
                a.click();
    }); 
    }
    GetWavFile(string){
        fetch(string)
        .then((response) => {response.arrayBuffer()})
        .then((buffer) => this.audioContext.decodeAudioData(buffer))
        .then((decodedData) => {
          const source = new AudioBufferSourceNode();
          source.buffer = decodedData;
          source.connect(audioCtx.destination);
          this.audio=source;
        })
        .catch(error => {
            alert('There was a problem getting the sound file!')
            }
        );
    }
    
        
    Playback() {
        /*const playSound = this.audioContext.createBufferSource();
        playSound.buffer = this.audio;
        playSound.connect(this.audioContext.destination);
        playSound.start(this.audioContext.currentTime);*/
            this.audio.start(0);
            this.playElement.setAttribute('disabled', 'disabled');
      }
    

    BuildPlayer(){
        const htmlText=`
        <audio
             controls
            src=${this.audio}>
            <a href="#">
                Download audio
            </a>
    </audio>
        `
    }
    //make the api call and get response back
    //put respnse wav file into the page
}
//outside the class
//make an instance

let newTextToSpeech;
window.onload=() =>{
    newTextToSpeech= new TextToSpeech();
};
