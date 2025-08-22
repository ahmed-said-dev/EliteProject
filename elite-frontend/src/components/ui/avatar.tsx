import type { ImgHTMLAttributes } from 'react';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeToPx: Record<AvatarSize, number> = { sm: 32, md: 40, lg: 56, xl: 72 };

export function Avatar({ src, alt = 'avatar', size = 'md', className = '', ...rest }: AvatarProps) {
  const dimension = sizeToPx[size] || sizeToPx.md;
  const baseClasses = `inline-block rounded-full object-cover bg-gray-200 ${className}`.trim();

  if (!src) {
    return <div className={baseClasses} style={{ width: dimension, height: dimension }} aria-label={alt} />;
  }

  return <img src={src} alt={alt} width={dimension} height={dimension} className={baseClasses} {...rest} />;
}

export function AvatarImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img {...props} />;
}

export function AvatarFallback(props: any) {
  const { children, ...rest } = props || {};
  return <div {...rest}>{children}</div>;
}

export default Avatar;