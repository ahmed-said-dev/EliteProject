import React from 'react';
import styles from '../styles/ContactForm.module.css';

const ContactForm: React.FC = () => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formBody}>
        <div className={styles.sectionHead}>
          <h2 className={styles.title}>Contact Form</h2>
        </div>
        
        <form className={styles.dzForm} action="../assets/script/contact_smtp.php" method="POST">
          <input 
            className={styles.formControl} 
            name="dzToDo" 
            type="hidden" 
            defaultValue="Contact" 
          />
          <input 
            className={styles.formControl} 
            name="reCaptchaEnable" 
            type="hidden" 
            defaultValue="0" 
          />
          
          <div className={styles.dzFormMsg}></div>
          
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <div className={styles.formFloating}>
                <input
                  id="inputName"
                  className={styles.formControl}
                  name="dzName"
                  type="text"
                  placeholder="Name"
                />
                <label htmlFor="inputName">Name</label>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <div className={styles.formFloating}>
                <input
                  id="inputPhoneNumber"
                  className={styles.formControl}
                  name="dzPhoneNumber"
                  type="text"
                />
                <label htmlFor="inputPhoneNumber">Phone Number</label>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <div className={styles.formFloating}>
                <input
                  id="inputEmail"
                  className={styles.formControl}
                  name="dzEmail"
                  type="email"
                  placeholder="Email"
                />
                <label htmlFor="inputEmail">Email</label>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <div className={styles.formFloating}>
                <textarea
                  id="inputMessage"
                  className={styles.formControl}
                  name="dzMessage"
                  rows={6}
                  placeholder="Message"
                />
                <label htmlFor="inputMessage">Message</label>
              </div>
            </div>
            
            <div className={styles.formSubmit}>
              <button
                className={styles.submitButton}
                name="submit"
                type="submit"
                value="submit"
              >
                Submit
                <span className={styles.rightIcon}>
                  <i className="feather icon-arrow-right" />
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
