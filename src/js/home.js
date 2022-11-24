//as in lab 6
import './general';
const regeneratorRuntime = require("regenerator-runtime");

function addSource(){
    document.querySelector("audio").classList.addSource(src="https://api.techiaith.org/marytts/v1?api_key=896359c1-4657-40d0-93a2-b6ffe758019c&text=Mae%20hyn%20yn%20llais%20synthetig%20Cymraeg%20sydd%20wedi%20ei%20greu%20gan%20techiaith");
}
window.onload()=addSource();