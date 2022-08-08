import { createContactItem } from "./createContact.js";
import { svgContactDefault, svgContactHover, svgSpiner } from "./svg.js";

export const createClietsForm = () => {
    const modalTitel = document.createElement('h2');
    const modalClose = document.createElement('button');
    const form = document.createElement('form');
    const inputName = document.createElement('input');
    const labelName = document.createElement('label');
    const inputSurname = document.createElement('input');
    const labelSurname = document.createElement('label');
    const inputLastName = document.createElement('input');
    const labelLastName = document.createElement('label');
    const requiredName = document.createElement('span');
    const requiredLastName = document.createElement('span');
    const addContactBtn = document.createElement('button');
    const contactBtnSvgDefault = document.createElement('span');
    const contactBtnSvgHover = document.createElement('span');
    const saveBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');
    const contactsBlock = document.createElement('div');
    const formLoatingName = document.createElement('div');
    const formLoatingSurname = document.createElement('div');
    const formLoatingLastName = document.createElement('div');
    const saveSpiner = document.createElement('span');

    const errorBlock = document.createElement('p');
    const unacceptablelettere = document.createElement('span');
    const writeName = document.createElement('span');
    const writeSurname = document.createElement('span');
    const writeLastName = document.createElement('span');
    const requiredValue = document.createElement('span');
    const requiredContacts = document.createElement('span');


    saveSpiner.classList.add('modal__spiner');
    modalTitel.classList.add('modal__titel');
    modalClose.classList.add('modal__close', 'btn-reset');
    form.classList.add('modal__form');
    formLoatingName.classList.add('form-floating');
    formLoatingSurname.classList.add('form-floating');
    formLoatingLastName.classList.add('form-floating');
    inputName.classList.add('modal__input');
    inputSurname.classList.add('modal__input');
    inputLastName.classList.add('modal__input');
    labelName.classList.add('modal__label');
    labelSurname.classList.add('modal__label');
    labelLastName.classList.add('modal__label');
    requiredName.classList.add('modal__label');
    requiredLastName.classList.add('modal__label');
    addContactBtn.classList.add('modal__btn-contact', 'modal__btn-contact--active');
    saveBtn.classList.add('modal__btn-save', 'btn-reset', 'site-btn');
    cancelBtn.classList.add('modal__btn-back', 'btn-reset');
    contactBtnSvgDefault.classList.add('btn-contact__svg', 'btn-contact__svg--default', 'btn-contact__svg--active');
    contactBtnSvgHover.classList.add('btn-contact__svg', 'btn-contact__svg--hover');
    contactsBlock.classList.add('modal__contact');
    labelName.for = 'floatingName';
    labelSurname.for = 'floatingSurname';
    labelLastName.for = 'floatingLastName';
    inputName.id = 'floatingName';
    inputSurname.id = 'floatingSurname';
    inputLastName.id = 'floatingLastName';
    inputName.type = 'text';
    inputSurname.type = 'text';
    inputLastName.type = 'text';
    inputName.placeholder = 'Имя';
    inputSurname.placeholder = 'Отчество';
    inputLastName.placeholder = 'Фамилия';

    errorBlock.classList.add('modal__error');
    unacceptablelettere.id = 'unacceptablelettere';
    writeName.id = 'writeName';
    writeSurname.id = 'writeSurname';
    writeLastName.id = 'writeLastName';
    requiredValue.id = 'requiredValue';
    requiredContacts.id = 'requiredContacts';

    saveSpiner.innerHTML = svgSpiner;
    modalTitel.textContent = 'Новый клиент';
    labelName.textContent = 'Имя';
    labelSurname.textContent = 'Отчество';
    labelLastName.textContent = 'Фамилия';
    addContactBtn.textContent = 'Добавить контакт';
    saveBtn.textContent = 'Сохранить';
    cancelBtn.textContent = 'Отмена';
    requiredName.textContent = '*';
    requiredLastName.textContent = '*';
    contactBtnSvgDefault.innerHTML = svgContactDefault;
    contactBtnSvgHover.innerHTML = svgContactHover;

    labelName.append(requiredName);
    saveBtn.append(saveSpiner);
    labelLastName.append(requiredLastName);
    formLoatingName.append(inputName, labelName);
    formLoatingSurname.append(inputSurname, labelSurname);
    formLoatingLastName.append(inputLastName, labelLastName);
    contactsBlock.append(addContactBtn);
    errorBlock.append(unacceptablelettere, writeName, writeSurname, writeLastName, requiredValue, requiredContacts);
    form.append(
        formLoatingLastName,
        formLoatingName,
        formLoatingSurname,
        contactsBlock,
        errorBlock,
        saveBtn,
        cancelBtn,
    );
    addContactBtn.append(contactBtnSvgDefault, contactBtnSvgHover);

    addContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactItems = document.getElementsByClassName('contact');

        if (contactItems.length < 9) {
            const contactItem = createContactItem();
            contactsBlock.prepend(contactItem.contact);
            contactsBlock.style.backgroundColor = 'var(--color-athens-gray)';
            if (contactItems.length >= 5) {
                document.querySelector('.site-modal__content').style.top = '80%';
            } else {
                document.querySelector('.site-modal__content').style.top = '50%';
            }
        } else {
            const contactItem = createContactItem();
            contactsBlock.prepend(contactItem.contact);
            addContactBtn.classList.remove('modal__btn-contact--active');
        }
    });

    return {
        form,
        modalClose,
        modalTitel,
        inputSurname,
        inputName,
        inputLastName,
        cancelBtn,
        labelName,
        labelSurname,
        labelLastName,
        contactsBlock,
        addContactBtn,
    };
}