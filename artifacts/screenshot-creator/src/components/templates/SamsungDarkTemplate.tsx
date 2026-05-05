import { ScreenshotConfig } from "@/types/screenshot";
import {
  AndroidSignal, AndroidWifi, AndroidBattery,
  AndroidPhone, AndroidMessage, AndroidVideo,
  AndroidBack, AndroidIncomingCall, AndroidOutgoingCall,
  AndroidMissedCall, AndroidMic, AndroidStar, AndroidPencil,
  AndroidShare, AndroidMoreVert,
} from "@/components/icons/AndroidIcons";

interface Props { config: ScreenshotConfig }

type CallEntry = { time: string; duration: string; type: "incoming" | "outgoing" | "missed" };

function CallIcon({ type }: { type: string }) {
  if (type === "missed")   return <AndroidMissedCall  size={19} color="#ff6b6b" />;
  if (type === "outgoing") return <AndroidOutgoingCall color="rgba(255,255,255,0.55)" size={19} />;
  return <AndroidIncomingCall color="rgba(255,255,255,0.55)" size={19} />;
}

const CALL_LABEL: Record<string, string> = {
  incoming: "Incoming call",
  outgoing: "Outgoing call",
  missed:   "Missed call",
};

/* Samsung One UI Dark color palette */
const BG    = "#1c1c1e";
const CARD  = "#2c2c2e";
const CARD2 = "#3a3a3c";
const TEXT  = "rgba(255,255,255,0.9)";
const DIM   = "rgba(255,255,255,0.4)";
const DIV   = "rgba(255,255,255,0.07)";

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : "150,180,220";
}

export function SamsungDarkTemplate({ config }: Props) {
  const todayCalls: CallEntry[] = [
    { time: config.callTime, duration: config.callDuration, type: config.callType as CallEntry["type"] },
    ...(config.showSecondCall
      ? [{ time: config.secondCallTime, duration: config.secondCallDuration, type: config.secondCallType as CallEntry["type"] }]
      : []),
  ];

  const CallRow = ({ entry, last }: { entry: CallEntry; last: boolean }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: last ? "none" : `1px solid ${DIV}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <CallIcon type={entry.type} />
        <div>
          <div style={{ fontSize: 16, color: entry.type === "missed" ? "#ff6b6b" : TEXT, fontWeight: 400, fontVariantNumeric: "tabular-nums" }}>{entry.time}</div>
          <div style={{ fontSize: 12, color: entry.type === "missed" ? "#ff6b6b" : DIM, marginTop: 2 }}>
            {entry.type === "missed" ? "Missed call" : `${CALL_LABEL[entry.type]}${entry.duration ? `, ${entry.duration}` : ""}`}
          </div>
        </div>
      </div>
      <AndroidMic color="rgba(255,255,255,0.2)" size={20} />
    </div>
  );

  return (
    <div style={{ width: 393, height: 852, backgroundColor: BG, fontFamily: "'Samsung One','Roboto','Google Sans',sans-serif", color: TEXT, position: "relative", overflow: "hidden", userSelect: "none" }}>

      {/* Status Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px 0", height: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: TEXT, fontVariantNumeric: "tabular-nums" }}>{config.time}</span>
          <svg width="12" height="14" viewBox="0 0 12 14"><path d="M6 1a4 4 0 0 0-4 4v4l-1.5 1.5v.5h11v-.5L10 9V5A4 4 0 0 0 6 1zm0 13a2 2 0 0 0 2-2H4a2 2 0 0 0 2 2z" fill="rgba(255,255,255,0.5)"/></svg>
          <svg width="13" height="13" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#25D366"/><path d="M17.5 14.4c-.3-.15-1.7-.85-2-.95-.3-.1-.5-.15-.7.1-.2.25-.8 1-.95 1.2-.15.15-.3.2-.6.05-.3-.15-1.2-.45-2.3-1.4-.85-.75-1.4-1.65-1.6-1.95-.15-.3 0-.5.15-.6.1-.1.3-.3.4-.5.1-.15.15-.3.2-.5 0-.2-.65-1.65-.9-2.3-.25-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.7s1.15 3.15 1.3 3.35c.2.2 2.25 3.65 5.5 4.95 3.25 1.3 3.25.9 3.85.85.6-.05 1.9-.75 2.15-1.5.25-.75.25-1.4.2-1.55l-.5-.25z" fill="white"/></svg>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <AndroidWifi strength={config.wifiConnected ? config.wifiStrength : 0} color="rgba(255,255,255,0.7)" />
          <span style={{ fontSize: 8, fontWeight: 800, color: DIM, letterSpacing: -0.3 }}>VoL</span>
          <span style={{ fontSize: 8, fontWeight: 800, color: DIM }}>LTE</span>
          <AndroidSignal bars={config.networkBars} color="rgba(255,255,255,0.7)" />
          <AndroidBattery level={config.batteryLevel} charging={config.batteryCharging} color="rgba(255,255,255,0.7)" />
          <span style={{ fontSize: 10, fontWeight: 600, color: config.batteryLevel <= 15 ? "#ff6b6b" : DIM, marginLeft: 1 }}>{config.batteryLevel}%</span>
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding: "8px 16px 4px" }}>
        <AndroidBack size={22} color="rgba(255,255,255,0.6)" />
      </div>

      {/* Avatar */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
        <div style={{
          width: 110, height: 110, borderRadius: "50%",
          background: `radial-gradient(circle at 38% 32%, rgba(100,140,200,0.7) 0%, rgba(60,90,160,0.55) 35%, rgba(${hexToRgb(config.avatarColor)},0.45) 65%, rgba(40,60,120,0.5) 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)", overflow: "hidden",
        }}>
          <svg width="42" height="36" viewBox="0 0 42 36" fill="none">
            <rect x="1.5" y="8" width="39" height="26" rx="4.5" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="rgba(255,255,255,0.1)"/>
            <circle cx="21" cy="21" r="8" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="rgba(255,255,255,0.08)"/>
            <circle cx="21" cy="21" r="4" fill="rgba(255,255,255,0.25)"/>
            <rect x="14" y="2" width="14" height="8" rx="2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.1)"/>
            <circle cx="33" cy="13" r="2.5" fill="rgba(255,255,255,0.5)"/>
          </svg>
        </div>
      </div>

      {/* Name */}
      <div style={{ textAlign: "center", marginTop: 14, padding: "0 24px" }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: TEXT, letterSpacing: -0.4 }}>{config.contactName}</div>
        <div style={{ fontSize: 14, color: DIM, marginTop: 5 }}>{config.phoneNumber}</div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", backgroundColor: "#1db954", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 16px rgba(29,185,84,0.45)" }}>
            <AndroidPhone color="white" size={26} />
          </div>
          <span style={{ fontSize: 10, color: DIM, fontWeight: 500 }}>HD</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", backgroundColor: "#1e88e5", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 16px rgba(30,136,229,0.45)" }}>
            <AndroidMessage color="white" size={26} />
          </div>
          <span style={{ fontSize: 10, color: DIM }}> </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", backgroundColor: "#1db954", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 16px rgba(29,185,84,0.45)" }}>
            <AndroidVideo color="white" size={26} />
          </div>
          <span style={{ fontSize: 10, color: DIM }}> </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ margin: "16px 20px 0", height: 1, backgroundColor: DIV }} />
      <div style={{ textAlign: "center", padding: "12px 0", fontSize: 14, color: "#5ba4f5", fontWeight: 400 }}>View contact details</div>

      {/* Call Log Card */}
      <div style={{ margin: "8px 14px 0", backgroundColor: CARD, borderRadius: 14, padding: "4px 16px 0", boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
        <div style={{ padding: "12px 0 8px" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: DIM, letterSpacing: 0.3 }}>Today</span>
        </div>
        {todayCalls.map((entry, i) => (
          <CallRow key={i} entry={entry} last={false} />
        ))}

        <div style={{ padding: "12px 0 8px", borderTop: `1px solid ${DIV}` }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: DIM, letterSpacing: 0.3 }}>Yesterday</span>
        </div>
        <CallRow entry={{ time: "8:08 pm", duration: "", type: "missed" }} last={false} />
        <CallRow entry={{ time: "8:06 pm", duration: "", type: "missed" }} last={true} />

        <div style={{ padding: "12px 0 8px", borderTop: `1px solid ${DIV}` }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: DIM, letterSpacing: 0.3 }}>Sunday, 26 April</span>
        </div>
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 68, backgroundColor: CARD2, borderTop: `1px solid ${DIV}`, display: "flex", alignItems: "center", justifyContent: "space-around", paddingBottom: 8 }}>
        <AndroidStar color="rgba(255,255,255,0.45)" size={22} />
        <AndroidPencil color="rgba(255,255,255,0.45)" size={20} />
        <AndroidShare color="rgba(255,255,255,0.45)" size={22} />
        <AndroidMoreVert color="rgba(255,255,255,0.45)" size={22} />
      </div>
    </div>
  );
}
