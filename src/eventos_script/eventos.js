console.log("Body eventos script");
function containsMypage() {
    const currentUrl = window.location.href;
    return currentUrl.includes('users/mypage/my-ticket');
}

function initEventElementQR() {
    const tableEl = document.querySelectorAll('.v-data-table__wrapper')
}

function initButtonQr() {
    if (containsMypage()) {
        console.log('my page')
        const ticketCards = document.querySelectorAll(".ticket-card-detail");
        if (ticketCards && ticketCards.length > 0) {
            console.log(ticketCards, 'ticketCards')
            // Iterate through each ticket card
            ticketCards.forEach((card) => {
                console.log(card, 'card')
                // Find the 'v-card__text' element within the current card
                const cardText = card.querySelector(".v-card__text");
                console.log(cardText, 'cardText')
                if (cardText) {
                    // Find the 'wapper' element within 'v-card__text'
                    const wapper = cardText.querySelector(".wapper");
                    console.log(wapper, 'wapper')
                    if (wapper) {
                        // Create a new button element
                        const button = document.createElement("button");

                        // Set the button text
                        button.textContent = "New Button";
                        // Add CSS styles to the button
                        button.style.backgroundColor = '#4CAF50';
                        button.style.border = 'none';
                        button.style.color = 'white';
                        button.style.padding = '15px 32px';
                        button.style.textAlign = 'center';
                        button.style.textDecoration = 'none';
                        button.style.display = 'inline-block';
                        button.style.fontSize = '16px';
                        button.style.margin = '4px 2px';
                        button.style.cursor = 'pointer';
                        button.style.borderRadius = '8px';
                        // Add hover effect
                        button.onmouseover = function () {
                            this.style.backgroundColor = '#45a049';
                        }
                        button.onmouseout = function () {
                            this.style.backgroundColor = '#4CAF50';
                        }

                        button.onclick = function () {
                            window.location.href = "https://bsv-phuly.github.io/vue-qr-page/";
                        };

                        // Optionally, add any classes or attributes to the button
                        // button.classList.add('your-button-class');
                        // button.setAttribute('id', 'your-button-id');

                        // Append the button to the wapper element
                        cardText.appendChild(button);
                    }
                }
            });
        } else {
            setTimeout(initButtonQr, 200)
        }
    }
}

initButtonQr()