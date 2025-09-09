import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaw, 
  faBone,
  faCat,
  faDog,
  faFish,
  faStethoscope,
  faHeartbeat,
  faMedkit
} from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/components/AuthPageDecorations.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function AuthPageDecorations() {
  const { isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <>
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none" dir={dir}>
        <div className={styles.floatingIcon} style={{ top: '10%', left: '5%', animationDuration: '6s' }}>
          <FontAwesomeIcon icon={faPaw} className="text-purple-200 text-4xl" />
        </div>
        <div className={styles.floatingIcon} style={{ top: '15%', right: '8%', animationDuration: '8s' }}>
          <FontAwesomeIcon icon={faBone} className="text-purple-200 text-3xl" />
        </div>
        <div className={styles.floatingIcon} style={{ bottom: '20%', left: '7%', animationDuration: '7s' }}>
          <FontAwesomeIcon icon={faDog} className="text-purple-200 text-4xl" />
        </div>
        <div className={styles.floatingIcon} style={{ bottom: '15%', right: '5%', animationDuration: '9s' }}>
          <FontAwesomeIcon icon={faCat} className="text-purple-200 text-3xl" />
        </div>
        <div className={styles.floatingIcon} style={{ top: '40%', left: '12%', animationDuration: '10s' }}>
          <FontAwesomeIcon icon={faFish} className="text-purple-200 text-2xl" />
        </div>
        <div className={styles.floatingIcon} style={{ top: '30%', right: '15%', animationDuration: '7.5s' }}>
          <FontAwesomeIcon icon={faStethoscope} className="text-purple-200 text-3xl" />
        </div>
        <div className={styles.floatingIcon} style={{ bottom: '35%', right: '10%', animationDuration: '8.5s' }}>
          <FontAwesomeIcon icon={faHeartbeat} className="text-purple-200 text-3xl" />
        </div>
        <div className={styles.floatingIcon} style={{ bottom: '25%', left: '15%', animationDuration: '9.5s' }}>
          <FontAwesomeIcon icon={faMedkit} className="text-purple-200 text-2xl" />
        </div>
      </div>
      
      {/* Background circular decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-100 rounded-full opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100 rounded-full opacity-50 transform translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/4 right-0 w-40 h-40 bg-purple-100 rounded-full opacity-30 transform translate-x-1/3"></div>
      <div className="absolute bottom-1/3 left-10 w-24 h-24 bg-purple-100 rounded-full opacity-30"></div>
    </>
  );
}
