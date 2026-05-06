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
  if (type === "missed") return <AndroidMissedCall size={19} color="#e53935" />;
  if (type === "outgoing") return <AndroidOutgoingCall color="#666" size={19} />;
  return <AndroidIncomingCall color="#666" size={19} />;
}

const CALL_LABEL: Record<string, string> = {
  incoming: "Incoming call",
  outgoing: "Outgoing call",
  missed: "Missed call",
};

export function SamsungTemplate({ config }: Props) {
  const todayCalls: CallEntry[] = [
    { time: config.callTime, duration: config.callDuration, type: config.callType as CallEntry["type"] },
    ...(config.showSecondCall
      ? [{ time: config.secondCallTime, duration: config.secondCallDuration, type: config.secondCallType as CallEntry["type"] }]
      : []),
  ];

  const CallRow = ({ entry, last }: { entry: CallEntry; last: boolean }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: last ? "none" : "1px solid #f2f2f2" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <CallIcon type={entry.type} />
        <div>
          <div style={{ fontSize: 16, color: entry.type === "missed" ? "#e53935" : "#1a1a1a", fontWeight: 400, fontVariantNumeric: "tabular-nums" }}>{entry.time}</div>
          <div style={{ fontSize: 12, color: entry.type === "missed" ? "#e53935" : "#999", marginTop: 2 }}>
            {entry.type === "missed"
              ? "Missed call"
              : `${CALL_LABEL[entry.type]}${entry.duration ? `, ${entry.duration}` : ""}`}
          </div>
        </div>
      </div>
      <AndroidMic color="#d0d0d0" size={20} />
    </div>
  );

  return (
    <div
      style={{
        width: 393, height: 852,
        /* Samsung light grey — slightly warm */
        backgroundColor: "#f2f3f5",
        fontFamily: "'Samsung One', 'Roboto', 'Google Sans', sans-serif",
        color: "#1a1a1a", position: "relative", overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Status Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px 0", height: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#111", fontVariantNumeric: "tabular-nums" }}>{config.time}</span>
          {/* Notification icons */}
          <svg width="12" height="14" viewBox="0 0 12 14"><path d="M6 1a4 4 0 0 0-4 4v4l-1.5 1.5v.5h11v-.5L10 9V5A4 4 0 0 0 6 1zm0 13a2 2 0 0 0 2-2H4a2 2 0 0 0 2 2z" fill="#555"/></svg>
          <svg width="13" height="13" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#25D366"/><path d="M17.5 14.4c-.3-.15-1.7-.85-2-.95-.3-.1-.5-.15-.7.1-.2.25-.8 1-.95 1.2-.15.15-.3.2-.6.05-.3-.15-1.2-.45-2.3-1.4-.85-.75-1.4-1.65-1.6-1.95-.15-.3 0-.5.15-.6.1-.1.3-.3.4-.5.1-.15.15-.3.2-.5 0-.2-.65-1.65-.9-2.3-.25-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.7s1.15 3.15 1.3 3.35c.2.2 2.25 3.65 5.5 4.95 3.25 1.3 3.25.9 3.85.85.6-.05 1.9-.75 2.15-1.5.25-.75.25-1.4.2-1.55l-.5-.25z" fill="white"/></svg>
          <span style={{ fontSize: 12, color: "#888" }}>•</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <AndroidWifi strength={config.wifiConnected ? config.wifiStrength : 0} color="#444" />
          <span style={{ fontSize: 8, fontWeight: 800, color: "#444", letterSpacing: -0.3 }}>VoL</span>
          <span style={{ fontSize: 8, fontWeight: 800, color: "#444" }}>LTE</span>
          <AndroidSignal bars={config.networkBars} color="#444" />
          <AndroidBattery level={config.batteryLevel} charging={config.batteryCharging} color="#444" />
          <span style={{ fontSize: 10, fontWeight: 600, color: config.batteryLevel <= 15 ? "#e53935" : "#444", marginLeft: 1 }}>{config.batteryLevel}%</span>
        </div>
      </div>

      {/* Nav Bar */}
      <div style={{ padding: "8px 16px 4px" }}>
        <AndroidBack size={22} color="#333" />
      </div>

      {/* Avatar — Samsung blurred gradient style */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
        <div style={{
          width: 110, height: 110, borderRadius: "50%",
          background: `
            radial-gradient(circle at 38% 32%, rgba(190,220,255,0.9) 0%, rgba(160,200,240,0.75) 35%, rgba(${hexToRgb(config.avatarColor)},0.5) 65%, rgba(220,235,250,0.6) 100%)
          `,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 18px rgba(100,140,200,0.2)",
          overflow: "hidden",
        }}>
          {/* Camera icon SVG */}
          <svg width="42" height="36" viewBox="0 0 42 36" fill="none">
            <rect x="1.5" y="8" width="39" height="26" rx="4.5" stroke="rgba(255,255,255,0.75)" strokeWidth="2" fill="rgba(255,255,255,0.18)"/>
            <circle cx="21" cy="21" r="8" stroke="rgba(255,255,255,0.75)" strokeWidth="2" fill="rgba(255,255,255,0.12)"/>
            <circle cx="21" cy="21" r="4" fill="rgba(255,255,255,0.35)"/>
            <rect x="14" y="2" width="14" height="8" rx="2.5" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" fill="rgba(255,255,255,0.18)"/>
            <circle cx="33" cy="13" r="2.5" fill="rgba(255,255,255,0.7)"/>
          </svg>
        </div>
      </div>

      {/* Contact Name */}
      <div style={{ textAlign: "center", marginTop: 14, padding: "0 24px" }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#111", letterSpacing: -0.4 }}>{config.contactName}</div>
        <div style={{ fontSize: 14, color: "#999", marginTop: 5 }}>{config.phoneNumber}</div>
      </div>

      {/* Action Buttons — Samsung green + blue */}
      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20 }}>
        {/* Call - green */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", backgroundColor: "#1db954", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 12px rgba(29,185,84,0.4)" }}>
            <AndroidPhone color="white" size={26} />
          </div>
          <span style={{ fontSize: 10, color: "#999", fontWeight: 500 }}>HD</span>
        </div>
        {/* Message - blue */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", backgroundColor: "#1e88e5", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 12px rgba(30,136,229,0.4)" }}>
            <AndroidMessage color="white" size={26} />
          </div>
          <span style={{ fontSize: 10, color: "#999" }}> </span>
        </div>
        {/* Video - green */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", backgroundColor: "#1db954", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 12px rgba(29,185,84,0.4)" }}>
            <AndroidVideo color="white" size={26} />
          </div>
          <span style={{ fontSize: 10, color: "#999" }}> </span>
        </div>
      </div>

      {/* Divider + link */}
      <div style={{ margin: "16px 20px 0", height: 1, backgroundColor: "#e8e8e8" }} />
      <div style={{ textAlign: "center", padding: "12px 0", fontSize: 14, color: "#1e88e5", fontWeight: 400 }}>View contact details</div>

      {/* Call Log Card — white rounded card */}
      <div style={{
        margin: "8px 14px 0",
        backgroundColor: "#ffffff",
        borderRadius: 14,
        padding: "4px 16px 0",
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      }}>
        <div style={{ padding: "12px 0 8px" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#777", letterSpacing: 0.3 }}>Today</span>
        </div>
        {todayCalls.map((entry, i) => (
          <CallRow key={i} entry={entry} last={false} />
        ))}

        {config.showYesterday && (<>
          <div style={{ padding: "12px 0 8px", borderTop: "1px solid #f2f2f2" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#777", letterSpacing: 0.3 }}>Yesterday</span>
          </div>
          <CallRow entry={{ time: config.yesterdayCall1Time, duration: "", type: config.yesterdayCall1Type }} last={false} />
          <CallRow entry={{ time: config.yesterdayCall2Time, duration: "", type: config.yesterdayCall2Type }} last={!config.showOlderDate} />
        </>)}
        {config.showOlderDate && (
          <div style={{ padding: "12px 0 8px", borderTop: "1px solid #f2f2f2" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#777", letterSpacing: 0.3 }}>{config.olderDateLabel}</span>
          </div>
        )}
      </div>

      {/* Bottom Nav — Samsung 4-item bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 68,
        backgroundColor: "#f2f3f5",
        borderTop: "1px solid #e8e8e8",
        display: "flex", alignItems: "center", justifyContent: "space-around", paddingBottom: 8,
      }}>
        <AndroidStar color="#888" size={22} />
        <AndroidPencil color="#888" size={20} />
        <AndroidShare color="#888" size={22} />
        <AndroidMoreVert color="#888" size={22} />
      </div>
    </div>
  );
}

/* Helper: convert hex to "r,g,b" string for rgba */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : "150,180,220";
}
