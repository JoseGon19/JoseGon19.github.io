document.addEventListener("DOMContentLoaded", () => {
    const images = ["img1.png", "img2.png", "img3.png", "img4.png", "img5.png", "img6.png"];
    let cards = [...images, ...images].sort(() => 0.5 - Math.random());
    const board = document.getElementById("game-board");
    let firstCard = null, secondCard = null;
    let score = 0;
    let timeLeft = 120;
    let timerInterval;

    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            document.getElementById("timer").textContent = `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert("¡Tiempo agotado! Juego terminado.");
                location.reload();
            }
        }, 1000);
    }

    function checkMatch() {
        if (firstCard.dataset.image === secondCard.dataset.image) {
            score += 10;
            document.getElementById("score").textContent = score;
            firstCard = secondCard = null;
            
            if (score === 60) {
                clearInterval(timerInterval);
                alert("¡Jugador ganó con puntuación perfecta!");
                location.reload();
            }
        } else {
            setTimeout(() => {
                firstCard.style.backgroundImage = "";
                secondCard.style.backgroundImage = "";
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                firstCard = secondCard = null;
            }, 1000);
        }
    }

    function flipCard(event) {
        let card = event.target;
        if (card.classList.contains("flipped") || secondCard) return;
        
        card.style.backgroundImage = `url(${card.dataset.image})`;
        card.classList.add("flipped");
        
        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            checkMatch();
        }
    }

    function createBoard() {
        board.innerHTML = "";
        cards.forEach(image => {
            let card = document.createElement("div");
            card.classList.add("card");
            card.dataset.image = image;
            card.addEventListener("click", flipCard);
            board.appendChild(card);
        });
        startTimer();
    }

    createBoard();
});
