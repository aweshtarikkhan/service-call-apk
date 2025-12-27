
import { CategoryType, type Service, type Testimonial, type Provider, type User, type BookingDetails, type RegistrationForm } from './types';

export const CATEGORIES = Object.values(CategoryType);

export const SERVICES: Service[] = [
  // AC & Appliance Repair
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
    id: 'ac2',
    name: 'Washing Machine Checkup',
    description: 'Repair for drain issues, drum noise, or electrical faults.',
    price: 299,
    rating: 4.7,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1582733711316-f4d0484ebf1b?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.AC_APPLIANCE,
    duration: '45 mins'
  },
  {
    id: 'ac3',
    name: 'Microwave/Oven Repair',
    description: 'Heating issues, keypad repair, or power supply faults.',
    price: 399,
    rating: 4.6,
    reviews: 420,
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.AC_APPLIANCE,
    duration: '1 Hour'
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
  {
    id: 'cl3',
    name: 'Kitchen Deep Cleaning',
    description: 'Degreasing of chimneys, tiles, cabinets, and platforms.',
    price: 1299,
    rating: 4.7,
    reviews: 560,
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.CLEANING,
    duration: '3 Hours'
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
  {
    id: 'pl2',
    name: 'Tap & Leakage Repair',
    description: 'Fixing leaking faucets, pipes, or new tap installation.',
    price: 149,
    rating: 4.7,
    reviews: 3100,
    image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.PLUMBING,
    duration: '30 mins'
  },
  {
    id: 'pl3',
    name: 'Toilet/Flush Repair',
    description: 'Repairing flush tanks, siphons, or commode leakages.',
    price: 399,
    rating: 4.6,
    reviews: 820,
    image: 'https://images.unsplash.com/photo-1543674892-7d64d45df18b?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.PLUMBING,
    duration: '1 Hour'
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
  {
    id: 'el2',
    name: 'Fan Installation/Repair',
    description: 'Installing ceiling fans or repairing motor issues.',
    price: 199,
    rating: 4.7,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1618142134780-606b2995393a?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.ELECTRICIAN,
    duration: '45 mins'
  },
  {
    id: 'el3',
    name: 'Switchboard Repair',
    description: 'Replacing burnt switches, sockets, or repairing wiring.',
    price: 149,
    rating: 4.8,
    reviews: 3400,
    image: 'https://images.unsplash.com/photo-1621905252507-b354bcadc8d0?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.ELECTRICIAN,
    duration: '30 mins'
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
  {
    id: 'pt2',
    name: 'Waterproofing Service',
    description: 'Roof or wall treatment to stop seepage and dampness.',
    price: 5000,
    rating: 4.8,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.PAINTING,
    duration: '2 Days'
  },
  {
    id: 'pt3',
    name: 'Exterior Texture Paint',
    description: 'Durable weather-proof painting for outer home walls.',
    price: 25000,
    rating: 4.7,
    reviews: 80,
    image: 'https://images.unsplash.com/photo-1562259920-56d113576722?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.PAINTING,
    duration: '7 Days'
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
  {
    id: 'bm2',
    name: "Relaxing Head Massage",
    description: 'Soothing massage with herbal oils to relieve stress.',
    price: 299,
    rating: 4.9,
    reviews: 800,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.BEAUTY_MEN,
    duration: '45 mins'
  },
  {
    id: 'bm3',
    name: "Shaving & Beard Grooming",
    description: 'Clean shave or stylish beard trimming with after-shave care.',
    price: 149,
    rating: 4.7,
    reviews: 1100,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.BEAUTY_MEN,
    duration: '20 mins'
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
  {
    id: 'bw2',
    name: "Pedicure & Manicure",
    description: 'Complete nail and skin care for hands and feet.',
    price: 599,
    rating: 4.9,
    reviews: 1500,
    image: 'https://images.unsplash.com/photo-1610992015732-2449b0de3509?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.BEAUTY_WOMEN,
    duration: '1.5 Hours'
  },
  {
    id: 'bw3',
    name: "Waxing Service",
    description: 'Smooth skin with gentle chocolate or honey wax.',
    price: 499,
    rating: 4.7,
    reviews: 3200,
    image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=400',
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
  {
    id: 'pc2',
    name: 'Termite Protection (Warranty)',
    description: 'Drill-fill-seal treatment to protect all wooden fittings.',
    price: 2499,
    rating: 4.9,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1511174511562-5f7f185854c8?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.PEST_CONTROL,
    duration: '3 Hours'
  },
  {
    id: 'pc3',
    name: 'Mosquito Fogging Service',
    description: 'Fogging for outdoors and gardens to prevent malaria/dengue.',
    price: 499,
    rating: 4.5,
    reviews: 150,
    image: 'https://images.unsplash.com/photo-1584622781564-27928b577000?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.PEST_CONTROL,
    duration: '30 mins'
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
  {
    id: 'cp2',
    name: 'New Wardrobe Making',
    description: 'Customized plywood wardrobes with sunmica finish.',
    price: 12000,
    rating: 4.9,
    reviews: 430,
    image: 'https://images.unsplash.com/photo-1551000100-33671239c0d3?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.CARPENTRY,
    duration: '3-5 Days'
  },
  {
    id: 'cp3',
    name: 'Door/Window Fitting',
    description: 'Installation of new wooden doors, frames, or mesh screens.',
    price: 800,
    rating: 4.7,
    reviews: 560,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.CARPENTRY,
    duration: '2 Hours'
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
  {
    id: 'cr2',
    name: 'Outstation Travel',
    description: 'Round trip or one-way car rental for inter-city travel.',
    price: 2500,
    rating: 4.9,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.CAR_RENTAL,
    duration: 'Per Day'
  },
  {
    id: 'cr3',
    name: 'Luxury Car for Event',
    description: 'Premium cars for weddings, VIP events, or special occasions.',
    price: 8000,
    rating: 4.7,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.CAR_RENTAL,
    duration: '12 Hours'
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
  {
    id: 'lb2',
    name: 'Garden Labour',
    description: 'Helper for digging, planting, and heavy garden work.',
    price: 500,
    rating: 4.7,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1599423300746-b62533397394?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.LABOUR,
    duration: '6 Hours'
  },
  {
    id: 'lb3',
    name: 'Loading/Unloading Help',
    description: 'Strong helpers for shifting items or truck unloading.',
    price: 400,
    rating: 4.6,
    reviews: 1500,
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.LABOUR,
    duration: 'Per Load'
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
  {
    id: 'ms2',
    name: 'Brick & Wall Plaster',
    description: 'Construction of new walls or plastering old ones.',
    price: 35,
    rating: 4.7,
    reviews: 430,
    image: 'https://images.unsplash.com/photo-1590069230002-70cc69476052?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.MISTRI,
    duration: 'Per Sq Ft'
  },
  {
    id: 'ms3',
    name: 'Concrete Work',
    description: 'Laying concrete for floors, roofs, or driveways.',
    price: 55,
    rating: 4.9,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.MISTRI,
    duration: 'Per Job'
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
  {
    id: 'hh2',
    name: 'Utensil/Dish Cleaning',
    description: 'Dedicated helper for cleaning kitchen vessels and dishes.',
    price: 199,
    rating: 4.8,
    reviews: 870,
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.HOUSE_HELPER,
    duration: '1 Hour'
  },
  {
    id: 'hh3',
    name: 'Full Day Helper',
    description: 'Assistant for multiple house tasks including baby sitting.',
    price: 800,
    rating: 4.9,
    reviews: 340,
    image: 'https://images.unsplash.com/photo-1556911220-e15595b6a781?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.HOUSE_HELPER,
    duration: '10 Hours'
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
  {
    id: 'wd2',
    name: 'Iron Staircase Welding',
    description: 'Welding and assembling metal staircases and railings.',
    price: 5000,
    rating: 4.7,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.WELDING,
    duration: '2 Days'
  },
  {
    id: 'wd3',
    name: 'Small Item Repairs',
    description: 'Welding for small household items like stools or racks.',
    price: 150,
    rating: 4.6,
    reviews: 430,
    image: 'https://images.unsplash.com/photo-1534394414421-7f5cc1202882?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.WELDING,
    duration: '30 mins'
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
  },
  {
    id: 'rp2',
    name: 'Designer Wallpapers',
    description: 'High quality wallpaper installation for living rooms.',
    price: 2500,
    rating: 4.8,
    reviews: 450,
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629275?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.ROOF_PANEL,
    duration: 'Per Roll'
  },
  {
    id: 'rp3',
    name: 'False Ceiling (Gypsum)',
    description: 'Premium POP/Gypsum false ceiling for modern homes.',
    price: 85,
    rating: 4.7,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=400',
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
