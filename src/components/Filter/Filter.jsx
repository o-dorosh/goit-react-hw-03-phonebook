import PropTypes from 'prop-types';

import s from './Filter.module.css';

const Filter = ({ filter, onChange }) => {
  return (
    <label className={s.filter}>
      Find contacts by name:
      <input className={s.filter__input} value={filter} onChange={onChange} />
    </label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;
