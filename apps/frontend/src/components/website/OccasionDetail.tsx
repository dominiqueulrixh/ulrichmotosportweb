import React from 'react';
import { X, Calendar, Gauge, MapPin, Fuel, Zap, Weight, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface OccasionDetailProps {
  bike: {
    id: number;
    brand: string;
    model: string;
    year: number;
    mileage: number;
    price: number;
    images: string[];
    condition: string;
    location: string;
    displacement: string;
    power: string;
    weight: string;
    fuelType: string;
    transmission: string;
    features: string[];
    description: string;
  };
  onClose: () => void;
  isDarkMode: boolean;
}

export function OccasionDetail({ bike, onClose, isDarkMode }: OccasionDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % bike.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + bike.images.length) % bike.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl">
        {/* Close button - larger touch target (Fitts's Law) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-12 h-12 bg-black/50 hover:bg-yellow-400 hover:scale-110 rounded-full flex items-center justify-center transition-all group"
          aria-label="Schliessen"
        >
          <X className="w-6 h-6 text-white group-hover:text-black" />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          {/* Image Gallery */}
          <div className="relative aspect-[16/9] bg-zinc-200 dark:bg-zinc-800">
            <ImageWithFallback
              src={bike.images[currentImageIndex]}
              alt={`${bike.brand} ${bike.model}`}
              className="w-full h-full object-cover"
            />

            {/* Image navigation - larger touch targets (Fitts's Law) */}
            {bike.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/50 hover:bg-yellow-400 hover:scale-110 rounded-full flex items-center justify-center transition-all group"
                  aria-label="Vorheriges Bild"
                >
                  <ChevronLeft className="w-7 h-7 text-white group-hover:text-black" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/50 hover:bg-yellow-400 hover:scale-110 rounded-full flex items-center justify-center transition-all group"
                  aria-label="Nächstes Bild"
                >
                  <ChevronRight className="w-7 h-7 text-white group-hover:text-black" />
                </button>

                {/* Image indicators - larger touch targets (Fitts's Law) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                  {bike.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-3 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-yellow-400 w-10'
                          : 'w-3 bg-white/50 hover:bg-white/80 hover:scale-125'
                      }`}
                      aria-label={`Bild ${index + 1} anzeigen`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Price badge */}
            <div className="absolute top-4 left-4 bg-yellow-400 text-black px-6 py-3 rounded-xl">
              <span className="text-sm">CHF</span>
              <span className="text-2xl ml-1">{bike.price.toLocaleString('de-CH')}</span>
              <span className="text-sm">.-</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl text-black dark:text-white mb-2">
                {bike.brand} {bike.model}
              </h2>
              <p className="text-yellow-400">{bike.condition}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Technical specs */}
              <div>
                <h3 className="text-xl text-black dark:text-white mb-4">Technische Daten</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <Calendar className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">Baujahr</div>
                      <div className="text-black dark:text-white">{bike.year}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <Gauge className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">Kilometerstand</div>
                      <div className="text-black dark:text-white">{bike.mileage.toLocaleString('de-CH')} km</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <Settings className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">Hubraum</div>
                      <div className="text-black dark:text-white">{bike.displacement}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">Leistung</div>
                      <div className="text-black dark:text-white">{bike.power}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <Weight className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">Gewicht</div>
                      <div className="text-black dark:text-white">{bike.weight}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <Fuel className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">Kraftstoff</div>
                      <div className="text-black dark:text-white">{bike.fuelType}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">Standort</div>
                      <div className="text-black dark:text-white">{bike.location}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description & Features */}
              <div>
                <h3 className="text-xl text-black dark:text-white mb-4">Beschreibung</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                  {bike.description}
                </p>

                <h3 className="text-xl text-black dark:text-white mb-4">Ausstattung</h3>
                <ul className="space-y-2">
                  {bike.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA - prominent call to action (Von Restorff Effect + Fitts's Law) */}
            <div className="mt-10 pt-8 border-t-2 border-zinc-200 dark:border-zinc-700">
              <div className="flex flex-col md:flex-row gap-5">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="flex-1 bg-yellow-400 text-black py-5 px-10 text-lg rounded-xl text-center hover:bg-yellow-500 hover:scale-105 hover:shadow-xl transition-all"
                >
                  Jetzt anfragen
                </a>
                <a
                  href="tel:+41552201570"
                  className="flex-1 bg-black dark:bg-white text-white dark:text-black py-5 px-10 text-lg rounded-xl text-center hover:scale-105 hover:shadow-xl transition-all"
                >
                  Anrufen: 055 220 15 70
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
