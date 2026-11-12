import { WeddingConfig } from '../types/wedding';

/**
 * Creates Google Calendar URL
 */
export function getGoogleCalendarUrl(config: WeddingConfig): string {
  const startDate = new Date(config.targetISODate);
  // Default duration 5 hours
  const endDate = new Date(startDate.getTime() + 5 * 60 * 60 * 1000);

  const formatTime = (d: Date) =>
    d.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const title = encodeURIComponent(`مراسم عقد و پیوند ${config.brideName} و ${config.groomName}`);
  const details = encodeURIComponent(
    `${config.ceremonyType}\n\n${config.invitationMessage}\n\nزمان: ${config.timeRange}\nمکان: ${config.venueName} - ${config.venueAddress}`
  );
  const location = encodeURIComponent(`${config.venueName}, ${config.venueAddress}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatTime(startDate)}/${formatTime(endDate)}&details=${details}&location=${location}`;
}

/**
 * Downloads an .ics calendar file for Apple Calendar, Outlook, and mobile native calendars
 */
export function downloadIcsFile(config: WeddingConfig): void {
  const startDate = new Date(config.targetISODate);
  const endDate = new Date(startDate.getTime() + 5 * 60 * 60 * 1000);

  const formatDate = (date: Date) => {
    return date
      .toISOString()
      .replace(/[-:]/g, '')
      .split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//Fa//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${startDate.getTime()}@wedding-invite.local`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:مراسم عقد ${config.brideName} و ${config.groomName}`,
    `DESCRIPTION:${config.ceremonyType} - ${config.invitationMessage}`,
    `LOCATION:${config.venueName}, ${config.venueAddress}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `Aghd-${config.brideName}-${config.groomName}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
