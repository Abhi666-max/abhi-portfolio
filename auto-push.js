const { execSync } = require('child_process');

const intervalMinutes = 2; // Every 2 minutes
console.log(`Starting auto-push daemon. Checking for changes every ${intervalMinutes} minutes...`);

setInterval(() => {
  try {
    // Check if there are any changes
    const status = execSync('git status --porcelain').toString();
    
    if (status.trim().length > 0) {
      console.log(`[${new Date().toLocaleTimeString()}] Changes detected. Pushing to GitHub...`);
      
      execSync('git add .');
      execSync('git commit -m "chore: auto-push latest changes"');
      execSync('git push origin master'); // Or main depending on the branch name
      
      console.log(`[${new Date().toLocaleTimeString()}] Successfully pushed changes.`);
    } else {
      console.log(`[${new Date().toLocaleTimeString()}] No changes detected. Skipping push.`);
    }
  } catch (error) {
    console.error(`[${new Date().toLocaleTimeString()}] Auto-push failed:`, error.message);
  }
}, intervalMinutes * 60 * 1000);
