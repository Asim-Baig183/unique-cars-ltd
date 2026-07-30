import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { AdminLogin } from './AdminLogin';
import { Trash2, PlusCircle, LogOut } from 'lucide-react';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  images: string[];
}

export const AddCarForm = () => {
  const [session, setSession] = useState<any>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const [loading, setLoading] = useState(false);
  const [existingCars, setExistingCars] = useState<Car[]>([]);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: 2024,
    price: '',
    mileage: '',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    description: '',
  });
  const [files, setFiles] = useState<FileList | null>(null);

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
    const { data } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
    if (data) setExistingCars(data);
  };

  useEffect(() => {
    if (session) {
      fetchCars();
    }
  }, [session]);

  // 3. Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrls: string[] = [];

      if (files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileName = `${Date.now()}-${file.name}`;
          const { error } = await supabase.storage.from('car-images').upload(fileName, file);

          if (error) throw error;

          const { data: publicUrlData } = supabase.storage.from('car-images').getPublicUrl(fileName);
          imageUrls.push(publicUrlData.publicUrl);
        }
      }

      const { error: dbError } = await supabase.from('cars').insert([
        {
          ...formData,
          price: parseFloat(formData.price),
          mileage: parseInt(formData.mileage),
          year: parseInt(formData.year.toString()),
          images: imageUrls,
        },
      ]);

      if (dbError) throw dbError;

      alert('Car successfully posted to inventory!');
      fetchCars(); // Refresh list
    } catch (err: any) {
      alert('Error adding car: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. Delete Car
  const handleDelete = async (carId: string) => {
    if (!confirm('Are you sure you want to delete this car?')) return;

    const { error } = await supabase.from('cars').delete().eq('id', carId);
    if (error) {
      alert('Failed to delete car: ' + error.message);
    } else {
      alert('Car deleted successfully!');
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

  // Render Login Screen if not logged in
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

        {/* Add Car Form */}
        <div className="bg-[#111111] border border-gray-800 p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <PlusCircle className="text-[#e3ba73]" /> Add New Car to Inventory
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Make (e.g. Toyota)"
                className="bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                required
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
              />
              <input
                type="text"
                placeholder="Model (e.g. Camry)"
                className="bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                required
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
              <input
                type="number"
                placeholder="Year"
                className="bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                required
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              />
              <input
                type="number"
                placeholder="Price ($)"
                className="bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                required
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
              <input
                type="number"
                placeholder="Mileage"
                className="bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                required
                onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
              />
              <select
                className="bg-gray-900 border border-gray-800 p-3 rounded text-white outline-none focus:border-[#e3ba73]"
                onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Upload Car Photos</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFiles(e.target.files)}
                className="bg-gray-900 border border-gray-800 p-3 w-full rounded text-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e3ba73] text-black py-3 rounded-lg font-bold hover:bg-[#cdaf63] transition duration-200 disabled:bg-gray-600"
            >
              {loading ? 'Uploading & Saving...' : 'Post Car'}
            </button>
          </form>
        </div>

        {/* Existing Inventory & Delete Action */}
        <div className="bg-[#111111] border border-gray-800 p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">Manage Posted Inventory ({existingCars.length})</h2>

          <div className="space-y-4">
            {existingCars.map((car) => (
              <div key={car.id} className="flex items-center justify-between bg-gray-900 p-4 rounded border border-gray-800">
                <div className="flex items-center gap-4">
                  <img
                    src={car.images?.[0] || 'https://via.placeholder.com/100'}
                    alt={car.model}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-bold">{car.year} {car.make} {car.model}</h4>
                    <p className="text-sm text-[#e3ba73]">${car.price?.toLocaleString()}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(car.id)}
                  className="bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white p-2.5 rounded transition-colors"
                  title="Delete Vehicle"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddCarForm;