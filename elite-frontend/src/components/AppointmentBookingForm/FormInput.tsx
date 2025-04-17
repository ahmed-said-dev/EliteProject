import React from 'react';
import styles from '../../../styles/components/AppointmentBookingForm.module.css';

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  activeLabel?: boolean;
  placeholder?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  label,
  type = 'text',
  required = false,
  activeLabel = false,
  placeholder
}) => {
  return (
    <div className={styles.formFloating}>
      <input
        id={id}
        className={styles.formControl}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder || label}
        {...(activeLabel ? { className: `${styles.formControl} ${styles.activeInput}` } : {})}
      />
      <label 
        htmlFor={id}
        {...(activeLabel ? { className: styles.activeLabel } : {})}
      >
        {label}
      </label>
    </div>
  );
};
