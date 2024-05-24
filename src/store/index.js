import { defineStore } from 'pinia';

export const useContactStore = defineStore('contactStore', {
  state: () => ({
    contacts: [],
  }),
  actions: {
    addContact(contact) {
      this.contacts.push(contact);
    },
  },
});
