import Layout from '~/components/Layout.js';
import useI18n from '~/i18n/index.js';

const NotFoundPage = () => {
  const { addLocalePrefix, t } = useI18n();
  return (
    <Layout title={t('notFound.notFound')}>
      <h1 class="mb-2 text-2xl font-bold">{t('notFound.notFoundText1')}</h1>
      <p class="mb-4">{t('notFound.notFoundText2')}</p>
      <img
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHBxOTZ0eWppNTd6YW5lNGhydWhsbnRvbmJpZWNpdnpzZ2ZkcTBkdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6uGhT1O4sxpi8/giphy.gif"
        alt={t('notFound.notFound')}
        class="mb-4 w-96 rounded-md"
      />
      <p>
        {t('notFound.tryAgainLater', {
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

export default NotFoundPage;
