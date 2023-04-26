import { IconCopy } from 'assets/icons/IconCopy';

interface Props {
  value: string;
}

export const FieldCopyText = ({ value }: Props) => {
  const triggerCopyToClipboard = () => {
    if ('clipboard' in navigator) {
      return navigator.clipboard.writeText(value);
    } else {
      return document.execCommand('copy', true, value);
    }
  };

  return (
    <div className="flex cursor-pointer gap-8">
      <input
        type="text"
        className="hkek-input-text grow border border-gray-02 p-14 outline-none focus-visible:outline-none"
        value={value}
        readOnly
      />

      <button
        className="bg-green-frost-01 p-14"
        onClick={triggerCopyToClipboard}
      >
        <IconCopy />
      </button>
    </div>
  );
};
