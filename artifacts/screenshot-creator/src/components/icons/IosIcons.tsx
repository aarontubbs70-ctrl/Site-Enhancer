export function IosSignal({ bars, color = "white" }: { bars: number; color?: string }) {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
      {[
        { x: 0, h: 3 }, { x: 4, h: 5 }, { x: 8, h: 7.5 }, { x: 12, h: 10 }, { x: 16, h: 12 },
      ].map(({ x, h }, i) => (
        <rect key={i} x={x} y={12 - h} width="2" height={h} rx="1"
          fill={i < bars ? color : `${color}40`} />
      ))}
    </svg>
  );
}

export function IosWifi({ strength, color = "white" }: { strength: number; color?: string }) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M8 9.5C8.83 9.5 9.5 10.17 9.5 11S8.83 12.5 8 12.5 6.5 11.83 6.5 11 7.17 9.5 8 9.5Z"
        fill={strength >= 1 ? color : `${color}40`} />
      <path d="M4.3 7.3C5.3 6.3 6.6 5.7 8 5.7s2.7.6 3.7 1.6"
        stroke={strength >= 2 ? color : `${color}40`} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M1.4 4.4C3.1 2.7 5.4 1.7 8 1.7s4.9 1 6.6 2.7"
        stroke={strength >= 3 ? color : `${color}40`} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function IosBattery({ level, charging, color = "white" }: { level: number; charging: boolean; color?: string }) {
  const fillColor = level <= 20 ? "#ff3b30" : color;
  const fillW = Math.max(1, ((level / 100) * 20));
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
      <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke={color} strokeOpacity="0.5" />
      <rect x="2" y="2" width={fillW} height="9" rx="2" fill={fillColor} />
      <path d="M23.5 4.5V8.5C24.6 8.2 25.5 7.2 25.5 6S24.6 3.8 23.5 4.5Z" fill={color} fillOpacity="0.4" />
      {charging && (
        <text x="11" y="10" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">⚡</text>
      )}
    </svg>
  );
}

export function IosMsgIcon({ color = "white" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill={color} />
    </svg>
  );
}

export function IosCallIcon({ color = "white" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill={color} />
    </svg>
  );
}

export function IosVideoIcon({ color = "white" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z" fill={color} />
    </svg>
  );
}

export function IosMailIcon({ color = "white" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill={color} />
    </svg>
  );
}

export function IosChevronLeft({ color = "white", size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill={color} />
    </svg>
  );
}

export function IosChevronRight({ color = "white", size = 18 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z" fill={color} />
    </svg>
  );
}

export function IosClockIcon({ color = "white", size = 26 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth="1.8" />
      <path d="M12 7V12.5L15.5 15" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IosPersonIcon({ color = "white", size = 26 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke={color} strokeWidth="1.8" />
      <path d="M4 20C4 16.69 7.58 14 12 14S20 16.69 20 20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IosKeypadIcon({ color = "white", size = 26 }: { color?: string; size?: number }) {
  const dots = [
    [5, 5], [12, 5], [19, 5],
    [5, 12], [12, 12], [19, 12],
    [5, 19], [12, 19], [19, 19],
    [12, 24],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 24 28" fill="none">
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2" fill={color} />
      ))}
    </svg>
  );
}

export function IosSearchIcon({ color = "white", size = 26 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="10" cy="10" r="6.5" stroke={color} strokeWidth="1.8" />
      <path d="M15.5 15.5L20 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IosIncomingArrow({ color = "white", size = 14 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M20 5.41L18.59 4L7 15.59V9H5V19H15V17H8.41L20 5.41Z" fill={color} />
    </svg>
  );
}

export function IosOutgoingArrow({ color = "white", size = 14 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 18.59L5.41 20L17 8.41V15H19V5H9V7H15.59L4 18.59Z" fill={color} />
    </svg>
  );
}
