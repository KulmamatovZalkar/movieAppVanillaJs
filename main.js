let container = document.querySelector('.container')
let seats = document.querySelectorAll('.row .seat:not(.occupied)')
let count = document.getElementById('count')
let total = document.getElementById('total')
let movieSelect = document.getElementById('movie')

populateUI()

let ticketPrice = +movieSelect.value


function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}


function updSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    const seatsIndex = [...selectedSeats].map(seat=>[...seats].indexOf(seat))

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    const selectedSeatsCount = selectedSeats.length

    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

movieSelect.addEventListener('change', event=>{
    ticketPrice = +event.target.value
    setMovieData(event.target.selectedIndex, event.target.value)
    updSelectedCount()
})

container.addEventListener('click', event =>{
    if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')){
        event.target.classList.toggle('selected')
        updSelectedCount();
    }
})

updSelectedCount();