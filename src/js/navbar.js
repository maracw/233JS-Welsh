export default function getNavBar(activePage){
    //long way
    let activeHome ="";
    let activeConcentration="";
    let activeAddAWord="";
    let linkHome="./";
    let linkConcentration="./about.html";
    let linkAddAWord="./status.html";
    
    if(activePage=="AddAWord")
    {
        activeAddAWord="active";
        linkAddAWord="#";
    }
    else if(activePage=="Concentration"){
        activeConcentration="active";
        linkConcentration="#";
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
            <a class="nav-link custom-nav-text" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link custom-nav-text" href="#">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link custom-nav-text" href="#">Add a Vocab Word</a>
          </li>  
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle custom-nav-text" href="#" role="button" data-bs-toggle="dropdown">Play Games</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Concentration</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link custom-nav-text" href="#">Admin</a>
          </li> 
        </ul>
      </div>
      <span class="justify-content-end m-3 custom-title">Brewery Name</span>
    </div>
</nav>`
    let customBar = "";
    customBar=`<div class="container-fluid">
    <ul class="navbar-nav">
      <li class="navbar-brand">Event Application</li>
      <li class="nav-item">
        <a class="nav-link ${activeHome}" href="${linkHome}" id="home">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link ${activeConcentration}" href="${linkConcentration}" id="Status">Status</a>
      </li>
      <li class="nav-item">
        <a class="nav-link ${activeAddAWord}" href="${linkAddAWor}" id="About">About</a>
      </li>
    </ul>
    </div>`
    
    document.getElementById("navbar").innerHTML = customBar;
    }

    