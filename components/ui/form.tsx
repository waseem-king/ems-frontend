"use client"

import * as React from \"react\"
import { useFormField } from \"./form-field\"

interface FormDescriptionProps extends React.HTMLAttributes<HTMLOListElement> {}

const FormDescription = React.forwardRef<HTMLOListElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { error, formDescriptionId } = useFormField()

    return (
      <p
        id={formDescriptionId}
        className={cn(
          \"text-sm text-muted-foreground leading-6\",
          error && \"text-destructive\",
          className,
        )}
        {...props}
      />
    ) ?
