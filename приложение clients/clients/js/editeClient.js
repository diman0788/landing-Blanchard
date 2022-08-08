import { sendClientData } from "./clientsApi.js";
import { createContactItem } from "./createContact.js";
import { deleteClientModal } from "./createDeleteModal.js";
import { createClietsForm } from "./createModalForm.js";
import { validateClientContact } from "./validateContact.js";
import { validateClientForm } from "./validateForm.js";
import { createClientItem } from "./createClientItem.js";

export const editeModalClient = (data) => {
    const editeModal = document.createElement('div');
    const editeModalContent = document.createElement('div');
    const titelId = document.createElement('span');
    const createForm = createClietsForm();

    titelId.classList.add('modal__id');
    editeModal.classList.add('edite-modal', 'site-modal', 'modal-active');
    editeModalContent.classList.add('edite-modal__content', 'site-modal__content', 'modal-active');

    titelId.textContent = 'ID:' + data.id.substr(-6);
    createForm.modalTitel.textContent = 'Изменить данные';
    createForm.cancelBtn.textContent = 'Удалить клиента';

    createForm.cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const deleteModal = deleteClientModal();
        document.body.append(deleteModal.deleteModal);

        import('./clientsApi.js').then(({ deleteClientItem }) => {
            deleteModal.deleteModalDelete.addEventListener('click', () => {
                try {
                    deleteModal.deleteSpiner.style.display = 'block'
                    setTimeout(() => {
                        deleteClientItem(data.id);
                        document.getElementById(data.id).remove();
                        deleteModal.deleteModal.remove();
                        document.querySelector('.edite-modal').remove();
                    }, 1500)
                } catch (error) {
                    console.log(error)
                } finally {
                    setTimeout(() => {
                        deleteModal.deleteSpiner.style.display = 'none';
                    }, 1500)
                }
            })
        })
    });

    createForm.modalClose.addEventListener('click', () => {
        editeModal.remove();
    });

    createForm.inputLastName.value = data.lastName;
    createForm.inputName.value = data.name;
    createForm.inputSurname.value = data.surname;

    for (const contact of data.contacts) {
        const createContact = createContactItem();

        createContact.contactName.textContent = contact.type;
        createContact.contactInput.value = contact.value;

        createForm.contactsBlock.prepend(createContact.contact);
        createForm.contactsBlock.style.backgroundColor = 'var(--color-athens-gray)';
    }

    if (data.contacts.length == 10) {
        createForm.addContactBtn.classList.remove('modal__btn-contact--active')
    };

    createForm.form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateClientForm()) {
            return;
        }

        const contactType = document.querySelectorAll('.contact__name');
        const contactValue = document.querySelectorAll('.contact__input');
        let contacts = [];
        let client = {};

        for (let i = 0; i < contactType.length; i++) {
            if (!validateClientContact(contactType[i], contactValue[i])) {
                return;
            }
            contacts.push({
                type: contactType[i].innerHTML,
                value: contactValue[i].value,
            });
        }

        client.name = createForm.inputName.value;
        client.surname = createForm.inputSurname.value;
        client.lastName = createForm.inputLastName.value;
        client.contacts = contacts;

        const spiner = document.querySelector('.modal__spiner');

        try {
            spiner.style.display = 'block';
            const editeData = await sendClientData(client, 'PATCH', data.id);
            setTimeout(() => {
                document.getElementById(editeData.id).remove();
                document.querySelector('.clients__tbody').append(createClientItem(editeData));
                document.querySelector('.edite-modal').remove();
            }, 1500)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                spiner.style.display = 'none';
            }, 1500)
        }
    })

    window.document.addEventListener('click', (e) => {
        if (e.target == editeModal) {
        editeModal.remove();
    }
    })

    createForm.modalTitel.append(titelId);
    editeModalContent.append(createForm.modalClose, createForm.modalTitel, createForm.form);
    editeModal.append(editeModalContent);

    return {
        editeModal,
        editeModalContent,
    }
}