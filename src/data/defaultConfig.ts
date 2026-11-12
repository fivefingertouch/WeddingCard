import { WeddingConfig, WeddingTheme } from '../types/wedding';

// Reference generated luxury photography assets
import couplePortrait from '../assets/images/couple_wedding_portrait_1794473057396.jpg';
import sofrehDetails from '../assets/images/wedding_sofreh_details_1794473097159.jpg';
import weddingRings from '../assets/images/wedding_rings_hands_1794473071927.jpg';
import venueAmbient from '../assets/images/ceremony_venue_ambient_1794473084474.jpg';

export const WEDDING_THEMES: Record<WeddingTheme['id'], WeddingTheme> = {
  'royal-gold': {
    id: 'royal-gold',
    name: 'عاجی و طلایی کلاسیک',
    primary: '#9A7432',
    accent: '#D4AF37',
    bgLight: '#FAF7F2',
    cardBg: '#FFFFFF',
    border: '#E8DEC8',
    waxColor: '#A72D2D', // classic burgundy sealing wax
  },
  'rose-gold': {
    id: 'rose-gold',
    name: 'رزگلد رویایی',
    primary: '#A36868',
    accent: '#D99898',
    bgLight: '#FCF8F7',
    cardBg: '#FFFFFF',
    border: '#EED9D9',
    waxColor: '#964343',
  },
  'sage-emerald': {
    id: 'sage-emerald',
    name: 'سبز مریم‌گلی و زمردی',
    primary: '#47634F',
    accent: '#7FA88B',
    bgLight: '#F5F7F5',
    cardBg: '#FFFFFF',
    border: '#D2DDD4',
    waxColor: '#2C4A34',
  },
  'midnight-gold': {
    id: 'midnight-gold',
    name: 'شب لاجوردی و طلایی',
    primary: '#1B243B',
    accent: '#C9A96E',
    bgLight: '#F4F5F8',
    cardBg: '#FFFFFF',
    border: '#D1D7E4',
    waxColor: '#17223B',
  },
};

export const INITIAL_WEDDING_CONFIG: WeddingConfig = {
  brideName: 'ملیکا',
  groomName: 'میلاد',
  brideFamily: 'خانواده محترم کیانی',
  groomFamily: 'خانواده محترم صادقی',
  ceremonyType: 'جشن فرخنده عقد و آغاز زندگی مشترک',
  dateSolar: 'پنج‌شنبه، ۲۴ مهر ۱۴۰۵',
  dateGregorian: '15 October 2026',
  targetISODate: '2026-10-15T18:00:00',
  timeRange: 'ساعت ۱۸:۰۰ الی ۲۳:۰۰',
  venueName: 'باغ عمارت بهشت',
  venueAddress: 'تهران، منطقه لواسان، انتهای بلوار گلستان، عمارت مجلل بهشت',
  city: 'تهران',
  googleMapsUrl: 'https://maps.google.com/?q=35.8239,51.6212',
  neshanUrl: 'https://nshn.ir',
  baladUrl: 'https://balad.ir',
  wazeUrl: 'https://waze.com/ul',
  poem: 'در تلاقی نگاه و دل، ترانه یکی شدن را سرودیم\nتا در پناه مهر ایزدی، هم‌سفر جاده‌های بی‌پایان زندگی شویم...',
  poemPoet: 'مولانا',
  invitationMessage: 'حضور گرم و پرمهر شما در این بزم شادمانی، آغازگر پیوندمان با نور و برکت خواهد بود و خاطره این شب به یادماندنی را جاودانه خواهد کرد.',
  dressCodeTitle: 'تم و پوشش پیشنهادی',
  dressCodeDescription: 'به منظور هماهنگی و زیبایی هر چه بیشتر عکس‌های یادگاری، پالت رنگ‌های کرم، نباتی، پاستلی و سبز ملایم پیشنهاد می‌گردد.',
  dressCodeColors: ['#F5EBE0', '#D6CCC2', '#E3D5CA', '#CCD5AE', '#E9EDC9'],
  tips: [
    'مراسم دارای پارکینگ اختصاصی همراه با نگهبان می‌باشد.',
    'سالن دارای فضای اختصاصی برای بازی و استراحت کودکان است.',
    'لطفاً به دلیل برنامه‌ریزی پذیرایی و تشریفات، حضور یا عدم حضور خود را تا یک هفته پیش از مراسم ثبت فرمایید.',
  ],
  schedule: [
    {
      time: '۱۸:۰۰',
      title: 'پذیرش و خوش‌آمدگویی',
      description: 'ورود میهمانان گرامی، پذیرایی چای و شیرینی بار',
      iconName: 'door-open',
    },
    {
      time: '۱۹:۱۵',
      title: 'آیین باشکوه خطبه عقد',
      description: 'جاری شدن صیغه عقد در کنار سفره سنتی با عطر گلاب و اسپند',
      iconName: 'ring',
    },
    {
      time: '۲۰:۳۰',
      title: 'عکاسی یادگاری و شادباش',
      description: 'ثبت لحظات شیرین در کنار عروس و داماد و پذیرایی کوکتل میوه',
      iconName: 'camera',
    },
    {
      time: '۲۱:۳۰',
      title: 'ضیافت مجلل شام',
      description: 'پذیرایی شام سلف‌سرویس و بریدن کیک پیوند',
      iconName: 'utensils',
    },
    {
      time: '۲۳:۰۰',
      title: 'بدرقه میهمانان گرامی',
      description: 'پایان مراسم با آرزوی روزهایی پر از شادی برای همگی',
      iconName: 'sparkles',
    },
  ],
  photos: [
    {
      id: 'photo-1',
      url: couplePortrait,
      caption: 'نگاه تو، شروع داستانی زیباست',
      alt: 'پرتره عروس و داماد',
    },
    {
      id: 'photo-2',
      url: sofrehDetails,
      caption: 'سفره سپید عقد با عطر گل‌ها و نور آینه',
      alt: 'سفره عقد مجلل با آینه و شمعدان',
    },
    {
      id: 'photo-3',
      url: weddingRings,
      caption: 'حلقه زرین، نشان پیوند دو روح و یک دل',
      alt: 'حلقه و دست‌های در هم تنیده عروس و داماد',
    },
    {
      id: 'photo-4',
      url: venueAmbient,
      caption: 'باغ عمارت در ضیافت نور و شادمانی',
      alt: 'فضای نورانی باغ تالار مراسم',
    },
  ],
  themeId: 'royal-gold',
  contactPhone: '۰۹۱۲۰۰۰۰۰۰۰',
};

// Initial mock RSVPs to show guest wishes wall right away
export const INITIAL_RSVPS = [
  {
    id: 'rsvp-1',
    guestName: 'خانواده محترم دکتر کمالی',
    status: 'attending' as const,
    adultsCount: 3,
    childrenCount: 0,
    message: 'پیوندتان مبارک و فرخنده باد! ان‌شاءالله روزهایی سراسر سلامتی، عشق و سعادت در کنارتان باشد.',
    submittedAt: '۲ ساعت پیش',
  },
  {
    id: 'rsvp-2',
    guestName: 'سپیده و مهران عزیزم',
    status: 'attending' as const,
    adultsCount: 2,
    childrenCount: 1,
    message: 'خیلی خوشحال شدیم از شنیدن این خبر قشنگ، با تمام وجود کنارتون خواهیم بود و لحظه‌شماری می‌کنیم برای این جشن زیبا.',
    submittedAt: 'دیروز',
  },
  {
    id: 'rsvp-3',
    guestName: 'مهندس رضایی و بانو',
    status: 'attending' as const,
    adultsCount: 2,
    childrenCount: 0,
    message: 'آغاز فصل تازه زندگی‌تان خجسته باد، آرزوی خوشبختی و موفقیت روزافزون داریم برای شما دو عزیز.',
    submittedAt: '۳ روز پیش',
  },
];
