export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  iconName: 'door-open' | 'ring' | 'camera' | 'utensils' | 'music' | 'sparkles';
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  alt: string;
}

export interface WeddingTheme {
  id: 'royal-gold' | 'rose-gold' | 'sage-emerald' | 'midnight-gold';
  name: string;
  primary: string;
  accent: string;
  bgLight: string;
  cardBg: string;
  border: string;
  waxColor: string;
}

export interface WeddingConfig {
  brideName: string;
  groomName: string;
  brideFamily: string;
  groomFamily: string;
  ceremonyType: string; // e.g. "مراسم پیوند آسمانی و عقد"
  dateSolar: string; // e.g. "پنج‌شنبه، ۲۴ مهر ۱۴۰۵"
  dateGregorian: string; // e.g. "15 October 2026"
  targetISODate: string; // for countdown timer
  timeRange: string; // e.g. "ساعت ۱۸:۰۰ الی ۲۳:۰۰"
  venueName: string;
  venueAddress: string;
  city: string;
  googleMapsUrl: string;
  neshanUrl: string;
  baladUrl: string;
  wazeUrl: string;
  poem: string;
  poemPoet: string;
  invitationMessage: string;
  dressCodeTitle: string;
  dressCodeDescription: string;
  dressCodeColors: string[];
  tips: string[];
  schedule: ScheduleItem[];
  photos: GalleryPhoto[];
  themeId: WeddingTheme['id'];
  contactPhone?: string;
  audioUrl?: string;
}

export interface RSVPResponse {
  id: string;
  guestName: string;
  status: 'attending' | 'declined';
  adultsCount: number;
  childrenCount: number;
  message: string;
  submittedAt: string;
}

export interface GuestLinkData {
  prefix: string;
  name: string;
  slug: string;
  url: string;
  whatsappUrl: string;
  telegramUrl: string;
  smsUrl: string;
}
