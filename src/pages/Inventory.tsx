// src/pages/Inventory.tsx
import React from 'react';
import AllInventory from '../components/inventory/AllInventory';

const InventoryPage: React.FC = () => {
  return (
    <main>
      {/* Agar aap ka koi Header/Navbar component hai to wo yahan aayega */}
      
      <AllInventory />
      
      {/* Agar aap ka Footer component hai to wo yahan aayega */}
    </main>
  );
};

export default InventoryPage;