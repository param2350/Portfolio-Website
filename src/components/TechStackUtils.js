export const SKILLS = [
  // Frameworks & UI (Group 0)
  { name: 'React', group: 0, color: 'text-cyan-400', slug: 'react' },
  { name: 'Svelte', group: 0, color: 'text-orange-600', slug: 'svelte' },
  { name: 'SvelteKit', group: 0, color: 'text-orange-500', slug: 'svelte' },
  { name: 'SolidJS', group: 0, color: 'text-blue-400', slug: 'solid' },
  { name: 'Tailwind', group: 0, color: 'text-cyan-300', slug: 'tailwindcss' },
  { name: 'Emotion', group: 0, color: 'text-pink-400', icon: 'EM' },

  // Core & Backend (Group 1)
  {
    name: 'JavaScript',
    group: 1,
    color: 'text-yellow-400',
    slug: 'javascript',
  },
  { name: 'TypeScript', group: 1, color: 'text-blue-500', slug: 'typescript' },
  { name: 'HTML', group: 1, color: 'text-orange-400', slug: 'html5' },
  { name: 'CSS', group: 1, color: 'text-blue-400', slug: 'css' }, // Enforcing blue color
  { name: 'Node.js', group: 1, color: 'text-green-500', slug: 'nodedotjs' },
  { name: 'Express', group: 1, color: 'text-gray-400', slug: 'express/white' }, // Enforcing white color for visibility

  // State, Test & Build (Group 2)
  { name: 'Redux', group: 2, color: 'text-purple-500', slug: 'redux' },
  { name: 'Jest', group: 2, color: 'text-red-400', slug: 'jest' },
  { name: 'RTL', group: 2, color: 'text-red-300', slug: 'testinglibrary' },
  { name: 'Webpack', group: 2, color: 'text-blue-300', slug: 'webpack' },
  { name: 'Vite', group: 2, color: 'text-purple-400', slug: 'vite' },

  // Tools (Group 3)
  { name: 'Git', group: 3, color: 'text-orange-500', slug: 'git' },
  { name: 'Grafana', group: 3, color: 'text-orange-400', slug: 'grafana' },
  { name: 'n8n', group: 3, color: 'text-red-500', slug: 'n8n' },
  { name: 'AWS', group: 3, color: 'text-orange-500', icon: 'AWS' },
  { name: 'GTM', group: 3, color: 'text-blue-500', slug: 'googletagmanager' },
  { name: 'Adobe Analytics', group: 3, color: 'text-red-600', icon: 'AA' },
  { name: 'Mixpanel', group: 3, color: 'text-purple-600', slug: 'mixpanel' },
];

// 3D Math Constants
const GLOBE_RADIUS = 120;
const PERSPECTIVE = 800;

export const calculatePosition = (index, groupIndex, skills, rotation, isMobile = false) => {
  // 1. Globe State (Fibonacci Sphere with Rotation)
  // 1. Globe State (Fibonacci Sphere with Rotation)
  // Calculate static position on sphere
  const phi = Math.acos(-1 + (2 * index) / skills.length);
  const theta = Math.sqrt(skills.length * Math.PI) * phi;

  const globeRadius = isMobile ? 90 : 120;
  
  // Base coordinates (Static Sphere)
  const x0 = globeRadius * Math.cos(theta) * Math.sin(phi);
  const y0 = globeRadius * Math.sin(theta) * Math.sin(phi);
  const z0 = globeRadius * Math.cos(phi);

  // Apply Rotation (Rotate around Y-axis for horizontal spin)
  // x' = x*cos(r) - z*sin(r)
  // z' = x*sin(r) + z*cos(r)
  // y' = y
  
  // Add a slight tilt (Rotate X slightly?) - Optional, let's keep it simple first
  // Actually, mixing X and Y rotation looks better.
  // Let's do a simple Y-axis spin first as requested.
  
  const x3D = x0 * Math.cos(rotation) - z0 * Math.sin(rotation);
  const y3D = y0; 
  const z3D = x0 * Math.sin(rotation) + z0 * Math.cos(rotation);

  const scaleGlobe = PERSPECTIVE / (PERSPECTIVE + z3D);
  const xGlobe = x3D * scaleGlobe;
  const yGlobe = y3D * scaleGlobe;
  const zIndexGlobe = Math.floor(scaleGlobe * 100);

  // 2. Grid State
  let xGrid, yGrid;

  if (isMobile) {
    // Mobile: 2-column grid layout with proper spacing
    const mobileRowHeight = 52; // Increased row height for better spacing
    const columnSpacing = 85; // Horizontal spacing between columns
    
    // Calculate total rows needed for all items above current group
    let totalRowsAbove = 0;
    for (let g = 0; g < groupIndex; g++) {
      const groupCount = skills.filter((s) => s.group === g).length;
      totalRowsAbove += Math.ceil(groupCount / 2);
    }
    
    const groupItems = skills.filter((s) => s.group === groupIndex);
    const itemIndexInGroup = groupItems.findIndex((s) => s.name === skills[index].name);
    
    // 2-column zigzag: left column (-columnSpacing), right column (+columnSpacing)
    xGrid = itemIndexInGroup % 2 === 0 ? -columnSpacing : columnSpacing;
    
    // Calculate Y position: start from top, add rows from previous groups + current row
    const startY = -180; // Starting Y position
    const currentRow = Math.floor(itemIndexInGroup / 2);
    yGrid = startY + (totalRowsAbove + currentRow) * mobileRowHeight;
    
  } else {
    // Desktop: Horizontal Spread
    const colWidth = 180;
    xGrid = (groupIndex - 1.5) * colWidth + (groupIndex > 1 ? 40 : -40);
    const groupItems = skills.filter((s) => s.group === groupIndex);
    const itemIndexInGroup = groupItems.findIndex((s) => s.name === skills[index].name);
    yGrid = -160 + itemIndexInGroup * 50;
  }

  return { xGlobe, yGlobe, xGrid, yGrid, scaleGlobe, zIndexGlobe };
};
