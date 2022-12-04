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
        this.buildCardFronts=this.buildCardFronts.bind(this);
        this.showBack=this.showBack.bind(this);
        this.showFront=this.showFront.bind(this);
        this.showAllFronts=this.showAllFronts(this);

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
        //this.buildCardFronts();
        //this.shuffleImages();
        //this.showAllFronts();
        this.showMatches();
        this.enableAllCards();
        this.showAllBacks();
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
            let options=[1,2]
            let string='';
            let index=0;
            for(let i=0; i<this.vocabCards.length; i++)
            {
                let cardValues= this.vocabCards[i];
                let id="inner";
                for(let j=0; j<options.length; j++)
                    if(options[j]==1){
                        id+=i;
                        string=`                    
                        <div id="${id}" class="">
                            <img class="card-img-top img-fluid" src="${cardValues.vocabImg}" alt="${cardValues.engPlural}">
                                <div class="card-body">
                            <h5 class="card-title">${cardValues.plural}</h5>
                        </div> 
                        </div> `;
                        index=i;
                        this.images[index]=string;  
                    }
                else{
                        index=i+10;
                        id="inner"+index;
                        string=`                    
                            <div id="${id}" class="">
                                <img class="card-img-top img-fluid" src="${cardValues.vocabImg}" alt="${cardValues.engPlural}">
                                <div class="card-body">
                                    <h5 class="card-title">${cardValues.singular}</h5>
                                </div> 
                            </div> `;
                        
                        this.images[index]=string;  
                    }              
        }
    }
    //no shuffling just insert the html
    buildCardFronts(){
        for (let i=0; i<this.cards.length; i++)
        {
            let cardImage = this.images[i];
            document.getElementById(i).innerHTML =cardImage;
        };
    }

    shuffleImages() {
        for (let i = 0; i < this.images.length; i++) {

            let randomNum = Math.floor(Math.random() * this.images.length);
            let checkValueI=(i>9)? true: false;
            let checkValueR=(randomNum>9)? true: false;
            let cardValueI=i;
            let cardValueR=randomNum;
            if(checkValueI)
            {
                cardValueI-=10;
            }
            if(checkValueR){
                cardValueR-=10;
            }
            //switch html array
            [this.images[i], this.images[randomNum]] = [this.images[randomNum], this.images[i], ]
            //switch cardvalues array
            //html should be a part of card values..
            [this.vocabCards[cardValueI], this.vocabCards[cardValueR]] = [this.vocabCards[cardValueR], this.vocabCards[cardValueI], ]
            //array on the fly that swaps the positions?
        }
    }
    showBack(index) {
        let insideId="inner"+index;
        document.getElementById(insideId).classList.add("visually-hidden");
        this.cards[index].classList.add("custom-card-back");
    }
    showFront(index) {
        let insideId="inner"+index;
        document.getElementById(insideId).classList.remove("visually-hidden");
        this.cards[index].classList.remove("custom-card-back");
    }
    showAllFronts() {
        for (let i = 0; i < this.cards.length; i++) {
            this.showFront(i);
        }
    }
    showAllBacks() {
        for (let i = 0; i < this.cards.length; i++) {
            this.showBack(i);
        }
    }

    enableAllCards() {
        //watch out there is an onclick! bind!
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].onclick = this.handleClick.bind(this, i);
            this.cards[i].style.cursor = 'pointer';
        }
    }
    enableAllRemainingCards() {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].style.backgroundImage != "none") {
                this.cards[i].onclick = this.handleClick.bind(this, i);
                this.cards[i].style.cursor = 'pointer';
            }
        }


    }
    handleClick(index) {
        //show front
        this.showFront(index);
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
        //check to see if the pick is greater than 9
        let firstIndex=this.firstPick;
        let secondIndex=this.secondPick;
        if(this.firstPick>9){
            firstIndex=firstIndex-10;
        }
        if(this.secondPick>9)
        {
            secondIndex=secondIndex-10;
        }
        let firstCardValues = this.vocabCards[this.firstIndex];
        let secondCardValues = this.vocabCards[this.secondIndex];
    
        if (firstCardValues == secondCardValues)
            return true;
        else
            return false;

    }
    showMatches() {
        document.getElementById("status").innerHTML = "Matches: " + this.matches + " Tries: " + this.tries;
    }
    removeCard(index) {
        let card = document.getElementById(index);
        this.showBack(index);
        card.classList.remove("custom-card-red")
        card.classList.add ('custom-card-disabled');
    }

}



let concentration;
window.onload = () => {
    concentration = new Concentration();
}