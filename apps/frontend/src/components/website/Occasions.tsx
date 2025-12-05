import React, { useState } from 'react';
import { Calendar, Gauge, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { OccasionDetail } from './OccasionDetail';

interface OccasionsProps {
  isDarkMode: boolean;
}

// Extended mock data - in production this will come from Strapi CMS
const mockOccasions = [
  {
    id: 1,
    brand: 'Suzuki',
    model: 'GSX-R 750',
    year: 2019,
    mileage: 12500,
    price: 9900,
    images: [
      'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1200&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=80'
    ],
    condition: 'Sehr gut',
    location: 'Rüti ZH',
    displacement: '750 ccm',
    power: '110 kW (150 PS)',
    weight: '190 kg',
    fuelType: 'Benzin',
    transmission: '6-Gang',
    features: [
      'ABS',
      'Traction Control',
      'Quick Shifter',
      'Neuer Reifensatz',
      'Frisch geserviced',
      'Service-Heft gepflegt',
      'Garantie möglich'
    ],
    description: 'Top gepflegte Suzuki GSX-R 750 in einwandfreiem Zustand. Das Motorrad wurde regelmässig gewartet und alle Services wurden bei uns durchgeführt. Ideal für sportliches Fahren auf Strasse und Rennstrecke.'
  },
  {
    id: 2,
    brand: 'Yamaha',
    model: 'MT-07',
    year: 2020,
    mileage: 8200,
    price: 7500,
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=80',
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=1200&q=80',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200&q=80'
    ],
    condition: 'Neuwertig',
    location: 'Rüti ZH',
    displacement: '689 ccm',
    power: '54 kW (73 PS)',
    weight: '182 kg',
    fuelType: 'Benzin',
    transmission: '6-Gang',
    features: [
      'ABS',
      'LED-Beleuchtung',
      'TFT-Display',
      'Akrapovic Auspuff',
      'Comfort Sitzbank',
      'Tankschutzpad',
      'MFK frisch abgenommen'
    ],
    description: 'Wie neu! Diese MT-07 wurde von einem Erstbesitzer sehr schonend gefahren. Der beliebte Parallel-Twin bietet viel Fahrspass für Einsteiger und Fortgeschrittene. Mit sportlichem Akrapovic Auspuff.'
  },
  {
    id: 3,
    brand: 'Honda',
    model: 'CB650R',
    year: 2021,
    mileage: 5800,
    price: 8900,
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=1200&q=80',
      'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1200&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=80'
    ],
    condition: 'Sehr gut',
    location: 'Rüti ZH',
    displacement: '649 ccm',
    power: '70 kW (95 PS)',
    weight: '189 kg',
    fuelType: 'Benzin',
    transmission: '6-Gang',
    features: [
      'ABS Pro',
      'Traction Control',
      'TFT-Farbdisplay',
      'LED-Scheinwerfer',
      'Quick Shifter',
      'Sturzbügel',
      'Gepäckträger'
    ],
    description: 'Moderne Neo Sports Café mit kraftvollem Vierzylinder. Perfekte Mischung aus Sportlichkeit und Alltagstauglichkeit. Wenig Kilometer und in Top-Zustand mit vielen Extras.'
  },
  {
    id: 4,
    brand: 'Kawasaki',
    model: 'Z900',
    year: 2018,
    mileage: 15600,
    price: 7200,
    images: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=80',
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=1200&q=80'
    ],
    condition: 'Gut',
    location: 'Rüti ZH',
    displacement: '948 ccm',
    power: '92 kW (125 PS)',
    weight: '210 kg',
    fuelType: 'Benzin',
    transmission: '6-Gang',
    features: [
      'ABS',
      'Traction Control',
      'Riding Modes',
      'SC-Project Auspuff',
      'Lenkerendspiegel',
      'Kennzeichenhalter',
      'Kürzlich geserviced'
    ],
    description: 'Kraftvolles Naked Bike mit charakterstarkem Vierzylinder. Diese Z900 wurde bei uns komplett durchgecheckt und ist technisch einwandfrei. Mit sportlichem SC-Project Auspuff und diversen Umbauten.'
  }
];

export function Occasions({ isDarkMode }: OccasionsProps) {
  const [selectedBike, setSelectedBike] = useState<typeof mockOccasions[0] | null>(null);

  return (
    <>
      <section id="occasions" className="py-24 bg-white dark:bg-zinc-900 relative overflow-hidden">
        {/* Technical lines decoration */}
        <div className="absolute right-0 top-1/4 w-32 h-px bg-yellow-400 opacity-20"></div>
        <div className="absolute left-0 bottom-1/4 w-48 h-px bg-yellow-400 opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 text-yellow-400 text-sm uppercase tracking-wider">
                <div className="w-8 h-px bg-yellow-400"></div>
                Occasionen
                <div className="w-8 h-px bg-yellow-400"></div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl text-black dark:text-white mb-4">
              Geprüfte Gebrauchtmotorräder
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Alle Occasionen werden von uns technisch geprüft und sind sofort fahrbereit
            </p>
          </div>

          {/* Occasions Grid - improved visual hierarchy and clickability (Fitts's Law) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockOccasions.map((bike) => (
              <div
                key={bike.id}
                className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 hover:border-yellow-400 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                  <ImageWithFallback
                    src={bike.images[0]}
                    alt={`${bike.brand} ${bike.model}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Yellow accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400"></div>

                  {/* Price badge */}
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-lg">
                    <span className="text-sm">CHF</span>
                    <span className="text-xl ml-1">{bike.price.toLocaleString('de-CH')}</span>
                    <span className="text-sm">.-</span>
                  </div>

                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl text-black dark:text-white mb-1">
                      {bike.brand} {bike.model}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{bike.condition}</p>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <Calendar className="w-4 h-4 text-yellow-400" />
                      <span>{bike.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <Gauge className="w-4 h-4 text-yellow-400" />
                      <span>{bike.mileage.toLocaleString('de-CH')} km</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <MapPin className="w-4 h-4 text-yellow-400" />
                      <span>{bike.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedBike(bike)}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-lg hover:bg-yellow-400 hover:text-black hover:scale-105 transition-all font-medium"
                  >
                    Details ansehen
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA - prominent call to action (Von Restorff Effect) */}
          <div className="mt-20 text-center">
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              Interessiert an einem unserer Motorräder oder möchtest du dein Bike verkaufen?
            </p>
            <a
              href="#contact"
              className="inline-block bg-yellow-400 text-black px-12 py-5 text-lg rounded-xl hover:bg-yellow-500 hover:scale-105 hover:shadow-xl transition-all"
            >
              Kontaktiere uns
            </a>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedBike && (
        <OccasionDetail
          bike={selectedBike}
          onClose={() => setSelectedBike(null)}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  );
}
