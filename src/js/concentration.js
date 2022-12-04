//import
import './general';
const regeneratorRuntime = require("regenerator-runtime");
import getNavBar from './navbar';

// Create a class called Concentration.
class Concentration {
    /*
        Add a constructor.  In the body of the constructor
        -   Create instance variables to replace the global variables
        -   Bind the class to each of the following methods
        -       this.showMatches = this.showMatches.bind(this);
        -       this.enableAllRemainingCards = this.enableAllCards.bind(this);
        -       this.enableAllRemainingCards = this.enableAllRemainingCards.bind(this);
        -       this.checkCards = this.checkCards.bind(this);
        -       this.disableAllCards = this.disableAllCards.bind(this);
        -       this.isMatch = this.isMatch.bind(this);     
        -   All of the functionality of init will happen in the constructor ... call init.
    */
    constructor() {
        this.imagePath = '/Assets/images/';
        //holds the object values
        this.vocabCards=Array(10).fill(null);
        //holds the html string
        this.images = Array(20).fill(null);
        this.firstPick = -1;
        this.secondPick = -1;
        this.matches = 0;
        this.tries = 0;
        this.gameWon = false;

        this.fillCardImages=this.fillCardObjects.bind(this);
        this.createCardHtml=this.createCardHtml.bind(this);
        this.testCardFronts=this.testCardFronts.bind(this);

        this.showMatches = this.showMatches.bind(this);
        this.enableAllRemainingCards = this.enableAllCards.bind(this);
        this.enableAllRemainingCards = this.enableAllRemainingCards.bind(this);
        this.checkCards = this.checkCards.bind(this);
        this.disableAllCards = this.disableAllCards.bind(this);
        this.isMatch = this.isMatch.bind(this);

        this.cards = document.getElementsByName("card");
        this.init();
    }
    init() {
        this.fillCardObjects();
        this.createCardHtml();
        this.testCardFronts();
        //this.shuffleImages();
        //this.showMatches();
        //this.enableAllCards();
        //this.showAllBacks();
        getNavBar("Concentration");
    }
    //enable local storage to let you add a card on place and use it elsewhere?

    //was fillImages
    //build cards - could cards be a separate class?
    fillCardObjects() {
        let english =['cat', 'dog', 'pig', 'horse', 'rabbit', 'goat','duck', 'cow', 'sheep', 'lamb'];
        let engPlural =['cats', 'dogs', 'pigs', 'horses', 'rabbits', 'goats','ducks', 'cows', 'sheep', 'lambs' ];
        let singular = ['cath', 'ci', 'mochyn', 'ceffyl', 'cwningen', 'gafr', 'hwyaden', 'buwch', 'defad', 'oen'];
        let plural = ['cathod', 'cwn','moch', 'ceffylau', 'cwningod', 'geifr','hwyaid', 'buchod', 'defaid', 'wyn'];
        let index = 0;
        for (let i=0; i<10; i++)
        {
            this.vocabCards[i]={
                category: "farm animals",
                english: english[1],
                singular: singular[i],
                plural: plural[i],
                vocabImg: this.imagePath + engPlural[i]+".jpg"
            }
        }
        
    }
    //makes the template literal for displaying and stores it in the images array
    createCardHtml(){
            let cardValues= this.vocabCards[i];
            let options=[1,2]
            let string='';
            let index=0;
            for(let i=0; i<this.vocabCards.length; i++)
            {
                for(let j=0; j<options.length; j++)
                    if(options[j]==1){
                        string=`                    
                        <div>
                            <img class="card-img-top img-fluid" src="${cardValues.vocabImg}" alt="${cardValues.engPlural}">
                                <div class="card-body">
                            <h5 class="card-title">${cardValues.plural}</h5>
                        </div> 
                        </div> `;
                        index=i;
                        this.images[index]=string;
                        document.getElementById(index).innerHTML=this.images[index];   
                    }
                else{
                        string=`                    
                            <div>
                                <img class="card-img-top img-fluid" src="${cardValues.vocabImg}" alt="${cardValues.engPlural}">
                                <div class="card-body">
                                    <h5 class="card-title">${cardValues.plural}</h5>
                                </div> 
                            </div> `;
                        index=i+10;
                        this.images[index]=string;
                        document.getElementById(index).innerHTML=this.images[index];   
                    }              
        }
    }
    //no shuffling just insert the html
    testCardFronts(){
        for (let i=0; i<this.cards.length; i++)
        {
            let cardImage = this.images[i];
            document.getElementById(i).innerHTML =cardImage;
        };
    }

    shuffleImages() {
        for (let i = 0; i < this.length; i++) {
            let randomNum = Math.floor(Math.random() * this.images.length);
            //let temp = images[i];
            //this.images[i] = this.images[randomNum];
            //this.images[randomNum] = temp;
            [this.images[i], this.images[randomNum]] = [this.images[randomNum], this.images[i], ]
            //array on the fly that swaps the positions?
        }
    }
    showBack(index) {
        let backImage = this.imagePath + 'black_back.jpg';
        let card = document.getElementById(index);
        card.style.backgroundImage = 'url(' + backImage + ')';
    }

    showAllBacks() {
        for (let i = 0; i < this.cards.length; i++) {
            this.showBack(i);
        }
    }

    enableAllCards() {
        //watch out there is an onclick! bind!
        for (let i = 0; i < this.cards.length; i++) {
            cards[i].onclick = this.handleClick.bind(this, i);
            cards[i].style.cursor = 'pointer';
        }
    }
    enableAllRemainingCards() {
        for (let i = 0; i < this.cards.length; i++) {
            if (cards[i].style.backgroundImage != "none") {
                cards[i].onclick = this.handleClick.bind(this, i);
                cards[i].style.cursor = 'pointer';
            }
        }


    }
    handleClick(index) {
        let cardImage = this.images[index];
        document.getElementById(index).innerHTML =cardImage;
        this.disableCard(index);

        if (this.firstPick == -1) {
            this.firstPick = index;
        } else {
            this.secondPick = index;
            this.disableAllCards();
            setTimeout(this.checkCards, 1500);
        }
    }
    disableCard(index) {
        let card = document.getElementById(index);
        //bc card is local and we are click it - it doesn't need to be bound
        card.onclick = () => {};
        card.style.cursor = 'none';
    }
    disableAllCards(index) {
        let cards = document.getElementsByName("card");
        for (let i = 0; i < cards.length; i++) {
            cards[i].onclick = () => {};
            cards[i].style.cursor = 'none';
        }
    }
    checkCards() {
        this.tries++;
        if (this.isMatch()) {
            this.matches++;
            this.removeCard(this.firstPick);
            this.removeCard(this.secondPick);
            if (this.matches < 10) {
                this.enableAllRemainingCards();
            } else {
                this.gameWon = true;
            }
        } else {
            this.showBack(this.firstPick);
            this.showBack(this.secondPick);
            this.enableAllRemainingCards();
        }
    
        this.showMatches();
        this.firstPick = -1;
        this.secondPick = -1;
        if (this.gameWon) {
            document.getElementById("win").showModal();
        }

    }
    isMatch() {
        let firstImageName = this.images[this.firstPick];
        let secondImageName = this.images[this.secondPick];
    
        let vFirstCard = firstImageName.substr(4, 1);
        let vSecondCard = secondImageName.substr(4, 1);
    
        if (vFirstCard == vSecondCard)
            return true;
        else
            return false;

    }
    showMatches() {
        document.getElementById("status").innerHTML = "Matches: " + this.matches + " Tries: " + this.tries;
    }
    removeCard(index) {
        let card = document.getElementById(index);
        card.style.backgroundImage = 'none';
    }
    /*
            Convert each function to a method.  
            -   Move it inside the class.
            -   Remove the keyword function
            -   Add this. in front of every variable and method
            
            THREE OF THE METHODS CHANGE A LITTLE
            -   handleClick will now have a parameter, index
                -   remove the declaration / assignment of the local var index
            -   enableAllCards (and enableAllRemainingCards) have to pass the index to handleClick
                -   the line of code that calls bind must now pass both this and an index
                -   before: cards[i].onclick = this.handleClick.bind(this);
                -   should be: cards[i].onclick = this.handleClick.bind(this, i);
        */

}



let concentration;
window.onload = () => {
    concentration = new Concentration();
}