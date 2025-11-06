module.exports = {
  // Directory where the final production assets are located after 'npm run build'
  globDirectory: 'build/', 
  
  // Patterns matching the files Workbox should pre-cache
  globPatterns: [
    '**/*.{js,css,html,png,svg,json,ico}'
  ],
  
  // The source file for your custom Service Worker logic
  swSrc: 'src/service-worker.js', 
  
  // The output location for the Service Worker, which will now contain 
  // both your custom logic AND the Workbox manifest
  swDest: 'build/service-worker.js'
};
