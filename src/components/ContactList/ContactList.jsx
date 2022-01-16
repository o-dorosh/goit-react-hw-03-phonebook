import PropTypes from 'prop-types';

import s from './ContactList.module.css';

const ContactList = ({ visibleContacts, onDelete }) => {
  return (
    <ul>
      {visibleContacts.map(contact => {
        return (
          <li className={s.list__item} key={contact.id}>
            {contact.name}: {contact.number}
            <button className={s.del__btn} onClick={() => onDelete(contact.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  visibleContacts: PropTypes.array,
  onDelete: PropTypes.func,
};

export default ContactList;
