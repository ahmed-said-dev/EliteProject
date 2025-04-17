import React from 'react';
import styles from '../../../styles/components/AppointmentBookingForm.module.css';

interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  name,
  label,
  rows = 4,
  required = false,
  placeholder
}) => {
  return (
    <div className={styles.formFloating}>
      <textarea
        id={id}
        className={styles.formControl}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder || label}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
