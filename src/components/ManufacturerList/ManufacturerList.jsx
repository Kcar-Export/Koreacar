import React, { useState } from 'react';
import styles from './ManufacturerList.module.css';

const ManufacturerList = ({ onManufacturerFilterChange }) => {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  // Sample data structure
const manufacturerData = {
  'Acura': {
  series: [
    'CL', 'CSX', 'ILX', 'MDX', 'NSX', 'RDX', 'RL', 'RLX', 'RSX', 'TL', 'TLX', 'TSX', 'Vigor', 'ZDX'
  ],
  models: {}
},
'Adria': {
  series: [
    'Action', 'Adora', 'Alpina', 'Altea', 'Aviva', 'Camping Trailer'
  ],
  models: {}
},
'Airstream': {
  series: [
    'Camping Trailer', 'TC/2000'
  ],
  models: {}
},
'Alfa Romeo': {
  series: [
    '147', '156', '159', '164', '166', '4C', 'Brera', 'Giulia', 'Giulietta', 'GT', 'GTV', 'MiTo', 'Spyder', 'Stelvio'
  ],
  models: {}
},
'Alpine': {
  series: [
    'A110'
  ],
  models: {}
},
'Aston Martin': {
  series: [
    'Cygnet', 'DB11', 'DB12', 'DB7', 'DB9', 'DBS', 'DBX', 'Rapide', 'Vanquish', 'Vantage', 'Virage'
  ],
  models: {}
},
'Audi': {
  series: [
    '100', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Allroad Quattro', 'e-tron', 'e-tron GT', 'e-tron S', 'Q2', 'Q3', 'Q4 e-tron', 'Q5', 'Q6 e-tron', 'Q7', 'Q8', 'Q8 e-tron', 'R8', 'RS e-tron GT', 'RS Q3', 'RS Q8', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'SQ5', 'SQ6 e-tron', 'SQ7', 'SQ8', 'SQ8 e-tron', 'TT', 'TTRS', 'TTS', 'V8'
  ],
  models: {}
},
'Bailey': {
  series: [
    'Alicanto Grande', 'Camping Trailer', 'Discovery', 'Pegasus', 'Phoenix', 'Unicorn'
  ],
  models: {}
},
'Beifang Benchi': {
  series: [
    'CK', 'Kenbo 600'
  ],
  models: {}
},
'Bentley': {
  series: [
    'Arnage', 'Azure', 'Bentayga', 'Brooklands', 'Continental', 'Eight', 'Mulsanne', 'Turbo R'
  ],
  models: {}
},
'BMW': {
  series: [
    '1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'Gran Turismo (GT)', 'i Series', 'M Series', 'X Series', 'Z Series'
  ],
  models: {}
},
'Bugatti': {
  series: [
    'Chiron', 'Divo', 'EB110', 'Veyron 16.4'
  ],
  models: {}
},
'Buick': {
  series: [
    'Century', 'Enclave', 'LaCrosse', 'LeSabre', 'Park Avenue', 'Regal', 'Rendezvous', 'Riviera', 'Terraza'
  ],
  models: {}
},
'BYD': {
  series: [
    'ATTO 3', 'E6', 'eBus-11', 'eBus-12', 'eBus-7', 'eBus-9', 'T4K'
  ],
  models: {}
},
'Cadillac': {
  series: [
    'ATS', 'BLS', 'Brougham', 'Catera', 'Conquer', 'CT4', 'CT5', 'CT6', 'CTS', 'DeVille', 'DTS', 'Eldorado', 'Escalade', 'Fleetwood', 'Lyric', 'Seville', 'SRX', 'STS', 'XLR', 'XT4', 'XT5', 'XT6', 'XTS'
  ],
  models: {}
},
'Camp Master': {
  series: [
    'Camping Trailer'
  ],
  models: {}
},
'Carado': {
  series: [
    'Camping Trailer'
  ],
  models: {}
},
'Casem': {
  series: [
    'Arm Roll', 'Compressed Garbage Truck', 'EV Long Body Box Van', 'EV Long Body Refrigerated Van', 'EV Long Cargo', 'Garbage Collection Vehicle', 'Garbage Dump', 'Home Lorry', 'Long Body Box Van', 'Long Body Refrigerated Van', 'Long Body Wing Body', 'Long Cargo', 'Tank Lorry', 'Vacuum Lorry', 'Water Sprinkler'
  ],
  models: {}
},
'CHTC': {
  series: [
    'Epic City', 'Epic Town'
  ],
  models: {}
},
'Chevrolet': {
  series: [
    'Astro Van', 'Avalanche', 'Blazer', 'Bolt', 'Camaro', 'Chevy Van', 'Cobalt', 'Colorado', 'Corvette', 'Cruze', 'Equinox', 'Express Van', 'HHR', 'Impala', 'K5 Blazer', 'Lumina', 'Malibu', 'Monte Carlo', 'S-10', 'Silverado', 'SS', 'SSR', 'Suburban', 'Tahoe', 'Tracker', 'Traverse', 'Trax', 'Uplander', 'Ventura'
  ],
  models: {}
},
'Chevrolet(Daewoo)': {
  series: [
    'Malibu', 'Cruze', 'Equinox', 'Traverse', 'Acadia', 'Alpheon', 'Aveo', 'Bolt', 'Brougham', 'Camaro', 'Cielo', 'Colorado', 'Corvette', 'Equinox', 'Damas', 'Espero', 'G2x', 'Gentra', 'Impala', 'Kalos', 'Labo', 'Lacetti', 'Lanos', 'Le Mans', 'Leganza', 'Magnus', 'Matiz', 'Nexia', 'Nubira', 'Orlando', 'Prince', 'Rezzo', 'Spark', 'Statesman', 'Super Long', 'Tahoe', 'Tico', 'Tosca', 'Trailblazer', 'Traverse', 'Trax', 'Veritas', 'Winsun', 'Cruze'
  ],
  models: {
    'Malibu': ['Malibu LS', 'Malibu LT', 'Malibu Premier']
  }
},
'Chrysler': {
  series: [
    '200', '300C', '300M', 'Caravan', 'Cirrus', 'Concorde', 'Crossfire', 'Eagle Talon', 'Grand Voyager', 'Intrepid', 'LeBaron', 'LHS', 'Neon', 'New Yorker', 'Pacifica', 'Prowler', 'PT Cruiser', 'Sebring', 'Stratus', 'Town & Country', 'Vision', 'Voyager'
  ],
  models: {}
},
'Citroën': {
  series: [
    '2CV', 'C2', 'C3', 'C4', 'C5', 'C6', 'DS3', 'DS4', 'DS5', 'Xantia', 'XM'
  ],
  models: {}
},
'Coachmen': {
  series: [
    'Camping Trailer'
  ],
  models: {}
},
'Coleman': {
  series: [
    'Cobalt Camping Trailer'
  ],
  models: {}
},
'CRRC': {
  series: [
    'Greenway'
  ],
  models: {}
},
'Daewoo Bus': {
  series: [
    'BC', 'BH', 'BM', 'BS', 'BX', 'FX', 'Lestar'
  ],
  models: {}
},
'Daechang Motors': {
  series: [
    'Danigo', 'Danigo 3', 'Danigo C', 'Danigo L', 'Danigo R', 'Danigo T', 'Danigo U', 'Danigo Van', 'Toby'
  ],
  models: {}
},
'Daihatsu': {
  series: [
    'Boon', 'Cast', 'Coo', 'Copen', 'Esse', 'Materia', 'Mira', 'Mira Cocoa', 'Miragino', 'Move', 'Move Canvas', 'Tanto', 'Terios', 'Travis', 'Wake'
  ],
  models: {}
},
'Dodge': {
  series: [
    'Avenger', 'Caliber', 'Camper Van', 'Caravan', 'Challenger', 'Charger', 'Dakota', 'Dart', 'Durango', 'Grand Caravan', 'Intrepid', 'Journey', 'Magnum', 'Nitro', 'RAM Pickup', 'RAM Van', 'Stratus', 'Van', 'Viper'
  ],
  models: {}
},
'Dongfeng': {
  series: [
    'Rich 6 (Gela P200)', 'Teravan'
  ],
  models: {}
},
'Donghae Machinery Aviation': {
  series: [
    'Segro Aerial Work Platform'
  ],
  models: {}
},
'Doosung Special Vehicle': {
  series: [
    'Camping Caravan'
  ],
  models: {}
},
'DPECO': {
  series: [
    'Porto'
  ],
  models: {}
},
'DS': {
  series: [
    'DS3 Crossback', 'DS4', 'DS7 Crossback'
  ],
  models: {}
},
'Edison Motors': {
  series: [
    'Bus', 'Truck'
  ],
  models: {}
},
'Eldis': {
  series: [
    'Explorer'
  ],
  models: {}
},
'Eoullim': {
  series: [
    'Spira'
  ],
  models: {}
},
'Evion': {
  series: [
    'E6'
  ],
  models: {}
},
'Ferrari': {
  series: [
    '296', '308', '328', '348', '360', '456', '458', '488', '550', '575M', '599', '612', '812', 'California', 'Enzo', 'F12 Berlinetta', 'F12 TDF', 'F355', 'F40', 'F430', 'F50', 'F8 Tributo', 'FF', 'GTC4 Lusso', 'LaFerrari', 'Portofino', 'Purosangue', 'Roma', 'SF90', 'Testarossa'
  ],
  models: {}
},
'Fiat': {
  series: [
    '124 Spider', '128', '132', '500', '850', 'Barchetta', 'Coupe', 'Croma', 'Ducato', 'Freemont', 'Multipla', 'Panda', 'Punto'
  ],
  models: {}
},
'Ford': {
  series: [
    'Bronco', 'C-MAX', 'Contour', 'E Series', 'Econoline', 'EcoSport', 'Edge', 'Escape', 'Escort', 'Excursion', 'Expedition', 'Explorer', 'F-Series', 'Fiesta', 'Five Hundred', 'Flex', 'Focus', 'Freestar', 'Freestyle', 'Fusion', 'GT', 'Kuga', 'Maverick', 'Mondeo', 'Mustang', 'Probe', 'Ranger', 'S-MAX', 'Taurus', 'Thunderbird', 'Transit', 'Windstar'
  ],
  models: {}
},
'Forest River': {
  series: [
    'Camping Trailer'
  ],
  models: {}
},
'Foton': {
  series: [
    'Tunland'
  ],
  models: {}
},
'Genesis': {
  series: [
    '9-3', '9-5', '900', '9000'
  ],
  models: {}
},
'Geely (Mobility Networks)': {
  series: [
    'SE-A'
  ],
  models: {}
},
'GMC': {
  series: [
    'Acadia', 'Canyon', 'Envoy', 'Hummer EV', 'Jimmy', 'Safari', 'Savana', 'Sierra', 'Sonoma', 'Terrain', 'Ventura', 'Yukon'
  ],
  models: {}
},
'Higer': {
  series: [
    'Hipers'
  ],
  models: {}
},
'Hino': {
  series: [
    'Medium Truck'
  ],
  models: {}
},
'Hobby': {
  series: [
    'Camping Trailer', 'Deluxe', 'Excellent', 'Premium', 'Prestige'
  ],
  models: {}
},
'Honda': {
  series: [
    'Accord', 'Acura', 'Beat', 'Civic', 'CR-V', 'CR-Z', 'Crossroad', 'Crosstour', 'Datz', 'Del Sol', 'Edix', 'Element', 'Elysion', 'Fit', 'Freed', 'HR-V', 'Insight', 'Inspire', 'Integra', 'Kappa', 'Legend', 'Life', 'N BOX', 'N-ONE', 'N-VAN', 'N-WGN', 'Odyssey', 'Passport', 'Pilot', 'Prelude', 'Ridgeline', 'S2000', 'S660', 'Step Wagon', 'Stream', 'Zest'
  ],
  models: {}
},
'Hummer': {
  series: [
    'H1', 'H2', 'H3'
  ],
  models: {}
},
'Hyundai': {
  series: [
    'Accent', 'Aero Bus', 'Aerocity', 'Aerotown', 'Aslan', 'Atos', 'Avante', 'BlueOn', 'Casper', 'Chorus', 'Click', 'County', 'Dynasty', 'Elantra', 'Elec City', 'Equus', 'Excell', 'Galloper', 'Genesis', 'Global 900', 'Grace', 'Grandeur', 'Green City', 'I30', 'I40', 'Ioniq', 'Ioniq5', 'Ioniq6', 'Ix35', 'Kona', 'La Vita', 'Large(Medium)Truck', 'Libero', 'Marcia', 'MaxCruz', 'Mega Truck', 'Mighty', 'New Power Truck', 'Nexo', 'Palisad', 'Pavise', 'Pony', 'Porter', 'Presto', 'Santa Cruz', 'Santafe', 'Santamo', 'Scoupe', 'Solati', 'Sonata', 'St1', 'Starex', 'Staria', 'Stella', 'Super(Medium)Truck', 'Terracan', 'Tiburon', 'Trago', 'Trajet Xg', 'Tucson', 'Tuscani', 'Unicity', 'Universe', 'Veloster', 'Venue', 'Veracruz', 'Verna'
  ],
  models: {
    'Accent': ['Accent', 'New Accent'],
    'Aero Bus': ['Aero Bus'],
    'Aerocity': ['Aerocity', 'New Super Aero City', 'Super Aero City'],
    'Aerotown': ['Aerotown', 'e-Aerotown'],
    'Aslan': ['Aslan'],
    'Atos': ['Atos'],
    'Avante': ['All New Avante', 'Avante (CN7)', 'Avante AD', 'Avante Hybrid', 'Avante Hybrid (CN7)', 'Avante MD', 'Avante N', 'Avante XD', 'New Avante XD', 'The New Avante (CN7)', 'The New Avante AD', 'The New Avante Hybrid (CN)', 'The New Avante MD', 'The New Avante N'],
    'BlueOn': ['BlueOn'],
    'Casper': ['Casper Electric', 'Casper', 'The New Casper'],
    'Chorus': ['Chorus'],
    'Click': ['Click', 'New Click', 'Click Hybrid'],
    'County': ['County', 'County Electric', 'County New Breeze', 'e-County', 'New County'],
    'Dynasty': ['Dynasty', 'New Dynasty'],
    'Elantra': ['Elantra'],
    'Elec City': ['Elec City', 'Elec City Double Decker', 'Elec City FCEV', 'Elec City Town'],
    'Equus': ['Equus', 'Equus (New)', 'New Equus'],
    'Excell': ['Excell'],
    'Galloper': ['Galloper'],
    'Genesis': ['Genesis', 'Genesis Coupe', 'New Prada', 'Genesis DH'],
    'Global 900': ['Global 900'],
    'Grace': ['Grace', 'New Grace'],
    'Grandeur': ['Grandeur', 'Grandeur HG Hybrid', 'Grandeur New Luxury', 'Grandeur IG', 'Grandeur HG', 'Grandeur IG Hybrid', 'Grandeur TG', 'Grandeur XG', 'New Grandeur', 'New Grandeur XG', 'The All New Grandeur', 'The All New Grandeur IG', 'The Luxury Grandeur', 'The New Grandeur IG Hybrid', 'The New Grandeur IG'],
    'Green City': ['Green City'],
    'I30': ['I30', 'New I30', 'i30 PD', 'i30cw', 'The New i30'],
    'I40': ['I40', 'New I40'],
    'Ioniq': ['Ioniq Plug-in', 'Ioniq Hybrid', 'Ioniq Electric', 'The New Ioniq Plug-in', 'The New Ioniq Hybrid', 'The New Ioniq Electric'],
    'Ioniq5': ['Ioniq5', 'Ioniq 5 N', 'The New Ioniq5'],
    'Ioniq6': ['Ioniq6'],
    'Ioniq9': ['Ioniq9'],
    'Ix35': ['Ix35', 'New Ix35'],
    'Kona': ['Kona', 'Kona Electric', 'Kona Hybrid', 'The New Kona Hybrid', 'The All New Kona', 'The New Kona', 'The New Kona Electric', 'The All-New Kona Electric', 'The All New Kona Hybrid'],
    'La Vita': ['La Vita'],
    'Large(Medium)Truck': ['Large(Medium)Truck'],
    'Libero': ['Libero'],
    'Marcia': ['Marcia'],
    'MaxCruz': ['MaxCruz', 'The New MaxCruz'],
    'Mega Truck': ['Mega Truck'],
    'Mighty': ['Mighty', 'All New Mighty', 'e-Mighty', 'Mighty II', 'The New Mighty'],
    'New Power Truck': ['New Power Truck'],
    'Nexo': ['Nexo'],
    'Palisad': ['Palisad', 'The New Palisade', 'The All New Palisade', 'The All New Palisade Hybrid'],
    'Pavise': ['Pavise', 'The New Pavise'],
    'Pony': ['Pony', 'Pony II'],
    'Porter': ['Porter', 'Porter II', 'Porter II Electric'],
    'Presto': ['Presto'],
    'Santa Cruz': ['Santa Cruz'],
    'Santa Fe': ['Santa Fe', 'Santa Fe (CM)', 'Santa Fe (DM)', 'The New Santa Fe(TM)', 'Santa Fe The Prime', 'The All New Santa Fe', 'The All New Santa Fe Hybrid', 'The New Santa Fe', 'The New Santa Fe Hybrid'],
    'Santamo': ['Santamo'],
    'Scoupe': ['Scoupe'],
    'Solati': ['Solati'],
    'Sonata': ['EF Sonata', 'LF Sonata', 'LF Sonata Hybrid', 'LF Sonata New Rise', 'LF Sonata New Rise Hybrid', 'New EF Sonata', 'NF Sonata', 'NF Sonata Transform', 'Sonata', 'Sonata (DN8)', 'Sonata (DN8) Hybrid', 'Sonata II', 'Sonata III', 'Sonata The Brilliant', 'Sonata The Edge', 'Sonata The Edge Hybrid', 'YF Sonata', 'YF Sonata Hybrid'],
    'St1': ['St1'],
    'Starex': ['Starex', 'Grand Starex', 'New Starex Jumbo', 'New Starex', 'Starex Jumbo', 'The New Grand Starex'],
    'Staria': ['Staria', 'Staria Hybrid'],
    'Stella': ['Stella'],
    'Super(Medium)Truck': ['Super(Medium)Truck'],
    'Terracan': ['Terracan'],
    'Tiburon': ['Tiburon', 'Tiburon Turbulence'],
    'Trago': ['Trago', 'Trago Xcient', 'Trago Xcient Pro', 'Xcient FCEV'],
    'Trajet Xg': ['Trajet Xg'],
    'Tucson': ['Tucson', 'Tucson ix', 'Tucson ix FCEV', 'The New Tucson Hybrid', 'The All New Tucson Hybrid', 'The All New Tucson', 'New Tuckson', 'New Tucson ix', 'All New Tucson'],
    'Tuscani': ['Tuscani', 'New Tuscani'],
    'Unicity': ['Unicity'],
    'Universe': ['Universe', 'Universe FCEV'],
    'Veloster': ['Veloster', 'Veloster N', 'The New Veloster', 'Veloster (JS)'],
    'Venue': ['Venue'],
    'Veracruz': ['Veracruz'],
    'Verna': ['Verna', 'New Verna', 'Verna Transform']
  }
},
'INEOS': {
  series: ['Grenadier'],
  models: {}
},
'Infiniti': {
  series: ['EX', 'FX', 'G', 'I30', 'I35', 'JX', 'M', 'Q', 'Q30', 'Q50', 'Q60', 'Q70', 'QX', 'QX30', 'QX50', 'QX60', 'QX70', 'QX80'],
  models: {}
},
'Isuzu': {
  series: ['Ascender', 'Axiom', 'Elf (6th Gen)', 'Rodeo', 'Trooper', 'VehiCROSS'],
  models: {}
},
'Iveco': {
  series: ['Camping Car', 'Daily', 'Medium/Large Truck'],
  models: {}
},
'Jaguar': {
  series: ['Daimler', 'E-PACE', 'E-Type', 'F-PACE', 'F-Type', 'I-PACE', 'S-Type', 'Sovereign', 'X-Type', 'XE', 'XF', 'XJ', 'XK'],
  models: {}
},
'Jayco': {
  series: ['Camping Trailer'],
  models: {}
},
'Jeep': {
  series: ['Avenger', 'Cherokee', 'Comanche', 'Commander', 'Compass', 'Gladiator', 'Liberty', 'Patriot', 'Renegade', 'Wrangler'],
  models: {}
},
'JJ Motors': {
  series: ['Bravo EV', 'VBUS110B', 'VBUS60', 'VBUS90', 'Viva EV', 'Zela EV'],
  models: {}
},
'KG Mobility (SsangYong)': {
  series: ['Actyon', 'Chairman', 'Istana', 'Korando', 'Kyron', 'Musso', 'Rexton', 'Rodius', 'SY Truck', 'Tivoli', 'Torres'],
  models: {}
},
'Kia': {
  series: ['(Jumbo) Titan', 'Avella', 'Bongo', 'Capital', 'Carens', 'Carnival', 'Casta', 'Cerato', 'Ceres', 'Combi', 'Concorde', 'Copy Wide', 'Cosmos', 'Credos', 'Elan', 'Enterprise', 'EV3', 'EV4', 'EV6', 'EV9', 'Forte', 'Granbird', 'Granto', 'K3', 'K5', 'K7', 'K8', 'K9', 'Lotze', 'Mohave', 'Morning', 'Niro', 'Opirus', 'Optima', 'Parmax', 'Potentia', 'Pregio', 'Pride', 'Ray', 'Retona', 'Rhino', 'Rio', 'Rockstar', 'Seltos', 'Sephia', 'Shuma', 'Sorento', 'Soul', 'Spectra', 'Sportage', 'Stinger', 'Stonic', 'Tasman', 'Telluride', 'Towner', 'Trade', 'Vesta', 'Visto', 'X-Track'],
  models: {}
},
'Koenigsegg': {
  series: ['Agera', 'CC8S', 'CCR', 'CCX', 'CCXR'],
  models: {}
},
'Korea Commercial Truck': {
  series: ['Arm Roll', 'Box Van', 'Box Wing Body', 'Cargo', 'Coil Transport', 'Crane', 'Grapple Truck', 'Livestock Transport Truck', 'Moving Walk', 'Refrigerated Box Truck', 'Wing Body'],
  models: {}
},
'Korea Merit': {
  series: ['Cargo', 'Crane', 'Grapple Truck', 'Livestock Transport Truck', 'Refrigerated Box Truck', 'Wing Body'],
  models: {}
},
'Korea Special Vehicle': {
  series: ['Trailer', 'Other'],
  models: {}
},
'Korea Special Vehicle Technology': {
  series: ['Arm Roll', 'Box Van', 'Camping Car', 'Cargo', 'Crane', 'Grapple Truck', 'Livestock Transport', 'Mobile Work Vehicle', 'Refrigerated Box Truck', 'Wing Body'],
  models: {}
},
'Korea Three Axle': {
  series: ['Cargo', 'Container', 'Special Purpose'],
  models: {}
},
'Korea Three Axle Industry': {
  series: ['Arm Roll', 'Cargo', 'Coil Transport', 'Crane', 'Grapple Truck', 'Live Fish Transport', 'Livestock Transport', 'Refrigerated Box Truck', 'Wing Body'],
  models: {}
},
'Knaus': {
  series: ['Camping Trailer', 'Deseo', 'Sport Fun', 'Sports', 'Südwind', 'Travelino'],
  models: {}
},
'Lamborghini': {
  series: ['Asterion', 'Aventador', 'Countach', 'Diablo', 'Gallardo', 'Huracan', 'LM', 'Murciélago', 'Reventón', 'Sián', 'Urus', 'Veneno'],
  models: {}
},
'Lancia': {
  series: ['Dedra', 'Delta', 'Kappa', 'Thema', 'Thesis', 'Ypsilon'],
  models: {}
},
'Land Rover': {
  series: ['Defender', 'Discovery', 'Discovery Sport', 'Freelander', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport', 'Range Rover Velar'],
  models: {}
},
'LEVC': {
  series: ['TX'],
  models: {}
},
'Lexus': {
  series: ['CT', 'ES', 'GS', 'GX', 'HS', 'IS', 'LC', 'LFA', 'LM', 'LS', 'LX', 'NX', 'RC', 'RX', 'RZ', 'SC', 'UX'],
  models: {}
},
'Lincoln': {
  series: ['Aviator', 'Continental', 'Corsair', 'LS', 'MKC', 'MKS', 'MKT', 'MKX', 'MKZ', 'Nautilus', 'Navigator', 'Town Car'],
  models: {}
},
'Lotus': {
  series: ['2-Eleven', 'Elan', 'Electra', 'Elise', 'Emira', 'Esprit', 'Europa', 'Evora', 'Exige'],
  models: {}
},
'Luna': {
  series: ['Arriva', 'Camping Trailer', 'Clubman', 'Delta', 'Lexon', 'Quasar', 'Stella', 'Venus'],
  models: {}
},
'MAN Truck': {
  series: ['Chassis', 'Dump', 'Large Cargo', 'Medium Cargo', 'Tractor'],
  models: {}
},
'Maserati': {
  series: ['222', '3200GT', '4200GT', 'Ghibli', 'GranCabrio', 'GranTurismo', 'Grecale', 'Levante', 'MC12', 'MC20', 'Quattroporte'],
  models: {}
},
'Master': {
  series: ['Master HIM', 'Master Mini', 'Master PU', 'Master Van'],
  models: {}
},
'Mazda': {
  series: ['2 (Demio)', '3 (Axela)', '5 (Premacy)', '6 (Atenza)', '929', 'AZ', 'B Series', 'Biante', 'Capella', 'CX', 'Eunos', 'Flair Crossover', 'MPV', 'MX-5', 'MX-6', 'Navajo', 'Protege', 'RX-7', 'RX-8', 'Tribute', 'Verisa'],
  models: {}
},
'McLaren': {
  series: ['540C', '570GT', '570S', '600LT', '650S', '675LT', '720S', '750S', '765LT', 'Artura', 'GT', 'MP4-12C', 'Senna'],
  models: {}
},
'Mercedes-Benz': {
  series: ['190', 'A-Class', 'AMG GT', 'B-Class', 'C-Class', 'CL-Class', 'CLA-Class', 'CLE', 'CLK-Class', 'CLS-Class', 'E-Class', 'EQA', 'EQB', 'EQC', 'EQE', 'EQS', 'G-Class', 'GL-Class', 'GLA-Class', 'GLB-Class', 'GLC-Class', 'GLE-Class', 'GLK-Class', 'GLS-Class', 'M-Class', 'Mattress', 'Maybach', 'R-Class', 'S-Class', 'SE', 'SEC', 'SL-Class', 'SLC-Class', 'SLK-Class', 'SLR', 'SLS AMG', 'Sprinter', 'V-Class', 'Viano'],
  models: {}
},
'Mercedes-Benz Commercial': {
  series: ['Medium Large Truck'],
  models: {}
},
'Mercury': {
  series: ['Cougar', 'Grand Marquis', 'Milan', 'Montego', 'Mountaineer', 'Mystique', 'Sable', 'Villager'],
  models: {}
},
'MINI': {
  series: ['Aceman', 'Clubman', 'Cooper', 'Cooper Convertible', 'Cooper SE', 'Countryman', 'Coupé', 'Paceman', 'Roadster'],
  models: {}
},
'Mitsubishi': {
  series: ['3000GT', 'Debonair', 'Diamante', 'Eclipse', 'Eclipse Cross', 'Endeavor', 'FTO', 'Galant', 'GTO', 'i', 'Lancer', 'Lancer Evolution', 'Mirage', 'Outlander', 'Pajero', 'RVR'],
  models: {}
},
'Mitsuoka': {
  series: ['Garyu', 'Himiko', 'Laseith', 'Nuera', 'Orochi', 'Rainbow', 'Viewt'],
  models: {}
},
'MYVE (KST Electric)': {
  series: ['M1'],
  models: {}
},
'Nissan': {
  series: ['180SX', '200SX', '240SX', '280Z', '280ZX', '300ZX', '350Z', '370Z', 'Altima', 'Armada', 'Bluebird Sylphy', 'Cedric', 'Cefiro', 'Cima', 'Cube', 'Dualis', 'Elgrand', 'Figaro', 'Frontier', 'Fuga', 'GT-R', 'Juke', 'Lafesta', 'Laurel', 'Leaf', 'Liberty', 'Lux', 'March', 'Maxima', 'Micra', 'Moco', 'Murano', 'Note', 'NV Van', 'Otti', 'Pao', 'Pathfinder', 'Patrol', 'Prairie', 'Presage', 'President', 'Primera', 'Pulsar', 'Qashqai', 'Quest', 'Rogue', 'Sentra', 'Serena', 'Silvia', 'Skyline', 'Stag', 'Teana', 'Tiida', 'Titan', 'Versa', 'Wingroad', 'X-Trail', 'Xterra'],
  models: {}
},
'Oldsmobile': {
  series: ['98', 'Alero', 'Aurora', 'Bravada', 'Cutlass', 'Intrigue', 'Silhouette'],
  models: {}
},
'Opel': {
  series: ['Antara', 'Astra', 'Corsa', 'Speedster', 'Tigra', 'Vectra', 'Vita'],
  models: {}
},
'Other': {
  series: ['Bus'],
  models: {}
},
'Pagani': {
  series: ['Huayra', 'Zonda'],
  models: {}
},
'PDL Motors': {
  series: ['Camping Trailer'],
  models: {}
},
'Peugeot': {
  series: ['1007', '107', '2008', '205', '206', '207', '208', '3008', '306', '307', '308', '405', '406', '407', '408', '5008', '508', '605', '607', '806', '807', 'e-208', 'Expert', 'Partner', 'RCZ'],
  models: {}
},
'Polestar': {
  series: ['Polestar2', 'Polestar4'],
  models: {}
},
'Pontiac': {
  series: ['Aztek', 'Bonneville', 'Firebird', 'G6', 'G8', 'Grand Am', 'Grand Prix', 'Solstice', 'Sunfire', 'Torrent', 'Trans Am', 'Transport', 'Vibe'],
  models: {}
},
'Porsche': {
  series: ['911', '918', '928', 'Boxster', 'Carrera GT', 'Cayenne', 'Cayman', 'Macan', 'Panamera', 'Taycan'],
  models: {}
},
'Power Plaza': {
  series: ['Peace'],
  models: {}
},
'Renault': {
  series: ['Clio', 'Espace', 'Koleos', 'Laguna', 'Megane', 'Modus', 'Safrane', 'Scenic', 'Talisman', 'Twingo', 'Vel Satis'],
  models: {}
},
'Renault Samsung': {
  series: ['Arkana', 'Captur', 'Clio', 'Grand Koleos', 'Master', 'QM3', 'QM5', 'QM6', 'SM3', 'SM3 Z.E', 'SM5', 'SM6', 'SM7', 'Truck', 'Twizy', 'XM3', 'ZOE'],
  models: {}
},
'Rivian': {
  series: ['R1T'],
  models: {}
},
'Rolls-Royce': {
  series: ['Corniche', 'Cullinan', 'Dawn', 'Ghost', 'Phantom', 'Race', 'Silver Spur', 'Spectre'],
  models: {}
},
'Rover': {
  series: ['75', 'MGF', 'Mini'],
  models: {}
},
'Saab': {
  series: ['9-3', '9-5', '900', '9000'],
  models: {}
},
'Saturn': {
  series: ['Astra', 'Aura', 'Outlook', 'S-Series', 'Sky', 'Vue'],
  models: {}
},
'Scania': {
  series: ['Medium/Large Cargo'],
  models: {}
},
'Scion': {
  series: ['FR-S', 'iQ', 'tC', 'xA', 'xB', 'xD'],
  models: {}
},
'Sevo Mobility (Camsys)': {
  series: ['Sebo C SE', 'Sevo C'],
  models: {}
},
'Smart': {
  series: ['Fortwo', 'Popo', 'Roadster'],
  models: {}
},
'Smart EV': {
  series: ['D2P', 'D2C', 'EV Z'],
  models: {}
},
'Sterckeman': {
  series: ['Alize Evasion', 'Alize Trend', 'Camping Trailer', 'Easy', 'Evolution', 'Starlett'],
  models: {}
},
'Starcraft': {
  series: ['Camping Trailer'],
  models: {}
},
'Subaru': {
  series: ['Ascent', 'BRZ', 'Crosstrek', 'Exiga', 'Forester', 'Impreza', 'Legacy', 'Levorg', 'Outback', 'Pleo', 'R1'],
  models: {}
},
'Sunlong Bus': {
  series: ['AVIC', 'Duego'],
  models: {}
},
'Susung Special': {
  series: ['Safety Loader'],
  models: {}
},
'Suzuki': {
  series: ['Alto', 'Alto Lapin', 'Alto Works', 'Cappuccino', 'Grand Vitara', 'Hustler', 'Ignis', 'Jimny', 'Kei', 'MR Wagon', 'Palette', 'Sidekick', 'Solio', 'Spacia', 'Swift', 'SX4', 'Twin', 'Wagon R', 'X-90'],
  models: {}
},
'Swift': {
  series: ['Camping Trailer', 'Eccles', 'Elegance Grande', 'Sprite'],
  models: {}
},
  'Tabbert': {
  series: ['Camping Trailer', 'Cellini', 'Da Vinci', 'Pep', 'Puccini', 'Rossini', 'Vivaldi'],
  models: {}
},
'Tata Daewoo': {
  series: ['Gussen', 'Maxen', 'Next Generation (Large) Truck', 'Novus', 'Prima', 'The Sen'],
  models: {}
},
'Tesla': {
  series: ['Cybertruck', 'Model 3', 'Model S', 'Model X', 'Model Y'],
  models: {}
},
'Toyota': {
  series: ['4Runner', '86', 'Allion', 'Alphard', 'Altezza', 'Aqua', 'Aristo', 'Auris', 'Avalon', 'Avensis', 'Aygo', 'bB', 'Blade', 'C-HR', 'Camry', 'Carina ED', 'Celica', 'Celsior', 'Century', 'Chaser', 'Corolla', 'Corolla Spacio', 'Corona', 'Cresta', 'Crown', 'Esquire', 'Estima', 'FJ Cruiser', 'Forte', 'Fortuner', 'GAIA', 'GR86', 'Harrier', 'Hiace', 'Highlander', 'Hilux Surf', 'Ipsum', 'IQ', 'Isis', 'ist', 'Land Cruiser', 'Land Cruiser Prado', 'Mark II', 'Mark X', 'Matrix', 'MR-2', 'MR-S', 'Noah', 'Paseo', 'Passo', 'Premio', 'Previa', 'Prius', 'Progress', 'Ractis', 'Raum', 'RAV4', 'Roomy', 'Rush', 'Sai', 'Sequoia', 'Sera', 'Sienna', 'Sienta', 'Soarer', 'Solara', 'Sprinter Trueno', 'Supra', 'Tacoma', 'Tundra', 'Vanguard', 'Vellfire', 'Venza', 'Verso', 'Vios', 'Vista', 'Vitz (Yaris)', 'Voxy', 'Will', 'Windom', 'Wish'],
  models: {
    'Camry': ['Camry LE', 'Camry SE', 'Camry XLE'],
    'Corolla': ['Corolla LE', 'Corolla SE', 'Corolla XSE'],
    'RAV4': ['RAV4 LE', 'RAV4 XLE', 'RAV4 Limited'],
    'Highlander': ['Highlander LE', 'Highlander XLE', 'Highlander Limited']
  }
},
'Visner': {
  series: ['Avesso Harmonyline', 'Camping Trailer', 'Premio Plus'],
  models: {}
},
'Volkswagen': {
  series: ['Arteon', 'Atlas', 'Beetle', 'Bora', 'Caddy', 'CC', 'Corrado', 'Eos', 'Golf', 'Grand California', 'ID.4', 'ID.5', 'Jetta', 'Lupo', 'Microbus', 'Passat', 'Phaeton', 'Polo', 'Routan', 'Scirocco', 'Sharan', 'T-Roc', 'Taos', 'Tiguan', 'Touareg', 'Touran', 'Transporter', 'up!', 'Vento'],
  models: {}
},
'Volvo': {
  series: ['240', '740', '760', '850', '940', '960', 'C30', 'C40', 'C70', 'EX30', 'S40', 'S60', 'S70', 'S80', 'S90', 'V40', 'V50', 'V60', 'V70', 'V90', 'XC40', 'XC60', 'XC70', 'XC90'],
  models: {}
},
'Volvo Commercial': {
  series: ['Medium/Large Cargo'],
  models: {}
},
'Weinsberg': {
  series: ['Camping Trailer', 'Caraone', 'Caraone Ice', 'CaraTwo'],
  models: {}
},
'Winnebago': {
  series: ['Camping Car', 'Camping Trailer'],
  models: {}
},
'Woojin Industrial Systems': {
  series: ['Apolo'],
  models: {}
},
'Xinwon (Jace Mobility)': {
  series: ['Et Van'],
  models: {}
},
'Zudou (Semi Sysco)': {
  series: ['D2', 'D2C', 'D2P', 'EV Z'],
  models: {}
},
}


  const handleManufacturerSelect = (manufacturer) => {
    setSelectedManufacturer(manufacturer);
    setSelectedSeries('');
    setSelectedModel('');
    onManufacturerFilterChange({
      manufacturer,
      series: '',
      model: ''
    });
  };

  const handleSeriesSelect = (series) => {
    setSelectedSeries(series);
    setSelectedModel('');
    onManufacturerFilterChange({
      manufacturer: selectedManufacturer,
      series,
      model: ''
    });
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    onManufacturerFilterChange({
      manufacturer: selectedManufacturer,
      series: selectedSeries,
      model
    });
  };

  return (
    <div className={styles.manufacturerContainer}>
      {/* Manufacturer Selection */}
      <div className={styles.selectionBox}>
        <h3>Manufacturer</h3>
        <ul className={styles.selectionList}>
          {Object.keys(manufacturerData).map((manufacturer) => (
            <li 
              key={manufacturer}
              className={`${styles.selectionItem} ${selectedManufacturer === manufacturer ? styles.active : ''}`}
              onClick={() => handleManufacturerSelect(manufacturer)}
            >
              {manufacturer}
            </li>
          ))}
        </ul>
      </div>

      {/* Series Selection */}
      <div className={styles.selectionBox}>
        <h3>Series</h3>
        {selectedManufacturer ? (
          <ul className={styles.selectionList}>
            {manufacturerData[selectedManufacturer]?.series.map((series) => (
              <li 
                key={series}
                className={`${styles.selectionItem} ${selectedSeries === series ? styles.active : ''}`}
                onClick={() => handleSeriesSelect(series)}
              >
                {series}
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.placeholder}>Select manufacturer first</div>
        )}
      </div>

      {/* Model Selection */}
      <div className={styles.selectionBox}>
        <h3>Model</h3>
        {selectedSeries ? (
          manufacturerData[selectedManufacturer]?.models[selectedSeries]?.length > 0 ? (
            <ul className={styles.selectionList}>
              {manufacturerData[selectedManufacturer].models[selectedSeries].map((model) => (
                <li 
                  key={model}
                  className={`${styles.selectionItem} ${selectedModel === model ? styles.active : ''}`}
                  onClick={() => handleModelSelect(model)}
                >
                  {model}
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.placeholder}>No models available for this series</div>
          )
        ) : (
          <div className={styles.placeholder}>
            {selectedManufacturer ? 'Select series first' : 'Select manufacturer first'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManufacturerList;