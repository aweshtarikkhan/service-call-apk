
import { CategoryType, type Service, type Testimonial, type Provider, type User, type BookingDetails, type RegistrationForm } from './types';

export const CATEGORIES = Object.values(CategoryType);

export const SERVICES: Service[] = [
  // --- AC & APPLIANCE REPAIR ---
  {
    id: 'ac1',
    name: 'Split AC Gas Charging',
    description: 'Complete gas refill with leak testing and pressure check.',
    price: 2499,
    rating: 4.8,
    reviews: 1250,
    image: 'https://images.unsplash.com/photo-1590756254933-2873d72a83b6?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.AC_APPLIANCE,
    duration: '1.5 Hours',
    isHero: true
  },
  {
    id: 'ref1',
    name: 'Double Door Fridge Repair',
    description: 'Fixing cooling issues, gas refill, or compressor replacement for double door units.',
    price: 499,
    rating: 4.9,
    reviews: 670,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.AC_APPLIANCE,
    duration: '1 Hour',
    isHero: true
  },
  {
    id: 'mw1',
    name: 'Microwave Oven Repair',
    description: 'Fixing heating issues, turntable motors, or keypad faults.',
    price: 399,
    rating: 4.8,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.AC_APPLIANCE,
    duration: '1 Hour'
  },
  {
    id: 'wm1',
    name: 'Washing Machine Service',
    description: 'Deep cleaning and component check for top/front load machines.',
    price: 450,
    rating: 4.7,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1582733711316-f4d0484ebf1b?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.AC_APPLIANCE,
    duration: '1 Hour'
  },

  // --- HOME CLEANING ---
  {
    id: 'cl1',
    name: 'Full Home Deep Cleaning',
    description: 'Intense machine cleaning of all rooms, kitchen, and toilets.',
    price: 3499,
    rating: 4.9,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.CLEANING,
    duration: '5-6 Hours',
    isHero: true
  },
  {
    id: 'cl2',
    name: 'Bathroom Deep Cleaning',
    description: 'Removal of hard water stains and sanitization of all fixtures.',
    price: 399,
    rating: 4.8,
    reviews: 1200,
    image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.CLEANING,
    duration: '1.5 Hours'
  },
  {
    id: 'cl3',
    name: 'Sofa Shampooing',
    description: 'Wet vacuuming and stain removal for 3-5 seater sofas.',
    price: 599,
    rating: 4.7,
    reviews: 450,
    image: 'https://images.unsplash.com/photo-1556911220-e15595b6a781?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.CLEANING,
    duration: '2 Hours'
  },
  {
    id: 'cl4',
    name: 'Kitchen Deep Cleaning',
    description: 'Cleaning of chimney, cabinets (external), and floor degreasing.',
    price: 1299,
    rating: 4.8,
    reviews: 670,
    image: 'https://images.unsplash.com/photo-1556912177-c54030639a75?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.CLEANING,
    duration: '3 Hours'
  },

  // --- PLUMBING ---
  {
    id: 'pl1',
    name: 'Tap & Leakage Repair',
    description: 'Fixing dripping taps, pipe leaks, or mixer repairs.',
    price: 149,
    rating: 4.9,
    reviews: 2300,
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca1f963?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.PLUMBING,
    duration: '45 Mins'
  },
  {
    id: 'pl2',
    name: 'Toilet & Flush Repair',
    description: 'Fixing flush tanks, jet sprays, or minor blockages.',
    price: 199,
    rating: 4.7,
    reviews: 1500,
    image: 'https://images.unsplash.com/photo-1507661060835-12332610d11c?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.PLUMBING,
    duration: '1 Hour'
  },
  {
    id: 'pl3',
    name: 'Water Tank Cleaning',
    description: 'Manual scrubbing and UV disinfection of overhead tanks.',
    price: 499,
    rating: 4.8,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.PLUMBING,
    duration: '1.5 Hours'
  },
  {
    id: 'pl4',
    name: 'New Pipe Connection',
    description: 'Installation of fresh water lines or CPVC piping.',
    price: 899,
    rating: 4.6,
    reviews: 430,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.PLUMBING,
    duration: '2-3 Hours'
  },

  // --- ELECTRICIAN ---
  {
    id: 'el1',
    name: 'Ceiling Fan Repair',
    description: 'Fixing capacitor, regulator, or motor winding issues.',
    price: 199,
    rating: 4.9,
    reviews: 3400,
    image: 'https://images.unsplash.com/photo-1620311210967-0c7f1a073e22?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.ELECTRICIAN,
    duration: '45 Mins'
  },
  {
    id: 'el2',
    name: 'Switchboard Installation',
    description: 'Adding new points or repairing burnt sockets.',
    price: 149,
    rating: 4.8,
    reviews: 1800,
    image: 'https://images.unsplash.com/photo-1621905252507-b354bcadcabc?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.ELECTRICIAN,
    duration: '30 Mins'
  },
  {
    id: 'el3',
    name: 'Full House Wiring Check',
    description: 'Comprehensive testing for earthing and short circuits.',
    price: 599,
    rating: 4.7,
    reviews: 560,
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.ELECTRICIAN,
    duration: '2 Hours'
  },
  {
    id: 'el4',
    name: 'Inverter Service',
    description: 'Water top-up and battery terminal cleaning.',
    price: 249,
    rating: 4.9,
    reviews: 980,
    image: 'https://images.unsplash.com/photo-1617471346061-5d329ab9c574?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.ELECTRICIAN,
    duration: '45 Mins'
  },

  // --- PAINTING ---
  {
    id: 'pa1',
    name: 'Single Room Painting',
    description: 'Fresh coat or repainting with high-quality emulsion.',
    price: 2999,
    rating: 4.8,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.PAINTING,
    duration: '1 Day'
  },
  {
    id: 'pa2',
    name: 'Exterior Waterproofing',
    description: 'Sealing cracks and applying protective exterior coats.',
    price: 5499,
    rating: 4.7,
    reviews: 150,
    image: 'https://images.unsplash.com/photo-1562259949-e8e76833c050?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.PAINTING,
    duration: '2-3 Days'
  },
  {
    id: 'pa3',
    name: 'Texture Wall Design',
    description: 'Creating designer patterns on accent walls.',
    price: 1999,
    rating: 4.9,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.PAINTING,
    duration: '5 Hours'
  },
  {
    id: 'pa4',
    name: 'Metal & Wood Polish',
    description: 'Polishing of gates, grills, or wooden furniture.',
    price: 899,
    rating: 4.6,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.PAINTING,
    duration: '4 Hours'
  },

  // --- BEAUTY MEN ---
  {
    id: 'bm1',
    name: 'Haircut & Styling',
    description: 'Modern or classic cuts with hair wash.',
    price: 149,
    rating: 4.8,
    reviews: 1200,
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.BEAUTY_MEN,
    duration: '45 Mins'
  },
  {
    id: 'bm2',
    name: 'Shave & Beard Grooming',
    description: 'Precision trimming or clean shave with hot towel.',
    price: 99,
    rating: 4.9,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.BEAUTY_MEN,
    duration: '30 Mins'
  },
  {
    id: 'bm3',
    name: 'Face Clean-up',
    description: 'Removal of dirt and blackheads for a fresh look.',
    price: 249,
    rating: 4.7,
    reviews: 430,
    image: 'https://images.unsplash.com/photo-1621605815841-2dd4987db33b?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.BEAUTY_MEN,
    duration: '45 Mins'
  },
  {
    id: 'bm4',
    name: 'Head & Shoulder Massage',
    description: 'Relaxing dry massage for stress relief.',
    price: 199,
    rating: 4.8,
    reviews: 560,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.BEAUTY_MEN,
    duration: '30 Mins'
  },

  // --- BEAUTY WOMEN ---
  {
    id: 'bw1',
    name: 'Herbal Facial',
    description: 'Natural ingredients for sensitive and glowing skin.',
    price: 499,
    rating: 4.9,
    reviews: 1800,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.BEAUTY_WOMEN,
    duration: '1 Hour'
  },
  {
    id: 'bw2',
    name: 'Full Body Waxing',
    description: 'Chocolate or honey wax for smooth skin.',
    price: 899,
    rating: 4.8,
    reviews: 1400,
    image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.BEAUTY_WOMEN,
    duration: '1.5 Hours'
  },
  {
    id: 'bw3',
    name: 'Party Makeup',
    description: 'Professional makeup for weddings or events.',
    price: 1499,
    rating: 4.7,
    reviews: 650,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.BEAUTY_WOMEN,
    duration: '2 Hours'
  },
  {
    id: 'bw4',
    name: 'Pedicure & Manicure',
    description: 'Deep cleaning and massage for hands and feet.',
    price: 399,
    rating: 4.8,
    reviews: 920,
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.BEAUTY_WOMEN,
    duration: '1 Hour'
  },

  // --- PEST CONTROL ---
  {
    id: 'pest1',
    name: 'Cockroach Control',
    description: 'Gel treatment and spray for all kitchen cabinets.',
    price: 399,
    rating: 4.9,
    reviews: 1100,
    image: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.PEST_CONTROL,
    duration: '45 Mins'
  },
  {
    id: 'pest2',
    name: 'Termite Treatment',
    description: 'Drill-Fill-Seal method for protecting wooden furniture.',
    price: 1999,
    rating: 4.8,
    reviews: 430,
    image: 'https://images.unsplash.com/photo-1624968846114-270575d5e38a?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.PEST_CONTROL,
    duration: '2 Hours'
  },
  {
    id: 'pest3',
    name: 'Bed Bug Eradication',
    description: 'Two-stage chemical spray for beds and upholstery.',
    price: 899,
    rating: 4.7,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.PEST_CONTROL,
    duration: '1 Hour'
  },
  {
    id: 'pest4',
    name: 'General Home Disinfection',
    description: 'Mist-based sanitization for all rooms.',
    price: 499,
    rating: 4.9,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.PEST_CONTROL,
    duration: '45 Mins'
  },

  // --- CARPENTRY ---
  {
    id: 'cp1',
    name: 'Door & Lock Repair',
    description: 'Fixing jammed doors or installing new handles.',
    price: 149,
    rating: 4.8,
    reviews: 1500,
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.CARPENTRY,
    duration: '1 Hour'
  },
  {
    id: 'cp2',
    name: 'Furniture Assembly',
    description: 'Putting together beds, cupboards, or tables.',
    price: 399,
    rating: 4.9,
    reviews: 760,
    image: 'https://images.unsplash.com/photo-1595514535215-96fa404112e5?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.CARPENTRY,
    duration: '2 Hours'
  },
  {
    id: 'cp3',
    name: 'Cupboard Channel Repair',
    description: 'Fixing sliding drawers or broken hinges.',
    price: 199,
    rating: 4.7,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.CARPENTRY,
    duration: '1 Hour'
  },
  {
    id: 'cp4',
    name: 'Bed Repair & Modification',
    description: 'Fixing creaky sounds or strengthening frames.',
    price: 599,
    rating: 4.8,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.CARPENTRY,
    duration: '2 Hours'
  },

  // --- CAR RENTAL & TAXI ---
  {
    id: 'cr1',
    name: 'Local Hourly Car',
    description: 'Sedan/SUV for running errands within the city.',
    price: 800,
    rating: 4.7,
    reviews: 560,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.CAR_RENTAL,
    duration: '4 Hours'
  },
  {
    id: 'cr2',
    name: 'One-Way Outstation Drop',
    description: 'Fixed rate drop to nearby major cities.',
    price: 2500,
    rating: 4.9,
    reviews: 1200,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.CAR_RENTAL,
    duration: 'Varies'
  },
  {
    id: 'cr3',
    name: 'Airport/Railway Pick-up',
    description: 'Timely and reliable pick-up service.',
    price: 1200,
    rating: 4.8,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.CAR_RENTAL,
    duration: '1 Hour'
  },
  {
    id: 'cr4',
    name: 'Monthly Office Taxi',
    description: 'Dedicated driver for your daily commute.',
    price: 15000,
    rating: 4.6,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.CAR_RENTAL,
    duration: '1 Month'
  },

  // --- DAILY LABOUR ---
  {
    id: 'lb1',
    name: 'Construction Helper',
    description: 'Assisting in carrying material and site cleaning.',
    price: 450,
    rating: 4.9,
    reviews: 4300,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.LABOUR,
    duration: '8 Hours'
  },
  {
    id: 'lb2',
    name: 'Loading/Unloading',
    description: 'Shifting household goods or commercial cargo.',
    price: 299,
    rating: 4.8,
    reviews: 1500,
    image: 'https://images.unsplash.com/photo-1600518464441-915c843bc20c?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.LABOUR,
    duration: '2 Hours'
  },
  {
    id: 'lb3',
    name: 'Garden Cleaning Labour',
    description: 'Removing weeds and clearing garden waste.',
    price: 399,
    rating: 4.7,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.LABOUR,
    duration: '4 Hours'
  },
  {
    id: 'lb4',
    name: 'Warehouse Sorting',
    description: 'Assisting in organizing inventory.',
    price: 500,
    rating: 4.6,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.LABOUR,
    duration: '8 Hours'
  },

  // --- MISTRI (MASON) ---
  {
    id: 'mt1',
    name: 'Wall Plaster Repair',
    description: 'Fixing cracks and reapplying cement plaster.',
    price: 599,
    rating: 4.8,
    reviews: 1200,
    image: 'https://images.unsplash.com/photo-1534342357876-491359270a66?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.MISTRI,
    duration: '4 Hours'
  },
  {
    id: 'mt2',
    name: 'Tiling & Flooring Work',
    description: 'Laying or repairing ceramic/granite tiles.',
    price: 1499,
    rating: 4.9,
    reviews: 870,
    image: 'https://images.unsplash.com/photo-1581850518616-bcb8186c443e?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.MISTRI,
    duration: '1 Day'
  },
  {
    id: 'mt3',
    name: 'Brick Work (Chunai)',
    description: 'Building small partitions or boundary walls.',
    price: 899,
    rating: 4.7,
    reviews: 430,
    image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.MISTRI,
    duration: '1 Day'
  },
  {
    id: 'mt4',
    name: 'Slab/Counter Repair',
    description: 'Fixing broken kitchen platforms or concrete slabs.',
    price: 799,
    rating: 4.8,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.MISTRI,
    duration: '5 Hours'
  },

  // --- HOUSE HELPER ---
  {
    id: 'hh1',
    name: 'Cooking Service',
    description: 'Preparation of lunch or dinner (Up to 4 people).',
    price: 299,
    rating: 4.9,
    reviews: 1200,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.HOUSE_HELPER,
    duration: '2 Hours'
  },
  {
    id: 'hh2',
    name: 'Clothes Washing & Ironing',
    description: 'Manual washing and professional pressing.',
    price: 199,
    rating: 4.8,
    reviews: 2300,
    image: 'https://images.unsplash.com/photo-1545173168-9f18c82b997e?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.HOUSE_HELPER,
    duration: '2 Hours'
  },
  {
    id: 'hh3',
    name: 'Old Age/Patient Care',
    description: 'Assisting elderly with daily activities.',
    price: 600,
    rating: 4.7,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1581578730799-7f724776100c?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.HOUSE_HELPER,
    duration: '8 Hours'
  },
  {
    id: 'hh4',
    name: 'Baby Sitting',
    description: 'Trusted care for toddlers at your home.',
    price: 500,
    rating: 4.9,
    reviews: 150,
    image: 'https://images.unsplash.com/photo-1587653263995-422546a74569?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.HOUSE_HELPER,
    duration: '4 Hours'
  },

  // --- WELDING ---
  {
    id: 'wd1',
    name: 'Gate & Grill Repair',
    description: 'Fixing hinges or repairing broken metal joints.',
    price: 399,
    rating: 4.8,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.WELDING,
    duration: '2 Hours'
  },
  {
    id: 'wd2',
    name: 'Railing Installation',
    description: 'Welding of iron railings for balconies/stairs.',
    price: 1299,
    rating: 4.9,
    reviews: 340,
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.WELDING,
    duration: '4 Hours'
  },
  {
    id: 'wd3',
    name: 'Metal Shed Fabrication',
    description: 'Building small car sheds or rooftop shelters.',
    price: 4999,
    rating: 4.7,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.WELDING,
    duration: '2 Days'
  },
  {
    id: 'wd4',
    name: 'Machine Repair Welding',
    description: 'Welding services for agricultural or commercial tools.',
    price: 299,
    rating: 4.6,
    reviews: 430,
    image: 'https://images.unsplash.com/photo-1531985102351-dc4829370838?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.WELDING,
    duration: '1 Hour'
  },

  // --- CEILING & WALL PANELS ---
  {
    id: 'rp1',
    name: 'PVC Ceiling Install',
    description: 'Modern and moisture-resistant ceiling panels.',
    price: 2499,
    rating: 4.9,
    reviews: 670,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.ROOF_PANEL,
    duration: '1 Day'
  },
  {
    id: 'rp2',
    name: 'Wall Panel Fitting',
    description: 'Decorative 3D or plain panels for accent walls.',
    price: 1899,
    rating: 4.8,
    reviews: 450,
    image: 'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.ROOF_PANEL,
    duration: '5 Hours'
  },
  {
    id: 'rp3',
    name: 'False Ceiling Repair',
    description: 'Fixing sagging or broken gypsum boards.',
    price: 899,
    rating: 4.7,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.ROOF_PANEL,
    duration: '4 Hours'
  },
  {
    id: 'rp4',
    name: 'Cornice & Border Design',
    description: 'Adding decorative borders to room corners.',
    price: 599,
    rating: 4.8,
    reviews: 180,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.ROOF_PANEL,
    duration: '3 Hours'
  },

  // --- MECHANIC & SERVICES ---
  {
    id: 'mech1',
    name: 'Bike General Service',
    description: 'Complete oil change, brake adjustment, and chain cleaning.',
    price: 299,
    rating: 4.9,
    reviews: 4500,
    image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.MECHANIC,
    duration: '2 Hours',
    isHero: true
  },
  {
    id: 'mech2',
    name: 'Car Engine Diagnostic',
    description: 'Full checkup using computerized tools.',
    price: 899,
    rating: 4.7,
    reviews: 1200,
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.MECHANIC,
    duration: '1.5 Hours'
  },
  {
    id: 'mech3',
    name: 'Puncture & Tyre Change',
    description: 'On-spot tubeless puncture repair for bikes/cars.',
    price: 150,
    rating: 4.8,
    reviews: 3200,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.MECHANIC,
    duration: '30 Mins'
  },
  {
    id: 'mech4',
    name: 'Car AC Servicing',
    description: 'Cooling gas top-up and filter cleaning.',
    price: 1299,
    rating: 4.8,
    reviews: 650,
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800',
    category: CategoryType.MECHANIC,
    duration: '1 Hour'
  }
];

export const PROVIDERS: Provider[] = [
  {
    id: 'p1',
    name: 'Vikram Singh',
    rating: 4.9,
    bio: 'Expert technician with over 8 years of experience in residential and automotive repairs.',
    image: 'https://picsum.photos/200/200?random=50',
    categories: [CategoryType.ELECTRICIAN, CategoryType.AC_APPLIANCE, CategoryType.MECHANIC],
    completedJobs: 1240,
    experience: '8 Years'
  }
];

export const INITIAL_USERS: User[] = [
    { username: 'admin', password: 'password', role: 'ADMIN', name: 'Super Admin' }
];

export const INITIAL_BOOKINGS: BookingDetails[] = [];
export const INITIAL_REGISTRATIONS: RegistrationForm[] = [];
