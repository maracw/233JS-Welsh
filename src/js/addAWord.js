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

        this.saveUrl="https://api.pexels.com/v1/search?query=";
        this.saveKey="563492ad6f91700001000001d4be53950c3d4ace99ac5c52efdf1558";

        //ui elements
        //this.iconChoiceElement=document.getElementById("display-choices");
        //this.iconUrlElement=document.getElementById("icon-download-url");
        this.pexelsBtn=document.getElementById("fetch-pexels");
        //this.pexels6Btn=document.getElementById("fetch-6pexels");
        //gets keyword for query
        this.pexelsSearch=document.getElementById("pexels-search");
        //bind methods to class
        
        //this.DownloadIcon=this.DownloadIcon.bind(this);
        //this.enableAllCards=this.enableAllCards.bind(this);
        this.GenerateOneCard=this.GenerateOneCard.bind(this);
        //this.DisplayPexels6=this.DisplayPexels6.bind(this);

        //add methods to ui elements
        this.pexelsBtn.onclick=this.GetOnePexels.bind(this);
        //this.pexels6Btn.onclick=this.GetSixPexels.bind(this);
        
        
        
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
            //place pic
            document.getElementById("fetch-img").src=this.state.photos[0].src.small;
        });
        }
         //works but fetch call doesn't time right
        //method to fetch 6 photos
        GetSixPexels(event){
            event.preventDefault();
            let search=this.pexelsSearch.value;
            let searchEncoded=search;           
            fetch(`${PEXELS_URL}${searchEncoded}&orientation='square'&size='small'&per_page=3`, {
                headers: {
                    'Authorization': '563492ad6f91700001000001d4be53950c3d4ace99ac5c52efdf1558'
                }
            })
            .then(result=>result.json())
            .then (photodata=>{
                //do things
                this.state.photos=photodata.photos;
                console.log(this.state.photos);
                //place pic
                document.getElementById("fetch-img").src=this.state.photos[0].src.small;
            });
            this.DisplayPexels6();
        }
        /*
        //method to display 6 choices
        //works but fetch call doesn't time right
        DisplayPexels6(){
            //this doesn't seem to work without the timeout?    
            this.innerHTML="";     
            for(let i=0; i<this.state.photos.length; i++)
            {
                setTimeout(this.GenerateOneCard(i),1000);
            }
            document.getElementById("display-choices").innerHTML=this.state.htmlText;
            this.enableAllCards();
        }
        */
        GenerateOneCard(index){
            let attribution=this.state.photos[index].photographer;
            let imagePath=this.state.photos[index].src.small;
            let alt=this.state.photos[index].alt;
            this.state.htmlText+=`
            <div style="width: 175; height: 175;" class="p-2 bg-info">
            <img name="icon-choice" id="result-img${index}" src="${imagePath}" alt="${alt}" style="width: 200px; height: 200px;">
            <br> 
            ${attribution}</div>`;
        }
        //useful if user is picking from a selection of returned images
        /*
        //user clicks on card
        //works like handleClick
        ChosePhotoForCard(index){
            let cardImage = this.state.photos[index].src.small;
            let attribution=this.state.photos[index].attribution;
            console.log(attribution);
        }
        handleClick(index) {
            console.log(index);
            let id="result-img"+(index);
            let cardImage=document.getElementById(id).src;
            document.getElementById("fetch-img").src=cardImage;
        }
        
        //makes photos clickable
        enableAllCards() {
            //watch out there is an onclick! bind!
            let cards = document.getElementsByName("icon-choice");
            for (let i = 0; i < cards.length; i++) {
                cards[i].onclick = this.handleClick.bind(this, i);
                cards[i].style.cursor = 'pointer';
            }
        }

    DownloadIcon(event){
        event.preventDefault();
        const url=this.iconUrlElement.value;
        fetch(url)
        .then(result=>result.json())
        .then (result=>{
            document.getElementById("fetch-img").src=result.message;
        });
        }
        */
    }


    //method to preview card

    //method to add card to list

    //method to make lists

    //method to display success and ask for next step

    /*how do I have a simple way to make lists and words available on different pages
    or - playing the game and adding can be on one monstrous page */

getNavBar("AddAWord");

window.onload = ()=>{let newAddWord = new AddWord();};