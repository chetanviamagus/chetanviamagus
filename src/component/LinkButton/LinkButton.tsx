import { Link } from "react-router-dom";
import { Trans } from "react-i18next";

interface ILinkButton {
  path: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}
function LinkButton(props: ILinkButton) {
  const { path, label, className, disabled, onClick } = props;
  return (
    <Link
      to={path}
      onClick={onClick}
      className={`font-light text-blue-500 underline ${
        disabled ? "!pointer-events-none !text-dark-neutral-gray-500" : ""
      } ${className ?? ""}`}
    >
      <Trans>{label}</Trans>
    </Link>
  );
}

export default LinkButton;
