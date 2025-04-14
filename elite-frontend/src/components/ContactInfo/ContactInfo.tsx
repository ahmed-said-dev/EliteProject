import React from 'react';
// @ts-ignore
import styles from './styles/ContactInfo.module.css';
import ContactHeading from './components/ContactHeading';
// @ts-ignore
import DoctorsInfo from './components/DoctorsInfo';
// @ts-ignore
import ContactBoxes from './components/ContactBoxes';
import ContactForm from './components/ContactForm';

const ContactInfo: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <ContactHeading />
        <DoctorsInfo />
        <ContactBoxes />
      </div>
      <div className={styles.rightColumn}>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactInfo;
