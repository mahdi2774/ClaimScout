// @ts-check

const SOURCE_CUES = [
  /https?:\/\//i,
  /www\./i,
  /according to/i,
  /reported by/i,
  /data from/i,
  /source:?\s/i,
  /study|studies/i,
  /survey/i,
  /report/i,
  /published in/i,
  /researchers? at/i,
  /official/i,
  /ministry/i,
  /department/i,
  /agency/i,
  /university/i,
  /who\b/i,
  /cdc\b/i,
  /un\b/i,
  /world bank/i,
  /reuters/i,
  /ap news|associated press/i,
  /bbc/i
];

const INSTITUTION_CUES = [
  /world health organization/i,
  /who\b/i,
  /cdc\b/i,
  /united nations/i,
  /un\b/i,
  /ministry of/i,
  /department of/i,
  /university/i,
  /hospital/i,
  /national institute/i,
  /official records?/i,
  /court filings?/i,
  /election commission/i,
  /central bank/i,
  /securities?/i
];

const ABSOLUTIST_CUES = [
  /\balways\b/i,
  /\bnever\b/i,
  /\beveryone\b/i,
  /\bno one\b/i,
  /\bguaranteed\b/i,
  /\bproven\b/i,
  /\b100%\b/i,
  /\binstantly\b/i,
  /\bmiracle\b/i,
  /\bcure\b/i,
  /\bexposed\b/i
];

const URGENCY_CUES = [
  /\bact now\b/i,
  /\burgent\b/i,
  /\bimmediately\b/i,
  /\bbefore it'?s deleted\b/i,
  /\blast chance\b/i,
  /\bshare now\b/i,
  /\bbreaking\b/i,
  /\bright now\b/i,
  /\btoday only\b/i
];

const EMOTIONAL_CUES = [
  /\bshocking\b/i,
  /\bsecret\b/i,
  /\bbig pharma\b/i,
  /\bthey don't want you to know\b/i,
  /\bcorrupt\b/i,
  /\bscandal\b/i,
  /\bpanic\b/i,
  /\boutrage\b/i,
  /\bdisaster\b/i,
  /\bcover[- ]?up\b/i
];

const ANONYMOUS_AUTHORITY_CUES = [
  /\bexperts say\b/i,
  /\bdoctors say\b/i,
  /\bscientists say\b/i,
  /\binsiders say\b/i,
  /\bsources say\b/i,
  /\bmany people say\b/i,
  /\bresearch shows\b/i
];

const CAUTION_CUES = [
  /\bmay\b/i,
  /\bmight\b/i,
  /\bearly evidence\b/i,
  /\bpreliminary\b/i,
  /\bestimate\b/i,
  /\bindicates\b/i,
  /\bsuggests\b/i,
  /\bappears\b/i
];

const HEALTH_CUES = [
  /\bhealth\b/i,
  /\bdoctor\b/i,
  /\bdiabetes\b/i,
  /\bcancer\b/i,
  /\bvaccine\b/i,
  /\bcure\b/i,
  /\bmemory loss\b/i,
  /\btreatment\b/i,
  /\bmedicine\b/i,
  /\bsymptom\b/i,
  /\bvirus\b/i
];

const FINANCE_CUES = [
  /\bstock\b/i,
  /\bcrypto\b/i,
  /\bprofit\b/i,
  /\binvest\b/i,
  /\breturn\b/i,
  /\bearn\b/i,
  /\bdouble your money\b/i,
  /\bmarket\b/i,
  /\bprice target\b/i,
  /\bdividend\b/i
];

const CIVIC_CUES = [
  /\belection\b/i,
  /\bvote\b/i,
  /\bgovernment\b/i,
  /\bpolicy\b/i,
  /\bcity\b/i,
  /\bbudget\b/i,
  /\bminister\b/i,
  /\bcourt\b/i,
  /\bparliament\b/i,
  /\bcongress\b/i
];

/** @param {string} text @param {RegExp[]} patterns */
function matchesAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

/** @param {string} text */
export function hasSourceCue(text) {
  return matchesAny(text, SOURCE_CUES);
}

/** @param {string} text */
export function hasInstitutionCue(text) {
  return matchesAny(text, INSTITUTION_CUES);
}

/** @param {string} text */
export function hasAbsolutistCue(text) {
  return matchesAny(text, ABSOLUTIST_CUES);
}

/** @param {string} text */
export function hasUrgencyCue(text) {
  return matchesAny(text, URGENCY_CUES);
}

/** @param {string} text */
export function hasEmotionalCue(text) {
  return matchesAny(text, EMOTIONAL_CUES);
}

/** @param {string} text */
export function hasAnonymousAuthorityCue(text) {
  return matchesAny(text, ANONYMOUS_AUTHORITY_CUES);
}

/** @param {string} text */
export function hasCautionCue(text) {
  return matchesAny(text, CAUTION_CUES);
}

/** @param {string} text */
export function hasNumericCue(text) {
  return /\b\d+(?:\.\d+)?%?\b/.test(text) || /\bone in \d+/i.test(text);
}

/** @param {string} text */
export function hasFormattingCue(text) {
  const exclamations = (text.match(/!/g) || []).length;
  const uppercaseWords = text.split(/\s+/).filter((word) => /^[A-Z]{4,}$/.test(word));
  return exclamations >= 2 || uppercaseWords.length >= 2;
}

/** @param {string} text */
export function detectDomain(text) {
  if (matchesAny(text, HEALTH_CUES)) return "health";
  if (matchesAny(text, FINANCE_CUES)) return "finance";
  if (matchesAny(text, CIVIC_CUES)) return "civic";
  return "general";
}
