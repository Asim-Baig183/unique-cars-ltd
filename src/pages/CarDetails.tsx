import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Action Button Interface
interface ActionButton {
  text: string;
  icon: React.ReactNode;
  viewBox: string;
  link?: string;
  onClick?: () => void;
}

// Specification Interface
interface Specification {
  label: string;
  value: string;
}

export default function CarDetails(): React.JSX.Element {
  // Image Gallery State
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  // Modal Control States
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [isCalcModalOpen, setIsCalcModalOpen] = useState<boolean>(false);

  // Information Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Payment Calculator States
  const [frequency, setFrequency] = useState<string>("monthly");
  const [vehiclePrice, setVehiclePrice] = useState<number | "">(17999);
  const [downPayment, setDownPayment] = useState<number | "">(2000);
  const [tradeValue, setTradeValue] = useState<number | "">(0);
  const [loanTerm, setLoanTerm] = useState<number>(36);
  const [intRate, setIntRate] = useState<number | "">(6.99);
  const [includeTax, setIncludeTax] = useState<boolean>(false);

  // Reset Calculator Function
  const handleReset = () => {
    setFrequency("monthly");
    setVehiclePrice(17999);
    setDownPayment(0);
    setTradeValue(0);
    setLoanTerm(36);
    setIntRate(0);
    setIncludeTax(false);
  };

  // Advanced Financial Calculations Logic
  const priceNum = typeof vehiclePrice === "number" ? vehiclePrice : 0;
  const downNum = typeof downPayment === "number" ? downPayment : 0;
  const tradeNum = typeof tradeValue === "number" ? tradeValue : 0;
  const rateNum = typeof intRate === "number" ? intRate : 0;

  // Tax calculation (13% HST applied if checked)
  const taxMultiplier = includeTax ? 1.13 : 1.0;
  const msrpDisplay = priceNum;
  const effectivePrice = priceNum * taxMultiplier;
  const principalLoan = Math.max(0, effectivePrice - downNum - tradeNum);

  // Periods per year based on selected frequency
  const periodsPerYear = frequency === "biweekly" ? 26 : 12;
  const totalPaymentsCount = Math.round((loanTerm / 12) * periodsPerYear);

  let periodicPayment = 0;
  let totalObligation = 0;
  let costOfBorrowing = 0;

  if (principalLoan > 0 && totalPaymentsCount > 0) {
    const periodicInterestRate = rateNum / 100 / periodsPerYear;

    if (periodicInterestRate === 0) {
      periodicPayment = principalLoan / totalPaymentsCount;
    } else {
      periodicPayment =
        (principalLoan *
          (periodicInterestRate *
            Math.pow(1 + periodicInterestRate, totalPaymentsCount))) /
        (Math.pow(1 + periodicInterestRate, totalPaymentsCount) - 1);
    }

    totalObligation = periodicPayment * totalPaymentsCount + downNum + tradeNum;
    costOfBorrowing = Math.max(0, totalObligation - (effectivePrice));
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setIsInfoModalOpen(false);
  };

  // Sidebar action buttons list
  const actionButtons: ActionButton[] = [
    {
      text: "Get More Information",
      icon: (
        <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" />
      ),
      viewBox: "0 0 512 512",
      onClick: () => setIsInfoModalOpen(true),
    },
    {
      text: "Text Us Now",
      icon: (
        <path d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z" />
      ),
      viewBox: "0 0 576 512",
      link: "/TextUs",
    },
    {
      text: "Payment Calculator",
      icon: (
        <path d="M400 0H48C22.4 0 0 22.4 0 48v416c0 25.6 22.4 48 48 48h352c25.6 0 48-22.4 48-48V48c0-25.6-22.4-48-48-48zM128 435.2c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8V268.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v166.4zm0-256c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8V76.8C64 70.4 70.4 64 76.8 64h294.4c6.4 0 12.8 6.4 12.8 12.8v102.4z" />
      ),
      viewBox: "0 0 448 512",
      onClick: () => setIsCalcModalOpen(true),
    },
    {
      text: "Apply For Financing",
      icon: (
        <path d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z" />
      ),
      viewBox: "0 0 288 512",
      link: "/CreditApplication",
    },
    {
      text: "Get Directions",
      icon: (
        <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z" />
      ),
      viewBox: "0 0 384 512",
      link: "/Directions",
    },
  ];

  // Specifications
  const specifications: Specification[] = [
    { label: "Make", value: "Audi" },
    { label: "Model", value: "A4" },
    { label: "Year", value: "2016" },
    { label: "Body Style", value: "Sedan" },
    { label: "Odometer", value: "100,670 KM" },
    { label: "Transmission", value: "Automatic" },
    { label: "Engine", value: "4 Cylinder" },
    { label: "Engine Size", value: "2.0 L" },
    { label: "Driveline", value: "AWD" },
    { label: "Exterior Color", value: "Gray" },
    { label: "Interior Color", value: "Black" },
    { label: "Doors", value: "4" },
    { label: "Passengers", value: "5" },
    { label: "Fuel Type", value: "Gasoline" },
    { label: "City Fuel", value: "11.0 L/100 km" },
    { label: "Hwy Fuel", value: "7.8 L/100 km" },
    { label: "Stock Number", value: "004368" },
    { label: "Vin", value: "WAUFFCFL1GN004368" },
  ];

  // Thumbnails
  const thumbnails: string[] = [
    "2016-Audi-A4-6286723003245365.jpg",
    "2016-Audi-A4-5605086069454202.jpg",
    "2016-Audi-A4-12665689731027596.jpg",
    "2016-Audi-A4-5300617407258146.jpg",
    "2016-Audi-A4-0274588618657301.jpg",
    "2016-Audi-A4-5838047367320867.jpg",
    "2016-Audi-A4-037095857341947536.jpg",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full min-h-screen bg-black text-white p-0 pt-5 px-1 sm:px-3 md:px-6 m-0 flex flex-col items-center justify-center relative"
    >
      {/* Top Navigation Row */}
      <div className="w-full xl:w-11/12 flex flex-wrap p-3 items-center justify-between">
        <div className="w-8/12 sm:w-4/12 lg:w-4/12 xl:px-5">
          <a href="/cars">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center bg-[#e3ba73] hover:bg-[#c99f5a] text-black font-semibold text-sm px-3 py-2 transition-colors duration-200 cursor-pointer"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                className="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
              </svg>
              Back To Inventory
            </motion.button>
          </a>
        </div>

        <div className="w-full sm:w-8/12 lg:w-8/12 pt-4 sm:pt-0 flex justify-between sm:justify-end gap-4 lg:px-5">
          <div className="py-2 flex items-center justify-center">
            <a
              className="flex items-center text-sm text-gray-300 hover:text-white px-2 py-1 transition-colors"
              href="/cars/used/2013-Audi-A5-598298"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 256 512"
                className="w-4 h-4 mr-1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path>
              </svg>
              Previous
            </a>
          </div>
          <div className="py-2 flex items-center justify-center">
            <a
              className="flex items-center text-sm text-gray-300 hover:text-white px-4 py-1 transition-colors"
              href="/cars/used/2020-Nissan-Kicks-597362"
            >
              Next
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 256 512"
                className="w-4 h-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Box */}
      <div className="w-full xl:w-11/12 bg-[#222222] border border-[#7a7a7a] p-4 md:p-6 rounded-none">
        {/* Title and Price Header */}
        <div className="w-full flex flex-col justify-between items-start border-b border-gray-700 pb-4">
          <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-white">
              2016 Audi A4 4dr Sdn Auto Progressiv plus quattro
            </h1>

            <div className="flex flex-col lg:items-end py-2 lg:py-0">
              <div className="flex items-baseline gap-1 text-2xl font-bold text-white">
                <span>$</span>
                <span>17,999</span>
              </div>
              <small className="text-xs text-gray-300 font-sans">
                + taxes & licensing
              </small>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <img
              src="https://uniquecars.ca/images/certified2.jpg"
              className="max-w-22.5 h-auto"
              alt="certified"
            />
          </div>
        </div>

        {/* Gallery & Actions Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 py-6">
          {/* Gallery Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-8 flex flex-col items-center"
          >
            <div className="w-full overflow-hidden bg-black border border-gray-800">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  src={`https://image123.azureedge.net/uniquecarsltd/${thumbnails[selectedImageIndex]}`}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-auto max-h-130 object-cover"
                  alt="Audi A4 Main View"
                />
              </AnimatePresence>
            </div>

            {/* Thumbnails list */}
            <div className="flex gap-2 mt-3 overflow-x-auto w-full pb-2">
              {thumbnails.map((img: string, idx: number) => {
                const isSelected = selectedImageIndex === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`shrink-0 w-20 h-14 border transition-all duration-150 overflow-hidden cursor-pointer ${
                      isSelected
                        ? "border-[#e3ba73] opacity-100 scale-105"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={`https://image123.azureedge.net/uniquecarsltd/${img}`}
                      className="w-full h-full object-cover"
                      alt={`thumb ${idx + 1}`}
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Action Buttons Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-4 flex flex-col gap-3"
          >
            {actionButtons.map((btn: ActionButton, index: number) => {
              const buttonContent = (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={btn.onClick}
                  className="w-full flex items-center justify-center bg-[#e3ba73] hover:bg-[#c99f5a] text-black font-semibold text-xs md:text-sm py-3 px-4 uppercase transition-colors duration-200 cursor-pointer"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox={btn.viewBox}
                    className="w-5 h-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {btn.icon}
                  </svg>
                  {btn.text}
                </motion.button>
              );

              return btn.link ? (
                <a key={index} href={btn.link} className="w-full">
                  {buttonContent}
                </a>
              ) : (
                <div key={index} className="w-full">
                  {buttonContent}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Description Section */}
        <div className="w-full my-6 border-t border-gray-700 pt-6">
          <h2 className="text-xl font-bold text-[#e3ba73] mb-3">
            Description
          </h2>
          <div className="text-gray-300 text-sm leading-relaxed">
            <p>
              WE ARE PROUD TO BE ONTARIO'S USED CAR DEALERSHIP WE OFFERING
              TODAY STUNNING POWERFUL AND STYLISH ( NO ACCIDENT) ONE OWNER 2016
              AUDI A4 PROGRESSIV PLUS 2.0 L 4 CYLINDER ((( S - LINE ))) WITH
              ONLY 100,670 KM WELL MAINTAINED WITH 21 SERVICE RECORDS ALL DONE
              BY AUDI DEALERSHIP ... QUIPPED WITH !! NAVIGATION ... LEATHER
              INTERIOR ... POWER SUNROOF ... BACKUP CAMERA ... HEATED SEATS /
              MIRRORS ... COOLING SEATS ... PUSH START ... POWER SEATS ...
              CRUISE CONTROL ... ABS .. TRACTION CONTROL ... BLUETOOTH
              CONNECTIVITY ... KEYLESS ENTRY ... POWER LOCKS ... POWER
              WINDOWS... POWER MIRRORS ... STEERING WHEEL CONTROL ... ALLOY RIMS
              ... DRIVES GREAT ... GOOD POWER AND FUEL ECONOMY ... VERY NICE
              AND CLEAN VEHICLE , DRIVE PERFECT !!! SO DONT WAIT, VEHICLE COMES
              CERTIFIED, NO HIDDEN FEES LOOKS AND RUN LIKE NEW OURE PRICE 17,999
              !!!!! We Are Committed To Sell Top-Quality Pre-Owned Vehicles At
              Very Competitive Prices.
            </p>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="w-full border-t border-gray-700 pt-6 my-6">
          <h2 className="text-xl font-bold text-white mb-4">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {specifications.map((item: Specification, idx: number) => (
              <div
                key={idx}
                className="flex justify-between py-2 border-b border-gray-800"
              >
                <span className="text-gray-400 font-medium">{item.label}:</span>
                <span className="text-white font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features & Options Section */}
        <div className="w-full border-t border-gray-700 pt-6">
          <h3 className="text-xl font-bold text-white mb-3">
            Features & Options
          </h3>
          <div className="w-full lg:w-8/12">
            <button className="flex items-center bg-transparent border border-gray-600 hover:border-[#e3ba73] text-white py-2 px-4 transition-colors">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z"></path>
              </svg>
              View All Options
            </button>
          </div>
        </div>
      </div>

      {/* Get More Information Modal */}
      <AnimatePresence>
        {isInfoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInfoModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-xl bg-[#222222] border border-gray-600 rounded-lg shadow-2xl overflow-hidden z-10"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#222222] text-white">
                <h2 className="text-lg font-bold tracking-wide">
                  GET MORE INFORMATION
                </h2>
                <button
                  type="button"
                  onClick={() => setIsInfoModalOpen(false)}
                  className="text-gray-400 hover:text-white text-2xl font-bold leading-none cursor-pointer px-2"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>

              <div className="p-6 text-white bg-[#222222]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs uppercase tracking-wider text-gray-300">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-[#111111] border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e3ba73]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs uppercase tracking-wider text-gray-300">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-[#111111] border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e3ba73]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs uppercase tracking-wider text-gray-300">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-[#111111] border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e3ba73]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs uppercase tracking-wider text-gray-300">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-[#111111] border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e3ba73]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-wider text-gray-300">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Message"
                      className="w-full bg-[#111111] border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e3ba73] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="bg-[#e3ba73] hover:bg-[#c99f5a] text-black font-semibold text-sm px-6 py-2 rounded transition-colors cursor-pointer"
                    >
                      Submit
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Payment Calculator Modal (Parsed from Provided HTML Markup) */}
      <AnimatePresence>
        {isCalcModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCalcModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, y: -70 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -70 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-[#222222] border border-gray-600 rounded shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col text-white"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-[#222222]">
                <div className="text-lg font-semibold text-white">
                  Calculate Your Auto Loan Payment:
                </div>
                <button
                  type="button"
                  onClick={() => setIsCalcModalOpen(false)}
                  className="text-white hover:text-gray-400 text-2xl font-bold leading-none cursor-pointer px-2"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>

              {/* Body */}
              <div className="p-4 md:p-6 overflow-y-auto bg-[#222222]">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="w-full flex flex-col gap-4"
                >
                  {/* Form Sub-Header Bar */}
                  <div className="w-full flex items-center justify-between pb-2 border-b border-gray-700">
                    <div className="flex items-center gap-2 text-white">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        className="w-5 h-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M400 0H48C22.4 0 0 22.4 0 48v416c0 25.6 22.4 48 48 48h352c25.6 0 48-22.4 48-48V48c0-25.6-22.4-48-48-48zM128 435.2c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8V268.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v166.4zm0-256c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8V76.8C64 70.4 70.4 64 76.8 64h294.4c6.4 0 12.8 6.4 12.8 12.8v102.4z"></path>
                      </svg>
                      <p className="font-semibold text-sm m-0">
                        Payment Calculator
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center gap-1.5 text-gray-300 hover:text-white text-xs font-bold cursor-pointer"
                    >
                      <span>Reset</span>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        className="w-4 h-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"></path>
                      </svg>
                    </button>
                  </div>

                  {/* Calculator Inputs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
                    {/* Payment Frequency */}
                    <div className="flex items-center justify-between">
                      <label className="w-1/2 text-gray-300 font-medium">
                        Payment Frequency
                      </label>
                      <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="w-1/2 bg-[#111111] border border-gray-600 text-white rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#e3ba73]"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="biweekly">Bi-Weekly</option>
                      </select>
                    </div>

                    {/* Vehicle Price */}
                    <div className="flex items-center justify-between">
                      <label className="w-1/2 text-gray-300 font-medium">
                        Vehicle Price
                      </label>
                      <div className="w-1/2 flex border border-gray-600 rounded overflow-hidden">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={vehiclePrice}
                          onChange={(e) =>
                            setVehiclePrice(
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            )
                          }
                          className="w-3/4 bg-[#111111] text-white px-2 py-1 text-xs focus:outline-none"
                        />
                        <div className="w-1/4 bg-gray-800 text-gray-300 flex items-center justify-center font-bold">
                          $
                        </div>
                      </div>
                    </div>

                    {/* Down Payment */}
                    <div className="flex items-center justify-between">
                      <label className="w-1/2 text-gray-300 font-medium">
                        Down payment
                      </label>
                      <div className="w-1/2 flex border border-gray-600 rounded overflow-hidden">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={downPayment}
                          onChange={(e) =>
                            setDownPayment(
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            )
                          }
                          className="w-3/4 bg-[#111111] text-white px-2 py-1 text-xs focus:outline-none"
                        />
                        <div className="w-1/4 bg-gray-800 text-gray-300 flex items-center justify-center font-bold">
                          $
                        </div>
                      </div>
                    </div>

                    {/* Your Trade */}
                    <div className="flex items-center justify-between">
                      <label className="w-1/2 text-gray-300 font-medium">
                        Your trade
                      </label>
                      <div className="w-1/2 flex border border-gray-600 rounded overflow-hidden">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={tradeValue}
                          onChange={(e) =>
                            setTradeValue(
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            )
                          }
                          className="w-3/4 bg-[#111111] text-white px-2 py-1 text-xs focus:outline-none"
                        />
                        <div className="w-1/4 bg-gray-800 text-gray-300 flex items-center justify-center font-bold">
                          $
                        </div>
                      </div>
                    </div>

                    {/* Month Term */}
                    <div className="flex items-center justify-between">
                      <label className="w-1/2 text-gray-300 font-medium">
                        Month Term
                      </label>
                      <select
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-1/2 bg-[#111111] border border-gray-600 text-white rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#e3ba73]"
                      >
                        <option value={24}>24 Months</option>
                        <option value={36}>36 Months</option>
                        <option value={48}>48 Months</option>
                        <option value={60}>60 Months</option>
                        <option value={72}>72 Months</option>
                        <option value={84}>84 Months</option>
                      </select>
                    </div>

                    {/* Interest Rate */}
                    <div className="flex items-center justify-between">
                      <label className="w-1/2 text-gray-300 font-medium">
                        Interest rate
                      </label>
                      <div className="w-1/2 flex border border-gray-600 rounded overflow-hidden">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={intRate}
                          onChange={(e) =>
                            setIntRate(
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            )
                          }
                          className="w-3/4 bg-[#111111] text-white px-2 py-1 text-xs focus:outline-none"
                        />
                        <div className="w-1/4 bg-gray-800 text-gray-300 flex items-center justify-center font-bold">
                          %
                        </div>
                      </div>
                    </div>

                    {/* Output: Estimated Payment */}
                    <div className="flex items-center justify-between">
                      <span className="w-1/2 text-gray-300 font-medium">
                        Your Estimated Payment
                      </span>
                      <div className="w-1/2 bg-[#ececec] text-black font-bold px-2 py-1.5 border border-gray-400 text-sm">
                        ${periodicPayment.toFixed(2)}
                      </div>
                    </div>

                    {/* Output: Cost Of Borrowing */}
                    <div className="flex items-center justify-between">
                      <span className="w-1/2 text-gray-300 font-medium">
                        Cost Of Borrowing
                      </span>
                      <div className="w-1/2 bg-[#ececec] text-black font-bold px-2 py-1.5 border border-gray-400 text-sm">
                        ${costOfBorrowing.toFixed(2)}
                      </div>
                    </div>

                    {/* Output: MSRP */}
                    <div className="flex items-center justify-between">
                      <span className="w-1/2 text-gray-300 font-medium">
                        MSRP
                      </span>
                      <div className="w-1/2 bg-[#ececec] text-black font-bold px-2 py-1.5 border border-gray-400 text-sm">
                        ${msrpDisplay.toLocaleString()}
                      </div>
                    </div>

                    {/* Output: Total Obligation */}
                    <div className="flex items-center justify-between">
                      <span className="w-1/2 text-gray-300 font-medium">
                        Total Obligation
                      </span>
                      <div className="w-1/2 bg-[#ececec] text-black font-bold px-2 py-1.5 border border-gray-400 text-sm">
                        ${totalObligation.toFixed(2)}
                      </div>
                    </div>

                    {/* Checkbox: Sales Tax */}
                    <div className="col-span-1 md:col-span-2 flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="confirm"
                        checked={includeTax}
                        onChange={(e) => setIncludeTax(e.target.checked)}
                        className="cursor-pointer accent-[#e3ba73]"
                      />
                      <label htmlFor="confirm" className="cursor-pointer text-gray-300">
                        Include sales tax
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="w-full flex justify-center pt-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className="w-full md:w-1/2 bg-[#e3ba73] hover:bg-[#c99f5a] text-black font-bold text-xs uppercase py-2.5 px-4 rounded transition-colors cursor-pointer"
                    >
                      CALCULATE PAYMENT
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}