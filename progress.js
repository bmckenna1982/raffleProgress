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
    fetch('http://localhost:8000/tickets')
        .then(res => {
            if(!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json()
        })
        .then((data) => {
            document.getElementById('ticketSold').innerText = `Tickets sold: ${data.Count.toString()}`;
            document.getElementById('current').innerText = `Current: $${(data.Count * 10)}`;
            let percentGoal = 100 -(( data.Count/200 ) *100);
            document.getElementById('foregroundImg').style.height= `${percentGoal}%`;
        });
}

function submitTicket() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const ticketNum = document.getElementById('ticketNum').value;
    let body = {
        ticketId:  ticketNum,
        lastName: lastName,
        firstName: firstName
    };
    fetch('http://localhost:8000/tickets', {
            method: 'PUT',
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