// const input = document.querySelector('input');
// input.addEventListener('change', (e) => {
//     let percentGoal = 100 -(( e.target.value/200 ) *100);
//     document.getElementById('foregroundImg').style.height= `${percentGoal}%`;  
// });

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
        });
}

function submitTicket() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const ticketNum = document.getElementById('ticketNum').value;
    let body = {
        ticketid:  ticketNum,
        lastname: lastName,
        firstname: firstName
    };
    fetch('https://blooming-scrubland-09549.herokuapp.com/api/tickets', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(body)
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