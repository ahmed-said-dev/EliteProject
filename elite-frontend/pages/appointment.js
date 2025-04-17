import { Section } from '@/components/ui/Section';
import { AppointmentForm } from '@/features/appointments/AppointmentForm';
import PageBanner from '@/components/PageBanner/PageBanner';
import { AppointmentIntro } from '@/components/AppointmentIntro';
import { AppointmentBookingForm } from '@/components/AppointmentBookingForm';
import { EmergencyCare } from '@/components/EmergencyCare';
import { SectionDivider } from '@/components/SectionDivider';
import { EmergencyOutro } from '@/components/EmergencyOutro';

export default function Appointment() {
  return (
    <main>
      <PageBanner 
        title="Book Appointment"
        backgroundImage="https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
      />
      <AppointmentIntro />
      {/* <SectionDivider icon="fas fa-calendar-check" color="#7c58d3" /> */}
      <AppointmentBookingForm />
      <EmergencyCare />
      <SectionDivider 
        icon="fas fa-heart-pulse" 
        topColor="#6242A1" 
        bottomColor="#430D4E" 
      />
      <EmergencyOutro />

    </main>
  );
}
