// @ts-check

import { splitIntoClaims, normalizeText, countWords } from "./text.js";
import { getPreset } from "./presets.js";
import {
  detectDomain,
  hasAbsolutistCue,
  hasAnonymousAuthorityCue,
  hasCautionCue,
  hasEmotionalCue,
  hasFormattingCue,
  hasInstitutionCue,
  hasNumericCue,
  hasSourceCue,
  hasUrgencyCue
} from "./rules.js";

/**
 * @typedef {"low" | "medium" | "high" | "critical"} Severity
 */

/**
 * @typedef {{
 *   code: string,
 *   label: string,
 *   impact: number,
 *   detail: string
 * }} Reason
 */

/**
 * @typedef {{
 *   sentence: string,
 *   domain: "general" | "health" | "finance" | "civic",
 *   score: number,
 *   severity: Severity,
 *   reasons: Reason[],
 *   suggestions: string[]
 * }} Finding
 */

/**
 * @typedef {{
 *   profile?: "general" | "health" | "finance" | "civic",
 *   maxClaims?: number
 * }} AnalyzeOptions
 */

/** @param {number} value @param {number} min @param {number} max */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/** @param {number} score */
function severityFromScore(score) {
  if (score >= 75) return "critical";
  if (score >= 55) return "high";
  if (score >= 30) return "medium";
  return "low";
}

/** @param {Reason[]} reasons @param {string} code @param {string} label @param {number} impact @param {string} detail */
function addReason(reasons, code, label, impact, detail) {
  reasons.push({ code, label, impact, detail });
}

/** @param {string} sentence @param {"general" | "health" | "finance" | "civic"} domain */
function buildSuggestions(sentence, domain) {
  /** @type {Set<string>} */
  const suggestions = new Set();
  const text = sentence.toLowerCase();

  if (hasNumericCue(text) && !hasSourceCue(text)) {
    suggestions.add("Find the original dataset, report, or study behind the number.");
  }

  if (hasAnonymousAuthorityCue(text)) {
    suggestions.add("Identify the named expert, institution, or publication behind the claim.");
  }

  if (hasUrgencyCue(text) || hasEmotionalCue(text)) {
    suggestions.add("Check whether the wording is trying to provoke sharing before verification.");
  }

  if (domain === "health") {
    suggestions.add("Compare the claim with guidance from public-health or medical institutions.");
  }

  if (domain === "finance") {
    suggestions.add("Check regulated filings, audited numbers, and trusted financial reporting.");
  }

  if (domain === "civic") {
    suggestions.add("Compare the claim with official government, court, or election sources.");
  }

  suggestions.add("Search for at least two independent, credible sources before sharing.");

  return [...suggestions];
}

/** @param {string} sentence @param {AnalyzeOptions} options */
function scoreSentence(sentence, options) {
  const preset = getPreset(options.profile);
  const lower = sentence.toLowerCase();
  const domain = detectDomain(lower);
  /** @type {Reason[]} */
  const reasons = [];
  let score = 8;

  if (countWords(sentence) >= 6 && hasNumericCue(lower) && !hasSourceCue(lower)) {
    score += 24;
    addReason(reasons, "numeric-no-source", "Unsupported numeric claim", 24, "The sentence includes a number or percentage without a visible source cue.");
  }

  if (hasAnonymousAuthorityCue(lower)) {
    score += 18;
    addReason(reasons, "anonymous-authority", "Anonymous authority", 18, "The sentence relies on vague authority like 'experts say' without naming who.");
  }

  if (hasUrgencyCue(lower)) {
    score += 12;
    addReason(reasons, "urgency", "Urgency / pressure tactic", 12, "The wording encourages action or sharing before careful verification.");
  }

  if (hasEmotionalCue(lower)) {
    score += 14;
    addReason(reasons, "emotional", "Emotional manipulation cue", 14, "The sentence uses language often associated with sensational or manipulative framing.");
  }

  if (hasAbsolutistCue(lower)) {
    score += 12;
    addReason(reasons, "absolutist", "Absolutist wording", 12, "Words like 'always', 'never', 'miracle', or 'guaranteed' increase verification risk.");
  }

  if (hasFormattingCue(sentence)) {
    score += 8;
    addReason(reasons, "formatting", "Sensational formatting", 8, "Multiple exclamation marks or excessive capitalization can signal low-quality or manipulative content.");
  }

  if (domain !== "general" && !hasSourceCue(lower)) {
    const boost = 18 + preset.extraDomainBoost;
    score += boost;
    addReason(reasons, `${domain}-harm`, `High-impact ${domain} claim without attribution`, boost, `Claims in ${domain} contexts can cause more harm when shared without evidence.`);
  }

  if (hasSourceCue(lower)) {
    score -= 14;
    addReason(reasons, "source-cue", "Source cue present", -14, "The sentence includes attribution or a source-like reference, which lowers immediate risk.");
  }

  if (hasInstitutionCue(lower)) {
    score -= 10;
    addReason(reasons, "institution-cue", "Institution cue present", -10, "The sentence references a recognizable institution, improving traceability.");
  }

  if (hasCautionCue(lower)) {
    score -= 6;
    addReason(reasons, "caution-cue", "Cautious wording", -6, "Tentative language can indicate less overclaiming.");
  }

  score = clamp(score, 0, 100);

  return {
    sentence,
    domain,
    score,
    severity: severityFromScore(score),
    reasons: reasons.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact)),
    suggestions: buildSuggestions(sentence, domain)
  };
}

/** @param {Finding[]} findings */
function buildChecklist(findings) {
  /** @type {Set<string>} */
  const checklist = new Set([
    "Pause before sharing and verify the highest-risk claim first.",
    "Look for the primary source, not only reposts or screenshots.",
    "Compare with at least two independent credible sources."
  ]);

  for (const finding of findings) {
    for (const suggestion of finding.suggestions) {
      checklist.add(suggestion);
    }
  }

  return [...checklist].slice(0, 8);
}

/** @param {Finding[]} findings */
function buildSummary(findings) {
  const highRisk = findings.filter((item) => item.score >= 55).length;
  const unsupportedNumeric = findings.filter((item) => item.reasons.some((r) => r.code === "numeric-no-source")).length;
  const domains = findings.reduce(
    (acc, item) => {
      acc[item.domain] = (acc[item.domain] || 0) + 1;
      return acc;
    },
    /** @type {Record<string, number>} */ ({})
  );

  const topDomain = Object.entries(domains).sort((a, b) => b[1] - a[1])[0]?.[0] || "general";
  return `${highRisk} high-risk claims, ${unsupportedNumeric} unsupported numeric claims, dominant domain: ${topDomain}.`;
}

/**
 * Analyze text and return a structured report.
 * @param {string} input
 * @param {AnalyzeOptions} [options]
 */
export function analyzeText(input, options = {}) {
  const text = normalizeText(input);
  const maxClaims = options.maxClaims || 12;

  if (!text) {
    return {
      version: "0.1.0",
      profile: options.profile || "general",
      overallScore: 0,
      overallSeverity: "low",
      summary: "No text provided.",
      findings: [],
      verificationChecklist: [],
      metadata: {
        analyzedAt: new Date().toISOString(),
        claimCount: 0,
        characters: 0
      }
    };
  }

  const findings = splitIntoClaims(text)
    .slice(0, maxClaims)
    .map((sentence) => scoreSentence(sentence, options))
    .sort((a, b) => b.score - a.score);

  const weighted = findings.length
    ? Math.round(findings.reduce((sum, item) => sum + item.score, 0) / findings.length)
    : 0;

  return {
    version: "0.1.0",
    profile: options.profile || "general",
    overallScore: weighted,
    overallSeverity: severityFromScore(weighted),
    summary: buildSummary(findings),
    findings,
    verificationChecklist: buildChecklist(findings),
    metadata: {
      analyzedAt: new Date().toISOString(),
      claimCount: findings.length,
      characters: text.length
    }
  };
}
