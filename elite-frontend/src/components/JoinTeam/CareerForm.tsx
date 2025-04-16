import React from "react";
import styles from "./JoinTeam.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function CareerForm() {
  const { locale, isRTL, t } = useLanguage();
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formBody}>
        <div className={styles.titleHead}>
          <h2 className={styles.formTitle}>
            {t('about.joinTeam.careerForm.title')} <span className={styles.highlightText}></span>
          </h2>
        </div>
        <form className={styles.applicationForm}>
          <div className={styles.formMsg} />
          <div className={styles.formRow}>
            <div className={styles.colFull}>
              <h4 className={styles.formSectionTitle}>
                <i className="fas fa-user me-2" />
                {t('about.joinTeam.careerForm.personal.title')}
              </h4>
            </div>
            <div className={styles.colFull}>
              <div className={styles.formField}>
                <input
                  id="inputFullName"
                  className={styles.formControl}
                  name="fullName"
                  type="text"
                  placeholder={t('about.joinTeam.careerForm.personal.fullName')}
                />
                <label htmlFor="inputFullName">{t('about.joinTeam.careerForm.personal.fullName')}</label>
              </div>
            </div>
            <div className={styles.colHalf}>
              <div className={styles.formField}>
                <input
                  id="inputEmail"
                  className={styles.formControl}
                  name="email"
                  type="email"
                  placeholder={t('about.joinTeam.careerForm.personal.email')}
                />
                <label htmlFor="inputEmail">{t('about.joinTeam.careerForm.personal.email')}</label>
              </div>
            </div>
            <div className={styles.colHalf}>
              <div className={styles.formField}>
                <input
                  id="inputPhone"
                  className={styles.formControl}
                  name="phone"
                  type="tel"
                  placeholder={t('about.joinTeam.careerForm.personal.phone')}
                />
                <label htmlFor="inputPhone">{t('about.joinTeam.careerForm.personal.phone')}</label>
              </div>
            </div>
            <div className={styles.colFull}>
              <h4 className={styles.formSectionTitle}>
                <i className="fas fa-briefcase me-2" />
                {t('about.joinTeam.careerForm.professional.title')}
              </h4>
            </div>
            <div className={styles.colHalf}>
              <div className={styles.formField}>
                <select
                  id="inputPosition"
                  className={styles.formControl}
                  name="position"
                >
                  <option>{t('about.joinTeam.careerForm.professional.position.placeholder')}</option>
                  <option value="Veterinarian">{t('about.joinTeam.careerForm.professional.position.options.veterinarian')}</option>
                  <option value="Vet Technician">{t('about.joinTeam.careerForm.professional.position.options.vetTechnician')}</option>
                  <option value="Vet Assistant">{t('about.joinTeam.careerForm.professional.position.options.vetAssistant')}</option>
                  <option value="Receptionist">{t('about.joinTeam.careerForm.professional.position.options.receptionist')}</option>
                </select>
                <label htmlFor="inputPosition" className={styles.active}>{t('about.joinTeam.careerForm.professional.position.label')}</label>
              </div>
            </div>
            <div className={styles.colHalf}>
              <div className={styles.formField}>
                <input
                  id="inputStartDate"
                  className={styles.formControl}
                  name="startDate"
                  type="date"
                />
                <label htmlFor="inputStartDate" className={styles.active}>{t('about.joinTeam.careerForm.professional.startDate')}</label>
              </div>
            </div>
            <div className={styles.colFull}>
              <div className={styles.formField}>
                <select
                  id="inputEducation"
                  className={styles.formControl}
                  name="education"
                >
                  <option>{t('about.joinTeam.careerForm.professional.education.placeholder')}</option>
                  <option value="High School">{t('about.joinTeam.careerForm.professional.education.options.highSchool')}</option>
                  <option value="Associate">{t('about.joinTeam.careerForm.professional.education.options.associate')}</option>
                  <option value="Bachelor">{t('about.joinTeam.careerForm.professional.education.options.bachelor')}</option>
                  <option value="Master">{t('about.joinTeam.careerForm.professional.education.options.master')}</option>
                  <option value="Doctorate">{t('about.joinTeam.careerForm.professional.education.options.doctorate')}</option>
                </select>
                <label htmlFor="inputEducation" className={styles.active}>{t('about.joinTeam.careerForm.professional.education.label')}</label>
              </div>
            </div>
            <div className={styles.colFull}>
              <div className={styles.formField}>
                <textarea
                  id="inputExperience"
                  className={styles.formControl}
                  name="experience"
                  rows={3}
                  placeholder={t('about.joinTeam.careerForm.professional.experience_placeholder')}
                ></textarea>
                <label htmlFor="inputExperience">{t('about.joinTeam.careerForm.professional.experience')}</label>
              </div>
            </div>
            <div className={styles.colFull}>
              <div className={styles.resumeUpload}>
                <label htmlFor="resumeUpload" className={styles.uploadLabel}>
                  <i className="fas fa-file-upload me-2" />
                  {t('about.joinTeam.careerForm.professional.resume')} (PDF/DOC)
                </label>
                <input
                  type="file"
                  id="resumeUpload"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  className={styles.fileInput}
                />
              </div>
            </div>
            <div className={styles.colFull}>
              <button type="submit" className={styles.btnSubmit}>
                <i className="fas fa-paper-plane me-2" />
                {t('about.joinTeam.careerForm.submit')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
