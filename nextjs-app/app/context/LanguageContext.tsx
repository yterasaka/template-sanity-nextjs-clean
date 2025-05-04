"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { languages, defaultLanguage } from "../lib/languages";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  pathname: string;
  switchToLanguage: (lang: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
  initialLanguage = defaultLanguage,
  pathname = "/",
}: {
  children: ReactNode;
  initialLanguage?: string;
  pathname?: string;
}) => {
  const [language, setLanguage] = useState(initialLanguage);

  // Function to switch the URL to another language
  const switchToLanguage = (lang: string): string => {
    // 現在のパスをセグメントに分割
    const segments = pathname.split("/").filter(Boolean);

    // 最初のセグメントが言語コードかどうかをチェック
    const hasLangPrefix = languages.some((l) => l.id === segments[0]);

    // 言語プレフィックスを除いたパス
    let pathWithoutLang = pathname;
    if (hasLangPrefix) {
      pathWithoutLang =
        segments.length > 1 ? `/${segments.slice(1).join("/")}` : "/";
    }

    // デフォルト言語の場合、プレフィックスを追加しない
    if (lang === defaultLanguage) {
      return pathWithoutLang;
    }

    // 他の言語の場合、言語プレフィックスを追加
    return `/${lang}${pathWithoutLang}`;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, pathname, switchToLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Re-export languages and defaultLanguage for convenience
export { languages, defaultLanguage };
