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
        backgroundImage="/appointment/pgbanner.jpg"
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
