const fs = require('fs');
const path = require('path');

const scenesDir = path.join(__dirname, '..', 'public', 'scenes');
const outputFile = path.join(__dirname, '..', 'src', 'data', 'artTextures.ts');

const sceneKeys = ['scene1', 'scene2', 'scene3', 'scene4', 'scene5'];
const textureMap = {};

for (const key of sceneKeys) {
  const filePath = path.join(scenesDir, `${key}.jpg`);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    const b64 = data.toString('base64');
    textureMap[key] = `data:image/jpeg;base64,${b64}`;
    console.log(`Bundled ${key}.jpg (${data.length} bytes -> ${b64.length} chars b64)`);
  } else {
    console.error(`Warning: ${filePath} not found!`);
  }
}

const content = `// Auto-generated bundled base64 textures for 100% synchronous offline WebGL loading
export const ART_TEXTURES: Record<string, string> = ${JSON.stringify(textureMap, null, 2)};
`;

fs.writeFileSync(outputFile, content, 'utf8');
console.log(`Successfully generated ${outputFile}!`);

