import { useId } from 'react';
import { Check, Sparkles, Wrench } from 'lucide-react';

import { cn } from '@/lib/cn';
import type { PackageOption } from '@/data/calculators';
import { Badge } from '@/ui';

export type PackageSelectorProps = {
  packages: readonly PackageOption[];
  selectedId: string | null;
  onSelect: (packageId: string) => void;
  className?: string;
  /** Whether to show the 4th "Build Your Own" option card */
  showCustomOption?: boolean;
};

const packageDetails: Record<
  string,
  {
    badge: string;
    tone: 'offer' | 'gold' | 'neutral' | 'new';
    highlight?: boolean;
    finishNote: string;
    features: string[];
  }
> = {
  essentials: {
    badge: 'Value Choice',
    tone: 'neutral',
    finishNote: 'Anti-scratch Laminate Finish',
    features: [
      'Standard soft-close German hinges',
      'Core storage & drawer organisers',
      'Termite & moisture resistant ply',
      '10-year warranty coverage',
    ],
  },
  premium: {
    badge: 'Most Popular',
    tone: 'offer',
    highlight: true,
    finishNote: 'Seamless High-Gloss Acrylic / PU',
    features: [
      'Full-extension soft-close tandem units',
      'Tall pantry & corner carousel units',
      'Concealed profile ambient lighting',
      '10-year warranty + 5-year hardware cover',
    ],
  },
  luxe: {
    badge: 'Luxury Spec',
    tone: 'new',
    finishNote: 'Natural Timber Veneer & PU Polish',
    features: [
      'Hand-matched natural timber grains',
      'Bespoke architectural lighting & glass',
      'Full accessories & integrated pull-outs',
      'Priority concierge & dedicated designer',
    ],
  },
};

const customOption = {
  id: 'custom',
  label: 'Build Your Own',
  badge: 'Complete Freedom',
  description: 'Pick every shutter finish, fitting, and appliance individually to match your exact budget.',
  finishNote: 'Your choice of finishes',
  features: [
    'Mix & match room-by-room finishes',
    'Add only the fittings you need',
    'Choose specific appliances & services',
    'Real-time line-item price calculation',
  ],
};

/**
 * Comparison selector for Essentials, Premium, Luxe packages, and Build Your Own.
 *
 * Implements accessible keyboard and touch navigation with clear visual tier differentiation.
 */
export function PackageSelector({
  packages,
  selectedId,
  onSelect,
  className,
  showCustomOption = true,
}: PackageSelectorProps) {
  const cards = [
    ...packages.map((pkg) => {
      const details = packageDetails[pkg.id] ?? {
        badge: 'Package',
        tone: 'neutral' as const,
        finishNote: 'Selected materials',
        features: ['Quality assured', 'Standard installation'],
      };
      return {
        id: pkg.id,
        label: pkg.label,
        description: pkg.description,
        badge: details.badge,
        tone: details.tone,
        highlight: details.highlight,
        finishNote: details.finishNote,
        features: details.features,
        isCustom: false,
      };
    }),
    ...(showCustomOption
      ? [
          {
            id: customOption.id,
            label: customOption.label,
            description: customOption.description,
            badge: customOption.badge,
            tone: 'new' as const,
            highlight: false,
            finishNote: customOption.finishNote,
            features: customOption.features,
            isCustom: true,
          },
        ]
      : []),
  ];

  const groupName = useId();

  return (
    <div
      role="radiogroup"
      aria-label="Select an interior package or build your own"
      className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}
    >
      {cards.map((card) => {
        const selected = selectedId === card.id;

        return (
          <label
            key={card.id}
            className={cn(
              'group relative flex cursor-pointer flex-col justify-between rounded-lg border p-5 transition-all duration-200',
              'has-[:focus-visible]:outline-primary-500 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2',
              card.highlight && !selected && 'border-primary-300 bg-surface shadow-sm',
              selected
                ? 'border-primary-500 bg-primary-50/60 shadow-md ring-2 ring-primary-500/20'
                : 'border-surface-200 bg-surface hover:border-surface-400 hover:shadow-sm',
            )}
          >
            {/* The real control. Stretched over the card and transparent, so
                the whole card is the target while arrow-key navigation, the
                "2 of 4" announcement and form semantics stay native. */}
            <input
              type="radio"
              name={groupName}
              checked={selected}
              onChange={() => onSelect(card.id)}
              className="peer absolute inset-0 z-10 cursor-pointer appearance-none"
            />
            {/* Top row with badge & select circle */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <Badge tone={card.tone}>{card.badge}</Badge>
                <span
                  className={cn(
                    'grid size-5 shrink-0 place-items-center rounded-full border transition-colors',
                    selected
                      ? 'bg-primary-500 border-primary-500 text-on-primary'
                      : 'border-surface-300 bg-transparent group-hover:border-surface-400',
                  )}
                  aria-hidden="true"
                >
                  {selected && <Check className="size-3.5" />}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-1.5">
                {card.tone === 'gold' && <Sparkles className="text-gold-600 size-4" aria-hidden="true" />}
                {card.isCustom && <Wrench className="text-primary-500 size-4" aria-hidden="true" />}
                <h3 className="text-h4 font-display font-semibold text-secondary-700">
                  {card.label}
                </h3>
              </div>

              <p className="text-caption text-surface-600 mt-1 min-h-[38px] leading-relaxed">
                {card.description}
              </p>

              <div className="bg-surface-50 border-surface-200 mt-3 rounded-sm border px-3 py-2">
                <span className="text-caption text-surface-600 block font-semibold uppercase text-[10px] tracking-wider">
                  Finish Tier
                </span>
                <span className="text-caption text-secondary-700 font-semibold block mt-0.5">
                  {card.finishNote}
                </span>
              </div>

              <ul className="mt-4 space-y-2 border-t border-surface-100 pt-3">
                {card.features.map((feat, idx) => (
                  <li key={idx} className="text-caption text-surface-600 flex items-start gap-2">
                    <Check
                      className={cn(
                        'size-3.5 mt-0.5 shrink-0',
                        card.tone === 'gold' ? 'text-gold-600' : 'text-primary-500',
                      )}
                      aria-hidden="true"
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Looks like a button, is not one. A focusable control inside a
                radio is a nested-interactive violation, and the label already
                does the selecting. */}
            <div className="mt-6 pt-2">
              <span
                aria-hidden="true"
                className={cn(
                  'text-btn flex h-9 w-full items-center justify-center rounded-sm font-semibold transition-colors',
                  selected
                    ? 'bg-primary-500 text-on-primary'
                    : 'border-surface-300 text-secondary-700 group-hover:border-primary-500 group-hover:text-primary-600 border',
                )}
              >
                {selected ? 'Package Active' : card.isCustom ? 'Build Custom' : `Choose ${card.label}`}
              </span>
            </div>
          </label>
        );
      })}
    </div>
  );
}
