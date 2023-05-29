import { Separator } from 'components/Separator';
import { Typography } from 'components/Typography';

import { TITLE_PREFIX } from './constants';
import { useDetails } from './hooks';
import { Props } from './interfaces';

export function InvestmentSummaryDetails({ investment }: Props) {
  const { details, status } = useDetails({ investment });

  return (
    <article className="flex flex-col gap-16">
      <header className="flex flex-col gap-12">
        <Typography variant="h5">
          {TITLE_PREFIX} {investment?.tradeId}
        </Typography>

        <Typography
          variant="h6"
          className="capitalize text-gray-02"
        >
          {status.toLowerCase()}
        </Typography>
      </header>

      <dl className="flex flex-col gap-16">
        {details.map(({ label, value }, index) => {
          const isLastIndex = index === details.length - 1;

          return (
            <>
              <div>
                <dt>
                  <Typography
                    variant="paragraph"
                    className="text-gray-02"
                  >
                    {label}
                  </Typography>
                </dt>
                <dd>
                  <Typography
                    variant="h6"
                    className="capitalize"
                  >
                    {value.toLowerCase()}
                  </Typography>
                </dd>
              </div>

              {!isLastIndex && <Separator />}
            </>
          );
        })}
      </dl>
    </article>
  );
}
