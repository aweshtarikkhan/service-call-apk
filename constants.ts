
import { CategoryType, type Service, type Testimonial, type Provider, type User, type BookingDetails, type RegistrationForm } from './types';

export const CATEGORIES = Object.values(CategoryType);

export const SERVICES: Service[] = [
  // AC & Appliance Repair (Expanded)
  {
    id: 'ac1',
    name: 'Split AC Gas Charging',
    description: 'Complete gas refill with leak testing and pressure check.',
    price: 2499,
    rating: 4.8,
    reviews: 1250,
    image: 'https://images.unsplash.com/photo-1590756254933-2873d72a83b6?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.AC_APPLIANCE,
    duration: '1.5 Hours'
  },
  {
    id: 'ref1',
    name: 'Double Door Refrigerator Repair',
    description: 'Fixing cooling issues, gas refill, or compressor replacement for double door units.',
    price: 499,
    rating: 4.9,
    reviews: 670,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.AC_APPLIANCE,
    duration: '1 Hour'
  },
  {
    id: 'ref2',
    name: 'Single Door Refrigerator Checkup',
    description: 'General service and repair for single door fridges. Includes thermostat check.',
    price: 299,
    rating: 4.7,
    reviews: 430,
    image: 'https://images.unsplash.com/photo-1571175432244-933e721516e4?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.AC_APPLIANCE,
    duration: '45 mins'
  },
  {
    id: 'mw1',
    name: 'Convection Microwave Repair',
    description: 'Fixing heating issues, turntable motors, or keypad faults in convection models.',
    price: 399,
    rating: 4.8,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.AC_APPLIANCE,
    duration: '1 Hour'
  },
  {
    id: 'mw2',
    name: 'Solo Microwave Service',
    description: 'Professional cleaning and component checkup for solo microwave ovens.',
    price: 199,
    rating: 4.6,
    reviews: 150,
    image: 'https://images.unsplash.com/photo-1585659722982-bbd632288b70?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.AC_APPLIANCE,
    duration: '30 mins'
  },
  {
    id: 'tv1',
    name: 'LED/Smart TV Repair',
    description: 'Fixing display issues, sound faults, or motherboard repairs for all TV brands.',
    price: 599,
    rating: 4.7,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.AC_APPLIANCE,
    duration: '1.5 Hours'
  },
  {
    id: 'ro1',
    name: 'Water Purifier (RO) Service',
    description: 'Filter replacement, membrane cleaning, and TDS level adjustment.',
    price: 499,
    rating: 4.9,
    reviews: 1100,
    image: 'https://images.unsplash.com/photo-1585830812416-a6c86bb14576?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.AC_APPLIANCE,
    duration: '1 Hour'
  },
  {
    id: 'wm1',
    name: 'Fully Automatic Washing Machine',
    description: 'Repair for drum noise, PCB issues, or water leakage.',
    price: 450,
    rating: 4.8,
    reviews: 760,
    image: 'https://images.unsplash.com/photo-1582733711316-f4d0484ebf1b?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.AC_APPLIANCE,
    duration: '1 Hour'
  },
  {
    id: 'mix1',
    name: 'Mixer Grinder/Juicer Repair',
    description: 'Motor winding, carbon brush replacement, or jar blade fixing.',
    price: 149,
    rating: 4.5,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.AC_APPLIANCE,
    duration: '30 mins'
  },

  // Home Cleaning
  {
    id: 'cl1',
    name: 'Full Home Deep Cleaning',
    description: 'Intense machine cleaning of all rooms, kitchen, and toilets.',
    price: 3499,
    rating: 4.9,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.CLEANING,
    duration: '5-6 Hours'
  },
  {
    id: 'cl2',
    name: 'Sofa/Carpet Spa',
    description: 'Dry vacuuming and wet shampooing for deep stain removal.',
    price: 599,
    rating: 4.8,
    reviews: 430,
    image: 'https://images.unsplash.com/photo-1556911220-e15595b6a781?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.CLEANING,
    duration: '2 Hours'
  },

  // Plumbing
  {
    id: 'pl1',
    name: 'Water Tank Deep Cleaning',
    description: 'High-pressure cleaning for overhead or underground tanks.',
    price: 999,
    rating: 4.8,
    reviews: 450,
    image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.PLUMBING,
    duration: '2 Hours'
  },

  // Electrician
  {
    id: 'el1',
    name: 'Inverter Repair/Setup',
    description: 'Fixing backup issues or installing new inverter batteries.',
    price: 499,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.ELECTRICIAN,
    duration: '1 Hour'
  },

  // Painting & Renovation
  {
    id: 'pt1',
    name: 'Interior Wall Painting',
    description: 'Putty, primer, and top-coat painting for home interiors.',
    price: 15000,
    rating: 4.9,
    reviews: 340,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.PAINTING,
    duration: '5 Days'
  },

  // Beauty Men's Salon
  {
    id: 'bm1',
    name: "Classic Haircut",
    description: 'Professional haircut styled by experts at your home.',
    price: 199,
    rating: 4.8,
    reviews: 1400,
    image: 'https://images.unsplash.com/photo-1621605815841-aa88a83b991f?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.BEAUTY_MEN,
    duration: '30 mins'
  },

  // Beauty Women
  {
    id: 'bw1',
    name: "Herbal Facial",
    description: 'Refreshing facial with natural extracts for glowing skin.',
    price: 799,
    rating: 4.8,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.BEAUTY_WOMEN,
    duration: '1 Hour'
  },

  // Pest Control
  {
    id: 'pc1',
    name: 'General Pest Control',
    description: 'Spray treatment for cockroaches, ants, and spiders.',
    price: 799,
    rating: 4.8,
    reviews: 650,
    image: 'https://images.unsplash.com/photo-1583244532610-2ca22111b285?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.PEST_CONTROL,
    duration: '1 Hour'
  },

  // Carpentry
  {
    id: 'cp1',
    name: 'Furniture Repair',
    description: 'Fixing loose hinges, drawer sliders, or broken handles.',
    price: 249,
    rating: 4.8,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.CARPENTRY,
    duration: '45 mins'
  },

  // Car Rental
  {
    id: 'cr1',
    name: 'Local City Rental',
    description: 'Rent a car for local city use with professional driver.',
    price: 1500,
    rating: 4.8,
    reviews: 430,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.CAR_RENTAL,
    duration: '8 Hours'
  },

  // Daily Labour
  {
    id: 'lb1',
    name: 'Construction Labour',
    description: 'Skilled labour for construction site help and lifting.',
    price: 600,
    rating: 4.8,
    reviews: 3200,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.LABOUR,
    duration: '8 Hours'
  },

  // Mistri (Mason)
  {
    id: 'ms1',
    name: 'Floor Tile Fitting',
    description: 'Precision tile installation for bedrooms, kitchen, or halls.',
    price: 45,
    rating: 4.8,
    reviews: 190,
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.MISTRI,
    duration: 'Per Sq Ft'
  },

  // House Helper (Bai)
  {
    id: 'hh1',
    name: 'Regular House Cleaning',
    description: 'Sweeping, mopping, and dusting helper for your home.',
    price: 499,
    rating: 4.6,
    reviews: 1200,
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.HOUSE_HELPER,
    duration: '8 Hours'
  },

  // Welding
  {
    id: 'wd1',
    name: 'Iron Gate/Grill Repair',
    description: 'Welding and fixing of iron gates, shutters, or window grills.',
    price: 450,
    rating: 4.8,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.WELDING,
    duration: 'Per Job'
  },

  // Ceiling & Wall Panels
  {
    id: 'rp1',
    name: 'PVC Ceiling Panels',
    description: 'Modern PVC panels for ceiling with luxury designs.',
    price: 65,
    rating: 4.9,
    reviews: 230,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.ROOF_PANEL,
    duration: 'Per Sq Ft'
  }
];

export const PROVIDERS: Provider[] = [
  {
    id: 'p1',
    name: 'Vikram Singh',
    rating: 4.9,
    bio: 'Expert electrician with over 8 years of experience in residential wiring.',
    image: 'https://picsum.photos/200/200?random=50',
    categories: [CategoryType.ELECTRICIAN, CategoryType.AC_APPLIANCE],
    completedJobs: 1240,
    experience: '8 Years'
  },
  {
    id: 'p2',
    name: 'Sunita Sharma',
    rating: 4.8,
    bio: 'Certified beautician specializing in bridal makeup and skin treatments.',
    image: 'https://picsum.photos/200/200?random=55',
    categories: [CategoryType.BEAUTY_WOMEN],
    completedJobs: 890,
    experience: '5 Years'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Local Shop Owner",
    content: "Service on Call is a blessing for our town. The welder fixed my shop's shutter perfectly.",
    image: "https://picsum.photos/100/100?random=20"
  }
];

export const INITIAL_USERS: User[] = [
    { username: 'admin', password: 'password', role: 'ADMIN', name: 'Super Admin' }
];

export const INITIAL_BOOKINGS: BookingDetails[] = [];
export const INITIAL_REGISTRATIONS: RegistrationForm[] = [];
