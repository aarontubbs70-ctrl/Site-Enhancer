import { useRef, useState, useCallback, useEffect } from "react";
import { toPng } from "html-to-image";
import { IPhoneTemplate }      from "@/components/templates/IPhoneTemplate";
import { IPhoneDarkTemplate }  from "@/components/templates/IPhoneDarkTemplate";
import { ItelTemplate }        from "@/components/templates/ItelTemplate";
import { SamsungTemplate }     from "@/components/templates/SamsungTemplate";
import { SamsungDarkTemplate } from "@/components/templates/SamsungDarkTemplate";
import { ScreenshotConfig, PhoneTemplate, CallType, NetworkType, Preset, HistoryItem } from "@/types/screenshot";
import { Country, generateContact, getCountryTime, COUNTRY_TIMEZONE, validateName, validatePhone } from "@/lib/contacts";

const AVATAR_COLORS = [
  "#FF6B6B","#FF8E53","#FFC107","#4CAF50","#2196F3",
  "#9C27B0","#E91E63","#00BCD4","#FF5722","#607D8B",
  "#F06292","#AED581","#FFD54F","#4DB6AC","#7986CB",
];

const defaultConfig: ScreenshotConfig = {
  template: "iphone",
  contactName: "Peter Mburu TL Repo B",
  phoneNumber: "+254 758 369242",
  time: "20:35",
  callDate: "Today",
  callTime: "15:14",
  callDuration: "14 seconds",
  callType: "incoming",
  batteryLevel: 86,
  batteryCharging: false,
  networkBars: 4,
  networkType: "LTE",
  wifiConnected: true,
  wifiStrength: 3,
  avatarColor: "#2196F3",
  avatarInitials: "",
  sim: "SIM2",
  showSecondCall: false,
  secondCallTime: "2:39 pm",
  secondCallDuration: "1 min 22 secs",
  secondCallType: "incoming",
  showYesterday: true,
  yesterdayCall1Time: "8:08 pm",
  yesterdayCall1Type: "missed",
  yesterdayCall2Time: "8:06 pm",
  yesterdayCall2Type: "missed",
};

/* ─── localStorage helpers ─── */
function readLS<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function writeLS(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
}

/* ─── UI atoms ─── */
function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{children}</label>;
}
function Section({ title, children, accent }: { title: string; children: React.ReactNode; accent?: string }) {
  return (
    <div className="mb-5">
      <div className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 ${accent ?? "text-primary"}`}>
        <div className="h-px flex-1 bg-border" />{title}<div className="h-px flex-1 bg-border" />
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
function FieldInput({ value, onChange, placeholder, error, success }: { value: string; onChange: (v: string) => void; placeholder?: string; error?: string; success?: boolean }) {
  const ring = error ? "border-red-400 focus:ring-red-300/40" : success ? "border-green-400 focus:ring-green-300/40" : "border-border focus:ring-primary/40";
  return (
    <div>
      <div className="relative">
        <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className={`w-full px-3 py-2 pr-8 text-sm border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 transition ${ring}`} />
        {value && <span className={`absolute right-2.5 top-2.5 text-xs font-bold ${error ? "text-red-500" : "text-green-500"}`}>{error ? "✕" : "✓"}</span>}
      </div>
      {error && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><span>⚠</span>{error}</p>}
    </div>
  );
}
function PlainInput({ value, onChange, placeholder, disabled }: { value: string; onChange: (v: string) => void; placeholder?: string; disabled?: boolean }) {
  return <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} disabled={disabled}
    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition disabled:opacity-50 disabled:cursor-not-allowed" />;
}
function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { label: string; value: string }[] }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition">
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
function Slider({ value, onChange, min, max, label }: { value: number; onChange: (v: number) => void; min: number; max: number; label?: string }) {
  return (
    <div className="flex items-center gap-3">
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} className="flex-1 accent-primary" />
      <span className="text-sm font-mono w-8 text-right text-foreground">{label ?? value}</span>
    </div>
  );
}
function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-foreground">{label}</span>
      <div onClick={() => onChange(!checked)} className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted"}`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
      </div>
    </label>
  );
}

/* ─── Template definitions ─── */
const TEMPLATES: { label: string; sub: string; value: PhoneTemplate; bg: string; text: string }[] = [
  { label: "iPhone",       sub: "Light",  value: "iphone",       bg: "bg-purple-50 border-purple-300 text-purple-700",     text: "🍎" },
  { label: "iPhone",       sub: "Dark",   value: "iphone-dark",  bg: "bg-slate-800 border-slate-600 text-slate-100",       text: "🌙" },
  { label: "Itel",         sub: "White",  value: "itel",         bg: "bg-gray-50 border-gray-300 text-gray-700",           text: "📱" },
  { label: "Samsung",      sub: "Light",  value: "samsung",      bg: "bg-blue-50 border-blue-300 text-blue-700",           text: "🌀" },
  { label: "Samsung",      sub: "Dark",   value: "samsung-dark", bg: "bg-gray-900 border-gray-600 text-gray-100",          text: "🌑" },
];

const COUNTRIES: { label: string; short: string; value: Country; flag: string; example: string }[] = [
  { label: "United States", short: "USA",     value: "us",      flag: "🇺🇸", example: "+1 (212) 555-0198" },
  { label: "United Kingdom", short: "UK",     value: "uk",      flag: "🇬🇧", example: "+44 7911 123456"  },
  { label: "Canada",         short: "Canada", value: "canada",  flag: "🇨🇦", example: "+1 (416) 555-0173" },
  { label: "Germany",        short: "Germany",value: "germany", flag: "🇩🇪", example: "+49 151 2345 6789" },
  { label: "France",         short: "France", value: "france",  flag: "🇫🇷", example: "+33 06 12 34 56 78" },
];
const NETWORK_TYPES: { label: string; value: NetworkType }[] = [
  { label: "5G", value: "5G" },{ label: "LTE", value: "LTE" },{ label: "4G", value: "4G" },
  { label: "3G", value: "3G" },{ label: "H+",  value: "H+" },{ label: "E",   value: "E"  },
];
const CALL_TYPES: { label: string; value: CallType }[] = [
  { label: "Incoming Call", value: "incoming" },
  { label: "Outgoing Call", value: "outgoing" },
  { label: "Missed Call",   value: "missed"   },
];

/* ─── Duration formatter ─── */
function formatDuration(mins: number, secs: number): string {
  if (mins === 0) return `${secs} secs`;
  if (secs === 0) return `${mins} min${mins !== 1 ? "s" : ""}`;
  return `${mins} min${mins !== 1 ? "s" : ""} ${secs} secs`;
}

/* ─── Time helper ─── */
function subtractMinutes(time: string, mins: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = ((h * 60 + m - mins) % 1440 + 1440) % 1440;
  return `${Math.floor(total / 60).toString().padStart(2, "0")}:${(total % 60).toString().padStart(2, "0")}`;
}

/* ─── Main component ─── */
export default function Creator() {
  const [config, setConfig]               = useState<ScreenshotConfig>(defaultConfig);
  const [downloading, setDownloading]     = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>("us");
  const [generating, setGenerating]       = useState(false);
  const [liveTime, setLiveTime]           = useState(false);
  const [presets, setPresets]             = useState<Preset[]>(() => readLS("sc-presets", []));
  const [history, setHistory]             = useState<HistoryItem[]>(() => readLS("sc-history", []));
  const [presetNameInput, setPresetNameInput] = useState("");
  const [showSavePreset, setShowSavePreset]   = useState(false);
  const [durationMins, setDurationMins]       = useState(0);
  const [durationSecs, setDurationSecs]       = useState(14);
  const phoneRef = useRef<HTMLDivElement>(null);
  const liveRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  const nameValidation  = validateName(config.contactName);
  const phoneValidation = validatePhone(config.phoneNumber);
  const hasErrors = !nameValidation.valid || !phoneValidation.valid;

  /* Live clock */
  useEffect(() => {
    if (liveRef.current) clearInterval(liveRef.current);
    if (liveTime) {
      const tick = () => setConfig(p => ({ ...p, time: getCountryTime(selectedCountry) }));
      tick();
      liveRef.current = setInterval(tick, 1000);
    }
    return () => { if (liveRef.current) clearInterval(liveRef.current); };
  }, [liveTime, selectedCountry]);

  const update = useCallback(<K extends keyof ScreenshotConfig>(key: K, value: ScreenshotConfig[K]) => {
    setConfig(p => ({ ...p, [key]: value }));
  }, []);

  /* Generate */
  const handleGenerate = useCallback((country?: Country) => {
    const c = country ?? selectedCountry;
    setSelectedCountry(c);
    setGenerating(true);
    setTimeout(() => {
      const contact = generateContact(c);
      const now = getCountryTime(c);
      const offsetMins = [1, 2, 3, 5][Math.floor(Math.random() * 4)];
      const callTime = subtractMinutes(now, offsetMins);
      const newColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
      setConfig(p => {
        const next = { ...p, contactName: contact.name, phoneNumber: contact.phone, avatarInitials: "", avatarColor: newColor, time: now, callTime, callDate: "Today" };
        /* push to history */
        const item: HistoryItem = { id: Date.now().toString(), contactName: contact.name, phoneNumber: contact.phone, avatarColor: newColor, config: next, generatedAt: Date.now() };
        setHistory(prev => {
          const updated = [item, ...prev].slice(0, 10);
          writeLS("sc-history", updated);
          return updated;
        });
        return next;
      });
      setGenerating(false);
    }, 180);
  }, [selectedCountry]);

  /* Presets */
  const savePreset = () => {
    const name = presetNameInput.trim() || `Preset ${presets.length + 1}`;
    const p: Preset = { id: Date.now().toString(), name, config, createdAt: Date.now() };
    const updated = [p, ...presets];
    setPresets(updated);
    writeLS("sc-presets", updated);
    setPresetNameInput("");
    setShowSavePreset(false);
  };
  const loadPreset = (p: Preset) => setConfig(p.config);
  const deletePreset = (id: string) => {
    const updated = presets.filter(p => p.id !== id);
    setPresets(updated);
    writeLS("sc-presets", updated);
  };
  const restoreHistory = (item: HistoryItem) => setConfig(item.config);
  const clearHistory = () => { setHistory([]); writeLS("sc-history", []); };

  /* Download */
  const handleDownload = async () => {
    if (!phoneRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(phoneRef.current, { cacheBust: true, pixelRatio: 3, style: { borderRadius: "0" } });
      const link = document.createElement("a");
      link.download = `${config.template}-call-screenshot.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { console.error("Download failed", err); }
    finally { setDownloading(false); }
  };

  const livePreviewTime = COUNTRY_TIMEZONE[selectedCountry] ? getCountryTime(selectedCountry) : "--:--";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Phone Screenshot Creator</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Customize and download realistic phone call screenshots</p>
        </div>
        <button onClick={handleDownload} disabled={downloading}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 shadow-md">
          {downloading ? <><span className="animate-spin inline-block">⏳</span> Saving...</> : <><span>⬇</span> Download PNG</>}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 border-r border-border bg-card overflow-y-auto p-5 shrink-0">

          {/* ── Saved Presets ── */}
          <Section title="Saved Presets" accent="text-amber-600">
            {presets.length === 0 && !showSavePreset && (
              <p className="text-xs text-muted-foreground">No presets yet. Save your current config to recall it later.</p>
            )}
            {/* Preset list */}
            {presets.length > 0 && (
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {presets.map(p => (
                  <div key={p.id} className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 group">
                    <button onClick={() => loadPreset(p)} className="flex-1 text-left">
                      <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{p.config.contactName} · {p.config.template}</p>
                    </button>
                    <button onClick={() => loadPreset(p)}
                      className="text-xs text-primary font-semibold opacity-0 group-hover:opacity-100 transition px-1.5 py-0.5 rounded hover:bg-primary/10">
                      Load
                    </button>
                    <button onClick={() => deletePreset(p.id)}
                      className="text-xs text-red-500 opacity-0 group-hover:opacity-100 transition px-1 py-0.5 rounded hover:bg-red-50 dark:hover:bg-red-950/30">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/* Save form */}
            {showSavePreset ? (
              <div className="flex gap-1.5">
                <input value={presetNameInput} onChange={e => setPresetNameInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") savePreset(); if (e.key === "Escape") setShowSavePreset(false); }}
                  placeholder="Preset name…" autoFocus
                  className="flex-1 px-3 py-1.5 text-sm border border-amber-400 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-amber-300/50" />
                <button onClick={savePreset} className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold transition">Save</button>
                <button onClick={() => setShowSavePreset(false)} className="px-2 py-1.5 rounded-lg border border-border text-muted-foreground text-xs hover:bg-muted/50 transition">✕</button>
              </div>
            ) : (
              <button onClick={() => setShowSavePreset(true)}
                className="w-full py-2 rounded-xl border-2 border-dashed border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-500 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition">
                <span className="text-base leading-none">＋</span> Save Current as Preset
              </button>
            )}
          </Section>

          {/* ── Templates ── */}
          <Section title="Template">
            <div className="grid grid-cols-3 gap-2">
              {TEMPLATES.map(t => (
                <button key={t.value} onClick={() => update("template", t.value)}
                  className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border-2 text-xs font-semibold transition-all
                    ${config.template === t.value ? t.bg + " ring-2 ring-offset-1 ring-primary/50" : "border-border bg-background text-muted-foreground hover:border-primary/40"}`}>
                  <span className="text-lg mb-0.5">{t.text}</span>
                  <span className="leading-tight">{t.label}</span>
                  <span className="text-[10px] opacity-70">{t.sub}</span>
                </button>
              ))}
            </div>
          </Section>

          {/* ── Auto-Generate ── */}
          <Section title="Auto-Generate Contact" accent="text-emerald-600">
            <p className="text-xs text-muted-foreground">Pick a country to get a realistic name, number, and <strong>real local time</strong>.</p>
            <div>
              <Label>Call Duration</Label>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex flex-col items-center gap-1">
                  <div className="flex items-center w-full border border-border rounded-lg overflow-hidden bg-background">
                    <button
                      onClick={() => { const v = Math.max(0, durationMins - 1); setDurationMins(v); update("callDuration", formatDuration(v, durationSecs)); }}
                      className="px-2.5 py-2 text-muted-foreground hover:bg-muted/60 transition text-base font-bold select-none">−</button>
                    <span className="flex-1 text-center text-sm font-mono font-semibold text-foreground tabular-nums">{durationMins}</span>
                    <button
                      onClick={() => { const v = durationMins + 1; setDurationMins(v); update("callDuration", formatDuration(v, durationSecs)); }}
                      className="px-2.5 py-2 text-muted-foreground hover:bg-muted/60 transition text-base font-bold select-none">+</button>
                  </div>
                  <span className="text-[11px] text-muted-foreground">mins</span>
                </div>
                <span className="text-muted-foreground font-bold pb-4">:</span>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <div className="flex items-center w-full border border-border rounded-lg overflow-hidden bg-background">
                    <button
                      onClick={() => { const v = Math.max(0, durationSecs - 1); setDurationSecs(v); update("callDuration", formatDuration(durationMins, v)); }}
                      className="px-2.5 py-2 text-muted-foreground hover:bg-muted/60 transition text-base font-bold select-none">−</button>
                    <span className="flex-1 text-center text-sm font-mono font-semibold text-foreground tabular-nums">{durationSecs}</span>
                    <button
                      onClick={() => { const v = Math.min(59, durationSecs + 1); setDurationSecs(v); update("callDuration", formatDuration(durationMins, v)); }}
                      className="px-2.5 py-2 text-muted-foreground hover:bg-muted/60 transition text-base font-bold select-none">+</button>
                  </div>
                  <span className="text-[11px] text-muted-foreground">secs</span>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5 text-center">
                Will show as: <strong className="text-foreground">{formatDuration(durationMins, durationSecs)}</strong>
              </p>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {COUNTRIES.map(c => (
                <button key={c.value} onClick={() => setSelectedCountry(c.value)}
                  className={`flex flex-col items-center py-2 px-0.5 rounded-xl border-2 text-xs font-semibold transition-all
                    ${selectedCountry === c.value
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                      : "border-border bg-background text-muted-foreground hover:border-emerald-300"}`}>
                  <span className="text-base mb-0.5">{c.flag}</span>
                  <span className="text-[10px] leading-tight text-center">{c.short}</span>
                </button>
              ))}
            </div>
            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 px-3 py-2.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  {COUNTRIES.find(c => c.value === selectedCountry)?.flag}{" "}{COUNTRIES.find(c => c.value === selectedCountry)?.label}
                </p>
                <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{COUNTRIES.find(c => c.value === selectedCountry)?.example}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">{livePreviewTime}</div>
                <div className="text-[10px] text-muted-foreground">local time</div>
              </div>
            </div>
            <button onClick={() => handleGenerate()} disabled={generating}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60 shadow-sm">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
              {generating ? "Generating…" : "Generate Random Contact"}
            </button>
            <div className="grid grid-cols-5 gap-1">
              {COUNTRIES.map(c => (
                <button key={c.value} onClick={() => handleGenerate(c.value)}
                  className="py-1 rounded-lg border border-border text-[10px] text-muted-foreground hover:bg-muted/60 transition flex items-center justify-center">{c.flag}</button>
              ))}
            </div>

            {/* Generation history */}
            {history.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Recent ({history.length})</span>
                  <button onClick={clearHistory} className="text-[11px] text-red-400 hover:text-red-600 transition">Clear</button>
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-0.5">
                  {history.map(item => (
                    <button key={item.id} onClick={() => restoreHistory(item)}
                      className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 bg-background border border-border hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition group text-left">
                      <div style={{ width: 26, height: 26, borderRadius: "50%", backgroundColor: item.avatarColor, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "white" }}>
                          {item.contactName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{item.contactName}</p>
                        <p className="text-[10px] text-muted-foreground truncate font-mono">{item.phoneNumber}</p>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition">↩</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {/* ── Contact ── */}
          <Section title="Contact">
            <div><Label>Contact Name</Label>
              <FieldInput value={config.contactName} onChange={v => update("contactName", v)} placeholder="Full name"
                error={config.contactName ? nameValidation.error : undefined}
                success={config.contactName.length > 0 && nameValidation.valid} />
            </div>
            <div><Label>Phone Number</Label>
              <FieldInput value={config.phoneNumber} onChange={v => update("phoneNumber", v)} placeholder="+1 (212) 555-0100"
                error={config.phoneNumber ? phoneValidation.error : undefined}
                success={config.phoneNumber.length > 0 && phoneValidation.valid} />
            </div>
            <div><Label>Avatar Initials (auto if blank)</Label>
              <PlainInput value={config.avatarInitials} onChange={v => update("avatarInitials", v)} placeholder="e.g. PB" />
            </div>
            <div><Label>Avatar Color</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {AVATAR_COLORS.map(color => (
                  <button key={color} onClick={() => update("avatarColor", color)}
                    style={{ backgroundColor: color }}
                    className={`w-7 h-7 rounded-full transition-transform hover:scale-110 ${config.avatarColor === color ? "ring-2 ring-offset-2 ring-primary scale-110" : ""}`} />
                ))}
              </div>
            </div>
            {hasErrors && (config.contactName || config.phoneNumber) && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3 space-y-1">
                <p className="text-xs font-semibold text-red-600 mb-1">Validation Issues</p>
                {!nameValidation.valid  && config.contactName  && <p className="text-xs text-red-500 flex gap-1.5"><span>⚠</span>{nameValidation.error}</p>}
                {!phoneValidation.valid && config.phoneNumber  && <p className="text-xs text-red-500 flex gap-1.5"><span>⚠</span>{phoneValidation.error}</p>}
              </div>
            )}
            {!hasErrors && config.contactName && config.phoneNumber && (
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-2.5">
                <p className="text-xs text-green-600 font-medium flex items-center gap-1.5"><span>✓</span> Name and number are valid</p>
              </div>
            )}
          </Section>

          {/* ── Call Details ── */}
          <Section title="Call Details">
            <div><Label>Call Type</Label><Select value={config.callType} onChange={v => update("callType", v as CallType)} options={CALL_TYPES} /></div>
            <div><Label>Call Duration / Status</Label><PlainInput value={config.callDuration} onChange={v => update("callDuration", v)} placeholder="e.g. 14 seconds" /></div>
            <div><Label>Call Date Label</Label><PlainInput value={config.callDate} onChange={v => update("callDate", v)} placeholder="e.g. Today, Yesterday" /></div>
            <div><Label>Call Time</Label><PlainInput value={config.callTime} onChange={v => update("callTime", v)} placeholder="e.g. 15:14" /></div>
            <div><Label>SIM</Label><Select value={config.sim} onChange={v => update("sim", v as "SIM1"|"SIM2")} options={[{ label:"SIM1",value:"SIM1"},{ label:"SIM2",value:"SIM2"}]} /></div>
          </Section>

          {/* ── Second Call (Samsung) ── */}
          {(config.template === "samsung" || config.template === "samsung-dark") && (
            <Section title="Second Call Entry">
              <Toggle checked={config.showSecondCall} onChange={v => update("showSecondCall", v)} label="Show second call" />
              {config.showSecondCall && (<>
                <div><Label>Second Call Type</Label><Select value={config.secondCallType} onChange={v => update("secondCallType", v as CallType)} options={CALL_TYPES} /></div>
                <div><Label>Second Call Time</Label><PlainInput value={config.secondCallTime} onChange={v => update("secondCallTime", v)} placeholder="2:39 pm" /></div>
                <div><Label>Second Call Duration</Label><PlainInput value={config.secondCallDuration} onChange={v => update("secondCallDuration", v)} placeholder="1 min 22 secs" /></div>
              </>)}
            </Section>
          )}

          {/* ── Yesterday Section (Samsung) ── */}
          {(config.template === "samsung" || config.template === "samsung-dark") && (
            <Section title="Yesterday Section">
              <Toggle checked={config.showYesterday} onChange={v => update("showYesterday", v)} label="Show Yesterday calls" />
              {config.showYesterday && (<>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-1">Call 1</div>
                <div><Label>Call Type</Label><Select value={config.yesterdayCall1Type} onChange={v => update("yesterdayCall1Type", v as CallType)} options={CALL_TYPES} /></div>
                <div><Label>Time</Label><PlainInput value={config.yesterdayCall1Time} onChange={v => update("yesterdayCall1Time", v)} placeholder="8:08 pm" /></div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-1">Call 2</div>
                <div><Label>Call Type</Label><Select value={config.yesterdayCall2Type} onChange={v => update("yesterdayCall2Type", v as CallType)} options={CALL_TYPES} /></div>
                <div><Label>Time</Label><PlainInput value={config.yesterdayCall2Time} onChange={v => update("yesterdayCall2Time", v)} placeholder="8:06 pm" /></div>
              </>)}
            </Section>
          )}

          {/* ── Status Bar / Time ── */}
          <Section title="Status Bar">
            <div className={`rounded-xl border px-3 py-3 transition-colors ${liveTime ? "bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700" : "bg-background border-border"}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Live Clock</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {liveTime ? `Synced · ${COUNTRIES.find(c => c.value === selectedCountry)?.label}` : "Tick in real time for selected country"}
                  </p>
                </div>
                <div onClick={() => setLiveTime(v => !v)} className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors ${liveTime ? "bg-blue-500" : "bg-muted"}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${liveTime ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
              </div>
              {liveTime && <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />Live · {config.time}
                </span>
              </div>}
            </div>
            <div><Label>Time (manual)</Label>
              <PlainInput value={config.time} onChange={v => { setLiveTime(false); update("time", v); }} placeholder="20:35" disabled={liveTime} />
              {liveTime && <p className="text-[11px] text-muted-foreground mt-1">Turn off Live Clock to edit manually</p>}
            </div>
          </Section>

          <Section title="Battery">
            <div><Label>Battery Level: {config.batteryLevel}%</Label><Slider value={config.batteryLevel} onChange={v => update("batteryLevel", v)} min={0} max={100} label={`${config.batteryLevel}%`} /></div>
            <Toggle checked={config.batteryCharging} onChange={v => update("batteryCharging", v)} label="Charging" />
          </Section>

          <Section title="Network">
            <div><Label>Signal Bars: {config.networkBars}/4</Label><Slider value={config.networkBars} onChange={v => update("networkBars", v)} min={0} max={4} /></div>
            <div><Label>Network Type</Label><Select value={config.networkType} onChange={v => update("networkType", v as NetworkType)} options={NETWORK_TYPES} /></div>
          </Section>

          <Section title="WiFi">
            <Toggle checked={config.wifiConnected} onChange={v => update("wifiConnected", v)} label="WiFi Connected" />
            {config.wifiConnected && <div><Label>WiFi Strength: {config.wifiStrength}/3</Label><Slider value={config.wifiStrength} onChange={v => update("wifiStrength", v)} min={0} max={3} /></div>}
          </Section>
        </aside>

        {/* ── Preview ── */}
        <main className="flex-1 flex items-start justify-center overflow-auto bg-muted/30 p-10">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-widest">
                {TEMPLATES.find(t => t.value === config.template)?.label} {TEMPLATES.find(t => t.value === config.template)?.sub} Preview
              </span>
              {liveTime && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />Live · {config.time}
                </span>
              )}
              {config.contactName && config.phoneNumber && (
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${hasErrors ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                  {hasErrors ? "⚠ Fix errors" : "✓ Ready to download"}
                </span>
              )}
            </div>

            <div style={{ transform: "scale(0.76)", transformOrigin: "top center", marginBottom: -203 }}>
              <div ref={phoneRef} style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.28), 0 6px 24px rgba(0,0,0,0.18)", overflow: "hidden", display: "inline-block" }}>
                {config.template === "iphone"       && <IPhoneTemplate      config={config} />}
                {config.template === "iphone-dark"  && <IPhoneDarkTemplate  config={config} />}
                {config.template === "itel"         && <ItelTemplate        config={config} />}
                {config.template === "samsung"      && <SamsungTemplate     config={config} />}
                {config.template === "samsung-dark" && <SamsungDarkTemplate config={config} />}
              </div>
            </div>

            <div className="mt-4 text-xs text-muted-foreground/60 italic">
              Download saves a flat 3× high-res PNG (no rounded edges)
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
