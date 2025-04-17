import React from 'react';
import styles from '../../../styles/components/AppointmentBookingForm.module.css';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { FormTextarea } from './FormTextarea';

export const AppointmentFormContent = () => {
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
            <FormInput
              id="inputOwnerName"
              name="ownerName"
              label="Pet Owner's Name"
              required
            />
          </div>
          <div className={styles.colHalf}>
            <FormInput
              id="inputPetName"
              name="petName"
              label="Pet's Name"
              required
            />
          </div>
          <div className={styles.colHalf}>
            <FormSelect
              name="petType"
              label="Pet Type"
              options={[
                { value: 'Dog', label: 'Dog' },
                { value: 'Cat', label: 'Cat' },
                { value: 'Bird', label: 'Bird' },
                { value: 'Rabbit', label: 'Rabbit' },
                { value: 'Hamster', label: 'Hamster' },
                { value: 'Other', label: 'Other' }
              ]}
              required
            />
          </div>
          <div className={styles.colHalf}>
            <FormInput
              id="inputPetAge"
              name="petAge"
              label="Pet's Age"
            />
          </div>
          <div className={styles.colHalf}>
            <FormSelect
              name="serviceType"
              label="Service Type"
              options={[
                { value: 'Regular Checkup', label: 'Regular Checkup' },
                { value: 'Vaccination', label: 'Vaccination' },
                { value: 'Dental Care', label: 'Dental Care' },
                { value: 'Grooming', label: 'Grooming' },
                { value: 'Surgery', label: 'Surgery' },
                { value: 'Emergency', label: 'Emergency Care' }
              ]}
              required
            />
          </div>
          <div className={styles.colHalf}>
            <FormInput
              id="inputPhoneNumber"
              name="phoneNumber"
              label="Contact Number"
              type="tel"
              required
            />
          </div>
          <div className={styles.colHalf}>
            <FormInput
              id="inputDate"
              name="appointmentDate"
              label="Preferred Date"
              type="date"
              required
              activeLabel
            />
          </div>
          <div className={styles.colHalf}>
            <FormInput
              id="inputTime"
              name="appointmentTime"
              label="Preferred Time"
              type="time"
              required
              activeLabel
            />
          </div>
          <div className={styles.colFull}>
            <FormTextarea
              id="inputSymptoms"
              name="symptoms"
              label="Symptoms or Reason for Visit"
              rows={4}
            />
          </div>
          <div className={styles.colFull}>
            <button className={styles.submitButton} name="submit" type="submit" value="submit">
              {"Schedule Appointment"}
              <span className={styles.rightIcon}>
                <i className="feather icon-arrow-right" />
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
