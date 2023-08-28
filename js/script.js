'use strict';

const fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://foodfort.ru/wp-content/uploads/2020/04/5-10.jpg'},
];

for (let fruit of fruits) {
    const cards = document.querySelector('.cards');
    let html = `
    <div class="card" id="${fruit.id}" data-price="${fruit.price}">
        <img src="${fruit.img}" alt="${fruit.title}">
        <h3>${fruit.title}</h3>
        <a href="#" class="btn btn-primary">Посмотреть цену</a>
        <a href="#" class="btn btn-danger">Удалить</a>
    </div>
    `;
    cards.insertAdjacentHTML('beforeend', html);
}

const checkPriceModal = $.modal({
    width: '600px',
    closable: true,
    buttons: [
        { text: 'Ok', className: 'btn-ok', handler() { checkPriceModal.close(); }, },
    ],
});

document.addEventListener('click', function(e) {
    if (e.target.tagName !== 'A') return;
    e.preventDefault();

    const card = e.target.closest('.card');
    const name = fruits.find( fruit => fruit.id === +card.id ).title;

    if (e.target.classList.contains('btn-primary')) {
        checkPriceModal.setTitle(`<p>${name}</p>`);
        checkPriceModal.setContent(`<p>Цена: <b>${card.dataset.price}$</b></p>`);
        checkPriceModal.open();
    }

    if (e.target.classList.contains('btn-danger')) {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <b>${name}</b></p>`,
        }).then( resolve => {
            card.remove();
        }, reject => {});
    }
});