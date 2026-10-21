import { Clock, Compass, MapPin, Navigation, Phone, Search, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

import { useLeadModal } from '@/components/funnel/leadModalContext';
import { brand } from '@/config/brand';
import { studios } from '@/data/proof';
import {
  Badge,
  Breadcrumb,
  Button,
  Chip,
  Container,
  Heading,
  Input,
  Section,
} from '@/ui';

const allStudios = [
  ...studios,
  { id: 's6', city: 'Pune', area: 'Koregaon Park', size: 7500 },
  { id: 's7', city: 'Kolkata', area: 'Salt Lake Sector V', size: 6800 },
  { id: 's8', city: 'Ahmedabad', area: 'SG Highway, Bodakdev', size: 8200 },
];

const cityChips = ['All', 'Bengaluru', 'Delhi NCR', 'Mumbai', 'Hyderabad', 'Chennai', 'Pune'];

export default function StoreLocator() {
  const [selectedCity, setSelectedCity] = useState('All');
  const [query, setQuery] = useState('');
  const { open } = useLeadModal();

  const filtered = useMemo(() => {
    return allStudios.filter((s) => {
      if (selectedCity !== 'All' && s.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }
      if (
        query.trim() &&
        !s.area.toLowerCase().includes(query.toLowerCase()) &&
        !s.city.toLowerCase().includes(query.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [selectedCity, query]);

  return (
    <>
      <Container className="pt-4">
        <Breadcrumb items={[{ label: 'Experience Centres' }]} />
      </Container>

      {/* Header */}
      <Section pad="sm">
        <Container>
          <div className="max-w-3xl">
            <Badge tone="new">Walk-in Studios</Badge>
            <Heading as="h1" level="display" className="mt-2">
              Find an Experience Centre Near You
            </Heading>
            <p className="text-body-lg text-surface-600 mt-3 leading-relaxed">
              Step into an Aangan studio to test life-size kitchen counters, feel real laminate, acrylic and veneer finishes, and sit down with our senior designers for a free 3D design consultation.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-y border-surface-200 py-4">
            <div className="flex flex-wrap items-center gap-2">
              {cityChips.map((city) => (
                <Chip
                  key={city}
                  active={selectedCity === city}
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </Chip>
              ))}
            </div>

            <div className="w-full md:w-64">
              <Input
                label="Search Studios"
                hideLabel
                placeholder="Search by area or city..."
                prefix={<Search className="size-4 text-surface-600" />}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Studios List & Map Section */}
      <Section pad="sm">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] items-start">
            {/* Studio Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {filtered.map((studio) => (
                <div
                  key={studio.id}
                  className="rounded-lg border border-surface-200 bg-surface p-6 shadow-xs flex flex-col justify-between hover:border-primary-300 transition"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-h4 font-display font-semibold text-secondary-700">
                        {studio.city} — {studio.area}
                      </h2>
                      <Badge tone="offer">{studio.size.toLocaleString('en-IN')} sq ft</Badge>
                    </div>

                    <p className="text-body text-surface-600 mt-3 text-sm flex items-start gap-2">
                      <MapPin className="size-4 text-primary-500 mt-0.5 shrink-0" />
                      <span>Plot 42, 100 Feet Road, {studio.area}, {studio.city}</span>
                    </p>

                    <div className="mt-4 space-y-1.5 text-caption text-surface-600 border-t border-surface-100 pt-3">
                      <p className="flex items-center gap-2">
                        <Clock className="size-3.5 text-surface-600" />
                        <span>Open 7 Days: 10:00 AM – 8:00 PM</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="size-3.5 text-surface-600" />
                        <a href={brand.phoneHref} className="text-primary-600 hover:underline">
                          {brand.phone}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-surface-100 flex gap-2">
                    <Button
                      fullWidth
                      size="sm"
                      onClick={() =>
                        open({
                          source: `studio-locator:${studio.city}:${studio.area}`,
                          title: `Book Visit: ${studio.area} Studio`,
                          description: 'We will confirm your dedicated designer slot via SMS & call.',
                        })
                      }
                    >
                      Book Free Visit
                    </Button>
                    <a
                      href={`https://maps.google.com/?q=Aangan+Interiors+${encodeURIComponent(studio.area + '+' + studio.city)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-sm border border-surface-200 px-3 py-2 text-caption font-semibold text-secondary-700 hover:border-surface-400"
                    >
                      <Navigation className="size-4 text-primary-500" aria-hidden="true" />
                      <span className="sr-only">
                        Get directions to the {studio.area} studio (opens in a new tab)
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Map Overview Placeholder */}
            <div className="sticky top-28 rounded-xl border border-surface-200 bg-surface-50 p-6 shadow-sm text-center">
              <Heading as="h2" level="h3">
                Experience Centres Across India
              </Heading>
              <p className="text-caption text-surface-600 mt-1">
                Explore life-size display kitchens, wardrobes, and finish swatches in 87+ studios.
              </p>

              <div className="mt-6 aspect-4/3 rounded-lg bg-surface border border-surface-200 relative overflow-hidden flex items-center justify-center shadow-inner">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#5e455a_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
                <div className="relative p-6 text-center">
                  <Compass className="size-12 text-primary-500 mx-auto animate-pulse" />
                  <span className="text-body font-display font-bold text-secondary-700 block mt-3">
                    Pan-India Network
                  </span>
                  <span className="text-caption text-surface-600 block text-xs mt-1">
                    87 Studios in 55 Major Metros
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-md bg-primary-50 p-4 text-left border border-primary-200">
                <div className="flex items-center gap-2 text-primary-600 font-semibold text-caption">
                  <Sparkles className="size-4" />
                  <span>Studio Amenities</span>
                </div>
                <ul className="text-caption text-surface-600 mt-2 space-y-1 text-xs">
                  <li>• Free reserved valet parking</li>
                  <li>• Kids play area and beverage lounge</li>
                  <li>• 100+ material tactile swatches</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
