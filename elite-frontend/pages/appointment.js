import { Section } from '@/components/ui/Section';
import { AppointmentForm } from '@/features/appointments/AppointmentForm';

export default function Appointment() {
  return (
    <main>
      <Section bgColor="bg-purple-600" className="text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">حجز موعد</h1>
          <p className="text-xl max-w-2xl mx-auto">
            احجز موعدك مع أطبائنا المتخصصين لتقديم أفضل رعاية لحيوانك الأليف
          </p>
        </div>
      </Section>

      <Section>
        <AppointmentForm />
      </Section>
    </main>
  );
}
