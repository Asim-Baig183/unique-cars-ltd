import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

export const AddCarForm = () => {
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrls: string[] = [];

      // 1. Images Upload Routine
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileName = `${Date.now()}-${file.name}`;
          const { error } = await supabase.storage
  .from('car-images')
  .upload(fileName, file);

          if (error) throw error;

          // Public URL retrieve
          const { data: publicUrlData } = supabase.storage
            .from('car-images')
            .getPublicUrl(fileName);

          imageUrls.push(publicUrlData.publicUrl);
        }
      }

      // 2. Insert Record in Supabase DB
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
    } catch (err: any) {
      alert('Error adding car: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-md space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Add New Car to Inventory</h2>

      <div className="grid grid-cols-2 gap-4">
        <input 
          type="text" 
          placeholder="Make (e.g. Toyota)" 
          className="border p-2 rounded" 
          required 
          onChange={(e) => setFormData({ ...formData, make: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Model (e.g. Camry)" 
          className="border p-2 rounded" 
          required 
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
        />
        <input 
          type="number" 
          placeholder="Year" 
          className="border p-2 rounded" 
          required 
          onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
        />
        <input 
          type="number" 
          placeholder="Price ($)" 
          className="border p-2 rounded" 
          required 
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input 
          type="number" 
          placeholder="Mileage" 
          className="border p-2 rounded" 
          required 
          onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
        />
        <select 
          className="border p-2 rounded"
          onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
        >
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Upload Car Photos</label>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={(e) => setFiles(e.target.files)} 
          className="border p-2 w-full rounded"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading} 
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Uploading & Saving...' : 'Post Car'}
      </button>
    </form>
  );
};