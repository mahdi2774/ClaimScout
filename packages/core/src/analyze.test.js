// @ts-check

import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeText } from './index.js';

test('flags unsupported numeric health claims as high risk', () => {
  const report = analyzeText('Doctors say this tea cures diabetes in 7 days with 98% success!!!');
  assert.equal(report.findings[0].domain, 'health');
  assert.ok(report.findings[0].score >= 70);
  assert.equal(report.findings[0].severity, 'critical');
});

test('reduces risk when a claim includes attribution and cautious language', () => {
  const report = analyzeText('According to a WHO report, early evidence suggests the vaccine may reduce severe symptoms.');
  assert.ok(report.findings[0].score < 30);
  assert.equal(report.findings[0].severity, 'low');
});

test('flags civic and finance language without sources', () => {
  const report = analyzeText('BREAKING: The city budget doubled by 40% and this crypto fund will guarantee returns for everyone!');
  assert.ok(report.findings[0].score >= 55);
  assert.ok(['civic', 'finance', 'general'].includes(report.findings[0].domain));
});
