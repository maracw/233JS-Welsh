//as in lab 6
import './general';
const regeneratorRuntime = require("regenerator-runtime");
import getNavBar from './navbar'; 

class AddWord{
    constructor(){
        //class variables
        //need api key and url
        //need a state object like in weather app

        this.image=document.querySelector("#for-canvas");
        //ui elements
        this.iconChoiceElement=document.getElementById("display-choices");
        this.downloadBtn=document.getElementById("download-btn");
        this.iconUrlElement=document.getElementById("icon-download-url");
        this.$topTextInput = document.getElementById("topText");
        this.$bottomTextInput = document.getElementById("bottomText");
        this.$downloadButton = document.getElementById("downloadMeme");
        this.$canvas = document.getElementById("imgCanvas");
        this.$context = this.$canvas.getContext('2d');
        this.deviceWidth = window.innerWidth;
        //bind methods to class
        
        this.TestIConDisplay=this.TestIConDisplay.bind(this);
        this.DownloadIcon=this.DownloadIcon.bind(this);
        this.createCanvas=this.createCanvas.bind(this);
        this.createImageForCard=this.createImageForCard.bind(this);
        
        //add methods to ui elements
        this.downloadBtn.onclick=this.DownloadIcon.bind(this);
        //call methods
        this.TestIConDisplay();
        this.createCanvas();
        this.createImageForCard();
    }
    //onform change or indiv buttons
    /*submit should add the final*/

    //method to fetch translation?
    /*should it disable the welsh input button?*/

    //method to fetch icon
    GetIconChoices(){

    }

    createCanvas(){
        this.$canvas.width = Math.min(400, this.deviceWidth-30);
        this.$canvas.height = Math.min(380, this.deviceWidth);
        }
    createImageForCard(){
        //same as create meme in lab 4
        this.$context.clearRect(0,0, this.$canvas.height, this.$canvas.width);
        
        //draw image
        this.$canvas.height = this.image.height;
        this.$canvas.width = this.image.width;

        this.$context.drawImage(this.image, 0, 0);
    }
   
    //disply downloaded default image in flexbox for testing
    TestIConDisplay(){
    let attribution='<a href="https://thenounproject.com/browse/icons/term/cat/" target="_blank" title="Cat Icons">Noun Project</a>';
    let imagePath ="Assets/images/noun-cat-5328621.png";
    let htmlText="";
    for(let i=0;i<6;i++)
    htmlText+=`
        <div id="result-img1" name="icon-choice" style="width: 175; height: 175;" class="p-2 bg-info">
        <img src="${imagePath}" style="width: 200px; height: 200px;">
        <br> 
        ${attribution}</div>`;
    document.getElementById("display-choices").innerHTML=htmlText;
    
    }
    downloadCardImage(){
        const imageSource= this.$canvas.toDataURL('image/png');
        this.$downloadButton.href = imageSource;
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
        //can display image from the dog api on the page
        //next step - add way to download?
        //try with noun project?
        
    }


    //method to preview card

    //method to add card to list

    //method to make lists

    //method to display success and ask for next step

    /*how do I have a simple way to make lists and words available on different pages
    or - playing the game and adding can be on one monstrous page */

getNavBar("AddAWord");

window.onload = ()=>{let newAddWord = new AddWord();};