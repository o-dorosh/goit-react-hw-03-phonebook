import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import Form from '../Form/Form';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import NoContacts from '../NoContacts/NoContacts';

import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    let contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts) {
      this.setState({ contacts: contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = ({ name, number }) => {
    const isDublicate = this.state.contacts.some(
      contact =>
        name.toLowerCase() === contact.name.toLowerCase() ||
        number === contact.number,
    );

    if (isDublicate) {
      alert(`Contact with such ${name} or ${number} is already in Phonebook`);
      return;
    }

    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    this.setState(({ contacts }) => {
      return {
        contacts: [newContact, ...contacts],
      };
    });
  };

  filterContacts = ({ currentTarget: { value: filter } }) => {
    this.setState({
      filter,
    });
  };

  findContacts = () => {
    const { contacts, filter } = this.state;
    const filterToLowerCase = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filterToLowerCase),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const visibleContacts = this.findContacts();
    const filter = this.state.filter;
    const contacts = this.state.contacts;

    return (
      <>
        <h1 className={s.main__title}>Phonebook</h1>
        <Form onSubmit={this.formSubmitHandler} />

        <h2 className={s.secondary__title}>Contacts</h2>

        {contacts.length > 1 && (
          <Filter filter={filter} onChange={this.filterContacts} />
        )}

        {contacts.length === 0 && <NoContacts text={'added'} />}

        {visibleContacts.length > 0 && (
          <ContactList
            visibleContacts={visibleContacts}
            onDelete={this.deleteContact}
          />
        )}

        {visibleContacts.length === 0 && contacts.length > 0 && (
          <NoContacts text={'found'} />
        )}
      </>
    );
  }
}

export default App;
