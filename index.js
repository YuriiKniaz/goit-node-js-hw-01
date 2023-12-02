const contacts = require("./contacts.js")

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction ({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
          // ...
          const listContacts = await contacts.listContacts();
          console.table(listContacts);
      break;

    case 'get':
          // ... id
          const getContactById = await contacts.getContactById(id);
          console.table(getContactById);
      break;

    case 'add':
          // ... name email phone
          const addContact = await contacts.addContact(name, email, phone);
          console.table(addContact);
      break;

    case 'remove':
          // ... id
          const removeContact = await contacts.removeContact(id);
          console.table(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);