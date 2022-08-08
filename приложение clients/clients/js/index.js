import { createClintsHeader } from "./createHeader.js";
import { createClintsSection } from "./createClientsSection.js";
import { getClients } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";
import { sortTable } from "./sortClientTable.js";
import { serchClients } from "./serchClient.js";

const createApp = async () => {
    const header = createClintsHeader();
    const ClientsSection = createClintsSection();
    document.body.append(header, ClientsSection.main);
    const preloader = document.querySelector('.preloader');

    try {
        const clients = await getClients();
        serchClients(clients);
        
        for (const client of clients) {
            document.querySelector('.clients__tbody').append(createClientItem(client))
        }
    } catch (error) {
        console.log(error);
    } finally {
        setTimeout(() => preloader.remove(), 1000);
    };
}

createApp();
document.addEventListener('DOMContentLoaded', sortTable);