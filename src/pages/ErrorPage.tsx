import Layout from '~/components/Layout';
import getI18n from '~/i18n';

const ErrorPage = () => {
  const { addLocalePrefix, t } = getI18n();
  return (
    <Layout title={t('error.error')}>
      <h1 class="mb-2 text-2xl font-bold">{t('error.errorText1')}</h1>
      <p class="mb-4">{t('error.errorText2')}</p>
      <img
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOW45cDN5YzIybGxpNW8zMzYzZml6aHUxbWQyNGs2emRnbnA3dmpoZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NTur7XlVDUdqM/giphy.gif"
        alt={t('error.error')}
        class="mb-4 w-96 rounded-md"
      />
      <p>
        {t('error.tryAgainLater', {
          startLink: chunk => (
            <a href={addLocalePrefix('/')} class="text-blue-600 hover:underline">
              {chunk}
            </a>
          )
        })}
      </p>
    </Layout>
  );
};

export default ErrorPage;
