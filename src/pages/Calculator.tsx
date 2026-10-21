import { Navigate, useParams } from 'react-router';

import { CalculatorWizard } from '@/components/funnel/CalculatorWizard';
import { useLeadModal } from '@/components/funnel/leadModalContext';
import { calculators, isCalculatorType } from '@/data/calculators';

export default function Calculator() {
  const { type } = useParams();
  const { open } = useLeadModal();

  if (!isCalculatorType(type)) {
    return <Navigate to="/price-calculator" replace />;
  }

  const config = calculators[type];

  return (
    <CalculatorWizard
      config={config}
      onBookConsultation={() =>
        open({
          source: `calculator:${type}`,
          title: 'Turn this into a firm quote',
          description:
            'A designer will take site measurements and confirm the figure in writing before anything is booked.',
        })
      }
    />
  );
}
