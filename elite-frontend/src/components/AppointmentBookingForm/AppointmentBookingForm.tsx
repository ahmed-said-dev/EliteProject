import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from '../../../styles/components/AppointmentBookingForm.module.css';

// تعريف مكون AppointmentFormContent مباشرة لتجنب مشاكل الاستيراد
const AppointmentFormContent = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.formBody}>
      <div className={styles.titleHead}>
        <h2 className={styles.formTitle}>
          {t('appointment.title.schedule')}
          <span className={styles.highlight}>{t('appointment.title.petsVisit')}</span> <br />
          {t('appointment.title.book')}
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
              <label htmlFor="inputOwnerName">{t('appointment.form.ownerName.label')}</label>
              <input
                id="inputOwnerName"
                className={styles.formControl}
                name="ownerName"
                type="text"
                required
                placeholder={t('appointment.form.ownerName.placeholder')}
              />
            </div>
          </div>
          <div className={styles.colHalf}>
            <div className={styles.inputGroup}>
              <label htmlFor="inputPetName">{t('appointment.form.petName.label')}</label>
              <input
                id="inputPetName"
                className={styles.formControl}
                name="petName"
                type="text"
                required
                placeholder={t('appointment.form.petName.placeholder')}
              />
            </div>
          </div>
          <div className={styles.colHalf}>
            <div className={styles.inputGroup}>
              <label htmlFor="petType">{t('appointment.form.petType.label')}</label>
              <select
                id="petType"
                className={styles.formSelect}
                name="petType"
                required
              >
                <option value="">{t('appointment.form.petType.placeholder')}</option>
                <option value="Dog">{t('appointment.form.petType.options.dog')}</option>
                <option value="Cat">{t('appointment.form.petType.options.cat')}</option>
                <option value="Bird">{t('appointment.form.petType.options.bird')}</option>
                <option value="Rabbit">{t('appointment.form.petType.options.rabbit')}</option>
                <option value="Hamster">{t('appointment.form.petType.options.hamster')}</option>
                <option value="Other">{t('appointment.form.petType.options.other')}</option>
              </select>
            </div>
          </div>
          <div className={styles.colHalf}>
            <div className={styles.inputGroup}>
              <label htmlFor="inputPetAge">{t('appointment.form.petAge.label')}</label>
              <input
                id="inputPetAge"
                className={styles.formControl}
                name="petAge"
                type="text"
                placeholder={t('appointment.form.petAge.placeholder')}
              />
            </div>
          </div>
          <div className={styles.colHalf}>
            <div className={styles.inputGroup}>
              <label htmlFor="serviceType">{t('appointment.form.serviceType.label')}</label>
              <select
                id="serviceType"
                className={styles.formSelect}
                name="serviceType"
                required
              >
                <option value="">{t('appointment.form.serviceType.placeholder')}</option>
                <option value="Regular Checkup">{t('appointment.form.serviceType.options.checkup')}</option>
                <option value="Vaccination">{t('appointment.form.serviceType.options.vaccination')}</option>
                <option value="Dental Care">{t('appointment.form.serviceType.options.dental')}</option>
                <option value="Grooming">{t('appointment.form.serviceType.options.grooming')}</option>
                <option value="Surgery">{t('appointment.form.serviceType.options.surgery')}</option>
                <option value="Emergency">{t('appointment.form.serviceType.options.emergency')}</option>
              </select>
            </div>
          </div>
          <div className={styles.colHalf}>
            <div className={styles.inputGroup}>
              <label htmlFor="inputPhoneNumber">{t('appointment.form.contact.label')}</label>
              <input
                id="inputPhoneNumber"
                className={styles.formControl}
                name="phoneNumber"
                type="tel"
                required
                placeholder={t('appointment.form.contact.placeholder')}
              />
            </div>
          </div>
          <div className={styles.colHalf}>
            <div className={styles.inputGroup}>
              <label htmlFor="inputDate">{t('appointment.form.date.label')}</label>
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
              <label htmlFor="inputTime">{t('appointment.form.time.label')}</label>
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
              <label htmlFor="inputSymptoms">{t('appointment.form.symptoms.label')}</label>
              <textarea
                id="inputSymptoms"
                className={styles.formControl}
                name="symptoms"
                rows={4}
                placeholder={t('appointment.form.symptoms.placeholder')}
              />
            </div>
          </div>
          <div className={styles.colFull}>
            <button className={styles.submitButton} name="submit" type="submit" value="submit">
              {t('appointment.form.submit')}
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
  const { t } = useLanguage();
  
  return (
    <section id="appointment-form" className={styles.bookingSection}>
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
                {t('appointment.sideText')}
              </div>
              <AppointmentFormContent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
