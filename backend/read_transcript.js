const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:\\Users\\USUARIO\\\\.gemini\\\\antigravity-ide\\\\brain\\\\6abaf682-b104-48d4-a1aa-a5e5ae225276\\\\.system_generated\\\\logs\\\\transcript.jsonl';
// Clean path for windows
const resolvedPath = path.normalize(logPath.replace(/\\\\/g, '\\'));

async function search() {
  if (!fs.existsSync(resolvedPath)) {
    console.error(`Log file does not exist at: ${resolvedPath}`);
    return;
  }

  const fileStream = fs.createReadStream(resolvedPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineNum = 0;
  for await (const line of rl) {
    lineNum++;
    const lower = line.toLowerCase();
    if (lower.includes('browser_subagent') || lower.includes('invoke_subagent')) {
      try {
        const parsed = JSON.parse(line);
        if (parsed.tool_calls) {
          for (const tc of parsed.tool_calls) {
            if (tc.name === 'browser_subagent') {
              console.log(`Line ${lineNum} (Step ${parsed.step_index}):`);
              console.log(`  TaskName: ${tc.args.TaskName}`);
              console.log(`  Task: ${tc.args.Task}`);
              console.log('--------------------------------------------------');
            }
          }
        }
      } catch (e) {
        // Not JSON or parse error
      }
    }
  }
}

search().catch(console.error);
