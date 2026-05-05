export type PhoneTemplate = "iphone" | "iphone-dark" | "samsung" | "samsung-dark" | "itel";
export type CallType = "incoming" | "outgoing" | "missed";
export type NetworkType = "5G" | "LTE" | "4G" | "3G" | "H+" | "E";

export interface ScreenshotConfig {
  template: PhoneTemplate;
  contactName: string;
  phoneNumber: string;
  time: string;
  callDate: string;
  callTime: string;
  callDuration: string;
  callType: CallType;
  batteryLevel: number;
  batteryCharging: boolean;
  networkBars: number;
  networkType: NetworkType;
  wifiConnected: boolean;
  wifiStrength: number;
  avatarColor: string;
  avatarInitials: string;
  sim: "SIM1" | "SIM2";
  showSecondCall: boolean;
  secondCallTime: string;
  secondCallDuration: string;
  secondCallType: CallType;
}

export interface Preset {
  id: string;
  name: string;
  config: ScreenshotConfig;
  createdAt: number;
}

export interface HistoryItem {
  id: string;
  contactName: string;
  phoneNumber: string;
  avatarColor: string;
  config: ScreenshotConfig;
  generatedAt: number;
}
