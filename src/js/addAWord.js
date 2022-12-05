//as in lab 6
import './general';
const regeneratorRuntime = require("regenerator-runtime");
import getNavBar from './navbar'; 

class AddWord{
    constructor(){
        //class variables
        this.state={
            photos:[],
            htmlText:""
            //place to store info from api call
        };
        //need api key and url
        //need a state object like in weather app

        this.pexelsUrlEnd="&size='small'&per_page=1";

        //ui elements
        this.welshInput=document.getElementById("welsh");
        this.welshPluralInput=document.getElementById("welsh-plural");
        this.englishInput=document.getElementById("english-input");

        this.englishBtn=document.getElementById("english-submit");
        this.welshBtn=document.getElementById("welsh-submit");
        this.pluralBtn=document.getElementById("plural-submit");
        //makes fetch
        this.pexelsBtn=document.getElementById("fetch-pexels");
        //gets keyword for query
        this.pexelsSearch=document.getElementById("pexels-search");
    
        //bind methods to class
        this.GenerateOneCard=this.GenerateOneCard.bind(this);
        this.AddWelshToCard=this.AddWelshToCard.bind(this);
        this.FetchAudio=this.FetchAudio.bind(this);
        //add methods to ui elements
        this.pexelsBtn.onclick=this.GetOnePexels.bind(this);
        this.englishBtn.onclick=this.AddEnglishToCard.bind(this);
        this.welshBtn.onclick=this.AddWelshToCard.bind(this);
        this.pluralBtn.onclick=this.AddPluralToCard.bind(this);
       
        
    }

    //method to fetch one photo
    GetOnePexels(event){
        event.preventDefault();
        let search=this.pexelsSearch.value;
        let searchEncoded=encodeURIComponent(search);           
        fetch(`${PEXELS_URL}${searchEncoded}${this.pexelsUrlEnd}`, {
            headers: {
                'Authorization': PEXELS_KEY
            }
        })
        .then(result=>result.json())
        .then (photodata=>{
            //do things
            this.state.photos=photodata.photos;
            console.log(this.state.photos[0].photographer);
            document.getElementById("card-b2").innerHTML=this.GenerateOneCard(0);
            //place pic
            //document.getElementById("fetch-img").src=this.state.photos[0].src.small;
        });
        }

        GenerateOneCard(index){
            let attribution=this.state.photos[index].photographer;
            let imagePath=this.state.photos[index].src.small;
            let alt=this.state.photos[index].alt;
            let oneHtmlText=`
            <div style="width: 175; height: 175;" class="p-2 bg-info">
            <img name="icon-choice" id="result-img${index}" src="${imagePath}" alt="${alt}" style="width: 200px; height: 200px;">
            <div class="card-footer">
                ${attribution} 
                <button type="submit">Add card to list</button>
                </div>
            </div>`;
            return oneHtmlText;
        }

        AddEnglishToCard(){
            event.preventDefault();
            let text=document.getElementById("english-input").value;
            document.getElementById("english-card").innerHTML=text;
        }

        AddWelshToCard(){
            event.preventDefault();
            let text=document.getElementById("welsh").value;
            document.getElementById("welsh-card").innerHTML=text;
            this.FetchAudio();
        }
 
        AddPluralToCard(){
            event.preventDefault();
            let text=document.getElementById("welsh-plural").value;
            document.getElementById("welsh-card-pl").innerHTML=text;
        }

        FetchAudio(){
            const input = document.getElementById("welsh").value;
            //build the string
            const inputForCall = encodeURIComponent(input);
            let audioElement=document.getElementById("audio");
            const call=`https://tts.techiaith.cymru/coqui-tts/api/v1?testun=${inputForCall}&siaradwr=&api_key=6ec83e1b-9879-4bc8-b28a-134fa218a5ed`;
            const string=`
                <source src=${call} type="audio/wav">
                    Your browser does not support the audio element.`;
            audioElement.innerHTML = string;
        }
        //m
    //method to add card to list
    //method to make lists
    //method to display success and ask for next step
         
    }

    /*how do I have a simple way to make lists and words available on different pages
    or - playing the game and adding can be on one monstrous page */

getNavBar("AddAWord");

window.onload = ()=>{let newAddWord = new AddWord();};