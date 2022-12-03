//as in lab 6
import './general';
const regeneratorRuntime = require("regenerator-runtime");
import getNavBar from './navbar'; 

class AddWord{
    constructor(){
        //class variables
        this.state={
            photos:[]
            //place to store info from api call
        };
        //need api key and url
        //need a state object like in weather app
        this.pexelsUrl=

        //ui elements
        this.iconChoiceElement=document.getElementById("display-choices");
        this.downloadBtn=document.getElementById("download-btn");
        this.iconUrlElement=document.getElementById("icon-download-url");
        this.pexelsBtn=document.getElementById("fetch-pexels");
        this.pexels6Btn=document.getElementById("fetch-6pexels");
        this.pexelsSearch=document.getElementById("pexels-search");
        //bind methods to class
        
        this.DownloadIcon=this.DownloadIcon.bind(this);
        this.enableAllCards=this.enableAllCards.bind(this);
        //add methods to ui elements
        this.downloadBtn.onclick=this.DownloadIcon.bind(this);
        this.pexelsBtn.onclick=this.GetOnePexels.bind(this);
        this.pexels6Btn.onclick=this.GetSixPexels.bind(this);
        
        
    }
    //onform change or indiv buttons
    /*submit should add the final*/


    //method to fetch one photo
    GetOnePexels(event){
        event.preventDefault();
        let search=this.pexelsSearch.value;
        let searchEncoded=encodeURIComponent(search);           
        fetch(`https://api.pexels.com/v1/search?query=${searchEncoded}&size='small'&per_page=1`, {
            headers: {
                'Authorization': '563492ad6f91700001000001d4be53950c3d4ace99ac5c52efdf1558'
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
        //method to fetch 6 photos
        GetSixPexels(event){
            event.preventDefault();
            let search=this.pexelsSearch.value;
            let searchEncoded=encodeURIComponent(search);           
            fetch(`https://api.pexels.com/v1/search?query=${searchEncoded}&orientation='square'&size='small'&per_page=6`, {
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
                document.getElementById("fetch-img").src=this.state.photos[5].src.small;
            });
            this.DisplayPexels6();
        }
        //method to display 6 choices
        DisplayPexels6(){
            let htmlText="";
            let idCount=0;
            //this doesn't seem to work without the timeout?
            this.state.photos.forEach(element => {
                idCount++;
                let attribution=element.photographer;
                console.log(attribution);
                let imagePath=element.src.small;
                let alt=element.alt;
                htmlText+=`
                <div style="width: 175; height: 175;" class="p-2 bg-info">
                <img name="icon-choice" id="result-img${idCount}" src="${imagePath}" alt="${alt}" style="width: 200px; height: 200px;">
                <br> 
                ${attribution}</div>`;
                setTimeout(1500);
            });
            document.getElementById("display-choices").innerHTML=htmlText;
            this.enableAllCards();
        }

        //user clicks on card
        //works like handleClick
        ChosePhotoForCard(index){
            let cardImage = this.state.photos[index].src.small;
            let attribution=this.state.photos[index].attribution;
            console.log(attribution);
        }
        handleClick(index) {
            console.log(index);
            let id="result-img"+(index+1);
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
        
    }


    //method to preview card

    //method to add card to list

    //method to make lists

    //method to display success and ask for next step

    /*how do I have a simple way to make lists and words available on different pages
    or - playing the game and adding can be on one monstrous page */

getNavBar("AddAWord");

window.onload = ()=>{let newAddWord = new AddWord();};