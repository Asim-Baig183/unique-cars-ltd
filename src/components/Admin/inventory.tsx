import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { AdminLogin } from './AdminLogin';
import { Trash2, PlusCircle, LogOut, Search, Loader2, Edit, XCircle, CheckCircle, X, Printer } from 'lucide-react';
import { WindowStickerModal,type Car } from './WindowStickerModal';

export const AddCarForm: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const [loading, setLoading] = useState(false);
  const [decodingVin, setDecodingVin] = useState(false);
  const [existingCars, setExistingCars] = useState<Car[]>([]);
  
  // State for Editing & Printing
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [selectedCarForPrint, setSelectedCarForPrint] = useState<Car | null>(null);

  // State for VIN decoder lookup input
  const [vinInput, setVinInput] = useState('');

  // Form State containing all specifications + Condition Tag
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: 2024,
    price: '',
    mileage: '',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    body_style: 'Sedan',
    engine: '4 Cylinder',
    engine_size: '',
    driveline: 'AWD',
    exterior_color: 'Gray',
    interior_color: 'Black',
    doors: 4,
    passengers: 5,
    city_fuel: '',
    hwy_fuel: '',
    stock_number: '',
    vin: '',
    condition_tag: 'Used',
    features: '',
    description: '',
  });

  // Image & Preview States
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // 1. Session Auth Monitoring
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCheckingSession(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch Existing Inventory
  const fetchCars = async () => {
    const { data, error } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Fetch Error:', error);
    } else if (data) {
      setExistingCars(data);
    }
  };

  useEffect(() => {
    if (session) {
      fetchCars();
    }
  }, [session]);

  // File Select & Live Preview Generator Handler
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const updatedFiles = [...selectedFiles, ...newFiles];
      setSelectedFiles(updatedFiles);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // Remove New Selected Image
  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove Already Uploaded Image (In Edit Mode)
  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 3. Reset Form Function
  const resetForm = () => {
    setEditingCarId(null);
    setExistingImages([]);
    setSelectedFiles([]);
    previews.forEach((url) => URL.revokeObjectURL(url));
    setPreviews([]);
    setVinInput('');
    setFormData({
      make: '',
      model: '',
      year: 2024,
      price: '',
      mileage: '',
      transmission: 'Automatic',
      fuel_type: 'Gasoline',
      body_style: 'Sedan',
      engine: '4 Cylinder',
      engine_size: '',
      driveline: 'AWD',
      exterior_color: 'Gray',
      interior_color: 'Black',
      doors: 4,
      passengers: 5,
      city_fuel: '',
      hwy_fuel: '',
      stock_number: '',
      vin: '',
      condition_tag: 'Used',
      features: '',
      description: '',
    });
  };

  // 🚀 4. Load Car Details into Form for Editing
  const handleEditClick = (car: Car) => {
    setEditingCarId(car.id);
    setExistingImages(car.images || []);
    setSelectedFiles([]);
    setPreviews([]);
    setFormData({
      make: car.make || '',
      model: car.model || '',
      year: car.year || 2024,
      price: car.price !== undefined && car.price !== null ? car.price.toString() : '',
      mileage: car.mileage !== undefined && car.mileage !== null ? car.mileage.toString() : '',
      transmission: car.transmission || 'Automatic',
      fuel_type: car.fuel_type || 'Gasoline',
      body_style: car.body_style || 'Sedan',
      engine: car.engine || '4 Cylinder',
      engine_size: car.engine_size || '',
      driveline: car.driveline || 'AWD',
      exterior_color: car.exterior_color || 'Gray',
      interior_color: car.interior_color || 'Black',
      doors: car.doors !== undefined && car.doors !== null ? car.doors : 4,
      passengers: car.passengers !== undefined && car.passengers !== null ? car.passengers : 5,
      city_fuel: car.city_fuel || '',
      hwy_fuel: car.hwy_fuel || '',
      stock_number: car.stock_number || '',
      vin: car.vin || '',
      condition_tag: car.condition_tag || 'Used',
      features: Array.isArray(car.features) ? car.features.join(', ') : car.features || '',
      description: car.description || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 5. NHTSA VIN Decoder API Function
  const handleDecodeVin = async () => {
    const cleanVin = vinInput.trim().toUpperCase();

    if (cleanVin.length !== 17) {
      alert('Please enter a valid 17-character VIN number.');
      return;
    }

    setDecodingVin(true);

    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${cleanVin}?format=json`
      );
      const data = await response.json();

      if (data && data.Results) {
        const getVal = (variableName: string) => {
          const item = data.Results.find(
            (r: any) => r.Variable && r.Variable.toLowerCase() === variableName.toLowerCase()
          );
          return item && item.Value && item.Value !== 'Not Applicable' ? item.Value : '';
        };

        const make = getVal('Make');
        const model = getVal('Model');
        const year = getVal('Model Year');
        const bodyClass = getVal('Body Class');
        const driveType = getVal('Drive Type');
        const fuelType = getVal('Fuel Type - Primary');
        const cylinders = getVal('Engine Number of Cylinders');
        const displacementL = getVal('Displacement (L)');
        const doorsVal = getVal('Doors');
        const transmissionVal = getVal('Transmission Style');

        setFormData((prev) => ({
          ...prev,
          vin: cleanVin,
          make: make || prev.make,
          model: model || prev.model,
          year: year ? parseInt(year) : prev.year,
          body_style: bodyClass ? bodyClass : prev.body_style,
          driveline: driveType || prev.driveline,
          fuel_type: fuelType || prev.fuel_type,
          engine: cylinders ? `${cylinders} Cylinder` : prev.engine,
          engine_size: displacementL ? `${parseFloat(displacementL).toFixed(1)} L` : prev.engine_size,
          doors: doorsVal ? parseInt(doorsVal) : prev.doors,
          transmission: transmissionVal && transmissionVal.toLowerCase().includes('manual')
            ? 'Manual'
            : 'Automatic',
        }));

        alert(`✅ Specs auto-filled for ${year} ${make} ${model}!`);
      } else {
        alert('Could not retrieve details for this VIN.');
      }
    } catch (error) {
      console.error('VIN Decode Error:', error);
      alert('Failed to decode VIN. Please check your internet connection.');
    } finally {
      setDecodingVin(false);
    }
  };

  // 6. Handle Submit (Add or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrls: string[] = [...existingImages];

      if (selectedFiles.length > 0) {
        const uploadedUrls: string[] = [];
        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          const fileName = `${Date.now()}-${file.name}`;
          const { error } = await supabase.storage.from('car-images').upload(fileName, file);

          if (error) throw error;

          const { data: publicUrlData } = supabase.storage.from('car-images').getPublicUrl(fileName);
          uploadedUrls.push(publicUrlData.publicUrl);
        }
        imageUrls = [...imageUrls, ...uploadedUrls];
      }

      const featuresArray = typeof formData.features === 'string'
        ? formData.features.split(',').map((item) => item.trim()).filter((item) => item.length > 0)
        : formData.features;

      const parseSafeInt = (val: any, defaultVal = 0) => {
        const parsed = parseInt(val, 10);
        return isNaN(parsed) ? defaultVal : parsed;
      };

      const parseSafeFloat = (val: any, defaultVal = 0) => {
        const parsed = parseFloat(val);
        return isNaN(parsed) ? defaultVal : parsed;
      };

      const payload = {
        make: formData.make,
        model: formData.model,
        year: parseSafeInt(formData.year, 2024),
        price: parseSafeFloat(formData.price, 0),
        mileage: parseSafeInt(formData.mileage, 0),
        transmission: formData.transmission,
        fuel_type: formData.fuel_type,
        body_style: formData.body_style,
        engine: formData.engine,
        engine_size: formData.engine_size,
        driveline: formData.driveline,
        exterior_color: formData.exterior_color,
        interior_color: formData.interior_color,
        doors: parseSafeInt(formData.doors, 4),
        passengers: parseSafeInt(formData.passengers, 5),
        city_fuel: formData.city_fuel,
        hwy_fuel: formData.hwy_fuel,
        stock_number: formData.stock_number,
        vin: formData.vin,
        condition_tag: formData.condition_tag,
        features: featuresArray,
        description: formData.description,
        images: imageUrls,
      };

      if (editingCarId) {
        const { data: updatedData, error: dbError } = await supabase
          .from('cars')
          .update(payload)
          .eq('id', editingCarId)
          .select();

        if (dbError) throw dbError;

        if (!updatedData || updatedData.length === 0) {
          alert('⚠️ Warning: Record found nahi hua ya RLS block kar rahi hai.');
        } else {
          alert('✅ Car details updated successfully!');
        }
      } else {
        const { error: dbError } = await supabase.from('cars').insert([payload]);
        if (dbError) throw dbError;
        alert('✅ Car successfully posted to inventory!');
      }

      resetForm();
      await fetchCars();
    } catch (err: any) {
      console.error('Save Error Details:', err);
      alert('Error saving car: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // 7. Delete Car
  const handleDelete = async (carId: string) => {
    if (!confirm('Are you sure you want to delete this car?')) return;

    const { error } = await supabase.from('cars').delete().eq('id', carId);
    if (error) {
      alert('Failed to delete car: ' + error.message);
    } else {
      alert('Car deleted successfully!');
      if (editingCarId === carId) resetForm();
      fetchCars();
    }
  };

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-black text-[#e3ba73] flex items-center justify-center font-semibold">
        Verifying Security Credentials...
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLoginSuccess={() => fetchCars()} />;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header & Logout */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-4">
          <h1 className="text-3xl font-bold text-[#e3ba73]">Admin Control Panel</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Add / Edit Car Form */}
        <div className="bg-[#111111] border border-gray-800 p-6 rounded-xl shadow-xl space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <PlusCircle className="text-[#e3ba73]" />
              {editingCarId ? 'Edit Vehicle Details' : 'Add New Car to Inventory'}
            </h2>
            {editingCarId && (
              <button
                onClick={resetForm}
                className="flex items-center gap-1 text-xs bg-red-950/80 text-red-400 border border-red-800 px-3 py-1.5 rounded hover:bg-red-900 transition-colors"
              >
                <XCircle className="w-4 h-4" /> Cancel Edit Mode
              </button>
            )}
          </div>

          {/* 🔍 VIN DECODER SEARCH BAR */}
          <div className="bg-gray-900 border border-[#e3ba73]/30 p-4 rounded-xl space-y-2">
            <label className="block text-xs font-bold text-[#e3ba73] uppercase tracking-wider">
              Fast Auto-Fill with VIN Decoder
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter 17-digit VIN (e.g. 1FA6P8CF5H5501234)"
                value={vinInput}
                onChange={(e) => setVinInput(e.target.value)}
                maxLength={17}
                className="bg-black border border-gray-700 p-3 rounded-lg text-white font-mono uppercase w-full outline-none focus:border-[#e3ba73]"
              />
              <button
                type="button"
                onClick={handleDecodeVin}
                disabled={decodingVin}
                className="bg-[#e3ba73] hover:bg-[#cdaf63] text-black font-bold px-6 py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
              >
                {decodingVin ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Fetching Specs...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" /> Decode & Auto-Fill
                  </>
                )}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Core Details */}
            <div>
              <h3 className="text-sm font-semibold text-[#e3ba73] uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
                Core Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Make *</label>
                  <input
                    type="text"
                    placeholder="e.g. Audi"
                    value={formData.make}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    required
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Model *</label>
                  <input
                    type="text"
                    placeholder="e.g. A4"
                    value={formData.model}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    required
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Year *</label>
                  <input
                    type="number"
                    placeholder="e.g. 2016"
                    value={formData.year}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    required
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 25000"
                    value={formData.price}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    required
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Mileage (KM) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 85000"
                    value={formData.mileage}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    required
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#e3ba73] mb-1">Condition Tag (Label Badge)</label>
                  <input
                    type="text"
                    list="tag-options"
                    placeholder="e.g. Full Genuine, Used, Accidental"
                    value={formData.condition_tag}
                    className="w-full bg-[#1e1a12] border border-[#e3ba73]/50 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    onChange={(e) => setFormData({ ...formData, condition_tag: e.target.value })}
                  />
                  <datalist id="tag-options">
                    <option value="Used" />
                    <option value="Full Genuine" />
                    <option value="Accidental" />
                    <option value="Brand New" />
                    <option value="Low Mileage" />
                    <option value="Featured" />
                  </datalist>
                </div>
              </div>
            </div>

            {/* Extended Specifications */}
            <div>
              <h3 className="text-sm font-semibold text-[#e3ba73] uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
                Detailed Specs & Identifiers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Stock Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 004368"
                    value={formData.stock_number}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    onChange={(e) => setFormData({ ...formData, stock_number: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">VIN Number</label>
                  <input
                    type="text"
                    placeholder="e.g. WAUFFCFL1GN004368"
                    value={formData.vin}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Body Style</label>
                  <select
                    value={formData.body_style}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    onChange={(e) => setFormData({ ...formData, body_style: e.target.value })}
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Truck">Truck</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Convertible">Convertible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Transmission</label>
                  <select
                    value={formData.transmission}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Engine Type</label>
                  <input
                    type="text"
                    placeholder="e.g. 4 Cylinder"
                    value={formData.engine}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Engine Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 2.0 L"
                    value={formData.engine_size}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    onChange={(e) => setFormData({ ...formData, engine_size: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Driveline (Drive Type)</label>
                  <input
                    type="text"
                    placeholder="e.g. AWD / FWD"
                    value={formData.driveline}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    onChange={(e) => setFormData({ ...formData, driveline: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Exterior Color</label>
                  <input
                    type="text"
                    placeholder="e.g. Gray"
                    value={formData.exterior_color}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    onChange={(e) => setFormData({ ...formData, exterior_color: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Interior Color</label>
                  <input
                    type="text"
                    placeholder="e.g. Black"
                    value={formData.interior_color}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    onChange={(e) => setFormData({ ...formData, interior_color: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Fuel Type</label>
                  <input
                    type="text"
                    placeholder="e.g. Gasoline"
                    value={formData.fuel_type}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">City Fuel Consumption</label>
                  <input
                    type="text"
                    placeholder="e.g. 11.0 L/100 km"
                    value={formData.city_fuel}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    onChange={(e) => setFormData({ ...formData, city_fuel: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Highway Fuel Consumption</label>
                  <input
                    type="text"
                    placeholder="e.g. 7.8 L/100 km"
                    value={formData.hwy_fuel}
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                    onChange={(e) => setFormData({ ...formData, hwy_fuel: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Features & Description */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-[#e3ba73] uppercase tracking-wider border-b border-gray-800 pb-2">
                Features & Description
              </h3>
              
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Key Features (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Navigation, Sunroof, Backup Camera, Heated Seats"
                  value={formData.features}
                  className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Full Vehicle Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe vehicle condition, warranty, dealership notes..."
                  value={formData.description}
                  className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>
            </div>

            {/* File Upload & Live Preview Grid */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-gray-400">
                {editingCarId ? 'Add More Images (Optional)' : 'Upload Car Images'}
              </label>
              
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="bg-gray-900 border border-gray-800 p-3 w-full rounded text-white text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#e3ba73] file:text-black hover:file:bg-[#cdaf63] cursor-pointer"
              />

              {/* Already Uploaded Images (Edit Mode) */}
              {existingImages.length > 0 && (
                <div>
                  <p className="text-xs text-[#e3ba73] font-semibold my-2">Existing Uploaded Images:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-900/40 p-3 rounded-lg border border-gray-800">
                    {existingImages.map((src, index) => (
                      <div key={`existing-${index}`} className="relative group rounded-md overflow-hidden border border-gray-700 bg-black aspect-video">
                        <img src={src} alt={`Existing ${index}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute top-1.5 right-1.5 bg-red-600/80 hover:bg-red-600 text-white p-1 rounded-full shadow transition-transform hover:scale-110"
                          title="Remove existing image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Selected Images Live Preview */}
              {previews.length > 0 && (
                <div>
                  <p className="text-xs text-emerald-400 font-semibold my-2">New Images To Upload:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                    {previews.map((src, index) => (
                      <div key={`new-${index}`} className="relative group rounded-md overflow-hidden border border-gray-700 bg-black aspect-video">
                        <img
                          src={src}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-1.5 left-1.5 bg-emerald-500/90 text-white p-1 rounded-full shadow backdrop-blur-sm">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-1.5 right-1.5 bg-red-600/80 hover:bg-red-600 text-white p-1 rounded-full shadow transition-transform hover:scale-110"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <span className="absolute bottom-1 left-1.5 text-[10px] bg-black/70 text-gray-300 px-1.5 py-0.5 rounded">
                          Image #{index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e3ba73] text-black py-3 rounded-lg font-bold hover:bg-[#cdaf63] transition duration-200 disabled:bg-gray-600 uppercase tracking-wider"
            >
              {loading ? 'Processing...' : editingCarId ? 'Update Vehicle Details' : 'Post Car To Inventory'}
            </button>
          </form>
        </div>

        {/* Existing Inventory List */}
        <div className="bg-[#111111] border border-gray-800 p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">Manage Posted Inventory ({existingCars.length})</h2>

          <div className="space-y-4">
            {existingCars.map((car) => (
              <div key={car.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-900 p-4 rounded border border-gray-800 gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={car.images?.[0] || 'https://via.placeholder.com/100'}
                      alt={car.model}
                      className="w-20 h-14 object-cover rounded"
                    />
                    {car.condition_tag && (
                      <span className="absolute top-1 left-1 bg-[#e3ba73] text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
                        {car.condition_tag}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-white">{car.year} {car.make} {car.model}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-sm font-bold text-[#e3ba73]">${car.price?.toLocaleString()}</p>
                      {car.condition_tag && (
                        <span className="text-xs bg-gray-800 text-gray-300 border border-gray-700 px-2 py-0.5 rounded">
                          {car.condition_tag}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {/* PRINT WINDOW STICKER BUTTON */}
                  <button
                    onClick={() => setSelectedCarForPrint(car)}
                    className="bg-gray-800 text-gray-200 hover:bg-[#e3ba73] hover:text-black p-2.5 rounded transition-colors flex items-center gap-1 text-xs font-semibold"
                    title="Print Window Sticker"
                  >
                    <Printer className="w-4 h-4" /> Print Sticker
                  </button>

                  {/* EDIT BUTTON */}
                  <button
                    onClick={() => handleEditClick(car)}
                    className="bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white p-2.5 rounded transition-colors flex items-center gap-1 text-xs font-semibold"
                    title="Edit Vehicle"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </button>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white p-2.5 rounded transition-colors"
                    title="Delete Vehicle"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 🖨️ PRINT MODAL SUB-COMPONENT IMPORT */}
      <WindowStickerModal
        car={selectedCarForPrint}
        onClose={() => setSelectedCarForPrint(null)}
      />
    </div>
  );
};

export default AddCarForm;