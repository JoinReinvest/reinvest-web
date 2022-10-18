interface InputControlErrorMessageProps {
  message?: string;
}

export const InputControlErrorMessage = ({ message }: InputControlErrorMessageProps) => (
  <div className="paragraph-small absolute left-0 mt-8 top-full text-secondary-error">{message}</div>
);
