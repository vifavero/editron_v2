import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "group/button  shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium  transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-chart-2 text-black hover:bg-[#c1ff72]", // cor padrão e hover
        outline:
          "border border-gray-400 bg-white text-gray-800 hover:bg-gray-100",
        secondary: "flex-col",
      },
      size: {
        sm: "w-12 h-5 ",
        md: "w-16 h-16",
        lg: "w-20 h-10",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconSrc?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, iconSrc, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {iconSrc && (
          <span className="flex items-center justify-center">{iconSrc}</span>
        )}
        {children}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
