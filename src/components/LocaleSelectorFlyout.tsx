import langDeIcon from '~/assets/icons/langDe.svg';
import langEnIcon from '~/assets/icons/langEn.svg';
import useI18n, { Locale, LocaleAlternates } from '~/i18n/index.js';

const langIconSrcs: Record<Locale, string> = { en: langEnIcon, de: langDeIcon };

const LocaleSelectorFlyout = ({ localeAlternates }: { localeAlternates: LocaleAlternates }) => {
  const { locale, formatDisplayName } = useI18n();
  return (
    <div class="group relative">
      <div class="cursor-pointer p-2 pr-0">
        <img src={langIconSrcs[locale]} alt={locale} class="size-6" />
      </div>
      <div class="absolute top-10 right-0 z-10 hidden min-w-60 rounded-lg bg-white p-3 shadow-lg group-hover:block">
        <div class="flex flex-col gap-2">
          {Object.entries(localeAlternates).map(([eachLocale, eachUrl]) => (
            <a
              href={eachUrl}
              class="flex items-center gap-3 rounded-md bg-slate-100 px-4 py-3 transition-colors hover:bg-slate-200"
            >
              <img src={langIconSrcs[eachLocale as Locale]} alt={eachLocale} class="size-6" />
              <span>{formatDisplayName(eachLocale, { type: 'language' })}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocaleSelectorFlyout;
