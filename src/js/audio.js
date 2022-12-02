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
        
        
        //make class variables
        //this.TextToConvert="",
        //this.WelshText = "",
        //this.WelshAudio="Assets/demo.wav",
        

        //name elements on page
        this.audioElement = document.getElementById("audio-area");
        this.submitElement = document.getElementById("submit-text");
        this.inputElement =document.getElementById("input-text");
        
        //bind methods
        this.addSource=this.addSource.bind(this);
        //assign event handlers
        this.submitElement.onclick=this.OnFormSubmit.bind(this);
    ;

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
        this.addSource();
        //this.GetTestWavFile();
    }
    addSource(){
        let input=document.getElementById("input-text").value;
        const inputForCall = encodeURIComponent(input);
        let audioElement=document.querySelector("audio");
        const call=`https://tts.techiaith.cymru/coqui-tts/api/v1?testun=${inputForCall}&siaradwr=&api_key=6ec83e1b-9879-4bc8-b28a-134fa218a5ed`;
        const string=`
        <source src=${call} type="audio/wav">
      Your browser does not support the audio element.`;
        audioElement.innerHTML = string;
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
