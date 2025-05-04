import Link from "next/link";
import { useLanguage, defaultLanguage } from "@/app/context/LanguageContext";
import { linkResolver } from "@/sanity/lib/utils";

interface ResolvedLinkProps {
  link: any;
  children: React.ReactNode;
  className?: string;
}

export default function ResolvedLink({
  link,
  children,
  className,
}: ResolvedLinkProps) {
  // Get current language from context
  const { language } = useLanguage();

  // resolveLink() is used to determine the type of link and return the appropriate URL.
  const unlocalized = linkResolver(link);

  // If it's an internal link, add language prefix if not default language
  const shouldAddLanguage =
    typeof unlocalized === "string" &&
    unlocalized.startsWith("/") &&
    language !== defaultLanguage;

  const resolvedLink = shouldAddLanguage
    ? `/${language}${unlocalized}`
    : unlocalized;

  if (typeof resolvedLink === "string") {
    return (
      <Link
        href={resolvedLink}
        target={link?.openInNewTab ? "_blank" : undefined}
        rel={link?.openInNewTab ? "noopener noreferrer" : undefined}
        className={className}
      >
        {children}
      </Link>
    );
  }
  return <>{children}</>;
}
