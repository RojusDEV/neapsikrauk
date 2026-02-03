interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
  buttonType?: "submit" | "button" | "reset";
  label?: string;
  className?: string;
  colorPallete: "blue" | "white";
  id?: string;
}

const Button = ({
  onClick,
  title,
  buttonType = "button",
  label = "button",
  className,
  colorPallete,
  id
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={buttonType}
      aria-label={label ?? title}
      className={
        className + " " + `component-button component-btn-${colorPallete}`
      }
      id={id ?? ""}
    >
      {title}
    </button>
  );
};

export default Button;
