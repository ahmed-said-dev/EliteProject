import React from 'react';
import styles from '../styles/ContactHeading.module.css';

const ContactHeading: React.FC = () => {
  return (
    <div className={styles.sectionHead}>
      <h2 className={styles.title}>
        Connect with Us for<br />
        Your Pet's Healthcare Needs
      </h2>
      <p className={styles.description}>
        Have a question or concern? Need to schedule an appointment? Contact us today! Our dedicated team is ready to assist you.
      </p>
    </div>
  );
};

export default ContactHeading;
