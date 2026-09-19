import React from 'react';
import {
  FaCar,
  FaSprayCan,
  FaWrench,
  FaCouch,
  FaShower,
  FaLightbulb
} from 'react-icons/fa';
import { MdLocalCarWash } from 'react-icons/md';

export type VehicleTypeId = 'hatchback' | 'sedan' | 'suv' | 'luxury';

export interface VehicleType {
  id: VehicleTypeId;
  name: string;
  icon: string;
}

export const VEHICLE_TYPES: VehicleType[] = [
  { id: 'hatchback', name: 'Hatchback', icon: '🚗' },
  { id: 'sedan', name: 'Sedan', icon: '🚘' },
  { id: 'suv', name: 'SUV / Compact SUV', icon: '🚙' },
  { id: 'luxury', name: 'Luxury / Supercar', icon: '🏎️' },
];

export interface ServicePackage {
  id: string;
  title: string;
  icon: React.ReactNode;
  tagline: string;
  startingPrice: string;
  description: string;
  features: string[];
  prices: Record<VehicleTypeId, number>;
  type: 'service';
}

export interface MonthlyPackage {
  id: string;
  name: string;
  tagline: string;
  startingPrice: string;
  popular: boolean;
  badge?: string;
  features: string[];
  prices: Record<VehicleTypeId, number>;
  type: 'monthly';
}

export type AnyPackage = ServicePackage | MonthlyPackage;

export const SERVICES: ServicePackage[] = [
  {
    id: 'standard-wash',
    title: 'Standard Wash',
    icon: <MdLocalCarWash className="text-3xl text-yellow-400" />,
    tagline: 'Essential everyday cleaning for your car.',
    startingPrice: 'Starting at ₹ 499',
    description: 'A quick and thorough cleaning for your daily drive. Includes a gentle exterior foam wash, inside vacuuming, and shiny tyre dressing to keep your car looking fresh.',
    features: ['Exterior Foam wash', 'Interior Vaccuming', 'Tyre Dressing'],
    prices: {
      hatchback: 499,
      sedan: 599,
      suv: 699,
      luxury: 699,
    },
    type: 'service',
  },
  {
    id: 'premium-ceramic-wash',
    title: 'Premium Ceramic Wash',
    icon: <FaCar className="text-3xl text-yellow-400" />,
    tagline: 'Extra shine and hidden dirt removal.',
    startingPrice: 'Starting at ₹ 699',
    description: 'Get a glowing ceramic wash that repels water for weeks. This package also includes underbody washing to remove hidden dirt and AC vent steaming for fresher air inside.',
    features: ['Exterior Ceramic Wash', 'AC Vent Steaming', 'Underbody wash'],
    prices: {
      hatchback: 699,
      sedan: 799,
      suv: 899,
      luxury: 899,
    },
    type: 'service',
  },
  {
    id: 'exterior-detailing',
    title: 'Exterior Detailing',
    icon: <FaSprayCan className="text-3xl text-yellow-400" />,
    tagline: 'Complete outside cleaning and shine.',
    startingPrice: 'Starting at ₹ 1,199',
    description: "Bring back your car's outer beauty. We remove tough stains like tar, iron, and water spots, wash the underbody thoroughly, and apply a premium wax coating for a glossy finish.",
    features: [
      'Pre Wash',
      'Foam Wash',
      'Glass Cleaning',
      'Tyre Detialing and Dressing',
      'Iron Removing',
      'Tar Removing',
      'Rain repellent',
      'Underbody Wash',
      'Premium Wax Coating',
      'Water Spot Removing *',
    ],
    prices: {
      hatchback: 1199,
      sedan: 1199,
      suv: 1199,
      luxury: 1199,
    },
    type: 'service',
  },
  {
    id: 'interior-detailing',
    title: 'Interior Detailing',
    icon: <FaCouch className="text-3xl text-yellow-400" />,
    tagline: 'A fresh, spotless cabin.',
    startingPrice: 'Starting at ₹ 1,499',
    description: "A complete makeover for your car's interior. We deep clean the seats, roof, doors, and dashboard, plus steam the AC vents to give you a clean and healthy ride.",
    features: [
      'Interior Deep Claning and Vaccuming',
      'Doorpad Deep Cleaning',
      'Dashboard Deep Cleaning and Polishing',
      'Seat Cleaning *',
      'Roof Cleaning *',
      'AC Vent Steaming',
      'Trunk Vaccuming',
    ],
    prices: {
      hatchback: 1499,
      sedan: 1499,
      suv: 1499,
      luxury: 1499,
    },
    type: 'service',
  },
  {
    id: 'deep-care',
    title: 'Deep Care',
    icon: <FaWrench className="text-3xl text-yellow-400" />,
    tagline: 'Full inside and outside detailing.',
    startingPrice: 'Starting at ₹ 2,099',
    description: 'The ultimate combo of our interior and exterior detailing packages. We clean your car from top to bottom, including special care for your engine bay and restoring your car\'s exterior logos.',
    features: [
      'Pre Wash',
      'Foam Wash',
      'Glass Cleaning',
      'Tyre Detialing and Dressing',
      'Iron Removing',
      'Tar Removing',
      'Rain repellent',
      'Underbody Wash',
      'Premium Wax Coating',
      'Water Spot Removing *',
      'Logo Restoration',
      'Interior Deep Claning and Vaccuming',
      'Doorpad Deep Cleaning',
      'Dashboard Deep Cleaning and Polishing',
      'Seat Cleaning *',
      'Roof Cleaning *',
      'AC Vent Steaming',
      'Trunk Vaccuming',
      'Engine Bay Cleaning *',
    ],
    prices: {
      hatchback: 2099,
      sedan: 2099,
      suv: 2099,
      luxury: 2099,
    },
    type: 'service',
  },
  {
    id: 'deep-care-plus',
    title: 'Deep Care Plus',
    icon: <FaLightbulb className="text-3xl text-yellow-400" />,
    tagline: 'Advanced protection and deep sanitation.',
    startingPrice: 'Starting at ₹ 3,499',
    description: 'Take your car care to the next level. This package adds a smooth clay bar treatment, a long-lasting ceramic spray coating, and antibacterial steam cleaning to make your car feel brand new.',
    features: [
      'Pre Wash',
      'Foam Wash',
      'Ceramic Spray Sealant Coating',
      'Interior Steaming and Antibacterials Treatment',
      'Glass Cleaning',
      'Tyre Detialing and Dressing',
      'Iron Removing',
      'Tar Removing',
      'Rain repellent',
      'Underbody Wash',
      'Water Spot Removing *',
      'Logo Restoration',
      'Interior Deep Claning and Vaccuming',
      'Doorpad Deep Cleaning',
      'Dashboard Deep Cleaning and Polishing',
      'Seat Cleaning *',
      'Roof Cleaning *',
      'AC Vent Steaming and Cleaning Using Duct Foam',
      'Trunk Vaccuming',
      'Engine Bay Cleaning *',
      'Clay Bar Treatment',
    ],
    prices: {
      hatchback: 3499,
      sedan: 3499,
      suv: 3499,
      luxury: 3499,
    },
    type: 'service',
  },
  {
    id: 'dustx-premium-care',
    title: 'DustX Premium Care',
    icon: <FaShower className="text-3xl text-yellow-400" />,
    tagline: 'Our absolute best, top-to-bottom clean.',
    startingPrice: 'Starting at ₹ 6,999',
    description: 'Our most complete detailing package. It includes everything from the Deep Care Plus package, but we also completely remove the seats to clean every single hidden corner of your car\'s interior.',
    features: [
      'Pre Wash',
      'Foam Wash',
      'Ceramic Spray Sealant Coating',
      'Complete Seat Removal and Deep Cleaning',
      'Interior Steaming and Antibacterials Treatment',
      'Glass Cleaning',
      'Tyre Detialing and Dressing',
      'Iron Removing',
      'Tar Removing',
      'Rain repellent',
      'Underbody Wash',
      'Premium Wax Coating',
      'Water Spot Removing *',
      'Logo Restoration',
      'Interior Deep Claning and Vaccuming',
      'Doorpad Deep Cleaning',
      'Dashboard Deep Cleaning and Polishing',
      'Seat Cleaning *',
      'Roof Cleaning',
      'AC Vent Steaming and Cleaning Using Duct Foam',
      'Trunk Vaccuming',
      'Engine Bay Cleaning *',
      'Clay Bar Treatment',
    ],
    prices: {
      hatchback: 6999,
      sedan: 6999,
      suv: 6999,
      luxury: 6999,
    },
    type: 'service',
  },
];

export const MONTHLY_PACKAGES: MonthlyPackage[] = [
  {
    id: 'monthly-standard-wash',
    name: 'Monthly Standard Wash',
    startingPrice: '₹ 899',
    tagline: 'Essential Maintenance',
    popular: false,
    badge: 'Quick Care',
    features: [
      '4 Exterior Wash',
      '2 Interior Cleaning and Vaccuming',
      '1 Trunk Vaccuming',
      '2 Tyre Dressing',
      '1 AC Vent Steaming',
      '1 Underbody Wash',
    ],
    prices: {
      hatchback: 899,
      sedan: 999,
      suv: 1099,
      luxury: 1199,
    },
    type: 'monthly',
  },
  {
    id: 'monthly-premium-wash',
    name: 'Monthly Premium Wash',
    startingPrice: '₹ 1,199',
    tagline: 'Premium Washing Service',
    popular: true,
    badge: 'MOST POPULAR',
    features: [
      '1 Wax Coating',
      '4 Exterior Wash',
      '2 Interior Cleaning and Vaccuming',
      '1 Trunk Vaccuming',
      '2 Tyre Dressing',
      '2 AC Vent Steaming',
      '2 Underbody Wash',
    ],
    prices: {
      hatchback: 1199,
      sedan: 1299,
      suv: 1399,
      luxury: 1499,
    },
    type: 'monthly',
  },
  {
    id: 'platinum-monthly-detail',
    name: 'Platinum Monthly Detail',
    startingPrice: '₹ 1,499',
    tagline: 'PLATINUM MAINTENANCE',
    popular: false,
    badge: 'ULTIMATE GLOSS',
    features: [
      'Rain Repellent',
      'Antibacterial treatment',
      '1 Wax Coating',
      '4 Exterior Wash',
      '2 Interior Cleaning and Vaccuming',
      '1 Trunk Vaccuming',
      '2 Tyre Dressing',
      '2 AC Vent Steaming',
      '2 Underbody Wash',
    ],
    prices: {
      hatchback: 1499,
      sedan: 1599,
      suv: 1699,
      luxury: 1799,
    },
    type: 'monthly',
  },
];

export const TREATMENT_NAME_MAP: Record<string, string> = {
  'seat deep cleaning': 'Interior Detailing',
  'tyre detailing and dressing': 'Exterior Detailing',
  'headlight restoration': 'Exterior Detailing',
  'basic wash': 'Standard Wash',
  'dustx pro': 'Deep Care',
  'ultimate detail': 'DustX Premium Care',
  'paint correction & ceramic': 'Deep Care Plus',
  'interior steam restoration': 'Interior Detailing',
  'headlight lens restoration': 'Exterior Detailing',
};

/**
 * Searches for a service or monthly package matching the given name or title.
 */
export function findPackageByName(nameOrTitle?: string): AnyPackage | undefined {
  if (!nameOrTitle) return undefined;
  const normalized = nameOrTitle.trim().toLowerCase();

  // 1. Direct exact or includes match on Single-Time Services
  const directService = SERVICES.find(
    s => s.title.toLowerCase() === normalized || s.id === normalized
  );
  if (directService) return directService;

  // 2. Direct exact or includes match on Monthly Packages
  const directMonthly = MONTHLY_PACKAGES.find(
    m => m.name.toLowerCase() === normalized || m.id === normalized
  );
  if (directMonthly) return directMonthly;

  // 3. Mapping from transformation treatments / legacy package names
  const mappedTitle = TREATMENT_NAME_MAP[normalized];
  if (mappedTitle) {
    const mappedService = SERVICES.find(s => s.title.toLowerCase() === mappedTitle.toLowerCase());
    if (mappedService) return mappedService;
  }

  // 4. Substring fallback match
  const fuzzyService = SERVICES.find(s => s.title.toLowerCase().includes(normalized) || normalized.includes(s.title.toLowerCase()));
  if (fuzzyService) return fuzzyService;

  const fuzzyMonthly = MONTHLY_PACKAGES.find(m => m.name.toLowerCase().includes(normalized) || normalized.includes(m.name.toLowerCase()));
  if (fuzzyMonthly) return fuzzyMonthly;

  return undefined;
}

export function isMonthlyPackage(pkg: AnyPackage): pkg is MonthlyPackage {
  return pkg.type === 'monthly';
}

export function getPackagePrice(pkg: AnyPackage, vehicleId: VehicleTypeId): number {
  return pkg.prices[vehicleId] ?? pkg.prices.hatchback;
}
