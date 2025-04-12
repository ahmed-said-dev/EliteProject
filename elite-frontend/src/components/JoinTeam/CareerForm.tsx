import React from "react";
import styles from "./JoinTeam.module.css";

export default function CareerForm() {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formBody}>
        <div className={styles.titleHead}>
          <h2 className={styles.formTitle}>
            Career <span className={styles.highlightText}>Application</span>
          </h2>
        </div>
        <form className={styles.applicationForm}>
          <div className={styles.formMsg} />
          <div className={styles.formRow}>
            <div className={styles.colFull}>
              <h4 className={styles.formSectionTitle}>
                <i className="fas fa-user me-2" />
                Personal Information
              </h4>
            </div>
            <div className={styles.colFull}>
              <div className={styles.formField}>
                <input
                  id="inputFullName"
                  className={styles.formControl}
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                />
                <label htmlFor="inputFullName">Full Name</label>
              </div>
            </div>
            <div className={styles.colHalf}>
              <div className={styles.formField}>
                <input
                  id="inputEmail"
                  className={styles.formControl}
                  name="email"
                  type="email"
                  placeholder="Email Address"
                />
                <label htmlFor="inputEmail">Email Address</label>
              </div>
            </div>
            <div className={styles.colHalf}>
              <div className={styles.formField}>
                <input
                  id="inputPhone"
                  className={styles.formControl}
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                />
                <label htmlFor="inputPhone">Phone Number</label>
              </div>
            </div>
            <div className={styles.colFull}>
              <h4 className={styles.formSectionTitle}>
                <i className="fas fa-briefcase me-2" />
                Professional Information
              </h4>
            </div>
            <div className={styles.colHalf}>
              <div className={styles.formField}>
                <select
                  id="inputPosition"
                  className={styles.formControl}
                  name="position"
                >
                  <option>Select Position</option>
                  <option value="Veterinarian">Veterinarian</option>
                  <option value="Vet Technician">Veterinary Technician</option>
                  <option value="Vet Assistant">Veterinary Assistant</option>
                  <option value="Receptionist">Receptionist</option>
                </select>
                <label htmlFor="inputPosition" className={styles.active}>Desired Position</label>
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
                <label htmlFor="inputStartDate" className={styles.active}>Available Start Date</label>
              </div>
            </div>
            <div className={styles.colFull}>
              <div className={styles.formField}>
                <select
                  id="inputEducation"
                  className={styles.formControl}
                  name="education"
                >
                  <option>Select Education Level</option>
                  <option value="High School">High School Diploma</option>
                  <option value="Associate">Associate Degree</option>
                  <option value="Bachelor">Bachelor's Degree</option>
                  <option value="DVM">Doctor of Veterinary Medicine</option>
                  <option value="Other">Other Certification</option>
                </select>
                <label htmlFor="inputEducation" className={styles.active}>Education Level</label>
              </div>
            </div>
            <div className={styles.colFull}>
              <div className={styles.formField}>
                <textarea
                  id="inputExperience"
                  className={styles.formControl}
                  name="experience"
                  rows={3}
                  placeholder="Briefly describe your experience and why you'd like to join our team"
                ></textarea>
                <label htmlFor="inputExperience">Experience & Motivation</label>
              </div>
            </div>
            <div className={styles.colFull}>
              <div className={styles.resumeUpload}>
                <label htmlFor="resumeUpload" className={styles.uploadLabel}>
                  <i className="fas fa-file-upload me-2" />
                  Upload Resume (PDF/DOC)
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
                Submit Application
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
