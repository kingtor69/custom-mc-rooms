/* 
** this is being deployed manually with manual version management
** this code last updated 20211221-2212mst
*/

const secondSpan = document.getElementById('seconds');
const msec = 8000;
let sec = msec/1000;
secondSpan.innerText = sec;

function onLoad() {
    setInterval(() => {
        sec --;
        secondSpan.innerText = sec;
    }, 1000)
    
    setTimeout(() => {
        window.location.replace("./index.html")
    }, msec)
}
window.addEventListener('DOMContentLoaded', e => {
    onLoad();
});
