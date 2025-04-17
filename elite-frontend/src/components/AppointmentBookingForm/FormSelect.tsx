import React from 'react';
import styles from '../../../styles/components/AppointmentBookingForm.module.css';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  required = false,
}) => {
  return (
    <div className={styles.formFloating}>
      <div className={styles.selectWrapper}>
        <select
          className={styles.formSelect}
          name={name}
          required={required}
          title={label}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className={styles.selectPlaceholder}>{label}</div>
      </div>
      <label>{label}</label>
    </div>
  );
};
