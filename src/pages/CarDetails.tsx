import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { ArrowLeft, Fuel, Gauge, Calendar, ShieldCheck } from 'lucide-react';

interface CarDetail {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: string;
  fuel_type: string;
  description: string;
  images: string[];
  created_at: string;
}

export const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        setCar(data);
        if (data?.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      } catch (err: any) {
        console.error('Error fetching car details:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

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
        <Link to="/inventory" className="bg-[#e3ba73] text-black px-4 py-2 rounded font-semibold">
          Back to Inventory
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen py-8 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link to="/inventory" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#e3ba73] mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Inventory
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">
              {car.year} {car.make} {car.model}
            </h1>
            <p className="text-gray-400 text-sm mt-1">Stock ID: #{car.id.substring(0, 8).toUpperCase()}</p>
          </div>
          <div className="text-[#e3ba73] text-3xl font-bold mt-2 md:mt-0">
            ${car.price?.toLocaleString()}
          </div>
        </div>

        {/* Gallery & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Photo Gallery (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="h-96 w-full bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
              <img
                src={selectedImage || 'https://via.placeholder.com/800x600?text=No+Image'}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Selection */}
            {car.images && car.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {car.images.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-24 h-20 rounded overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImage === imgUrl ? 'border-[#e3ba73] scale-105' : 'border-gray-800 opacity-60'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="bg-[#111111] p-6 rounded-lg border border-gray-800 mt-6">
              <h3 className="text-xl font-bold mb-3 text-[#e3ba73]">Seller Description</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {car.description || "No specific description provided for this vehicle."}
              </p>
            </div>
          </div>

          {/* Quick Specs & Actions Sidebar (Right 1 Column) */}
          <div className="space-y-6">
            <div className="bg-[#111111] p-6 rounded-lg border border-gray-800 space-y-4">
              <h3 className="text-lg font-bold border-b border-gray-800 pb-2">Vehicle Specifications</h3>

              <div className="flex justify-between items-center text-sm py-1 border-b border-gray-800/50">
                <span className="text-gray-400 flex items-center gap-2"><Calendar className="w-4 h-4 text-[#e3ba73]"/> Year</span>
                <span className="font-semibold">{car.year}</span>
              </div>

              <div className="flex justify-between items-center text-sm py-1 border-b border-gray-800/50">
                <span className="text-gray-400 flex items-center gap-2"><Gauge className="w-4 h-4 text-[#e3ba73]"/> Mileage</span>
                <span className="font-semibold">{car.mileage?.toLocaleString()} mi</span>
              </div>

              <div className="flex justify-between items-center text-sm py-1 border-b border-gray-800/50">
                <span className="text-gray-400 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#e3ba73]"/> Transmission</span>
                <span className="font-semibold">{car.transmission}</span>
              </div>

              <div className="flex justify-between items-center text-sm py-1 border-b border-gray-800/50">
                <span className="text-gray-400 flex items-center gap-2"><Fuel className="w-4 h-4 text-[#e3ba73]"/> Fuel Type</span>
                <span className="font-semibold">{car.fuel_type}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link 
                to={`/CreditApplication?vehicle=${car.id}`} 
                className="block text-center w-full bg-[#e3ba73] text-black font-bold py-3 rounded hover:bg-[#cdaf63] transition-colors"
              >
                Apply For Financing
              </Link>
              <Link 
                to={`/ContactUs?vehicle=${car.id}`} 
                className="block text-center w-full bg-gray-800 text-white font-bold py-3 rounded border border-gray-700 hover:bg-gray-700 transition-colors"
              >
                Inquire About This Car
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CarDetails;