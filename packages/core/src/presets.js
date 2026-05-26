// @ts-check

export const PRESETS = {
  general: {
    name: "general",
    extraDomainBoost: 0
  },
  health: {
    name: "health",
    extraDomainBoost: 8
  },
  finance: {
    name: "finance",
    extraDomainBoost: 8
  },
  civic: {
    name: "civic",
    extraDomainBoost: 8
  }
};

/** @param {keyof typeof PRESETS | undefined} profile */
export function getPreset(profile) {
  return PRESETS[profile || "general"] || PRESETS.general;
}
