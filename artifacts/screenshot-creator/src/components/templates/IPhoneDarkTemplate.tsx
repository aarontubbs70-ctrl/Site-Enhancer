import { ScreenshotConfig } from "@/types/screenshot";
import {
  IosSignal, IosWifi, IosBattery,
  IosMsgIcon, IosCallIcon, IosVideoIcon, IosMailIcon,
  IosChevronLeft, IosChevronRight,
  IosClockIcon, IosPersonIcon, IosKeypadIcon, IosSearchIcon,
  IosIncomingArrow, IosOutgoingArrow,
} from "@/components/icons/IosIcons";

interface Props { config: ScreenshotConfig }

const CALL_LABEL: Record<string, string> = {
  incoming: "Incoming Call",
  outgoing: "Outgoing Call",
  missed:   "Missed Call",
};
const CALL_COLOR: Record<string, string> = {
  incoming: "rgba(255,255,255,0.92)",
  outgoing: "rgba(255,255,255,0.92)",
  missed:   "#ff6b6b",
};

/* Dark frosted card style */
const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(40px) saturate(1.8)",
  WebkitBackdropFilter: "blur(40px) saturate(1.8)",
  borderRadius: 14,
  border: "0.5px solid rgba(255,255,255,0.12)",
  boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
};

export function IPhoneDarkTemplate({ config }: Props) {
  const initials = (config.avatarInitials || config.contactName.split(" ").map(n => n[0]).join("")).slice(0, 2).toUpperCase();
  const callColor = CALL_COLOR[config.callType];
  const isMissed = config.callType === "missed";

  return (
    <div style={{
      width: 393, height: 852,
      background: `
        radial-gradient(ellipse at 30% 10%, rgba(80,60,140,0.35) 0%, transparent 50%),
        radial-gradient(ellipse at 70% 90%, rgba(40,50,120,0.25) 0%, transparent 50%),
        linear-gradient(175deg, #1c1828 0%, #141220 20%, #0e0c1a 45%, #0c0a18 70%, #10101e 100%)
      `,
      fontFamily: "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif",
      color: "white", position: "relative", overflow: "hidden",
      userSelect: "none",
    }}>

      {/* Status Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 28px 0", height: 54 }}>
        <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.3, fontVariantNumeric: "tabular-nums" }}>{config.time}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <IosSignal bars={config.networkBars} />
          <IosWifi strength={config.wifiConnected ? config.wifiStrength : 0} />
          <IosBattery level={config.batteryLevel} charging={config.batteryCharging} />
        </div>
      </div>

      {/* Nav row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 16px 0" }}>
        <button style={{ width: 34, height: 34, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <IosChevronLeft color="white" size={20} />
        </button>
        <div style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(145deg, ${config.avatarColor}ee 0%, ${config.avatarColor}88 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 14px rgba(0,0,0,0.5)", border: "1.5px solid rgba(255,255,255,0.25)" }}>
          <span style={{ fontSize: 17, fontWeight: 600, color: "white", letterSpacing: 0.5 }}>{initials}</span>
        </div>
        <button style={{ backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "none", borderRadius: 22, padding: "7px 20px", cursor: "pointer" }}>
          <span style={{ fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>Edit</span>
        </button>
      </div>

      {/* Name */}
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: "white", letterSpacing: -0.3 }}>{config.contactName}</span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginTop: 10 }}>
        <div style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderRadius: 20, padding: "5px 16px", border: "0.5px solid rgba(255,255,255,0.2)" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Details</span>
        </div>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>Voicemails</span>
      </div>

      {/* Call Log Card */}
      <div style={{ margin: "14px 14px 0", ...card, overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <div style={{ marginTop: 3 }}>
                {isMissed ? <IosIncomingArrow color="#ff6b6b" size={13} />
                  : config.callType === "incoming" ? <IosIncomingArrow color="rgba(255,255,255,0.7)" size={13} />
                  : <IosOutgoingArrow color="rgba(255,255,255,0.7)" size={13} />}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 400, color: callColor, lineHeight: 1.3 }}>{CALL_LABEL[config.callType]}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{config.callDuration}</div>
              </div>
            </div>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap", marginTop: 1 }}>{config.callDate} · {config.callTime}</span>
          </div>
        </div>
        <div style={{ padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 15, color: "rgba(255,255,255,0.85)" }}>Call History</span>
          <IosChevronRight color="rgba(255,255,255,0.25)" size={16} />
        </div>
      </div>

      {/* Contact Photo & Poster */}
      <div style={{ margin: "10px 14px 0", ...card, padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(145deg, ${config.avatarColor}ee, ${config.avatarColor}66)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white" }}>{initials}</div>
          <span style={{ fontSize: 15, color: "rgba(255,255,255,0.85)" }}>Contact Photo &amp; Poster</span>
        </div>
        <IosChevronRight color="rgba(255,255,255,0.25)" size={16} />
      </div>

      {/* Phone + Notes */}
      <div style={{ margin: "10px 14px 0", ...card, overflow: "hidden" }}>
        <div style={{ padding: "13px 16px", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>mobile</div>
              <div style={{ fontSize: 17, fontWeight: 400, letterSpacing: 0.1, color: "white" }}>{config.phoneNumber}</div>
            </div>
            {config.callType === "incoming" && (
              <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 4, padding: "2px 7px", fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color: "white", marginTop: 2 }}>RECENT</div>
            )}
          </div>
        </div>
        <div style={{ padding: "12px 16px" }}>
          <span style={{ fontSize: 15, color: "rgba(255,255,255,0.25)" }}>Notes</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ margin: "10px 14px 0", ...card, display: "flex", justifyContent: "space-around", padding: "14px 8px" }}>
        {[IosMsgIcon, IosCallIcon, IosVideoIcon, IosMailIcon].map((Icon, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 50, height: 50, borderRadius: "50%", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", border: "0.5px solid rgba(255,255,255,0.1)" }}>
              <Icon color="white" />
            </div>
          </div>
        ))}
      </div>

      {/* Share / Favourites */}
      <div style={{ margin: "10px 14px 0", ...card, overflow: "hidden" }}>
        {["Share Contact", "Add to Favourites"].map((item, i, arr) => (
          <div key={item} style={{ padding: "14px 16px", borderBottom: i < arr.length - 1 ? "0.5px solid rgba(255,255,255,0.08)" : "none" }}>
            <span style={{ fontSize: 15, color: "rgba(255,255,255,0.85)" }}>{item}</span>
          </div>
        ))}
      </div>

      {/* Emergency */}
      <div style={{ margin: "10px 14px 0", ...card, padding: "14px 16px" }}>
        <span style={{ fontSize: 15, color: "rgba(255,255,255,0.85)" }}>Add to Emergency Contacts</span>
      </div>

      {/* Block */}
      <div style={{ margin: "10px 14px 0", ...card, padding: "14px 16px" }}>
        <span style={{ fontSize: 15, color: "#ff6b6b" }}>Block Contact</span>
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 88, background: "rgba(8,6,18,0.92)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", borderTop: "0.5px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-around", paddingBottom: 16 }}>
        {[
          { Icon: IosClockIcon,  label: "Calls",    active: true  },
          { Icon: IosPersonIcon, label: "Contacts", active: false },
          { Icon: IosKeypadIcon, label: "Keypad",   active: false },
          { Icon: IosSearchIcon, label: "Search",   active: false },
        ].map(({ Icon, label, active }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <Icon color={active ? "#7c7ef5" : "rgba(255,255,255,0.3)"} size={26} />
            <span style={{ fontSize: 10, color: active ? "#7c7ef5" : "rgba(255,255,255,0.3)", fontWeight: active ? 600 : 400 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
