import PropTypes from 'prop-types';



const NoContacts = ({ text }) => {
  return (
    <div >No contacts {text}</div>
  );
};

NoContacts.propTypes = {
  text: PropTypes.string,
};

export default NoContacts;
