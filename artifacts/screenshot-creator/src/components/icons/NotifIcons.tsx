/** Notification icon pool — rendered in status bars across templates */

export type NotifIconId =
  | "whatsapp" | "tiktok" | "instagram" | "facebook" | "twitter"
  | "gmail" | "snapchat" | "telegram" | "youtube" | "spotify"
  | "netflix" | "chrome" | "bell" | "message";

interface Props { id: NotifIconId; size?: number; color?: string }

export function NotifIcon({ id, size = 13, color = "#555" }: Props) {
  const s = size;
  switch (id) {
    case "whatsapp":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="11" fill="#25D366"/>
          <path d="M17.5 14.4c-.3-.15-1.7-.85-2-.95-.3-.1-.5-.15-.7.1-.2.25-.8 1-.95 1.2-.15.15-.3.2-.6.05-.3-.15-1.2-.45-2.3-1.4-.85-.75-1.4-1.65-1.6-1.95-.15-.3 0-.5.15-.6.1-.1.3-.3.4-.5.1-.15.15-.3.2-.5 0-.2-.65-1.65-.9-2.3-.25-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.7s1.15 3.15 1.3 3.35c.2.2 2.25 3.65 5.5 4.95 3.25 1.3 3.25.9 3.85.85.6-.05 1.9-.75 2.15-1.5.25-.75.25-1.4.2-1.55l-.5-.25z" fill="white"/>
        </svg>
      );
    case "tiktok":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="6" fill="#010101"/>
          <path d="M19 9.5a5.5 5.5 0 0 1-3.5-1.2V14a5 5 0 1 1-4-4.9V11.2a2.9 2.9 0 1 0 2 2.8V5h2a3.5 3.5 0 0 0 3.5 3.5v1z" fill="white"/>
        </svg>
      );
    case "instagram":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <defs>
            <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433"/>
              <stop offset="25%" stopColor="#e6683c"/>
              <stop offset="50%" stopColor="#dc2743"/>
              <stop offset="75%" stopColor="#cc2366"/>
              <stop offset="100%" stopColor="#bc1888"/>
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="url(#ig)"/>
          <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
          <circle cx="17" cy="7" r="1.2" fill="white"/>
        </svg>
      );
    case "facebook":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="6" fill="#1877F2"/>
          <path d="M15 8h-2a1 1 0 0 0-1 1v2h3l-.5 3H12v7h-3v-7H7v-3h2V9a4 4 0 0 1 4-4h2v3z" fill="white"/>
        </svg>
      );
    case "twitter":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="6" fill="#000"/>
          <path d="M5 5l5.5 7.5L5 19h2l4.2-5.7L15 19h4l-5.8-7.9L18.5 5h-2l-3.9 5.3L9 5H5z" fill="white"/>
        </svg>
      );
    case "gmail":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4" fill="white"/>
          <path d="M4 7h16v10H4z" fill="white" stroke="#ddd" strokeWidth="0.5"/>
          <path d="M4 7l8 6 8-6" stroke="#EA4335" strokeWidth="1.5" fill="none"/>
          <path d="M4 7v10" stroke="#34A853" strokeWidth="1.5"/>
          <path d="M20 7v10" stroke="#FBBC04" strokeWidth="1.5"/>
          <rect x="0" y="0" width="24" height="24" rx="4" fill="none" stroke="#eee" strokeWidth="0.5"/>
        </svg>
      );
    case "snapchat":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="6" fill="#FFFC00"/>
          <path d="M12 4C9.5 4 8 5.8 8 8v1.5c-.5.1-1.5.4-1.5.9 0 .4.4.6.8.8-.1.2-.5.9-1.3.9-.3 0-.5.1-.5.3 0 .4 1 .8 1.5 1.2 0 .1.1.2.3.3.5.3 1 .6 1.4 1.2.2.3.3.6 0 1-.2.4-.8.6-1.2.7-.2 0-.4.1-.4.3 0 .3.5.5.9.6.5.1.7.3.7.5s-.3.4-.5.5c-.2 0-.3.2-.3.3 0 .4.8.7 1.7.7 1 0 1.6-.4 2.9-.4s1.9.4 2.9.4c.9 0 1.7-.3 1.7-.7 0-.1-.1-.3-.3-.3-.2-.1-.5-.3-.5-.5s.2-.4.7-.5c.4-.1.9-.3.9-.6 0-.2-.2-.3-.4-.3-.4-.1-1-.3-1.2-.7-.3-.4-.2-.7 0-1 .4-.6.9-.9 1.4-1.2.2-.1.3-.2.3-.3.5-.4 1.5-.8 1.5-1.2 0-.2-.2-.3-.5-.3-.8 0-1.2-.7-1.3-.9.4-.2.8-.4.8-.8 0-.5-1-.8-1.5-.9V8c0-2.2-1.5-4-4-4z" fill="#1a1a1a"/>
        </svg>
      );
    case "telegram":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#229ED9"/>
          <path d="M5.5 11.5l12-4.5-1.5 9-3.5-3-2 1.5.5-3.5-5.5.5z" fill="white"/>
          <path d="M13.5 14l-2-2 4.5-4" fill="none" stroke="white" strokeWidth="0.5"/>
        </svg>
      );
    case "youtube":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="5" fill="#FF0000"/>
          <path d="M10 9l6 3-6 3V9z" fill="white"/>
        </svg>
      );
    case "spotify":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#1DB954"/>
          <path d="M7 9.5c2.8-1 6.5-.8 9 .8M7.5 12c2.4-.8 5.5-.6 7.5.6M8.5 14.5c1.8-.5 3.8-.3 5.5.4" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        </svg>
      );
    case "netflix":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4" fill="#000"/>
          <path d="M7 4v16l3.5-9.5L14 20V4h3v16l-3.5-9.5L10 20V4H7z" fill="#E50914"/>
        </svg>
      );
    case "chrome":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#4285F4"/>
          <circle cx="12" cy="12" r="4.5" fill="white"/>
          <circle cx="12" cy="12" r="3" fill="#4285F4"/>
          <path d="M12 7.5h9a12 12 0 0 0-15.6-4.5L9.8 9" stroke="#EA4335" strokeWidth="0" fill="#EA4335"/>
          <path d="M20.7 8H12l-2.2 3.8" fill="#FBBC04"/>
          <path d="M3.3 8A12 12 0 0 0 7 21l4.5-7.8" fill="#34A853"/>
        </svg>
      );
    case "bell":
      return (
        <svg width={s} height={s} viewBox="0 0 14 16">
          <path d="M7 1a4 4 0 0 0-4 4v4L1.5 10.5V11h11v-.5L11 9V5A4 4 0 0 0 7 1zm0 15a2 2 0 0 0 2-2H5a2 2 0 0 0 2 2z" fill={color}/>
        </svg>
      );
    case "message":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="6" fill="#34C759"/>
          <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H7l-4 3V6a1 1 0 0 1 1-1z" fill="white"/>
        </svg>
      );
    default:
      return null;
  }
}

export const NOTIF_ICON_POOL: NotifIconId[] = [
  "whatsapp", "tiktok", "instagram", "facebook", "twitter",
  "gmail", "telegram", "youtube", "spotify", "snapchat",
  "netflix", "chrome", "message",
];

export function pickRandomNotifIcons(count = 2): NotifIconId[] {
  const shuffled = [...NOTIF_ICON_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
