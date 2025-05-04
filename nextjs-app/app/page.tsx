import { redirect } from "next/navigation";
import { defaultLanguage } from "./context/LanguageContext";

export default function RootPage() {
  redirect(`/${defaultLanguage}`);
}
