import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  MapPin, 
  Phone, 
  Info,
  MessageSquare,
  Calculator,
  DollarSign,
  RotateCcw,
  X
} from 'lucide-react';
import { FaTwitter, FaLinkedin } from "react-icons/fa";

interface CarDetail {
  id: string | number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: string;
  fuel_type: string;
  description: string;
  condition_tag?: string;
  images: string[];
  created_at: string;
  body_style?: string;
  engine?: string;
  engine_size?: string;
  driveline?: string;
  exterior_color?: string;
  interior_color?: string;
  doors?: number;
  passengers?: number;
  city_fuel?: string;
  hwy_fuel?: string;
  stock_number?: string;
  vin?: string;
  features?: string[];
}

const DEFAULT_FEATURES = [
  'Navigation System',
  'Leather Interior',
  'Power Sunroof',
  'Backup Camera',
  'Heated Seats / Mirrors',
  'Push Start',
  'Power Seats',
  'Cruise Control',
  'ABS & Traction Control',
  'Bluetooth Connectivity',
  'Keyless Entry',
  'Alloy Rims',
];

export const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [car, setCar] = useState<CarDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Navigation IDs for Prev / Next
  const [prevCarId, setPrevCarId] = useState<string | number | null>(null);
  const [nextCarId, setNextCarId] = useState<string | number | null>(null);

  // Gallery & UI States
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [showAllOptions, setShowAllOptions] = useState<boolean>(false);

  // Overlay Modal States
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState<boolean>(false);

  // Info Form States
  const [infoForm, setInfoForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  // Calculator States
  const [frequency, setFrequency] = useState<string>('Monthly');
  const [vehiclePrice, setVehiclePrice] = useState<string>('0');
  const [downPayment, setDownPayment] = useState<string>('0');
  const [tradeValue, setTradeValue] = useState<string>('0');
  const [loanTerm, setLoanTerm] = useState<string>('60');
  const [interestRate, setInterestRate] = useState<string>('7.99');
  const [includeTax, setIncludeTax] = useState<boolean>(true);

  // Calculated Results
  const [estimatedPayment, setEstimatedPayment] = useState<string>('0.00');
  const [costOfBorrowing, setCostOfBorrowing] = useState<string>('0.00');
  const [msrp, setMsrp] = useState<string>('0.00');
  const [totalObligation, setTotalObligation] = useState<string>('0.00');

  useEffect(() => {
  const fetchCarDetailsAndNavigation = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setActiveImageIndex(0); // Nayi car aane par image reset karo

      // 1. Fetch current car
      const { data: currentCar, error: carError } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .maybeSingle(); // .single() ki jagah .maybeSingle() taake app crash na ho

      if (carError) {
        console.error('Error fetching car:', carError.message);
      }

      setCar(currentCar || null);

      if (currentCar?.price) {
        setVehiclePrice(currentCar.price.toString());
        setMsrp(currentCar.price.toLocaleString());
      }

      // 2. Fetch all car IDs for Next/Prev navigation
      const { data: allCars, error: allCarsError } = await supabase
        .from('cars')
        .select('id')
        .order('created_at', { ascending: false });

      if (!allCarsError && allCars && allCars.length > 0) {
        // ID comparison using String() to support both string UUIDs and numeric IDs
        const currentIndex = allCars.findIndex((c) => String(c.id) === String(id));

        if (currentIndex !== -1) {
          // Loop navigation logic
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : allCars.length - 1;
          setPrevCarId(allCars[prevIndex].id);

          const nextIndex = currentIndex < allCars.length - 1 ? currentIndex + 1 : 0;
          setNextCarId(allCars[nextIndex].id);
        } else {
          setPrevCarId(null);
          setNextCarId(null);
        }
      }
    } catch (err: any) {
      console.error('Unexpected error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchCarDetailsAndNavigation();
}, [id]); // URL parameter change hone par auto-trigger hoga

  // Next / Previous Handlers
  const handlePrevCar = () => {
    if (prevCarId !== null) {
      navigate(`/car/${prevCarId}`);
    }
  };

  const handleNextCar = () => {
    if (nextCarId !== null) {
      navigate(`/car/${nextCarId}`);
    }
  };

  // Calculator Logic
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(vehiclePrice) || 0;
    const dp = parseFloat(downPayment) || 0;
    const trade = parseFloat(tradeValue) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100;
    const months = parseInt(loanTerm) || 12;

    const taxMultiplier = includeTax ? 1.13 : 1.0;
    const principal = Math.max(0, (price - dp - trade) * taxMultiplier);

    let periodsPerYear = 12;
    if (frequency === 'Bi-Weekly') periodsPerYear = 26;
    if (frequency === 'Weekly') periodsPerYear = 52;

    const totalPeriods = (months / 12) * periodsPerYear;
    const periodicRate = rate / periodsPerYear;

    let payment = 0;
    if (periodicRate > 0) {
      payment = (principal * periodicRate * Math.pow(1 + periodicRate, totalPeriods)) / (Math.pow(1 + periodicRate, totalPeriods) - 1);
    } else {
      payment = principal / totalPeriods;
    }

    const totalOblig = payment * totalPeriods;
    const borrowingCost = totalOblig - principal;

    setEstimatedPayment(payment.toFixed(2));
    setCostOfBorrowing(borrowingCost > 0 ? borrowingCost.toFixed(2) : '0.00');
    setTotalObligation(totalOblig.toFixed(2));
    setMsrp(price.toFixed(2));
  };

  const handleReset = () => {
    setFrequency('Monthly');
    setVehiclePrice(car?.price?.toString() || '0');
    setDownPayment('0');
    setTradeValue('0');
    setLoanTerm('60');
    setInterestRate('7.99');
    setIncludeTax(true);
    setEstimatedPayment('0.00');
    setCostOfBorrowing('0.00');
    setTotalObligation('0.00');
  };

  const handleInfoFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your inquiry has been submitted.');
    setIsInfoModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-[#e3ba73] flex items-center justify-center font-semibold animate-pulse">
        Loading Vehicle Details...
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Vehicle Not Found</h2>
        <Link to="/inventory" className="bg-[#e3ba73] text-black px-4 py-2 rounded font-semibold uppercase tracking-wider text-sm">
          Back to Inventory
        </Link>
      </div>
    );
  }

  const imagesList = car.images && car.images.length > 0 
    ? car.images 
    : ['https://via.placeholder.com/800x600?text=No+Image+Available'];

  const nextSlide = () => setActiveImageIndex((prev) => (prev + 1) % imagesList.length);
  const prevSlide = () => setActiveImageIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);

  const specifications = [
    { label: 'Make', value: car.make || 'Audi' },
    { label: 'Model', value: car.model || 'A4' },
    { label: 'Year', value: car.year ? String(car.year) : '2016' },
    { label: 'Body Style', value: car.body_style || 'Sedan' },
    { label: 'Odometer', value: car.mileage ? `${car.mileage.toLocaleString()} KM` : '100,670 KM' },
    { label: 'Transmission', value: car.transmission || 'Automatic' },
    { label: 'Engine', value: car.engine || '4 Cylinder' },
    { label: 'Engine Size', value: car.engine_size || '2.0 L' },
    { label: 'Driveline', value: car.driveline || 'AWD' },
    { label: 'Exterior Color', value: car.exterior_color || 'Gray' },
    { label: 'Interior Color', value: car.interior_color || 'Black' },
    { label: 'Doors', value: car.doors ? String(car.doors) : '4' },
    { label: 'Passengers', value: car.passengers ? String(car.passengers) : '5' },
    { label: 'Fuel Type', value: car.fuel_type || 'Gasoline' },
    { label: 'City Fuel', value: car.city_fuel || '11.0 L/100 km' },
    { label: 'Hwy Fuel', value: car.hwy_fuel || '7.8 L/100 km' },
    { label: 'Stock Number', value: car.stock_number || '004368' },
    { label: 'Vin', value: car.vin || 'WAUFFCFL1GN004368' },
  ];

  const featuresList = car.features && car.features.length > 0 ? car.features : DEFAULT_FEATURES;

  return (
    <div className="w-full bg-black min-h-screen text-white py-6 px-4 sm:px-6 lg:px-12 font-sans relative">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-800 pb-4">
          <Link
            to="/inventory"
            className="inline-flex items-center gap-2 bg-[#e3ba73] text-black px-4 py-2 text-sm font-medium hover:bg-white transition-colors uppercase tracking-wider rounded-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back To Inventory
          </Link>

          {/* Previous & Next Inventory Controls */}
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <button
              type="button"
              onClick={handlePrevCar}
              disabled={prevCarId === null}
              className={`flex items-center gap-1 transition-colors cursor-pointer select-none ${
                prevCarId !== null ? 'hover:text-[#e3ba73] text-white' : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <span className="text-gray-600">|</span>

            <button
              type="button"
              onClick={handleNextCar}
              disabled={nextCarId === null}
              className={`flex items-center gap-1 transition-colors cursor-pointer select-none ${
                nextCarId !== null ? 'hover:text-[#e3ba73] text-white' : 'opacity-30 cursor-not-allowed'
              }`}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="bg-[#222226] border border-gray-700 p-4 sm:p-6 lg:p-8 space-y-8 shadow-xl rounded">
          
          {/* Header Title & Price */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-gray-700 pb-4 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-light tracking-wide uppercase text-white">
                {car.year} {car.make} {car.model}
              </h1>
              <div className="mt-2 flex items-center gap-3">
                <span className="bg-gray-800 text-xs px-2.5 py-1 text-gray-300 border border-gray-600 uppercase">
                  Certified Pre-Owned
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  Stock ID: #{car.stock_number || '004368'}
                </span>
              </div>
            </div>
            
            <div className="text-left lg:text-right">
              <div className="text-3xl font-bold text-[#e3ba73]">
                ${car.price ? car.price.toLocaleString() : 'N/A'}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">+ taxes & licensing</p>
            </div>
          </div>

          {/* Grid Layout: Gallery + Action Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
           {/* Gallery */}
<div className="lg:col-span-7 space-y-4">
  <div className="relative aspect-video w-full overflow-hidden bg-black border border-gray-800 group rounded">
    <img
      src={imagesList[activeImageIndex]}
      alt={`${car.make} ${car.model}`}
      className="w-full h-full object-cover"
    />

    {/* 🏷️ Condition / Status Overlay Tag */}
    {car.condition_tag && (
      <span
        className={`absolute top-3 left-3 text-xs md:text-sm font-extrabold uppercase tracking-wider px-3 py-1 rounded shadow-lg z-20 ${
          car.condition_tag.toLowerCase().includes('genuine')
            ? 'bg-emerald-500 text-white'
            : car.condition_tag.toLowerCase().includes('accidental')
            ? 'bg-red-600 text-white'
            : 'bg-[#e3ba73] text-black'
        }`}
      >
        {car.condition_tag}
      </span>
    )}

    {imagesList.length > 1 && (
      <>
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 hover:bg-[#e3ba73] hover:text-black transition-colors rounded z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 hover:bg-[#e3ba73] hover:text-black transition-colors rounded z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </>
    )}
  </div>

  {imagesList.length > 1 && (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
      {imagesList.map((img, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => setActiveImageIndex(idx)}
          className={`relative w-20 h-14 shrink-0 border-2 transition-all rounded overflow-hidden ${
            idx === activeImageIndex
              ? 'border-[#e3ba73] opacity-100'
              : 'border-transparent opacity-50 hover:opacity-80'
          }`}
        >
          <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
        </button>
      ))}
    </div>
  )}
</div>

            {/* Actions */}
            <div className="lg:col-span-5 space-y-3">
              <button
                type="button"
                onClick={() => setIsInfoModalOpen(true)}
                className="w-full py-3 bg-black border border-[#e3ba73] text-[#e3ba73] font-semibold text-sm uppercase tracking-wider hover:bg-[#e3ba73] hover:text-black transition-colors flex items-center justify-center gap-2 rounded cursor-pointer"
              >
                <Info className="w-4 h-4" />
                Get More Information
              </button>

              <Link
                to={`/forms/text-us-now?selected_vehicle=${car.id}`}
                className="w-full py-3 bg-black border border-[#e3ba73] text-[#e3ba73] font-semibold text-sm uppercase tracking-wider hover:bg-[#e3ba73] hover:text-black transition-colors flex items-center justify-center gap-2 rounded"
              >
                <MessageSquare className="w-4 h-4" />
                Text Us Now
              </Link>

              <button
                type="button"
                onClick={() => setIsCalculatorModalOpen(true)}
                className="w-full py-3 bg-black border border-[#e3ba73] text-[#e3ba73] font-semibold text-sm uppercase tracking-wider hover:bg-[#e3ba73] hover:text-black transition-colors flex items-center justify-center gap-2 rounded cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                Payment Calculator
              </button>

              <Link
                to={`/forms/financing?selected_vehicle=${car.id}`}
                className="w-full py-3 bg-black border border-[#e3ba73] text-[#e3ba73] font-semibold text-sm uppercase tracking-wider hover:bg-[#e3ba73] hover:text-black transition-colors flex items-center justify-center gap-2 rounded"
              >
                <DollarSign className="w-4 h-4" />
                Apply For Financing
              </Link>

              <Link
                to="/directions"
                className="w-full py-3 bg-black border border-[#e3ba73] text-[#e3ba73] font-semibold text-sm uppercase tracking-wider hover:bg-[#e3ba73] hover:text-black transition-colors flex items-center justify-center gap-2 rounded"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </Link>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-gray-700 pt-6 space-y-3">
            <h2 className="text-xl font-light text-[#e3ba73] uppercase tracking-wide">Seller Description</h2>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
              {car.description || "WE ARE PROUD TO BE ONTARIO'S PRE-OWNED DEALERSHIP. WE OFFER STUNNING AND POWERFUL CERTIFIED VEHICLES IN EXCELLENT CONDITION.\n\nFINANCING OPTIONS AVAILABLE: We provide financing for all types of credit!\nTRADE-IN: Got a vehicle to trade? We accept all trade-ins with fair and transparent values."}
            </p>
          </div>

          {/* Specifications */}
          <div className="border-t border-gray-700 pt-6 space-y-4">
            <h2 className="text-xl font-light text-[#e3ba73] uppercase tracking-wide">Vehicle Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-black/40 px-4 py-3 border border-gray-800 text-sm rounded hover:border-gray-700 transition-colors"
                >
                  <span className="text-gray-400 font-medium">{spec.label}:</span>
                  <span className="text-white font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="border-t border-gray-700 pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-light text-[#e3ba73] uppercase tracking-wide">Features & Options</h2>
              <button
                type="button"
                onClick={() => setShowAllOptions(!showAllOptions)}
                className="text-xs text-[#e3ba73] underline hover:text-white uppercase tracking-wider cursor-pointer"
              >
                {showAllOptions ? 'Hide Options' : 'View All Options'}
              </button>
            </div>

            {showAllOptions && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
                {featuresList.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300 bg-black/30 p-2 border border-gray-800 rounded">
                    <Check className="w-4 h-4 text-[#e3ba73]" /> {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact & Location */}
          <div className="border-t border-gray-700 pt-6 space-y-4">
            <div className="flex items-center gap-2 text-[#e3ba73]">
              <MapPin className="w-6 h-6" />
              <h2 className="text-xl font-light uppercase tracking-wide text-white">Location & Contact</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-black/40 p-5 border border-gray-800 rounded">
              <div className="space-y-1">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Address</span>
                <address className="not-italic text-sm text-white font-medium">
                  1575 Main St E Hamilton, Ontario L8H 1C4
                </address>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Direct Phone</span>
                <div>
                  <a href="tel:9055802102" className="inline-flex items-center gap-2 text-sm text-white hover:text-[#e3ba73] transition-colors font-medium">
                    <Phone className="w-4 h-4 text-[#e3ba73]" />
                    905-580-2102
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Share Listing</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://twitter.com/share"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#0073b1] text-white text-xs px-3 py-1.5 rounded hover:opacity-90 transition-opacity"
                  >
                    <FaTwitter className="w-3.5 h-3.5" /> Tweet
                  </a>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    className="inline-flex items-center gap-1.5 bg-[#0073b1] text-white text-xs px-3 py-1.5 rounded hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <FaLinkedin className="w-3.5 h-3.5" /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* OVERLAY MODAL 1: GET MORE INFORMATION */}
      <div
        className={`fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-300 ${
          isInfoModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div
          className={`w-full max-w-lg bg-[#222222] border border-gray-700 text-white rounded shadow-2xl transition-all duration-300 transform ${
            isInfoModalOpen ? 'translate-y-0 scale-100' : '-translate-y-8 scale-95'
          }`}
        >
          <div className="flex justify-between items-center bg-[#1b1b1b] px-6 py-4 border-b border-gray-700">
            <h3 className="text-lg font-bold uppercase text-[#e3ba73]">GET MORE INFORMATION</h3>
            <button
              type="button"
              onClick={() => setIsInfoModalOpen(false)}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleInfoFormSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={infoForm.firstName}
                  onChange={(e) => setInfoForm({ ...infoForm, firstName: e.target.value })}
                  className="w-full bg-[#181818] border border-gray-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-[#e3ba73]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={infoForm.lastName}
                  onChange={(e) => setInfoForm({ ...infoForm, lastName: e.target.value })}
                  className="w-full bg-[#181818] border border-gray-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-[#e3ba73]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={infoForm.email}
                  onChange={(e) => setInfoForm({ ...infoForm, email: e.target.value })}
                  className="w-full bg-[#181818] border border-gray-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-[#e3ba73]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={infoForm.phone}
                  onChange={(e) => setInfoForm({ ...infoForm, phone: e.target.value })}
                  className="w-full bg-[#181818] border border-gray-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-[#e3ba73]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Message</label>
              <textarea
                rows={3}
                value={infoForm.message}
                onChange={(e) => setInfoForm({ ...infoForm, message: e.target.value })}
                placeholder="I am interested in this vehicle..."
                className="w-full bg-[#181818] border border-gray-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-[#e3ba73]"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#e3ba73] hover:bg-[#cdaf63] text-black font-bold py-3 rounded transition-colors text-sm uppercase tracking-wider cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* OVERLAY MODAL 2: PAYMENT CALCULATOR */}
      <div
        className={`fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-300 ${
          isCalculatorModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div
          className={`w-full max-w-2xl bg-[#222222] border border-gray-700 text-white rounded shadow-2xl transition-all duration-300 transform flex flex-col max-h-[85vh] ${
            isCalculatorModalOpen ? 'translate-y-0 scale-100' : '-translate-y-8 scale-95'
          }`}
        >
          <div className="flex justify-between items-center bg-[#1b1b1b] px-6 py-4 border-b border-gray-700 shrink-0">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#e3ba73]" />
              <h3 className="text-lg font-bold uppercase text-[#e3ba73]">PAYMENT CALCULATOR</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsCalculatorModalOpen(false)}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 sm:p-6 overflow-y-auto">
            <p className="text-xs sm:text-sm text-gray-300 mb-3">
              Estimate your car loan payment with easy to use car loan calculator.
            </p>

            <form onSubmit={handleCalculate} className="bg-[#181818] rounded border border-gray-800 p-3 sm:p-4 space-y-3">
              <div className="flex justify-between items-center bg-[#e3ba73] text-black px-3 py-1.5 rounded">
                <span className="font-semibold text-xs sm:text-sm uppercase tracking-wider">Calculate Payment</span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs font-bold hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <span>Reset</span>
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm pt-1">
                <div className="flex items-center justify-between gap-2">
                  <label className="w-1/2 font-semibold text-gray-300">Payment Frequency</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-1/2 bg-white text-black p-1.5 rounded outline-none border border-gray-300 focus:border-[#e3ba73]"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Bi-Weekly">Bi-Weekly</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label className="w-1/2 font-semibold text-gray-300">Vehicle Price</label>
                  <div className="w-1/2 flex items-center bg-white rounded overflow-hidden border border-gray-300">
                    <input
                      type="number"
                      value={vehiclePrice}
                      onChange={(e) => setVehiclePrice(e.target.value)}
                      placeholder="0"
                      className="w-3/4 p-1.5 text-black outline-none bg-transparent"
                    />
                    <span className="w-1/4 bg-gray-200 text-gray-700 py-1.5 text-center font-bold">$</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label className="w-1/2 font-semibold text-gray-300">Down payment</label>
                  <div className="w-1/2 flex items-center bg-white rounded overflow-hidden border border-gray-300">
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      placeholder="0"
                      className="w-3/4 p-1.5 text-black outline-none bg-transparent"
                    />
                    <span className="w-1/4 bg-gray-200 text-gray-700 py-1.5 text-center font-bold">$</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label className="w-1/2 font-semibold text-gray-300">Your trade</label>
                  <div className="w-1/2 flex items-center bg-white rounded overflow-hidden border border-gray-300">
                    <input
                      type="number"
                      value={tradeValue}
                      onChange={(e) => setTradeValue(e.target.value)}
                      placeholder="0"
                      className="w-3/4 p-1.5 text-black outline-none bg-transparent"
                    />
                    <span className="w-1/4 bg-gray-200 text-gray-700 py-1.5 text-center font-bold">$</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label className="w-1/2 font-semibold text-gray-300">Month Term</label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-1/2 bg-white text-black p-1.5 rounded outline-none border border-gray-300 focus:border-[#e3ba73]"
                  >
                    <option value="12">12 Months</option>
                    <option value="24">24 Months</option>
                    <option value="36">36 Months</option>
                    <option value="48">48 Months</option>
                    <option value="60">60 Months</option>
                    <option value="72">72 Months</option>
                    <option value="84">84 Months</option>
                  </select>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label className="w-1/2 font-semibold text-gray-300">Interest rate</label>
                  <div className="w-1/2 flex items-center bg-white rounded overflow-hidden border border-gray-300">
                    <input
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="0.00"
                      className="w-3/4 p-1.5 text-black outline-none bg-transparent"
                    />
                    <span className="w-1/4 bg-gray-200 text-gray-700 py-1.5 text-center font-bold">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="w-1/2 text-gray-300">Your Estimated Payment</p>
                  <div className="w-1/2 bg-[#eee] border border-gray-300 p-1.5 text-black font-bold text-xs sm:text-sm flex items-center">
                    ${estimatedPayment}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="w-1/2 text-gray-300">Cost Of Borrowing</p>
                  <div className="w-1/2 bg-[#eee] border border-gray-300 p-1.5 text-black font-bold text-xs sm:text-sm flex items-center">
                    ${costOfBorrowing}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="w-1/2 text-gray-300">MSRP</p>
                  <div className="w-1/2 bg-[#eee] border border-gray-300 p-1.5 text-black font-bold text-xs sm:text-sm flex items-center">
                    ${msrp}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="w-1/2 text-gray-300">Total Obligation</p>
                  <div className="w-1/2 bg-[#eee] border border-gray-300 p-1.5 text-black font-bold text-xs sm:text-sm flex items-center">
                    ${totalObligation}
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-2 flex items-center gap-2 mt-1">
                  <input
                    type="checkbox"
                    id="confirmModal"
                    checked={includeTax}
                    onChange={(e) => setIncludeTax(e.target.checked)}
                    className="accent-[#e3ba73] cursor-pointer"
                  />
                  <label htmlFor="confirmModal" className="text-gray-300 text-xs sm:text-sm cursor-pointer">
                    Include sales tax
                  </label>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-1/2 bg-[#e3ba73] hover:bg-[#cdaf63] text-black font-bold py-2 px-4 rounded transition-colors text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
                >
                  CALCULATE PAYMENT
                </button>
              </div>
            </form>

            <div className="flex justify-center mt-3">
              <Link
                to={`/forms/financing?selected_vehicle=${car.id}`}
                className="w-full sm:w-auto text-center bg-[#e3ba73] hover:bg-[#cdaf63] text-black font-bold px-6 py-2 rounded transition-colors text-sm uppercase tracking-wider"
              >
                Apply For Financing
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CarDetails;