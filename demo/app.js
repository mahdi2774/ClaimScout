import { analyzeText } from '../packages/core/src/index.js';

const examples = {
  health: `BREAKING: Doctors say this one spice reverses memory loss in 3 days and big pharma doesn't want you to know. It works for 94% of people!!!`,
  civic: `Sources say the election commission secretly removed 120000 votes last night. Share now before it's deleted.`,
  balanced: `According to a WHO report, early evidence suggests the treatment may reduce severe symptoms in some patients, though more studies are needed.`
};

const input = document.getElementById('input');
const profile = document.getElementById('profile');
const analyzeBtn = document.getElementById('analyzeBtn');
const findingsEl = document.getElementById('findings');
const checklistEl = document.getElementById('checklist');
const overallScoreEl = document.getElementById('overallScore');
const overallSeverityEl = document.getElementById('overallSeverity');
const summaryTextEl = document.getElementById('summaryText');

function render(report) {
  overallScoreEl.textContent = String(report.overallScore);
  overallSeverityEl.textContent = report.overallSeverity;
  summaryTextEl.textContent = report.summary;

  findingsEl.innerHTML = '';
  checklistEl.innerHTML = '';

  if (!report.findings.length) {
    findingsEl.innerHTML = '<div class="empty">No findings yet.</div>';
  }

  for (const finding of report.findings) {
    const card = document.createElement('article');
    card.className = 'finding';

    const reasons = finding.reasons
      .map((reason) => `<li><strong>${reason.label}</strong> (${reason.impact > 0 ? '+' : ''}${reason.impact}) — ${reason.detail}</li>`)
      .join('');

    const suggestions = finding.suggestions
      .map((item) => `<li>${item}</li>`)
      .join('');

    card.innerHTML = `
      <div class="finding-header">
        <strong>${finding.domain}</strong>
        <span class="badge ${finding.severity}">${finding.severity} · ${finding.score}</span>
      </div>
      <blockquote>${finding.sentence}</blockquote>
      <p><strong>Reasons</strong></p>
      <ul class="reasons">${reasons}</ul>
      <p><strong>Next steps</strong></p>
      <ul class="reasons">${suggestions}</ul>
    `;

    findingsEl.appendChild(card);
  }

  for (const item of report.verificationChecklist) {
    const li = document.createElement('li');
    li.textContent = item;
    checklistEl.appendChild(li);
  }
}

function analyze() {
  const report = analyzeText(input.value, { profile: profile.value });
  render(report);
}

analyzeBtn.addEventListener('click', analyze);

document.querySelectorAll('[data-example]').forEach((button) => {
  button.addEventListener('click', () => {
    input.value = examples[button.dataset.example];
    analyze();
  });
});

input.value = examples.health;
analyze();
