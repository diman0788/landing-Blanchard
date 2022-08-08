import { deleteClientModal } from "./createDeleteModal.js";
import { editeModalClient } from "./editeClient.js";
import { svgSpiner } from "./svg.js";
import { createContactItemByType, formatDate, formatTime } from "./utils.js";

export const createClientItem = (data) => {
    const clientTr = document.createElement('tr');
    const clientIdTd = document.createElement('td');
    const clientId = document.createElement('span');
    const clientFullName = document.createElement('td');
    const clientName = document.createElement('span');
    const clientSurname = document.createElement('span');
    const clientLastName = document.createElement('span');
    const clientCreated = document.createElement('td');
    const createdDate = document.createElement('span');
    const createdTime = document.createElement('span');
    const clientChanget = document.createElement('td');
    const changetDate = document.createElement('span');
    const changetTime = document.createElement('span');
    const clientContact = document.createElement('td');
    const clientActions = document.createElement('td');
    const clientEdite = document.createElement('button');
    const clientDelete = document.createElement('button');
    const deleteClient = deleteClientModal();
    const editeClient = editeModalClient(data);
    const editeSpiner = document.createElement('span');
    const deleteSpiner = document.createElement('span');

    editeSpiner.classList.add('actions__spiner');
    deleteSpiner.classList.add('actions__spiner');
    clientTr.classList.add('clients__item');
    clientTr.id = data.id;
    clientIdTd.classList.add('clients__id');
    clientFullName.classList.add('clients__full-name');
    clientName.classList.add('clients__name');
    clientSurname.classList.add('clients__surname');
    clientLastName.classList.add('clients__lastname');
    clientCreated.classList.add('clients__create');
    createdDate.classList.add('created__date');
    createdTime.classList.add('created__time');
    clientChanget.classList.add('clients__changet');
    changetDate.classList.add('changet__date');
    changetTime.classList.add('changet__time');
    clientContact.classList.add('clients__contacts');
    clientActions.classList.add('clients__action');
    clientEdite.classList.add('clients__edite', 'btn-reset');
    clientDelete.classList.add('clients__delete', 'btn-reset');

    for (const contact of data.contacts) {
        createContactItemByType(contact.type, contact.value, clientContact);
    }

    const deleteById = () => {
        import('./clientsApi.js').then(({ deleteClientItem }) => {
            deleteClient.deleteModalDelete.addEventListener('click', () => {
                try {
                    deleteClient.deleteSpiner.style.display = 'block'
                    setTimeout(() => {
                        deleteClientItem(data.id);
                        document.getElementById(data.id).remove();
                        deleteClient.deleteModal.remove();
                    }, 1500)
                } catch (error) {
                    console.log(error)
                } finally {
                    setTimeout(() => {
                        deleteClient.deleteSpiner.style.display = 'none';
                    }, 1500)
                }
            })
        })
       
    }

    clientDelete.addEventListener('click', () => {
        deleteSpiner.style.display = 'block';
        clientDelete.classList.add('action-wait');
        setTimeout(() => {
            deleteById();
            document.body.append(deleteClient.deleteModal);
            deleteSpiner.style.display = 'none';
            clientDelete.classList.remove('action-wait');
        }, 1500)
    });

    clientEdite.addEventListener('click', () => {
        editeSpiner.style.display = 'block';
        clientEdite.classList.add('action-wait');
        setTimeout(() => {
            document.body.append(editeClient.editeModal);
            editeSpiner.style.display = 'none';
            clientEdite.classList.remove('action-wait');
        }, 1500)
    });

    clientIdTd.append(clientId);
    deleteSpiner.innerHTML = svgSpiner;
    editeSpiner.innerHTML = svgSpiner;
    clientId.textContent = data.id.substr(-6);
    clientName.textContent = data.name;
    clientSurname.textContent = data.surname;
    clientLastName.textContent = data.lastName;
    clientEdite.textContent = 'Изменить';
    clientDelete.textContent = 'Удалить';
    createdDate.textContent = formatDate(data.createdAt);
    createdTime.textContent = formatTime(data.createdAt);
    changetDate.textContent = formatDate(data.updatedAt);
    changetTime.textContent = formatTime(data.updatedAt);

    clientEdite.append(editeSpiner);
    clientDelete.append(deleteSpiner);
    clientFullName.append(clientLastName, clientName, clientSurname);
    clientCreated.append(createdDate, createdTime);
    clientChanget.append(changetDate, changetTime);
    clientActions.append(clientEdite, clientDelete);
    clientTr.append(
        clientIdTd,
        clientFullName,
        clientCreated,
        clientChanget,
        clientContact,
        clientActions
    );

    return clientTr;

}