import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import EstimateCalculator from '@/components/home/EstimateCalculator';
import OffersSection from '@/components/home/OffersSection';
import DigitalCatalog from '@/components/home/DigitalCatalog';
import PromotionalBanners from '@/components/home/PromotionalBanners';
import TrendingProducts from '@/components/home/TrendingProducts';
import StoreInfo from '@/components/home/StoreInfo';
import TrustBadges from '@/components/home/TrustBadges';
import CraftsmanshipStory from '@/components/home/CraftsmanshipStory';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import LoginPopup from '@/components/ui/LoginPopup';

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <HeroSection />
      
      {/* Calculator & Offers Section */}
      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="lg:w-[60%] flex">
              <EstimateCalculator />
            </div>
            <div className="lg:w-[40%] flex">
              <OffersSection />
            </div>
          </div>
        </div>
      </section>

      <TrendingProducts />
      <DigitalCatalog />
      <CraftsmanshipStory />
      <PromotionalBanners />
      <TrustBadges />
      <StoreInfo />
      <Footer />
      <WhatsAppButton />
      <LoginPopup />
    </main>
  );
}
