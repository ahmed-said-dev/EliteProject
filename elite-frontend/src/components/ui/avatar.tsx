import React from 'react';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	src?: string;
	alt?: string;
	size?: AvatarSize;
	className?: string;
}

const sizeToPx: Record<AvatarSize, number> = {
	sm: 32,
	md: 40,
	lg: 56,
	xl: 72,
};

export function Avatar({ src, alt = 'avatar', size = 'md', className = '', ...rest }: AvatarProps) {
	const dimension = sizeToPx[size] || sizeToPx.md;
	const baseClasses = `inline-block rounded-full object-cover bg-gray-200 ${className}`.trim();

	if (!src) {
		return (
			<div
				className={baseClasses}
				style={{ width: dimension, height: dimension }}
				aria-label={alt}
			/>
		);
	}

	return (
		<img
			src={src}
			alt={alt}
			width={dimension}
			height={dimension}
			className={baseClasses}
			{...rest}
		/>
	);
}

export default Avatar;

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
