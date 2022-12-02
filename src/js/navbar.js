export default function getNavBar(activePage){
    //long way
    let activeHome ="";
    let activeConcentration="";
    let activeAddAWord="";
    let activeAudio ="";
    let activeAbout="";
    let linkHome="./";
    let linkAudio="./audio.html";
    let linkConcentration="./concentration.html";
    let linkAddAWord="./addAWord.html";
    let linkAbout="./about.html";

    
    if(activePage=="AddAWord")
    {
        activeAddAWord="active";
        linkAddAWord="#";
    }
    else if(activePage=="Concentration"){
        activeConcentration="active";
        linkConcentration="#";
    }
    else if(activePage=="About"){
      activeAbout="active";
      linkAbout="#";
  }
    else if(activePage=="Audio"){
        activeAudio="active";
        linkAudio="#";
    }
    else{
        activeHome="active";
        linkHome="#";
    }

    let welshNavBar="";
    welshNavBar=`<nav class="navbar navbar-expand-sm color3">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"> 
        <img src="Assets/images/welsh-dragon.png" alt="Logo" style="width: 100px;" class="rounded-pill m-3">  
    </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link custom-nav-text" href="${linkHome}">Home</a>
          </li>
          <li class="nav-item">
          <a class="nav-link custom-nav-text" href="${linkAbout}">About</a>
        </li>
          <li class="nav-item">
            <a class="nav-link custom-nav-text" href="${linkAudio}">Audio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link custom-nav-text" href="${linkAddAWord}">Add a Vocab Word</a>
          </li>  
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle custom-nav-text" href="#" role="button" data-bs-toggle="dropdown">Play Games</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="${linkConcentration}">Concentration</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <span class="justify-content-end m-3 custom-title">233 JS Final</span>
    </div>
</nav>`;

    document.getElementById("navbar").innerHTML = welshNavBar;
    }

    