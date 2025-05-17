const fs = require('fs');
const path = require('path');

// Function to remove comments from a file
function removeCommentsFromFile(filePath) {
  try {
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Remove different types of comments
    let newContent = content
      // Remove multi-line comments (/* ... */)
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove single-line comments (// ...)
      .replace(/\/\/.*$/gm, '')
      // Remove JSDoc comments (/** ... */)
      .replace(/\/\*\*[\s\S]*?\*\//g, '')
      // Remove console.log statements
      .replace(/console\.(log|error|warn|info|debug)\s*\([^)]*\)\s*;?/g, '')
      // Remove empty lines that might be left after removing comments
      .replace(/^\s*[\r\n]/gm, '');
    
    // Write the new content back to the file
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Removed comments from ${filePath}`);
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

// Function to process all files in a directory recursively
function processDirectory(directory, extensions) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .git directories
      if (file !== 'node_modules' && file !== '.git') {
        processDirectory(filePath, extensions);
      }
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext)) {
        removeCommentsFromFile(filePath);
      }
    }
  }
}

// Main function
function main() {
  const srcDir = './src';
  const extensions = ['.js', '.jsx'];
  
  console.log('Starting to remove comments from all JavaScript and JSX files...');
  processDirectory(srcDir, extensions);
  console.log('Finished removing comments!');
}

main();
