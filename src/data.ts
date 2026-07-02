import { ServiceItem, ReviewItem } from './types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-house-wiring',
    name: 'House Wiring',
    description: 'Complete or partial electrical wiring for new/existing homes, apartments, and extensions with premium safety-grade fire-resistant copper wire.',
    price: '₹1,499 onwards',
    duration: '1 - 2 Days',
    category: 'Installation & Renovation',
    iconName: 'Cable'
  },
  {
    id: 'srv-fan-install',
    name: 'Fan Installation',
    description: 'Quick & safe mounting of ceiling, wall-mount, or exhaust fans. Includes regulator connection and balancing test.',
    price: '₹149 per fan',
    duration: '30 - 45 Mins',
    category: 'Appliance Fitting',
    iconName: 'Wind'
  },
  {
    id: 'srv-switch-repair',
    name: 'Switch & Socket Repair',
    description: 'Replacement or repair of loose switches, burnt sockets, dimmer regulators, bell connections, and power points.',
    price: '₹99 onwards',
    duration: '20 - 40 Mins',
    category: 'Repairs & Fixes',
    iconName: 'ToggleRight'
  },
  {
    id: 'srv-mcb-install',
    name: 'MCB Installation',
    description: 'Installation or replacement of MCB (Miniature Circuit Breaker), RCCB, or main distribution board to protect against short circuits and overloads.',
    price: '₹299 per unit',
    duration: '45 - 60 Mins',
    category: 'Safety & Surge',
    iconName: 'ShieldAlert'
  },
  {
    id: 'srv-led-light',
    name: 'LED Light Installation',
    description: 'Aesthetic installation of LED panel lights, strip lights, spotlights, chandeliers, tube lights, and external flood lights.',
    price: '₹120 onwards',
    duration: '30 - 50 Mins',
    category: 'Lighting Design',
    iconName: 'Lightbulb'
  },
  {
    id: 'srv-inverter-install',
    name: 'Inverter Installation',
    description: 'Full setup of home inverter system, battery connection, water level check, and backup routing to specific room lines.',
    price: '₹599 onwards',
    duration: '1 - 1.5 Hours',
    category: 'Power Backup',
    iconName: 'Cpu'
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Rajesh Sharma',
    rating: 5,
    comment: 'Super fast service! Anil arrived within 20 minutes for our MCB tripping problem. Explained everything clearly and solved the issue quickly.',
    date: 'Yesterday',
    serviceUsed: 'MCB Installation',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Sunita Deshmukh',
    rating: 5,
    comment: 'Giri Electric did the complete wiring of our new flat. Excellent workmanship, used high-quality materials, and kept the place clean.',
    date: '4 days ago',
    serviceUsed: 'House Wiring',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Amit Goel',
    rating: 4,
    comment: 'Booked fan installation and switch board replacement. Very professional team. Highly recommended for electrical work in this area.',
    date: '1 week ago',
    serviceUsed: 'Fan Installation',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Pooja Verma',
    rating: 5,
    comment: 'Prompt and reliable. The inverter backup routing was done properly. Best customer service!',
    date: '2 weeks ago',
    serviceUsed: 'Inverter Installation',
    verified: true
  }
];
