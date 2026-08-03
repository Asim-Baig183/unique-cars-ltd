// src/services/carsxeService.ts

export interface VehicleSpecs {
  success: boolean;
  year?: number;
  make?: string;
  model?: string;
  trim?: string;
  engine?: string;
  transmission?: string;
  driveType?: string;
  bodyType?: string;
  doors?: number;
  fuelType?: string;
  cityMpg?: number;
  hwyMpg?: number;
  error?: string;
}

export const fetchCarSpecsByVIN = async (vin: string): Promise<VehicleSpecs> => {
  try {
    // Free Public NHTSA API (No API Key Required)
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`
    );

    const data = await response.json();
    const result = data.Results?.[0];

    if (!result || !result.Make) {
      throw new Error('Invalid VIN or specs not found');
    }

    return {
      success: true,
      year: result.ModelYear ? parseInt(result.ModelYear) : undefined,
      make: result.Make,
      model: result.Model,
      trim: result.Series || result.Trim || 'Standard',
      engine: `${result.DisplacementL || ''}L ${result.EngineConfiguration || ''} ${result.EngineCylinders || ''} Cyl`.trim(),
      transmission: result.TransmissionStyle || 'Automatic',
      driveType: result.DriveType || 'N/A',
      bodyType: result.BodyClass || 'N/A',
      doors: result.Doors ? parseInt(result.Doors) : undefined,
      fuelType: result.FuelTypePrimary || 'Gasoline',
    };
  } catch (error: any) {
    console.error('VIN Decode Error:', error.message);
    return { success: false, error: error.message };
  }
};