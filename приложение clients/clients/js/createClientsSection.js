import { addClientsModal } from "./addClients.js";
import { createPreloader } from "./preloader.js";
import { svgUserBtn } from "./svg.js";

export const createClintsSection = () => {
    const section = document.createElement('section');
    const main = document.createElement('main');
    const container = document.createElement('div');
    const heading = document.createElement('h1');
    const table = document.createElement('table');
    const tableWrape = document.createElement('div');
    const sortingDisplay = document.createElement('thead');
    const tHeadeTr = document.createElement('tr');
    const sortingDisplayId = document.createElement('th');
    const sortingDisplayName = document.createElement('th');
    const sortingDisplayCreat = document.createElement('th');
    const sortingDisplayEdite = document.createElement('th');
    const sortingDisplayContacts = document.createElement('th');
    const sortingDisplayAction = document.createElement('th');
    const sortingDisplaySpan = document.createElement('span');
    const tBody = document.createElement('tbody');
    const addUserBtn = document.createElement('button');
    const addUserBtnSvg = document.createElement('span');
    const createSpan = document.createElement('span');
    const editeSpan = document.createElement('span');

    const sortDisplayItems = [sortingDisplayId, sortingDisplayName, sortingDisplayCreat, sortingDisplayEdite];

    for (const item of sortDisplayItems) {
        item.addEventListener('click', () => {
            if (item.classList.contains('sort-down')) {
                item.classList.remove('sort-down');
                item.classList.add('sort-up');
            } else {
                item.classList.remove('sort-up');
                item.classList.add('sort-down');
            };
        })
    };

    sortingDisplayCreat.addEventListener('click', () => {
        if (sortingDisplayCreat.classList.contains('sort-down')) {
            createSpan.classList.add('sort-up');
        } else {
            createSpan.classList.remove('sort-up');
        }
    })

    sortingDisplayEdite.addEventListener('click', () => {
        if (sortingDisplayEdite.classList.contains('sort-down')) {
            editeSpan.classList.add('sort-up');
        } else {
            editeSpan.classList.remove('sort-up');
        }
    })

    sortingDisplayId.setAttribute('data-type', 'id');
    sortingDisplayName.setAttribute('data-type', 'text');
    sortingDisplayCreat.setAttribute('data-type', 'create');
    sortingDisplayEdite.setAttribute('data-type', 'update');

    section.classList.add('clients');
    main.classList.add('main');
    container.classList.add('container', 'clients__container');
    heading.classList.add('clients__heading');
    table.classList.add('clients__table');
    tBody.classList.add('clients__tbody');
    sortingDisplay.classList.add('clients__display', 'display-info');
    tHeadeTr.classList.add('display-info__wrapper');
    sortingDisplayId.classList.add('display-info__item', 'display-info__item--id', 'sort-up');
    sortingDisplayName.classList.add('display-info__item', 'display-info__item--name', 'sort-down');
    sortingDisplayCreat.classList.add('display-info__item', 'display-info__item--create', 'sort-down');
    sortingDisplayEdite.classList.add('display-info__item', 'display-info__item--change', 'sort-down');
    sortingDisplayContacts.classList.add('display-info__item', 'display-info__item--contacts');
    sortingDisplayAction.classList.add('display-info__item', 'display-info__item--action');
    sortingDisplaySpan.classList.add('display-info__sorting');
    tableWrape.classList.add('clients__wraper');
    addUserBtn.classList.add('clients__btn', 'btn-reset');
    addUserBtnSvg.classList.add('clients__svg');
    createSpan.classList.add('create__span');
    editeSpan.classList.add('edite__span');

    heading.textContent = 'Клиенты';
    sortingDisplayId.textContent = 'id';
    sortingDisplayName.textContent = 'Фамилия Имя Отчество';
    sortingDisplaySpan.textContent = 'а-я';
    sortingDisplayCreat.textContent = 'Дата и время';
    sortingDisplayEdite.textContent = 'Последние';
    sortingDisplayContacts.textContent = 'Контакты';
    sortingDisplayAction.textContent = 'Действия';
    addUserBtn.textContent = 'Добавить клиента';
    addUserBtnSvg.innerHTML = svgUserBtn;

    addUserBtn.addEventListener('click', () => {
        document.body.append(addClientsModal());
    });

    main.append(section);
    section.append(container);
    sortingDisplayName.append(sortingDisplaySpan);
    sortingDisplayCreat.append(createSpan);
    sortingDisplayEdite.append(editeSpan);
    tHeadeTr.append(
        sortingDisplayId,
        sortingDisplayEdite,
        sortingDisplayName,
        sortingDisplayCreat,
        sortingDisplayEdite,
        sortingDisplayContacts,
        sortingDisplayAction,
    );
    sortingDisplay.append(tHeadeTr);
    tableWrape.append(table, createPreloader());
    table.append(sortingDisplay, tBody);
    addUserBtn.append(addUserBtnSvg);
    container.append(heading, tableWrape, addUserBtn);

    return {
        main,
        table,
        tBody,
    }
}