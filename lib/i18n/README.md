# Main site i18n

Typed dictionaries for the main institute site (`en`, `fr`, `iu`).

## Add or change copy

1. Add keys to `messages/en.ts` first.
2. Mirror the same keys in `messages/fr.ts` and `messages/iu.ts` (`satisfies Messages`).
3. Use in UI:
   - **Client components:** `const t = useTranslations()` then `t("nav.home")`
   - **Server components / metadata:** `const t = await getTranslator(locale)`

## URLs

| Environment | English | French | Inuktitut |
|-------------|---------|--------|-----------|
| Production | `/` | `/fr/...` | `/iu/...` |
| Local dev | `/main/en` | `/main/fr` | `/main/iu` |

`proxy.ts` rewrites production hostnames to `app/main/[locale]/…`.

## Navigation

Shared nav config lives in `lib/main-navigation.ts` so header and footer stay in sync.

## Files

- `config.ts` — locale list and labels
- `path.ts` — locale-aware href helpers
- `messages/` — dictionaries per language
- `create-translator.ts` — client-safe `t()` factory
- `translate.ts` — server-only `getTranslator()`
- `page-metadata.ts` — shared `generateMetadata` helper
