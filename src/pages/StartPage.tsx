import Layout from '~/components/Layout.js';
import { useUser } from '~/context.js';
import useI18n from '~/i18n/index.js';

const StartPage = async () => {
  const { addLocalePrefix, t } = useI18n();
  const user = useUser();
  return (
    <Layout>
      <h1 class="mb-2 text-2xl font-bold">{t('start.welcome')}</h1>
      {user && <p class="mb-2">{t('account.greeting', { firstName: user.firstName })}</p>}
      <p class="mb-2">{t('start.welcomeText')}</p>
      <p class="mb-2">
        {user
          ? t('start.authText.loggedIn', {
              logoutLink: chunk => (
                <a href={addLocalePrefix('/auth/logout')} data-turbo="false" class="text-blue-600 hover:underline">
                  {chunk}
                </a>
              )
            })
          : t('start.authText.loggedOut', {
              registerLink: chunk => (
                <a href={addLocalePrefix('/auth/register')} data-turbo="false" class="text-blue-600 hover:underline">
                  {chunk}
                </a>
              ),
              loginLink: chunk => (
                <a href={addLocalePrefix('/auth/login')} data-turbo="false" class="text-blue-600 hover:underline">
                  {chunk}
                </a>
              )
            })}
      </p>
      <p class="mb-2">
        {t('start.tryFormDemo', {
          formPageLink: chunk => (
            <a href={addLocalePrefix('/form')} class="text-blue-600 hover:underline">
              {chunk}
            </a>
          )
        })}
      </p>
    </Layout>
  );
};

export default StartPage;
