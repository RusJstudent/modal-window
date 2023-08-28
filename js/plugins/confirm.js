'use strict';

$.confirm = function(options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            width: '400px',
            closable: false,
            content: options.content,
            onClose() { modal.destroy() },
            buttons: [
                { text: 'Удалить', className: 'btn-ok', handler() { 
                    modal.close();
                    resolve(modal);
                }},
                { text: 'Отмена', className: 'btn-cancel', handler() { 
                    modal.close();
                    reject(modal);
                }},
            ],
        });

        setTimeout(() => modal.open());
    });
}