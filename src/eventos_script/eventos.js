console.log('body script init')
function containsMypage() {
    const currentUrl = window.location.href;
    return currentUrl.includes('users/mypage/my-ticket');
}

function initTicketData(allModule) {
    const ticketPurchaseList = allModule?.flatMap(m => m.purchasedTickets) ?? [];
    const ticketContentsList = allModule?.flatMap(m => m.ticketContents) ?? [];

    const listTicket = ticketPurchaseList.map(ticket => {
        const numberOfTicket = ticketContentsList.find(obj => obj.ticketId == ticket?.ticketId);
        return {
            id: ticket.id,
            code: ticket.code,
            statusLabel: ticket.statusLabel,
            price: ticket.price,
            qrString: ticket.qrString,
            contentId: numberOfTicket.contentId,
            ticketId: numberOfTicket.ticketId,
            title: numberOfTicket.title,
            ticketSmallCategoryId: numberOfTicket.ticketSmallCategoryId,
            ticketMiddleCategoryId: numberOfTicket.ticketMiddleCategoryId,
            ticketLargeCategoryId: numberOfTicket.ticketLargeCategoryId,
            checkinPeriodStart: numberOfTicket.checkinPeriodStart,
            checkinPeriodEnd: numberOfTicket.checkinPeriodEnd,
        }
    });

    return listTicket;
}

function initEventElementQrSp(nuxtData) {
    const ticketData = initTicketData(nuxtData?.ticket)
    const ticketWrap = document.querySelector('.container.my-ticket-layout__wrap');
    if (ticketWrap) {
        const rowTicket = ticketWrap.querySelector('.row.justify-center.align-content-center')
        const ticketCard = rowTicket.querySelectorAll('.my-ticket-layout__card')
        ticketCard.forEach((ticket, index) => {
            ticket.onclick = function (event) {
                event.preventDefault();
                initButtonQr(ticketData)
            }
        })
    }
}

function initEventElementQR() {
    if (containsMypage()) {
        let nuxtData = __NUXT__.state.personal.data
        const ticketData = initTicketData(nuxtData?.ticket)
        initEventElementQrSp(nuxtData)
        // Find the element with class 'v-data-table__wrapper'
        const tableEl = document.querySelector('.v-data-table__wrapper');
        if (tableEl) {
            // Find the tbody element inside the wrapper
            const tbody = tableEl.querySelector('tbody');

            if (tbody) {
                // Find all td elements inside the tbody
                const cells = tbody.querySelectorAll('tr');


                // Add click event listener to each cell
                cells.forEach((cell, index) => {
                    cell.onclick = function (event) {
                        // Prevent any default action
                        event.preventDefault();
                        // Log the cell content and its index
                        console.log(cell)
                        console.log(`Cell ${index} clicked. Content: ${this.textContent.trim()}`);
                        const row = this.closest('tr');
                        console.log(`This cell is in row ${row.rowIndex}`);
                        initButtonQr(ticketData)
                    };
                });
            } else {
                console.error('Could not find tbody element inside .v-data-table__wrapper');
            }
        }
    }
}

function initButtonQr(ticket) {
    console.log(ticket, 'ticket')
    const ticketCards = document.querySelectorAll(".ticket-card-detail");
    if (ticketCards && ticketCards.length > 0) {
        // Iterate through each ticket card
        ticketCards.forEach((card) => {
            const cardText = card.querySelector(".v-card__text");
            if (cardText) {
                const wapper = cardText.querySelector(".wapper");
                if (wapper) {
                    const button = document.createElement("button");
                    button.className = 'v-btn'
                    const qrElement = document.querySelector('.ticket-card-detail__qr');
                    qrElement.remove();
                    // Set the button text
                    button.textContent = "カメラを起動する";
                    // Add CSS styles to the button
                    button.style.backgroundColor = '#0277FF';
                    button.style.boxShadow = '0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)';
                    button.style.borderColor = 'rgb(0, 102, 255)';
                    button.style.width = '72%';
                    button.style.fontFamily = 'Inter, sans-serif';
                    button.style.color = '#FFFFFF';
                    button.style.padding = '20px 8px';
                    button.style.textAlign = 'center';
                    button.style.textDecoration = 'none';
                    button.style.display = 'inline-block';
                    button.style.fontSize = '20px';
                    button.style.fontWeight = '600';
                    button.style.lineHeight = '150%';
                    button.style.letterSpacing = '-0.011em';
                    button.style.margin = '4px 2px';
                    button.style.borderRadius = '8px';
                    button.style.transitionDuration = '.28s';
                    button.style.transitionProperty = 'box-shadow,transform,opacity';
                    button.style.transitionTimingFunction = 'cubic-bezier(.4,0,.2,1)';
                    // Add hover effect
                    button.onmouseover = function () {
                        this.style.opacity = '0.8';
                    }
                    button.onmouseout = function () {
                        this.style.opacity = '1';
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
    }
}

function initButtonFunc() {
    var setButtonQrEventId
    if (containsMypage()) {
        setButtonQrEventId = setInterval(initEventElementQR, 500);
        if (setButtonQrEventId) {
            localStorage.setItem('setButtonQrEventId', setButtonQrEventId)
        }
    } else {
        const interValBtn = localStorage.getItem('setButtonQrEventId');
        if (interValBtn) {
            clearInterval(interValBtn);
            localStorage.removeItem('setButtonQrEventId')
        }
    }
}

initButtonFunc()