import { cn } from '@/lib/cn';

type MaterialSwatchProps = {
  materialId: string;
  className?: string;
};

/**
 * Visual finish & material swatches.
 *
 * Renders realistic tactile finishes:
 * - Laminate: warm matte textured surface
 * - Acrylic: ultra-high gloss with diagonal reflection sheen
 * - PU: velvety satin finish with smooth soft gradient
 * - Veneer: natural architectural timber grain
 * - Mirror: reflective silver gradient
 * - Full-home tiers: graduated palettes
 */
export function MaterialSwatch({ materialId, className }: MaterialSwatchProps) {
  const getSwatchStyle = () => {
    switch (materialId) {
      case 'laminate':
        return (
          <div className="relative h-14 w-full overflow-hidden rounded-sm bg-[#e8ded5] shadow-inner">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'radial-gradient(#c7b8a7 1px, transparent 1px), radial-gradient(#d3c6b7 1px, transparent 1px)',
                backgroundSize: '8px 8px',
                backgroundPosition: '0 0, 4px 4px',
              }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/20 to-transparent p-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-surface-900/80">
                Matte Texture
              </span>
            </div>
          </div>
        );

      case 'acrylic':
        return (
          <div className="relative h-14 w-full overflow-hidden rounded-sm bg-gradient-to-br from-[#eb595f] via-[#c83d43] to-[#80191e] shadow-inner">
            {/* Gloss reflection streak */}
            <div className="absolute -top-6 -left-6 h-28 w-20 rotate-45 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <div className="absolute top-1.5 right-1.5 size-2 rounded-full bg-white/70 shadow-sm" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white">
                High-Gloss Sheen
              </span>
            </div>
          </div>
        );

      case 'pu':
        return (
          <div className="relative h-14 w-full overflow-hidden rounded-sm bg-gradient-to-br from-[#5e455a] via-[#483445] to-[#2f202d] shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
            <div className="absolute inset-x-0 bottom-0 p-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-surface-100/90">
                Satin PU Spray
              </span>
            </div>
          </div>
        );

      case 'veneer':
        return (
          <div className="relative h-14 w-full overflow-hidden rounded-sm bg-[#99653a] shadow-inner">
            {/* Timber grain lines */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, #7a4e28 0px, #7a4e28 2px, #99653a 4px, #b27e4e 6px, #7a4e28 8px)',
              }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white">
                Natural Wood Grain
              </span>
            </div>
          </div>
        );

      case 'mirror':
        return (
          <div className="relative h-14 w-full overflow-hidden rounded-sm bg-gradient-to-tr from-slate-300 via-white to-slate-200 shadow-inner">
            <div className="absolute -top-4 -left-4 h-24 w-12 rotate-30 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/30 to-transparent p-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-800">
                Mirror Finish
              </span>
            </div>
          </div>
        );

      case 'value':
        return (
          <div className="relative h-14 w-full overflow-hidden rounded-sm bg-gradient-to-r from-slate-100 to-slate-200 p-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-surface-600">
              Essential Standard
            </span>
          </div>
        );

      case 'comfort':
        return (
          <div className="relative h-14 w-full overflow-hidden rounded-sm bg-gradient-to-r from-amber-100 to-primary-100 p-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary-700">
              Comfort Tier
            </span>
          </div>
        );

      case 'premium':
        return (
          <div className="relative h-14 w-full overflow-hidden rounded-sm bg-gradient-to-r from-primary-200 to-primary-400 p-1 text-white">
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              Premium Spec
            </span>
          </div>
        );

      case 'luxe':
        return (
          <div className="relative h-14 w-full overflow-hidden rounded-sm bg-gradient-to-r from-secondary-900 via-secondary-700 to-primary-700 p-1 text-white">
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              Luxe Architectural
            </span>
          </div>
        );

      default:
        return (
          <div className="h-14 w-full rounded-sm bg-surface-200" />
        );
    }
  };

  return <div className={cn('w-full', className)}>{getSwatchStyle()}</div>;
}
