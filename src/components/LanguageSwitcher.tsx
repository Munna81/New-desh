import { useRouter } from "next/router";
import Link from "next/link";

export default function LanguageSwitcher() {
  const { locale, asPath } = useRouter();

  return (
    <Link
      href={asPath}
      locale={locale === "en" ? "bn" : "en"}
      className="bg-white rounded-full px-2 py-1 text-sm border border-gray-200"
    >
      <span
        className={`${
          locale === "en" ? "bg-red-500 text-white" : ""
        } px-2 py-0.5 rounded-full`}
      >
        EN
      </span>{" "}
      <span
        className={`${
          locale === "bn" ? "bg-red-500 text-white" : ""
        } px-2 py-0.5 rounded-full`}
      >
        বাং
      </span>
    </Link>
  );
}
