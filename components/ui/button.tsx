import * as React from "react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 rounded-full",
        lg: "h-12 px-8 rounded-full text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asLink?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asLink, children, ...props }, ref) => {
    const buttonContent = (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
      </button>
    )

    if (
      typeof children === "string" &&
      (children === "تواصل معنا" ||
        children === "Contact Us" ||
        children === "ابدأ الآن" ||
        children === "Start Now" ||
        children === "طلب عرض" ||
        children === "تجربة مجانية" ||
        children === "عرض توضيحي" ||
        children === "طلب تقييم" ||
        children === "طلب المساعدة" ||
        children === "اتصل بنا" ||
        children === "طلب اختبار" ||
        children === "معرفة المزيد")
    ) {
      return <Link href="/contact">{buttonContent}</Link>
    }

    return buttonContent
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
