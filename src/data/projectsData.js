import {
  Activity,
  Terminal,
  Palette,
  BarChart3,
  AlertTriangle,
  Link,
} from 'lucide-react';

export const PROJECTS = [
  {
    id: 'twa-lens',
    title: 'The TWA Lens',
    subtitle:
      'An internal, on-device WebView debugging tool built to solve the black-box nature of mobile WebViews.',
    description:
      "A breakthrough internal tool built for AngelOne to solve the 'Black Box' problem of mobile WebViews. Traditionally, debugging issues inside a WebView required tethering devices to a laptop (USB debugging), which was impossible for field issues or non-dev devices. TWA Lens injects a powerful DevTools suite directly into the app, allowing developers and QA engineers to inspect network traffic, view console logs, and even tweak CSS on the fly—all without a single cable.",
    tags: ['AngelOne', 'Internal Tool', 'Mobile-First'],
    color: 'text-cyan-400',
    gradient: 'from-cyan-500/10 to-blue-500/10',
    features: [
      {
        title: 'Network Inspector',
        desc: 'Mock APIs & inspect headers.',
        icon: Activity,
        color: 'text-green-400',
      },
      {
        title: 'Console Streaming',
        desc: 'Real-time logs on-device.',
        icon: Terminal,
        color: 'text-blue-400',
      },
      {
        title: 'CSS Inspector',
        desc: 'Edit styles live.',
        icon: Palette,
        color: 'text-pink-400',
      },
      {
        title: 'Perf Monitor',
        desc: 'Web Vitals & Waterfall.',
        icon: BarChart3,
        color: 'text-amber-400',
      },
    ],
  },
  {
    id: 'dev-extension',
    title: 'Nykaa Dev Extension',
    subtitle:
      'A specialized Chrome Extension for Nykaa engineering and sales teams.',
    description:
      'Automates HTML inspection, detects corrupted URLs during sales, and helps extract deep links for marketing campaigns.',
    tags: ['Internal Tool', 'Productivity'],
    color: 'text-pink-400',
    gradient: 'from-pink-500/10 to-rose-500/10',
    features: [
      {
        title: 'Link Health Check',
        desc: 'Scan page for 404/corrupted URLs.',
        icon: AlertTriangle,
        color: 'text-red-400',
      },
      {
        title: 'Smart URL Extractor',
        desc: 'Get deep links from any element.',
        icon: Link,
        color: 'text-blue-400',
      },
      {
        title: 'Sales Readiness',
        desc: 'Verify landing pages instantly.',
        icon: Activity,
        color: 'text-green-400',
      },
    ],
  },
];
