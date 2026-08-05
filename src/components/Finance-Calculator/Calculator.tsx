import React, { useState } from 'react';
import { Calculator, RotateCcw, Phone, MapPin, Clock } from 'lucide-react';

export const CalculatorSection: React.FC = () => {
  // Form State
  const [frequency, setFrequency] = useState<string>('Monthly');
  const [vehiclePrice, setVehiclePrice] = useState<string>('');
  const [downPayment, setDownPayment] = useState<string>('');
  const [tradeValue, setTradeValue] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('36');
  const [interestRate, setInterestRate] = useState<string>('');
  const [includeTax, setIncludeTax] = useState<boolean>(false);

  // Calculated Results State
  const [estimatedPayment, setEstimatedPayment] = useState<string>('0.00');
  const [costOfBorrowing, setCostOfBorrowing] = useState<string>('0.00');
  const [msrp, setMsrp] = useState<string>('0.00');
  const [totalObligation, setTotalObligation] = useState<string>('0.00');

  // Reset Form
  const handleReset = () => {
    setFrequency('Monthly');
    setVehiclePrice('');
    setDownPayment('');
    setTradeValue('');
    setLoanTerm('36');
    setInterestRate('');
    setIncludeTax(false);
    setEstimatedPayment('0.00');
    setCostOfBorrowing('0.00');
    setMsrp('0.00');
    setTotalObligation('0.00');
  };

  // Calculation Logic
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(vehiclePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const trade = parseFloat(tradeValue) || 0;
    const rate = parseFloat(interestRate) || 0;
    const months = parseInt(loanTerm) || 36;

    // Apply Sales Tax (Ontario HST ~13% assumed if checked)
    const taxMultiplier = includeTax ? 1.13 : 1.0;
    const adjustedPrice = price * taxMultiplier;

    const principal = Math.max(0, adjustedPrice - down - trade);
    const annualRate = rate / 100;

    let periodsPerYear = 12;
    if (frequency === 'Bi-Weekly') periodsPerYear = 26;
    if (frequency === 'Weekly') periodsPerYear = 52;

    const totalPayments = (months / 12) * periodsPerYear;
    const periodicRate = annualRate / periodsPerYear;

    let payment = 0;
    if (periodicRate > 0 && totalPayments > 0) {
      payment =
        (principal * (periodicRate * Math.pow(1 + periodicRate, totalPayments))) /
        (Math.pow(1 + periodicRate, totalPayments) - 1);
    } else if (totalPayments > 0) {
      payment = principal / totalPayments;
    }

    const totalPaid = payment * totalPayments;
    const totalInterest = Math.max(0, totalPaid - principal);

    setMsrp(price.toFixed(2));
    setEstimatedPayment(payment ? payment.toFixed(2) : '0.00');
    setCostOfBorrowing(totalInterest ? totalInterest.toFixed(2) : '0.00');
    setTotalObligation(totalPaid ? totalPaid.toFixed(2) : '0.00');
  };

  return (
    <div className="w-full bg-black overflow-hidden py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          
          {/* Main Calculator Box */}
          <div className="w-full lg:w-2/3 bg-[#222222] p-4 sm:p-6 rounded-md text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Finance Calculator</h2>
            <h4 className="text-sm sm:text-base text-gray-300 pb-4">
              Estimate your car loan payment with easy to use car loan calculator
            </h4>

            <form
              onSubmit={handleCalculate}
              className="bg-[#181818] rounded border border-gray-800 p-4 shadow-sm space-y-4"
            >
              {/* Header Bar */}
              <div className="flex justify-between items-center bg-[#e3ba73] text-black px-3 py-2 rounded">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Calculator className="w-4 h-4 text-black" />
                  <span>Payment Calculator</span>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs font-bold hover:opacity-80 transition-opacity"
                >
                  <span>Reset</span>
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Input Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm pt-2">
                
                {/* Payment Frequency */}
                <div className="flex items-center justify-between gap-2">
                  <label className="w-1/2 font-semibold text-gray-300">Payment Frequency</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-1/2 bg-white text-black p-2 rounded outline-none border border-gray-300 focus:border-[#e3ba73]"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Bi-Weekly">Bi-Weekly</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>

                {/* Vehicle Price */}
                <div className="flex items-center justify-between gap-2">
                  <label className="w-1/2 font-semibold text-gray-300">Vehicle Price</label>
                  <div className="w-1/2 flex items-center bg-white rounded overflow-hidden border border-gray-300">
                    <input
                      type="number"
                      value={vehiclePrice}
                      onChange={(e) => setVehiclePrice(e.target.value)}
                      placeholder="0"
                      className="w-3/4 p-2 text-black outline-none bg-transparent"
                    />
                    <span className="w-1/4 bg-gray-200 text-gray-700 py-2 text-center font-bold">
                      $
                    </span>
                  </div>
                </div>

                {/* Down Payment */}
                <div className="flex items-center justify-between gap-2">
                  <label className="w-1/2 font-semibold text-gray-300">Down payment</label>
                  <div className="w-1/2 flex items-center bg-white rounded overflow-hidden border border-gray-300">
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      placeholder="0"
                      className="w-3/4 p-2 text-black outline-none bg-transparent"
                    />
                    <span className="w-1/4 bg-gray-200 text-gray-700 py-2 text-center font-bold">
                      $
                    </span>
                  </div>
                </div>

                {/* Your Trade */}
                <div className="flex items-center justify-between gap-2">
                  <label className="w-1/2 font-semibold text-gray-300">Your trade</label>
                  <div className="w-1/2 flex items-center bg-white rounded overflow-hidden border border-gray-300">
                    <input
                      type="number"
                      value={tradeValue}
                      onChange={(e) => setTradeValue(e.target.value)}
                      placeholder="0"
                      className="w-3/4 p-2 text-black outline-none bg-transparent"
                    />
                    <span className="w-1/4 bg-gray-200 text-gray-700 py-2 text-center font-bold">
                      $
                    </span>
                  </div>
                </div>

                {/* Month Term */}
                <div className="flex items-center justify-between gap-2">
                  <label className="w-1/2 font-semibold text-gray-300">Month Term</label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-1/2 bg-white text-black p-2 rounded outline-none border border-gray-300 focus:border-[#e3ba73]"
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

                {/* Interest Rate */}
                <div className="flex items-center justify-between gap-2">
                  <label className="w-1/2 font-semibold text-gray-300">Interest rate</label>
                  <div className="w-1/2 flex items-center bg-white rounded overflow-hidden border border-gray-300">
                    <input
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="0.00"
                      className="w-3/4 p-2 text-black outline-none bg-transparent"
                    />
                    <span className="w-1/4 bg-gray-200 text-gray-700 py-2 text-center font-bold">
                      %
                    </span>
                  </div>
                </div>

                {/* Calculation Displays */}
                <div className="flex items-center justify-between gap-2">
                  <p className="w-1/2 text-gray-300">Your Estimated Payment</p>
                  <div className="w-1/2 bg-[#eee] border border-gray-300 p-2 text-black font-bold text-sm min-h-9.5 flex items-center">
                    ${estimatedPayment}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="w-1/2 text-gray-300">Cost Of Borrowing</p>
                  <div className="w-1/2 bg-[#eee] border border-gray-300 p-2 text-black font-bold text-sm min-h-9.5 flex items-center">
                    ${costOfBorrowing}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="w-1/2 text-gray-300">MSRP</p>
                  <div className="w-1/2 bg-[#eee] border border-gray-300 p-2 text-black font-bold text-sm min-h-9.5 flex items-center">
                    ${msrp}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="w-1/2 text-gray-300">Total Obligation</p>
                  <div className="w-1/2 bg-[#eee] border border-gray-300 p-2 text-black font-bold text-sm min-h-9.5 flex items-center">
                    ${totalObligation}
                  </div>
                </div>

                {/* Include Tax Checkbox */}
                <div className="col-span-1 md:col-span-2 flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="confirm"
                    checked={includeTax}
                    onChange={(e) => setIncludeTax(e.target.checked)}
                    className="accent-[#e3ba73] cursor-pointer"
                  />
                  <label htmlFor="confirm" className="text-gray-300 text-xs sm:text-sm cursor-pointer">
                    Include sales tax
                  </label>
                </div>
              </div>

              {/* Calculate Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="w-full md:w-1/2 bg-[#e3ba73] hover:bg-[#cdaf63] text-black font-bold py-2 px-4 rounded transition-colors text-xs sm:text-sm uppercase tracking-wider"
                >
                  CALCULATE PAYMENT
                </button>
              </div>
            </form>

            {/* Apply Button */}
            <div className="flex justify-center mt-6">
              <a
                href="/CreditApplication"
                className="bg-[#e3ba73] hover:bg-[#cdaf63] text-black font-bold px-6 py-2.5 rounded transition-colors text-center text-sm"
              >
                Apply For Financing
              </a>
            </div>
          </div>

          {/* Sidebar: Contact Information */}
          <div className="w-full lg:w-1/3 bg-[#212121] p-6 rounded-md text-white">
            <h3 className="text-lg font-bold mb-4 text-[#e3ba73] border-b border-gray-800 pb-2">
              Contact Information
            </h3>

            {/* Phone */}
            <div className="flex items-center gap-2 my-3 text-sm">
              <Phone className="w-4 h-4 text-[#e3ba73]" />
              <span>Phone:</span>
              <a href="tel:9055802102" className="hover:underline font-semibold text-gray-200">
                905-580-2102
              </a>
            </div>

            {/* Address */}
            <div className="my-4 text-sm">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-[#e3ba73]" />
                <span className="font-semibold">Address:</span>
              </div>
              <p className="text-gray-300 pl-6">
                1575 Main St E, Hamilton, Ontario, L8H 1C4
              </p>
            </div>

            {/* Business Hours */}
            <div className="my-4 text-sm border-t border-gray-800 pt-3">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#e3ba73]" />
                <span className="font-semibold">Business Hours</span>
              </div>

              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>MONDAY</span>
                  <span>9:30 AM - 07:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>TUESDAY</span>
                  <span>9:30 AM - 07:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>WEDNESDAY</span>
                  <span>9:30 AM - 07:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>THURSDAY</span>
                  <span>9:30 AM - 07:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>FRIDAY</span>
                  <span>9:30 AM - 07:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>SATURDAY</span>
                  <span>9:30 AM - 03:30 PM</span>
                </div>
                <div className="flex justify-between text-red-400 font-semibold">
                  <span>SUNDAY</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Directions Button */}
            <div className="mt-6">
              <a
                href="/directions"
                className="inline-block bg-[#e3ba73] hover:bg-[#cdaf63] text-black font-semibold px-4 py-2 rounded text-xs transition-colors"
              >
                Get Direction
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CalculatorSection;