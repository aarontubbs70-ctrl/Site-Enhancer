export function AndroidSignal({ bars, color = "#333" }: { bars: number; color?: string }) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      {[
        { x: 0, h: 3 }, { x: 3.5, h: 5 }, { x: 7, h: 7.5 }, { x: 10.5, h: 10 },
      ].map(({ x, h }, i) => (
        <rect key={i} x={x} y={12 - h} width="2.5" height={h} rx="1"
          fill={i < bars ? color : `${color}30`} />
      ))}
    </svg>
  );
}

export function AndroidWifi({ strength, color = "#333" }: { strength: number; color?: string }) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M8 8.5C8.83 8.5 9.5 9.17 9.5 10S8.83 11.5 8 11.5 6.5 10.83 6.5 10 7.17 8.5 8 8.5Z"
        fill={strength >= 1 ? color : `${color}30`} />
      <path d="M4.7 6.1C5.6 5.2 6.75 4.7 8 4.7s2.4.5 3.3 1.4"
        stroke={strength >= 2 ? color : `${color}30`} strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M2 3.5C3.6 1.9 5.7 1 8 1s4.4.9 6 2.5"
        stroke={strength >= 3 ? color : `${color}30`} strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function AndroidBattery({ level, charging, color = "#333" }: { level: number; charging: boolean; color?: string }) {
  const fillColor = level <= 15 ? "#ff3b30" : "#4cd964";
  const fillW = Math.max(1, ((level / 100) * 18));
  return (
    <svg width="28" height="13" viewBox="0 0 28 13" fill="none">
      <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke={color} strokeOpacity="0.6" />
      <rect x="2" y="2" width={fillW} height="9" rx="1.5" fill={fillColor} />
      <path d="M23.5 4V9C24.8 8.5 25.5 7.3 25.5 6.5S24.8 4.5 23.5 4Z" fill={color} fillOpacity="0.5" />
      {charging && <path d="M10 4L8 7H11L9 11" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

export function AndroidPhone({ color = "#333", size = 22 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" />
    </svg>
  );
}

export function AndroidMessage({ color = "#333", size = 22 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" />
    </svg>
  );
}

export function AndroidVideo({ color = "#333", size = 22 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z" />
    </svg>
  );
}

export function AndroidBack({ color = "#333", size = 22 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" />
    </svg>
  );
}

export function AndroidPencil({ color = "#333", size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" />
    </svg>
  );
}

export function AndroidPerson({ color = "#333", size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 12C14.21 12 16 10.21 16 8S14.21 4 12 4 8 5.79 8 8 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
    </svg>
  );
}

export function AndroidDots({ color = "#333", size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  );
}

export function AndroidIncomingCall({ color = "#666", size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M20 5.41L18.59 4L7 15.59V9H5V19H15V17H8.41L20 5.41Z" />
      <path d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51" stroke={color} strokeWidth="0.5" fill="none" />
    </svg>
  );
}

export function AndroidOutgoingCall({ color = "#666", size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M4 18.59L5.41 20L17 8.41V15H19V5H9V7H15.59L4 18.59Z" />
    </svg>
  );
}

export function AndroidMissedCall({ color = "#ff3b30", size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M20 5.41L18.59 4L7 15.59V9H5V19H15V17H8.41L20 5.41Z" />
    </svg>
  );
}

export function AndroidMic({ color = "#999", size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2S9 3.34 9 5V11C9 12.66 10.34 14 12 14ZM11 5C11 4.45 11.45 4 12 4S13 4.45 13 5V11C13 11.55 12.55 12 12 12S11 11.55 11 11V5ZM17 11C17 13.76 14.76 16 12 16S7 13.76 7 11H5C5 14.53 7.61 17.43 11 17.92V21H13V17.92C16.39 17.43 19 14.53 19 11H17Z" />
    </svg>
  );
}

export function AndroidStar({ color = "#888", size = 22 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}

export function AndroidShare({ color = "#888", size = 22 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12S8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5S19.66 2 18 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12S4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.91 18 21.91S20.92 20.61 20.92 19C20.92 17.4 19.61 16.08 18 16.08Z" />
    </svg>
  );
}

export function AndroidMoreVert({ color = "#888", size = 22 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  );
}

export function AndroidNavHome({ color = "#888", size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="3" y="10" width="18" height="2" rx="1" fill={color} />
      <rect x="7" y="10" width="10" height="2" rx="1" fill={color} />
      <circle cx="12" cy="18" r="3.5" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function AndroidNavMenu({ color = "#888", size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <rect x="3" y="5.5" width="3" height="3" rx="0.5" />
      <rect x="3" y="10.5" width="3" height="3" rx="0.5" />
      <rect x="3" y="15.5" width="3" height="3" rx="0.5" />
      <rect x="8" y="5.5" width="3" height="3" rx="0.5" />
      <rect x="8" y="10.5" width="3" height="3" rx="0.5" />
      <rect x="8" y="15.5" width="3" height="3" rx="0.5" />
      <rect x="13" y="5.5" width="3" height="3" rx="0.5" />
      <rect x="13" y="10.5" width="3" height="3" rx="0.5" />
      <rect x="13" y="15.5" width="3" height="3" rx="0.5" />
    </svg>
  );
}
