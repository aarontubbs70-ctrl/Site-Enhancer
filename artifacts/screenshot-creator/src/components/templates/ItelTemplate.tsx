import { ScreenshotConfig } from "@/types/screenshot";
import {
  AndroidSignal, AndroidWifi, AndroidBattery,
  AndroidPhone, AndroidMessage, AndroidVideo,
  AndroidBack, AndroidPencil, AndroidPerson, AndroidDots,
  AndroidIncomingCall, AndroidOutgoingCall, AndroidMissedCall,
  AndroidMic,
} from "@/components/icons/AndroidIcons";

interface Props { config: ScreenshotConfig }

const CALL_LABEL: Record<string, string> = {
  incoming: "Incoming Call",
  outgoing: "Outgoing Call",
  missed: "Missed Call",
};

function CallIcon({ type }: { type: string }) {
  if (type === "missed") return <AndroidMissedCall size={18} />;
  if (type === "outgoing") return <AndroidOutgoingCall color="#555" size={18} />;
  return <AndroidIncomingCall color="#555" size={18} />;
}

export function ItelTemplate({ config }: Props) {
  const initials = (config.avatarInitials || config.contactName.split(" ").map(n => n[0]).join("")).slice(0, 2).toUpperCase();
  const callColor = config.callType === "missed" ? "#e53935" : "#222";

  return (
    <div
      style={{
        width: 393, height: 852,
        backgroundColor: "#ffffff",
        fontFamily: "'Roboto', 'Google Sans', Arial, sans-serif",
        color: "#1a1a1a", position: "relative", overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Status Bar — white bg, dark text */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px 0", height: 50 }}>
        {/* Left: time + notification icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#111", fontVariantNumeric: "tabular-nums" }}>{config.time}</span>
          {/* WhatsApp */}
          <svg width="13" height="13" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#25D366"/><path d="M17.5 14.4c-.3-.15-1.7-.85-2-.95-.3-.1-.5-.15-.7.1-.2.25-.8 1-.95 1.2-.15.15-.3.2-.6.05-.3-.15-1.2-.45-2.3-1.4-.85-.75-1.4-1.65-1.6-1.95-.15-.3 0-.5.15-.6.1-.1.3-.3.4-.5.1-.15.15-.3.2-.5 0-.2-.65-1.65-.9-2.3-.25-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.7s1.15 3.15 1.3 3.35c.2.2 2.25 3.65 5.5 4.95 3.25 1.3 3.25.9 3.85.85.6-.05 1.9-.75 2.15-1.5.25-.75.25-1.4.2-1.55l-.5-.25z" fill="white"/></svg>
          {/* Pokémon-Go style P */}
          <span style={{ fontSize: 11, fontWeight: 700, color: "#e74c3c" }}>P</span>
          {/* TikTok music note */}
          <svg width="11" height="13" viewBox="0 0 11 13"><path d="M8 0v8.5a2.5 2.5 0 1 1-1.5-2.3V4.5A5.5 5.5 0 0 0 2 10a5 5 0 1 0 7.5-4.3V0H8z" fill="#111"/></svg>
          <span style={{ fontSize: 12, color: "#999" }}>•</span>
        </div>
        {/* Right: wifi, network, signal, battery */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <AndroidWifi strength={config.wifiConnected ? config.wifiStrength : 0} color="#333" />
          <span style={{ fontSize: 9, fontWeight: 800, color: "#333", letterSpacing: -0.3 }}>{config.networkType}</span>
          <span style={{ fontSize: 9, fontWeight: 800, color: "#333" }}>4G</span>
          <AndroidSignal bars={config.networkBars} color="#333" />
          <AndroidSignal bars={Math.max(0, config.networkBars - 1)} color="#333" />
          <AndroidBattery level={config.batteryLevel} charging={config.batteryCharging} color="#333" />
        </div>
      </div>

      {/* Top Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px 6px" }}>
        <AndroidBack size={24} color="#333" />
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <AndroidPencil size={20} color="#444" />
          <AndroidPerson size={22} color="#444" />
          <AndroidDots size={20} color="#444" />
        </div>
      </div>

      {/* Avatar */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <div style={{
          width: 108, height: 108, borderRadius: "50%",
          backgroundColor: config.avatarColor,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 3px 18px rgba(0,0,0,0.15)",
        }}>
          <span style={{ fontSize: 46, fontWeight: 700, color: "white" }}>{initials[0]}</span>
        </div>
      </div>

      {/* Contact Name */}
      <div style={{ textAlign: "center", marginTop: 14, padding: "0 24px" }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: "#111", letterSpacing: -0.4 }}>{config.contactName}</div>
        <div style={{ fontSize: 13, color: "#888", marginTop: 5, display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#aaa"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#aaa" strokeWidth="1.5" fill="none"/><path d="M3 9h18" stroke="#aaa" strokeWidth="1.5"/></svg>
          <span>Call with {config.sim} (default)</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#bbb"><path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z"/></svg>
        </div>
      </div>

      {/* Phone Number Row */}
      <div style={{ margin: "24px 20px 0", paddingBottom: 16, borderBottom: "1px solid #ebebeb" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 400, color: "#111", letterSpacing: 0.2 }}>{config.phoneNumber}</div>
            <div style={{ fontSize: 12, color: "#aaa", marginTop: 3 }}>Mobile</div>
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <AndroidPhone color="#555" size={22} />
              <div style={{ position: "absolute", top: -7, right: -9, backgroundColor: "#888", color: "white", borderRadius: "50%", width: 15, height: 15, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>2</div>
            </div>
            <AndroidMessage color="#555" size={22} />
            <AndroidVideo color="#555" size={22} />
          </div>
        </div>
      </div>

      {/* Menu rows */}
      {[
        { label: "Flash Call" },
        { label: "WhatsApp", arrow: true },
      ].map((item) => (
        <div key={item.label} style={{ padding: "17px 20px", borderBottom: "1px solid #f2f2f2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 16, color: "#111" }}>{item.label}</span>
          {item.arrow && <svg width="16" height="16" viewBox="0 0 24 24" fill="#ccc"><path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z"/></svg>}
        </div>
      ))}

      <div style={{ padding: "14px 20px", borderBottom: "1px solid #ebebeb", display: "flex", justifyContent: "center", alignItems: "center", gap: 4 }}>
        <span style={{ fontSize: 14, color: "#999" }}>See More</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#bbb"><path d="M7 10L12 15L17 10Z"/></svg>
      </div>

      <div style={{ padding: "17px 20px", borderBottom: "1px solid #f2f2f2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 16, color: "#111" }}>Call Recordings</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#ccc"><path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z"/></svg>
      </div>

      {/* Call Log header */}
      <div style={{ padding: "16px 20px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "#bbb", fontWeight: 500 }}>Call Log</span>
        <span style={{ fontSize: 13, color: "#1a73e8", fontWeight: 500 }}>Clear</span>
      </div>

      {/* Call Log entry */}
      <div style={{ padding: "10px 20px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <CallIcon type={config.callType} />
          <div>
            <div style={{ fontSize: 15, color: callColor, fontWeight: 500, marginBottom: 4 }}>{CALL_LABEL[config.callType]}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <AndroidPhone color="#bbb" size={11} />
              <span style={{ color: "#bbb", backgroundColor: "#f0f0f0", padding: "1px 5px", borderRadius: 3, fontSize: 10, fontWeight: 700 }}>HD</span>
              <span style={{ fontSize: 12, color: "#bbb" }}>{config.callTime}</span>
              <span style={{ fontSize: 12, color: config.callType === "missed" ? "#e53935" : "#bbb" }}>
                {config.callType === "missed" ? "Not connected" : config.callDuration}
              </span>
            </div>
          </div>
        </div>
        <span style={{ fontSize: 13, color: "#bbb" }}>{config.callDate}</span>
      </div>

      {/* Bottom Nav — Android 3-button */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 56,
        backgroundColor: "#fff", borderTop: "1px solid #eee",
        display: "flex", alignItems: "center", justifyContent: "space-around",
      }}>
        {/* Recents / hamburger */}
        <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
          <rect x="0" y="0" width="9" height="3" rx="1.5" fill="#666"/>
          <rect x="0" y="7.5" width="9" height="3" rx="1.5" fill="#666"/>
          <rect x="0" y="15" width="9" height="3" rx="1.5" fill="#666"/>
          <rect x="12" y="0" width="10" height="3" rx="1.5" fill="#666"/>
          <rect x="12" y="7.5" width="10" height="3" rx="1.5" fill="#666"/>
          <rect x="12" y="15" width="10" height="3" rx="1.5" fill="#666"/>
        </svg>
        {/* Home circle */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10.5" stroke="#666" strokeWidth="1.8"/>
        </svg>
        {/* Back */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="#666" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
