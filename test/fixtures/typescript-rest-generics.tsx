import { forwardRef, HTMLAttributes } from 'react'

import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

import styles from './styles.module.scss'

const typographyVariants = cva('text-foreground', {
  variants: {
    as: {
      h1: styles.h1,
      h2: styles.h2,
      h3: styles.h3,
      h4: styles.h4,
      h5: styles.h5,
      h6: styles.h6,
      p: styles.p,
      span: styles.span,
    },
  },
  defaultVariants: {
    as: 'p',
  },
})

type TypographyProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants> & {
    bold?: boolean
    error?: boolean
    white?: boolean
    center?: boolean
    italic?: boolean
    primary?: boolean
    secondary?: boolean
    size?: 'xl-2' | 'xl' | 'large' | 'normal' | 'medium' | 'small' | 'xs'
  }

export const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ as, bold, error, size, white, center, italic, primary, className, secondary, ...props }: TypographyProps, ref) => {
    const Component = as ?? 'p'
    return (
      <Component
        ref={ref}
        className={clsx(
          typographyVariants({ as, className }),
          center && styles.center,
          size && styles[size],
          bold && styles.bold,
          error && styles.error,
          white && styles.white,
          italic && styles.italic,
          primary && styles.primary,
          secondary && styles.secondary,
        )}
        {...props}
      />
    )
  },
)

Typography.displayName = 'Typography'
