let ctr = 0;

function inCount(){
    document.querySelector("span").innerHTML = ctr;
    ctr = ctr +1 ;
}
setInterval(inCount , 1000)