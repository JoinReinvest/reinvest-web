import { IconInformation } from 'assets/icons/IconInformation';
import cx from 'classnames';
import { Typography } from 'components/Typography';

interface Props {
  header: string;
  rows: Row[];
  hideTopBorderOnMobile?: boolean;
}

interface Row {
  label: string;
  value: string;
  onAction?: () => void;
}

export function TableMetrics({ header, rows, hideTopBorderOnMobile = false }: Props) {
  const className = cx({
    'border border-gray-04': !hideTopBorderOnMobile,
    'border-x border-b border-t-0! md:border-t border-x-gray-04 border-b-gray-04 md:border-t-gray-04': hideTopBorderOnMobile,
  });

  return (
    <table className="w-full border-collapse border-x border-x-gray-04">
      <thead className={className}>
        <tr className="flex h-48 items-center">
          <th className="px-24 py-8 text-black-01">
            <Typography variant="h6">{header}</Typography>
          </th>
        </tr>
      </thead>

      <tbody className="text-gray-01">
        {rows.map((row, index) => (
          <tr
            className="flex border-b border-b-gray-04 px-24 py-8"
            key={index}
          >
            <td className="flex grow items-center">
              <Typography variant="paragraph-large">{row.label}</Typography>

              <IconInformation
                onClick={row?.onAction}
                className="stroke-gray-02"
              />
            </td>

            <td className="flex items-center">
              <Typography variant="paragraph-large">{row.value}</Typography>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
