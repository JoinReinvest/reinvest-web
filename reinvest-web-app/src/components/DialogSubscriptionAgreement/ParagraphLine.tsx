import { Typography } from 'components/Typography';
import { boldBracketedText } from 'utils/strings';

interface Props {
  line: string;
}

export function ParagraphLine({ line }: Props) {
  const boldedLine = boldBracketedText(line);

  return (
    <Typography variant="paragraph">
      <span dangerouslySetInnerHTML={{ __html: boldedLine }} />
    </Typography>
  );
}
