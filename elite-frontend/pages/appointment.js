import { Section } from '@/components/ui/Section';
import { AppointmentForm } from '@/features/appointments/AppointmentForm';
import PageBanner from '@/components/PageBanner/PageBanner';
import { AppointmentIntro } from '@/components/AppointmentIntro';
import { AppointmentBookingForm } from '@/components/AppointmentBookingForm';

export default function Appointment() {
  return (
    <main>
      <PageBanner 
        title="Book Appointment"
        backgroundImage="/images/banner/bnr1.webp"
      />
      <AppointmentIntro />
      <AppointmentBookingForm />

    </main>
  );
}
