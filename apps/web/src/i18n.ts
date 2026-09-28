import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  th: {
    translation: {
      header: {
        announcement: 'เปิดทุกวัน 09:00 – 18:00 · ปิดทุกวันพุธ',
        menu: 'เมนู',
        workshops: 'เวิร์กช็อป',
        visit: 'การเดินทาง',
        admin: 'ระบบจัดการ',
      },
      hero: {
        location: 'มัทฉะสโลว์บาร์ · บางแค, กรุงเทพฯ',
        headlineLine1: 'มัทฉะ,',
        headlineLine2: 'อย่างละเมียดละไม.',
        desc: 'พื้นที่สงบสไตล์ญี่ปุ่นที่ถูกหล่อหลอมด้วยศิลปะการชงชาแบบสายน้ำ สวนมอส บันไดวน และลานทรายเซนให้คุณได้พักผ่อน',
        exploreMenu: 'ดูเมนู',
        visitUs: 'การเดินทาง',
        since: 'ตั้งแต่ปี 2024',
        bangkok: 'บางแค, กรุงเทพฯ',
        accent: 'ศิลปะการชงชา & สวนเซน',
      },
      menu: {
        showing: 'แสดง',
        curated: 'รายการ',
        chooseBalance: '/ เลือกระดับความหวาน',
      },
      workshops: {
        titleLine1: 'ดื่มมัทฉะ,',
        titleLine2: 'สร้างงานศิลปะ, รับแรงบันดาลใจ.',
        desc: 'เปิดประสบการณ์งานศิลปะอย่างมีสติในสวนญี่ปุ่นของเรา เปิดสอนทุกวัน (หยุดทุกวันพุธ)',
      },
      visit: {
        title: 'Safe-fu House, Bang Khae.',
        desc: 'หลีกหนีความวุ่นวาย มาสัมผัสประสบการณ์ดื่มมัทฉะและงานศิลปะแบบ Japanese Zen',
        openNow: 'เปิดให้บริการ',
        closedNow: 'ปิดทำการ',
        address: '672 ซอยเพชรเกษม 94 แขวงบางแคเหนือ เขตบางแค กรุงเทพฯ 10160',
        phone: '081 622 2111',
        getDirections: 'ขอเส้นทาง',
        callUs: 'โทรหาเรา',
      },
      footer: {
        desc: 'มัทฉะสโลว์บาร์สไตล์ญี่ปุ่นในบางแค สัมผัสการชงชาแบบสายน้ำ สวนมอส และลานทรายเซน',
        navigate: 'นำทาง',
        community: 'ชุมชน',
        contact: 'ติดต่อ',
        rights: 'Safe-fu House. สงวนลิขสิทธิ์.',
        tagline: 'Matcha, slowly.',
      }
    }
  },
  en: {
    translation: {
      header: {
        announcement: 'Open daily 09:00 – 18:00 · Closed every Wednesday',
        menu: 'Menu',
        workshops: 'Workshops',
        visit: 'Visit',
        admin: 'Admin Portal',
      },
      hero: {
        location: 'Matcha Slow Bar · Bang Khae, Bangkok',
        headlineLine1: 'Matcha,',
        headlineLine2: 'slowly.',
        desc: 'A tranquil Japanese sanctuary shaped by water-flow preparation, moss garden, spiral staircase, and meditative zen sand garden.',
        exploreMenu: 'Explore menu',
        visitUs: 'Visit us',
        since: 'Since 2024',
        bangkok: 'Bang Khae, Bangkok',
        accent: 'Water-flow preparation & Zen garden',
      },
      menu: {
        showing: 'Showing',
        curated: 'curated offerings',
        chooseBalance: '/ Choose your balance',
      },
      workshops: {
        titleLine1: 'Sip matcha,',
        titleLine2: 'make art, feel inspired.',
        desc: 'Explore mindful art sessions in our Japanese courtyard. Sessions available daily (Closed every Wednesday).',
      },
      visit: {
        title: 'Safe-fu House, Bang Khae.',
        desc: 'Escape the city and experience Japanese Zen through matcha and mindful art.',
        openNow: 'Open Now',
        closedNow: 'Closed',
        address: '672 Phetkasem 94, Bang Khae Nuea, Bang Khae, Bangkok 10160',
        phone: '081 622 2111',
        getDirections: 'Get Directions',
        callUs: 'Call Us',
      },
      footer: {
        desc: 'A Japanese-style matcha slow bar in Bang Khae. Water-flow preparation, moss garden, and zen sand garden.',
        navigate: 'Navigate',
        community: 'Community',
        contact: 'Contact',
        rights: 'Safe-fu House. All rights reserved.',
        tagline: 'Matcha, slowly.',
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'th',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;
