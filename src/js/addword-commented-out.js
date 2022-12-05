        //extras not used
        //this.DownloadIcon=this.DownloadIcon.bind(this);
        //this.enableAllCards=this.enableAllCards.bind(this);
        //this.DisplayPexels6=this.DisplayPexels6.bind(this);
        //this.pexels6Btn.onclick=this.GetSixPexels.bind(this);
        //this.iconChoiceElement=document.getElementById("display-choices");
        //this.iconUrlElement=document.getElementById("icon-download-url");
        //this.pexels6Btn=document.getElementById("fetch-6pexels");

         /*
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
    
