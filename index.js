const { Command } = require("commander");
const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contactsList = await contacts.listContacts();
            console.table(contactsList);
            break;

        case "get":
            const oneContact = await contacts.getContactById(id);
            console.log(oneContact);
            break;

        case "add":
            const newContact = await contacts.addContact(name, email, phone);
            console.log(newContact);
            break;

        case "remove":
            const deleteContact = await contacts.removeContact(id);
            console.log(deleteContact);
            break;

        case "update":
            const updateContact = await contacts.updateContact(id, name, email, phone);
            console.log(updateContact);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

const start = async (argv) => {
    try {
        await invokeAction(argv);
    } catch (error) {
        console.log(error);
    }
};
start(argv);