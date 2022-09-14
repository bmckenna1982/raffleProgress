// const input = document.querySelector('input');
// input.addEventListener('change', (e) => {
//     let percentGoal = 100 -(( e.target.value/200 ) *100);
//     document.getElementById('foregroundImg').style.height= `${percentGoal}%`;  
// });
function buildListItem() {
    return 
}

function clearForm() {
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('ticketNum').value = '';
}

function updateCount() {
    fetch('https://blooming-scrubland-09549.herokuapp.com/api/tickets')
        .then(res => {
            if(!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json()
        })
        .then((data) => {
            document.getElementById('ticketSold').innerText = `Tickets sold: ${data.length}`;
            document.getElementById('current').innerText = `Current: $${(data.length * 10)}`;
            let percentGoal = 100 -(( data.length/200 ) *100);
            document.getElementById('foregroundImg').style.height= `${percentGoal}%`;
            localStorage.setItem('ticketList', JSON.stringify(data))
        });
}

function showTicketList() {
    let toggleButton = document.getElementById('toggle__button');    
    let completeList = document.getElementById('ticket-list');
    let progressContainer = document.getElementById('progress__container');
    console.log("outer", toggleButton.innerHTML);
    if (toggleButton.innerHTML === 'View Tickets') {
        console.log("tickets", toggleButton.innerHTML)
        const list = JSON.parse(localStorage.getItem('ticketList'));        
        completeList.innerHTML= ""
        list.forEach((ticket) => {
            completeList.innerHTML += `<li>${JSON.stringify(ticket)}</li>`
        })        
        progressContainer.style.display = "none";
        completeList.style.display = "flex";
        toggleButton.innerHTML = 'View Progress'
    } else {
        console.log("progress", toggleButton.innerHTML);
        completeList.innerHTML= ""
        progressContainer.style.display = "";
        completeList.style.display = "none";
        toggleButton.innerHTML = 'View Tickets'
    }
    
}

function submitTicket() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const ticketNum = document.getElementById('ticketNum').value;
    
    if( !firstName || !lastName || !ticketNum ) {
        alert("To submit a ticket you must have a ticket number, first name, and last name");
        return
    }

    let ticket = {
        ticketid:  ticketNum,
        lastname: lastName,
        firstname: firstName
    };
    
    if(ticketNum.includes(",")) {
        let ticketNums = ticketNum.split(",")
        ticketNums.map(num => {
            num = num.trim();
            if(num.length > 5) {
                ticket.ticketid = num;
                sendTicket(ticket);
            }
        })
    } else {
        sendTicket(ticket)
    }
    
}

function sendTicket(ticket) {
    // let body = {
    //     ticketid:  ticketNum,
    //     lastname: lastName,
    //     firstname: firstName
    // };
    fetch('https://blooming-scrubland-09549.herokuapp.com/api/tickets', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(ticket)
        })
        .then(res => {
            if(!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json()
        })
        .then((data) => {
            alert(`Ticket ${ticketNum} succesfully entered`)
        })
        .then(() => {
            updateCount();
            clearForm();
        });
}

window.onload = updateCount;