import React from 'react';
import styles from '../../../styles/components/AppointmentBookingForm.module.css';

// تعريف مكون AppointmentFormContent مباشرة لتجنب مشاكل الاستيراد
const AppointmentFormContent = () => {
  return (
    <div className={styles.formBody}>
      <div className={styles.titleHead}>
        <h2 className={styles.formTitle}>
          {"Schedule Your"}
          <span className={styles.highlight}>Pet's Visit</span> <br />
          {"Book an Appointment"}
        </h2>
      </div>
      <form className={styles.dzForm}>
        <input
          className={styles.formControl}
          name="dzToDo"
          type="hidden"
          defaultValue="PetAppointment"
        />
        <input
          className={styles.formControl}
          name="reCaptchaEnable"
          type="hidden"
          defaultValue="0"
        />
        <div className={styles.dzFormMsg} />
        <div className={styles.formRow}>
          <div className={styles.colHalf}>
            <div className={styles.inputGroup}>
              <label htmlFor="inputOwnerName">Pet Owner's Name</label>
              <input
                id="inputOwnerName"
                className={styles.formControl}
                name="ownerName"
                type="text"
                required
                placeholder="Pet Owner's Name"
              />
            </div>
          </div>
          <div className={styles.colHalf}>
            <div className={styles.inputGroup}>
              <label htmlFor="inputPetName">Pet's Name</label>
              <input
                id="inputPetName"
                className={styles.formControl}
                name="petName"
                type="text"
                required
                placeholder="Pet's Name"
              />
            </div>
          </div>
          <div className={styles.colHalf}>
            <div className={styles.inputGroup}>
              <label htmlFor="petType">Pet Type</label>
              <select
                id="petType"
                className={styles.formSelect}
                name="petType"
                required
              >
                <option value="">Select Pet Type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Hamster">Hamster</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className={styles.colHalf}>
            <div className={styles.inputGroup}>
              <label htmlFor="inputPetAge">Pet's Age</label>
              <input
                id="inputPetAge"
                className={styles.formControl}
                name="petAge"
                type="text"
                placeholder="Pet's Age"
              />
            </div>
          </div>
          <div className={styles.colHalf}>
            <div className={styles.inputGroup}>
              <label htmlFor="serviceType">Service Type</label>
              <select
                id="serviceType"
                className={styles.formSelect}
                name="serviceType"
                required
              >
                <option value="">Select Service</option>
                <option value="Regular Checkup">Regular Checkup</option>
                <option value="Vaccination">Vaccination</option>
                <option value="Dental Care">Dental Care</option>
                <option value="Grooming">Grooming</option>
                <option value="Surgery">Surgery</option>
                <option value="Emergency">Emergency Care</option>
              </select>
            </div>
          </div>
          <div className={styles.colHalf}>
            <div className={styles.inputGroup}>
              <label htmlFor="inputPhoneNumber">Contact Number</label>
              <input
                id="inputPhoneNumber"
                className={styles.formControl}
                name="phoneNumber"
                type="tel"
                required
                placeholder="Contact Number"
              />
            </div>
          </div>
          <div className={styles.colHalf}>
            <div className={styles.inputGroup}>
              <label htmlFor="inputDate">Preferred Date</label>
              <input
                id="inputDate"
                className={styles.formControl}
                name="appointmentDate"
                type="date"
                required
              />
            </div>
          </div>
          <div className={styles.colHalf}>
            <div className={styles.inputGroup}>
              <label htmlFor="inputTime">Preferred Time</label>
              <input
                id="inputTime"
                className={styles.formControl}
                name="appointmentTime"
                type="time"
                required
              />
            </div>
          </div>
          <div className={styles.colFull}>
            <div className={styles.inputGroup}>
              <label htmlFor="inputSymptoms">Symptoms or Reason for Visit</label>
              <textarea
                id="inputSymptoms"
                className={styles.formControl}
                name="symptoms"
                rows={4}
                placeholder="Symptoms or Reason for Visit"
              />
            </div>
          </div>
          <div className={styles.colFull}>
            <button className={styles.submitButton} name="submit" type="submit" value="submit">
              {"Schedule Appointment"}
              <span className={styles.rightIcon}>
                <i className="fas fa-arrow-right" />
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export const AppointmentBookingForm = () => {
  return (
    <section className={styles.bookingSection}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.colImage}>
            <img
              className={styles.petsImage}
              alt="Veterinary Pets"
              src="/appointment/img3.png"
            />
          </div>
          <div className={styles.colForm}>
            <div className={styles.formWrapper}>
              <div className={styles.textVertical}>
                Appointment Now
              </div>
              <AppointmentFormContent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
