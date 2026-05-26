// @ts-check

/** @param {ReturnType<import('./analyze.js').analyzeText>} report */
export function reportToMarkdown(report) {
  const lines = [
    `# ClaimScout Report`,
    ``,
    `- **Profile:** ${report.profile}`,
    `- **Overall score:** ${report.overallScore}`,
    `- **Overall severity:** ${report.overallSeverity}`,
    `- **Summary:** ${report.summary}`,
    ``,
    `## Findings`
  ];

  if (!report.findings.length) {
    lines.push("", "No findings.");
  }

  report.findings.forEach((finding, index) => {
    lines.push(
      ``,
      `### ${index + 1}. ${finding.severity.toUpperCase()} — score ${finding.score}`,
      ``,
      `> ${finding.sentence}`,
      ``,
      `**Domain:** ${finding.domain}`,
      ``,
      `**Reasons:**`
    );

    for (const reason of finding.reasons) {
      const sign = reason.impact > 0 ? `+${reason.impact}` : `${reason.impact}`;
      lines.push(`- ${reason.label} (${sign}) — ${reason.detail}`);
    }

    lines.push(``, `**Suggested verification steps:**`);

    for (const suggestion of finding.suggestions) {
      lines.push(`- ${suggestion}`);
    }
  });

  lines.push(``, `## Verification checklist`);
  for (const item of report.verificationChecklist) {
    lines.push(`- ${item}`);
  }

  return lines.join("\n");
}
