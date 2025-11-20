import clsx from "clsx";
import type { HTMLAttributes } from "react";

interface Root extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface Header extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface Content extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface Footer extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CardRoot: React.FC<Root> = ({ className, children }) => {
  return <div className={clsx(className)}>{children}</div>;
};

const CardHeader: React.FC<Header> = ({ className, children }) => {
  return <div className={clsx(className)}>{children}</div>;
};

const CardContent: React.FC<Content> = ({ className, children }) => {
  return <div className={clsx(className)}>{children}</div>;
};
const CardFooter: React.FC<Footer> = ({ className, children }) => {
  return (
    <div className={clsx("flex-shrink-0 w-full", className)}>{children}</div>
  );
};

CardRoot.displayName = "CardRoot";
CardHeader.displayName = "CardHeader";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";

const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
};
export default Card;
