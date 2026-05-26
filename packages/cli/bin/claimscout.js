#!/usr/bin/env node
// @ts-check

import fs from 'node:fs/promises';
import process from 'node:process';
import { analyzeText, reportToMarkdown } from '../../core/src/index.js';

function printHelp() {
  console.log(`ClaimScout CLI

Usage:
  claimscout --text "your text"
  claimscout --file path/to/file.txt
  echo "your text" | claimscout --stdin

Options:
  --text <text>         Analyze inline text
  --file <path>         Analyze a text file
  --stdin               Read text from stdin
  --profile <name>      general | health | finance | civic
  --json                Print JSON output
  --markdown            Print Markdown output
  --help                Show this help
`);
}

/** @param {string[]} argv */
function parseArgs(argv) {
  /** @type {Record<string, string | boolean | undefined>} */
  const args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];
    if (!item.startsWith('--')) continue;
    const key = item.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }

  return args;
}

function readStdin() {
  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => resolve(data));
    process.stdin.on('error', reject);
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  /** @type {string} */
  let input = '';

  if (typeof args.text === 'string') {
    input = args.text;
  } else if (typeof args.file === 'string') {
    input = await fs.readFile(args.file, 'utf8');
  } else if (args.stdin || !process.stdin.isTTY) {
    input = await readStdin();
  } else {
    printHelp();
    process.exit(1);
  }

  const report = analyzeText(input, {
    profile: typeof args.profile === 'string' ? /** @type {any} */ (args.profile) : 'general'
  });

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  if (args.markdown) {
    console.log(reportToMarkdown(report));
    return;
  }

  console.log(`ClaimScout summary`);
  console.log(`Overall score: ${report.overallScore}`);
  console.log(`Overall severity: ${report.overallSeverity}`);
  console.log(`Summary: ${report.summary}`);
  console.log('');

  for (const [index, finding] of report.findings.entries()) {
    console.log(`${index + 1}. [${finding.severity.toUpperCase()} ${finding.score}] ${finding.sentence}`);
    for (const reason of finding.reasons.slice(0, 4)) {
      const sign = reason.impact > 0 ? `+${reason.impact}` : `${reason.impact}`;
      console.log(`   - ${reason.label} (${sign})`);
    }
    console.log(`   - Next: ${finding.suggestions[0]}`);
    console.log('');
  }
}

main().catch((error) => {
  console.error('ClaimScout failed:', error instanceof Error ? error.message : error);
  process.exit(1);
});
