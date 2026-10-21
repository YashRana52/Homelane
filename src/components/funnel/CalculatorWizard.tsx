import { CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

import { useStepper } from '@/hooks/useStepper';
import { formatLakh } from '@/lib/formatINR';
import { computeEstimate } from '@/lib/pricing';
import type { CalculatorConfig } from '@/data/calculators';
import { Badge, Button, Container, Range, Section } from '@/ui';

import { EstimateResult } from './EstimateResult';
import { LayoutPlan } from './LayoutPlan';
import { MaterialSwatch } from './MaterialSwatch';
import { OptionCardGroup, type Option } from './OptionCardGroup';
import { PackageSelector } from './PackageSelector';
import { WizardChrome } from './WizardChrome';

const TOTAL_STEPS = 5;

type WizardValues = {
  packageId: string | null;
  layout: string | null;
  primary: number;
  secondary: number;
  accessories: string[];
  material: string | null;
  addOns: string[];
};

type CalculatorWizardProps = {
  config: CalculatorConfig;
  onBookConsultation: () => void;
};

/**
 * The five-step calculator, driven entirely by its config.
 *
 * All three calculators use this component. The steps are fixed:
 * 1. Shape / Layout (with curated PackageSelector presets)
 * 2. Dimensions (dual sliders + numeric input + SVG plan preview)
 * 3. Fittings & Accessories (multi-select cards with price delta)
 * 4. Materials & Finishes (swatch cards + tier badges)
 * 5. On-site services & Appliances (add-on toggles)
 */
export function CalculatorWizard({ config, onBookConsultation }: CalculatorWizardProps) {
  const [done, setDone] = useState(false);
  const [searchParams] = useSearchParams();
  const urlPackage = searchParams.get('package');

  const { step, values, setValues, next, back, reset, isFirst } = useStepper<WizardValues>({
    totalSteps: TOTAL_STEPS,
    storageKey: `aangan.calc.${config.type}`,
    initialValues: {
      packageId: urlPackage ?? null,
      layout: null,
      primary: config.layouts[0]?.defaults.primary ?? config.primaryRange.min,
      secondary: config.layouts[0]?.defaults.secondary ?? config.secondaryRange.min,
      accessories: [],
      material: null,
      addOns: [],
    },
  });

  // Handle ?package= url query parameter on first mount if not yet initialized
  useEffect(() => {
    if (urlPackage && !values.material) {
      const pkg = config.packages.find((p) => p.id === urlPackage);
      if (pkg) {
        const pkgAcc = config.accessories
          .filter((a) => pkg.includes.includes(a.id))
          .map((a) => a.id);
        const pkgAddOns = config.addOns
          .filter((a) => pkg.includes.includes(a.id))
          .map((a) => a.id);

        setValues({
          packageId: urlPackage,
          material: pkg.material,
          accessories: pkgAcc,
          addOns: pkgAddOns,
        });
      }
    }
  }, [urlPackage, config, values.material, setValues]);

  const layout = config.layouts.find((l) => l.id === values.layout) ?? null;
  const material = config.materials.find((m) => m.id === values.material) ?? null;

  /** Only meaningful once a layout and a finish have been chosen. */
  const estimate = useMemo(() => {
    if (!layout || !material) return null;
    const chosen = [...config.accessories, ...config.addOns].filter(
      (extra) => values.accessories.includes(extra.id) || values.addOns.includes(extra.id),
    );
    return computeEstimate({
      primaryQuantity: values.primary,
      secondaryQuantity: values.secondary,
      layoutFactor: layout.factor,
      layoutLabel: layout.label,
      materialRate: material.rate,
      materialLabel: material.label,
      extras: chosen.map((e) => ({ id: e.id, label: e.label, price: e.price })),
      areaSqft: config.type === 'full-home' ? values.primary : undefined,
      unitLabel: config.labels.unit,
    });
  }, [config, layout, material, values]);

  /* ---------------- Picking a layout prefills the dimensions ---------------- */
  const chooseLayout = (id: string) => {
    const picked = config.layouts.find((l) => l.id === id);
    setValues({
      layout: id,
      ...(picked ? { primary: picked.defaults.primary, secondary: picked.defaults.secondary } : {}),
    });
  };

  /* ---------------- Picking a package prefills materials and accessories ---------------- */
  const choosePackage = (packageId: string) => {
    if (packageId === 'custom') {
      setValues({ packageId: 'custom' });
      return;
    }

    const pkg = config.packages.find((p) => p.id === packageId);
    if (!pkg) return;

    const pkgAcc = config.accessories
      .filter((a) => pkg.includes.includes(a.id))
      .map((a) => a.id);
    const pkgAddOns = config.addOns
      .filter((a) => pkg.includes.includes(a.id))
      .map((a) => a.id);

    setValues({
      packageId,
      material: pkg.material,
      accessories: pkgAcc,
      addOns: pkgAddOns,
    });
  };

  const layoutOptions: Option[] = config.layouts.map((l) => ({
    id: l.id,
    label: l.label,
    description: l.description,
    art: <LayoutPlan shape={l.shape} className="h-16 w-full" />,
  }));

  const materialOptions: Option[] = config.materials.map((m) => ({
    id: m.id,
    label: m.label,
    description: m.description,
    badge: m.tier,
    art: <MaterialSwatch materialId={m.id} />,
  }));

  const canAdvance =
    step === 1 ? Boolean(values.layout) : step === 4 ? Boolean(values.material) : true;

  /* ---------------- Result ---------------- */
  if (done && estimate) {
    return (
      <Section pad="lg" container="narrow">
        <EstimateResult
          estimate={estimate}
          subject={config.title.replace(' Calculator', '')}
          onBookConsultation={onBookConsultation}
          onDownload={() => window.print()}
        />
        <div data-print-hide className="mt-6 flex items-center justify-between">
          <Button
            variant="link"
            onClick={() => {
              setDone(false);
              reset();
            }}
            iconLeft={<RotateCcw className="size-4" />}
          >
            Start again
          </Button>
          <Button variant="ghost" to="/price-calculator">
            All Calculators
          </Button>
        </div>
      </Section>
    );
  }

  const runningTotal =
    estimate && step > 1 ? (
      <p className="text-caption text-surface-600">
        Running total{' '}
        <span className="text-body text-secondary-700 font-semibold">
          {formatLakh(estimate.low)}–{formatLakh(estimate.high)}
        </span>
      </p>
    ) : undefined;

  const activePkg = config.packages.find((p) => p.id === values.packageId);

  const stepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-10">
            {/* Curated Package presets */}
            {config.packages.length > 0 && (
              <div className="bg-surface border-surface-200 rounded-lg border p-5 shadow-xs">
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-primary-500 size-4" />
                    <h2 className="text-h4 font-display font-semibold text-secondary-700">
                      Or Start with a Curated Package
                    </h2>
                  </div>
                  <p className="text-caption text-surface-600 mt-1">
                    Select a preset specification tier, or build your own custom setup step-by-step.
                  </p>
                </div>
                <PackageSelector
                  packages={config.packages}
                  selectedId={values.packageId}
                  onSelect={choosePackage}
                />
              </div>
            )}

            <div>
              <div className="mb-4">
                <h2 className="text-h4 font-display font-semibold text-secondary-700">
                  {config.labels.layoutStep}
                </h2>
                <p className="text-caption text-surface-600 mt-1">{config.labels.layoutHelp}</p>
              </div>
              <OptionCardGroup
                legend={config.labels.layoutStep}
                options={layoutOptions}
                value={values.layout}
                onChange={chooseLayout}
                columns="wide"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
            <div className="max-w-xl space-y-8">
              <Range
                label={config.labels.primary}
                value={values.primary}
                min={config.primaryRange.min}
                max={config.primaryRange.max}
                step={config.primaryRange.step}
                unit={config.type === 'full-home' ? 'sq ft' : 'ft'}
                onChange={(primary) => setValues({ primary })}
              />
              <Range
                label={config.labels.secondary}
                value={values.secondary}
                min={config.secondaryRange.min}
                max={config.secondaryRange.max}
                step={config.secondaryRange.step}
                unit="ft"
                onChange={(secondary) => setValues({ secondary })}
              />
            </div>

            {layout && (
              <figure className="bg-surface-50 rounded-md p-5 border border-surface-200">
                <LayoutPlan
                  shape={layout.shape}
                  primary={values.primary}
                  secondary={values.secondary}
                  className="h-36 w-full"
                />
                <figcaption className="text-caption text-surface-600 mt-3 text-center">
                  {layout.label} · {values.primary.toLocaleString('en-IN')}{' '}
                  {config.type === 'full-home' ? 'sq ft' : 'ft'} run
                </figcaption>
              </figure>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            {activePkg && (
              <div className="bg-primary-50/70 border-primary-200 rounded-md border px-4 py-2.5 text-caption flex items-center justify-between">
                <span>
                  Preset from{' '}
                  <strong className="text-secondary-700">{activePkg.label} Package</strong>{' '}
                  applied. You can add or remove items as you wish.
                </span>
                <Badge tone="offer">Preset active</Badge>
              </div>
            )}
            <OptionCardGroup
              multiple
              legend={config.labels.accessoriesStep}
              options={config.accessories.map((a) => ({
                id: a.id,
                label: a.label,
                description: a.description,
                price: a.price,
              }))}
              value={values.accessories}
              onChange={(accessories) =>
                setValues({
                  accessories,
                  packageId: values.packageId ? 'custom' : null,
                })
              }
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            {activePkg && (
              <div className="bg-primary-50/70 border-primary-200 rounded-md border px-4 py-2.5 text-caption flex items-center justify-between">
                <span>
                  Recommended shutter finish for{' '}
                  <strong className="text-secondary-700">{activePkg.label} Package</strong>.
                </span>
                <span className="text-primary-600 font-semibold inline-flex items-center gap-1">
                  <CheckCircle2 className="size-3.5" /> Selected
                </span>
              </div>
            )}
            <OptionCardGroup
              legend={config.labels.materialStep}
              options={materialOptions}
              value={values.material}
              onChange={(mat) =>
                setValues({
                  material: mat,
                  packageId: values.packageId ? 'custom' : null,
                })
              }
              columns="wide"
            />
          </div>
        );

      case 5:
        return (
          <OptionCardGroup
            multiple
            legend={config.labels.addOnStep}
            options={config.addOns.map((a) => ({
              id: a.id,
              label: a.label,
              description: a.description,
              price: a.price,
            }))}
            value={values.addOns}
            onChange={(addOns) => setValues({ addOns })}
          />
        );

      default:
        return null;
    }
  };

  const titles = [
    config.labels.layoutStep,
    config.labels.measureStep,
    config.labels.accessoriesStep,
    config.labels.materialStep,
    config.labels.addOnStep,
  ];
  const helps = [
    config.labels.layoutHelp,
    config.labels.measureHelp,
    config.labels.accessoriesHelp,
    config.labels.materialHelp,
    config.labels.addOnHelp,
  ];

  return (
    <div className="bg-surface-50 min-h-[70vh]">
      <WizardChrome
        step={step}
        total={TOTAL_STEPS}
        title={titles[step - 1] ?? ''}
        help={helps[step - 1] ?? ''}
        runningTotal={runningTotal}
        canAdvance={canAdvance}
        nextLabel={step === TOTAL_STEPS ? 'See my estimate' : undefined}
        onNext={() => (step === TOTAL_STEPS ? setDone(true) : next())}
        onBack={back}
        isFirst={isFirst}
      >
        {stepContent()}
      </WizardChrome>

      {step === 1 && (
        <Container className="pb-10">
          <p className="text-caption text-surface-600">
            Takes about {config.minutes} minutes. No phone number needed until you
            want the detailed quote.
          </p>
        </Container>
      )}
    </div>
  );
}
