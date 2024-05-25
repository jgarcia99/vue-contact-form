import { defineStore } from 'pinia';

export const useContactStore = defineStore('contactStore', {
  state: () => ({
    contacts: [],
  }),
  actions: {
    addContact(contact) {
      this.contacts.push(contact);
    },
    updateContact(updatedContact) {
      const index = this.contacts.findIndex(
        (contact) => contact.id === updatedContact.id
      );
      if (index !== -1) {
        this.contacts.splice(index, 1, updatedContact);
      }
    },
    deleteContact(id) {
      this.contacts = this.contacts.filter((contact) => contact.id !== id);
    },
  },
});
