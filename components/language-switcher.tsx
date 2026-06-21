"use client"

import { usePathname, useRouter } from "@/src/i18n/navigation";
import { useLocale } from "next-intl";

const locales = [
    { name: "AM", code: "hy" },
    { name: "RU", code: "ru" },
];

export default function LanguageSwitcher() {
    const router = useRouter();
    const locale = useLocale();
    const pathname = usePathname();

    function changeLanguage(code: string) {
        router.replace(pathname, { locale: code });
    }

    return (
        <div className=" bg-white rounded-[25px] p-[4px] w-max">
            {locales.map((l) => (
                <button key={l.code} onClick={() => changeLanguage(l.code)} className={`cursor-pointer rounded-[12px] px-3 ${locale === l.code ? "bg-[#6b1d1d] text-white font-medium" : "bg-white text-black"}`}>
                    {l.name}
                </button>
            ))}
        </div>
    );
}