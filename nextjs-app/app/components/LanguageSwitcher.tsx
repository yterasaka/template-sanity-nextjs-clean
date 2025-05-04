"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useLanguage,
  languages,
  defaultLanguage,
} from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { switchToLanguage } = useLanguage();
  const params = useParams();
  const currentLang = (params?.lang as string) || defaultLanguage;

  return (
    <div className="relative inline-block text-left">
      <div className="flex space-x-2">
        {languages.map((lang) => (
          <Link
            key={lang.id}
            href={switchToLanguage(lang.id)}
            className={`px-3 py-2 text-sm rounded-md ${
              currentLang === lang.id
                ? "bg-red-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {lang.id.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}
