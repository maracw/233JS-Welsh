//as in lab 6
import './general';
const regeneratorRuntime = require("regenerator-runtime");

class AddWord{
    constructor(){
        //class variables
        //need api key and url
        //need a state object like in weather app


        //ui elements
        this.iconChoiceElement=document.getElementById("display-choices");
        //bind methods to class
        this.TestIConDisplay=this.TestIConDisplay.bind(this);
        //add methods to ui elements

        this.TestIConDisplay();
    }
    //onform change or indiv buttons
    /*submit should add the final*/

    //method to fetch translation?
    /*should it disable the welsh input button?*/

    //method to fetch icon
    GetIconChoices(){

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
    //method to preview card

    //method to add card to list

    //method to make lists

    //method to display success and ask for next step

    /*how do I have a simple way to make lists and words available on different pages
    or - playing the game and adding can be on one monstrous page */
}


window.onload = ()=>{let newAddWord = new AddWord();};