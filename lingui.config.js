module.exports = {
  locales: ['en', 'ru'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: 'apps/web/locales/{locale}',
      include: ['apps/web/app', 'apps/web/components'],
    },
  ],
  format: 'po',
  compileNamespace: 'es',
  moduleType: 'es',
}
