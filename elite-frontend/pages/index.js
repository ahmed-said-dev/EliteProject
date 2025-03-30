import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import Header from '@/components/Header/Header';
import PageBanner from '@/components/PageBanner/PageBanner';
import Hero from '../src/components/Hero';
import Introduction from '@/components/Introduction';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Doctors from '@/components/Doctors';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <main>
        <Hero />
        <Introduction />
        <Services />
        <WhyChooseUs />
        <Doctors />
        <Partners />
        <Contact />
      </main>
    </>
  );
}
