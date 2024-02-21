import { LinkButton, PlainButton } from "./Button.styles";

export type ButtonSizeType = "small" | "large";

export function Button({ children, size, href, onClick, className }: { children: any, size: ButtonSizeType, href?: string, onClick?: () => void, className?: string }) {

    if (href) {
        return <LinkButton className={className} $size={size} href={href} onClick={onClick}>{children}</LinkButton>;
    }

    return <PlainButton className={className} $size={size} onClick={onClick}>{children}</PlainButton>;
}