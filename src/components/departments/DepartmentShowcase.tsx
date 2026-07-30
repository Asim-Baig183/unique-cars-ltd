import React from 'react';
import { DepartmentCard } from './DepartmentCard';
import { DEPARTMENTS } from '../../constants/departmentData';

export const DepartmentShowcase: React.FC = () => {
  return (
    <section className="w-full py-8 px-4 bg-[#111] text-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="mb-8 text-center border-b border-white/10 pb-4 w-full">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-wide uppercase">
            Explore Our Departments
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {DEPARTMENTS.map((dept) => (
            <DepartmentCard key={dept.title} {...dept} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentShowcase;