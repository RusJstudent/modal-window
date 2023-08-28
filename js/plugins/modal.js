'use strict';

$.modal = function(options = {}) {
    const _modal = _createModal(options);
    _modal.onclick = _close;

    let isTransition, isOpen = false;
    
    const PUBLIC = {
        beforeClose: false,
        setTitle(content) {
            _modal.querySelector('._modal__title').innerHTML = content;
        },
        setContent(content) {
            _modal.querySelector('._modal__body').innerHTML = content;
        },
        open() {
            if (isOpen || isTransition) return;

            isTransition = isOpen = true;
            this.beforeClose = false;

            _modal.classList.add('modal-open');
            _modal.ontransitionend = e => {
                isTransition = false;
                this.beforeClose = true;
            };
        },
        close() {
            _close();
        },
        destroy() {
            _modal.onclick = _modal.ontransitionend = null;
            _modal.querySelectorAll('button').forEach( btn => btn.onclick = null );
            _modal.remove();
            for (let prop in this) {
                this[prop] = null;
            }
        },
    };

    return PUBLIC;

    function _close(e) {
        if (e && e.target.dataset.close === undefined) return;
        if (!isOpen || isTransition) return;

        isTransition = true;
        isOpen = false;
        PUBLIC.beforeClose = false;

        _modal.classList.add('modal-close');
        _modal.ontransitionend = function(e) {
            _modal.classList.remove('modal-close');
            _modal.classList.remove('modal-open');
            isTransition = false;

            if (typeof options.onClose === 'function') options.onClose();
        };
    }

    function _createModal({width = '80vmin', closable, title = 'Notification', content = '', buttons = []}) {
        const html = `
        <div class="_modal" data-close>
            <div class="_modal__window" style="width: ${width}">
                <div class="_modal__header">
                    <span class="_modal__title">${title}</span>
                    ${closable ? '<span class="_modal__close" data-close>&times;</span>' : ''}
                </div>
                <div class="_modal__body">
                    <p>${content}</p>
                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);
        const $modal = document.body.lastElementChild;

        if (buttons.length > 0) {
            const footer = document.createElement('div');
            footer.classList.add('_modal__footer');

            for (let button of buttons) {
                const btn = document.createElement('button');
                btn.textContent = button.text;
                btn.className = button.className;
                btn.onclick = function(e) {
                    button.handler(e);
                }
                footer.append(btn);
            }

            $modal.querySelector('._modal__body').after(footer);
        }

        return $modal;
    }
};