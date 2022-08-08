import { svgSpiner } from "./svg.js";

export const deleteClientModal = () => {
    const deleteModalContent = document.createElement('div');
    const modalClose = document.createElement('button');
    const deleteModalTitel = document.createElement('h2');
    const deleteModalText = document.createElement('p');
    const deleteModal = document.createElement('div');
    const deleteModalDelete = document.createElement('button');
    const deleteModalBack = document.createElement('button');
    const deleteSpiner = document.createElement('span');

    deleteSpiner.classList.add('modal__spiner')
    deleteModal.classList.add('delete-modal', 'site-modal', 'modal-active');
    deleteModalContent.classList.add('delete-modal__content', 'site-modal__content', 'modal-active');
    deleteModalText.classList.add('delete-modal__text');
    deleteModalTitel.classList.add('delete-modal__titel', 'site-modal__titel');
    deleteModalDelete.classList.add('delete-modal__delete', 'btn-reset', 'site-btn');
    deleteModalBack.classList.add('delete-modal__back', 'btn-reset');
    modalClose.classList.add('modal__close', 'btn-reset');

    deleteModalTitel.textContent = 'Удалить клиента';
    deleteModalText.textContent = 'Вы действительно хотите удалить данного клиента?';
    deleteModalDelete.textContent = 'Удалить';
    deleteModalBack.textContent = 'Отмена';
    deleteSpiner.innerHTML = svgSpiner;

    deleteModalDelete.append(deleteSpiner);
    deleteModalContent.append(
        modalClose,
        deleteModalTitel,
        deleteModalText,
        deleteModalDelete,
        deleteModalBack,
    );
    deleteModal.append(deleteModalContent);

    modalClose.addEventListener('click', () => deleteModal.remove());

    deleteModalBack.addEventListener('click', () => deleteModal.remove());

    window.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            deleteModal.remove();
        }
    })

    return {
        deleteModal,
        deleteModalContent,
        deleteModalDelete,
        deleteSpiner,
    }
}