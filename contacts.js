// contacts.js
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, '/db/contacts.json');
 
// TODO: задокументувати кожну функцію
async function listContacts() {
    // ...твій код. Повертає масив контактів.
    try {
        const contacts = await fs.readFile(contactsPath, 'utf-8');
        // console.log(contacts);
        return JSON.parse(contacts);
    } catch (error) {
        console.log(error)
    }
}

async function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    try {
        const contacts = await listContacts()
    return contacts.find(con => con.id === contactId) || null;
    } catch (error) {
        console.log(error);
    }
    
}



async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    try {
        const contacts = await listContacts()
        const index = contacts.findIndex(con => con.id === contactId);
        if (index === -1) {
            return null;
}
        const [deleted] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        console.log(contacts);
        return deleted;
        
    } catch (error) {
        console.log(error)
    }
}

async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту. 
    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone
        }
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}