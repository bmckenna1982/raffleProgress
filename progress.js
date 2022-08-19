const input = document.querySelector('input')  
input.addEventListener('change', (e) => {
let percentGoal = 100 -(( e.target.value/200 ) *100);
document.getElementById('foregroundImg').style.height= `${percentGoal}%`;  
});