// src/data/vehicles.ts

export interface Vehicle {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: string;
  odometer: string;
  image: string;
  color: string;
  stock: string;
  doors: string;
  bodyStyle: string;
  transmission: string;
  drivetrain: string;
  engine: string;
  description?: string;
}

export const mockVehicles: Vehicle[] = [
  {
    id: '594887',
    title: '2016 Audi A4 AWD',
    make: 'audi',
    model: 'a4',
    year: 2016,
    price: '17,999',
    odometer: '100,670 Km',
    image: 'https://image123.azureedge.net/uniquecarsltd/thumb-2016-Audi-A4-6286723003245365.jpg',
    color: 'Gray',
    stock: '004368',
    doors: '4',
    bodyStyle: 'Sedan',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    engine: '4 Cylinder',
    description: 'Well maintained Audi A4 with premium leather interior, heated seats, and sunroof.',
  },
  {
    id: '597362',
    title: '2020 Nissan Kicks FWD',
    make: 'nissan',
    model: 'kicks',
    year: 2020,
    price: '14,999',
    odometer: '118,543 Km',
    image: 'https://image123.azureedge.net/uniquecarsltd/thumb-2020-Nissan-Kicks-9087675074206099.jpg',
    color: 'Black',
    stock: '548134',
    doors: '4',
    bodyStyle: 'SUV',
    transmission: 'Automatic',
    drivetrain: 'FWD',
    engine: '4 Cylinder',
    description: 'Fuel efficient 2020 Nissan Kicks. Excellent city SUV with Apple CarPlay & Android Auto.',
  },
  {
    id: '579546',
    title: '2015 Honda Odyssey FWD',
    make: 'honda',
    model: 'odyssey',
    year: 2015,
    price: '16,499',
    odometer: '189,035 Km',
    image: 'https://image123.azureedge.net/uniquecarsltd/thumb-2015-Honda-Odyssey-45485383984707206.jpg',
    color: 'Gray',
    stock: '501850',
    doors: '4',
    bodyStyle: 'Minivan',
    transmission: 'Automatic',
    drivetrain: 'FWD',
    engine: '6 Cylinder',
    description: 'Spacious 8-seater family minivan with backup camera and rear climate control.',
  },
  {
    id: '586881',
    title: '2012 Toyota Sienna FWD',
    make: 'toyota',
    model: 'sienna',
    year: 2012,
    price: '17,999',
    odometer: '162,383 Km',
    image: 'https://image123.azureedge.net/uniquecarsltd/thumb-2012-Toyota-Sienna-06639656114760495.jpg',
    color: 'White',
    stock: '227196',
    doors: '4',
    bodyStyle: 'Minivan',
    transmission: 'Automatic',
    drivetrain: 'FWD',
    engine: '6 Cylinder',
    description: 'Reliable Toyota Sienna minivan. Smooth V6 engine with ample cargo space.',
  },
];