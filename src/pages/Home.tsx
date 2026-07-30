import { motion } from "framer-motion";
import HeroSection from "../components/hero/HeroSection";
import { AdvancedSearch } from "../components/search/AdvancedSearch";
import { DepartmentShowcase } from "../components/departments/DepartmentShowcase";
import { SellCarSection } from "../components/forms/SellCarSection";
import { BuyCarBanner } from "../components/cta/BuyCarBanner";
import { FeaturedInventory } from "../components/home/FeaturedInventory";
import { WelcomeSection } from "../components/home/WelcomeSection";
import { BodyStyleGrid } from "../components/home/BodyStyleGrid";
import GoogleReviewsSection from "../components/reviews/GoogleReviewsSection";
import LocationSection from "../components/location/LocationSection";

// Reusable animation configuration
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
} as const;

export default function Home() {
  return (
    <>
      <main className="overflow-hidden">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
        </motion.div>

        {/* Advanced Search */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <AdvancedSearch />
        </motion.div>

        {/* Department Showcase */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <DepartmentShowcase />
        </motion.div>

        {/* Sell Car Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <SellCarSection />
        </motion.div>

        {/* Buy Car Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <BuyCarBanner />
        </motion.div>

        {/* Featured Inventory */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <FeaturedInventory />
        </motion.div>

        {/* Welcome Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <WelcomeSection />
        </motion.div>

        {/* Body Style Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <BodyStyleGrid />
        </motion.div>

        {/* Google Reviews Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <GoogleReviewsSection />
        </motion.div>

        {/* Location Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <LocationSection />
        </motion.div>
      </main>

    </>
  );
}