import userIcon from '~/assets/icons/user.svg';
import { useUser } from '~/context';
import useI18n from '~/i18n';

const AccountFlyout = async () => {
  const { addLocalePrefix, t } = useI18n();
  const user = useUser();
  return (
    <div class="group relative">
      <div class="cursor-pointer p-2">
        <img src={userIcon} alt={t('account.account')} class="size-6" />
      </div>
      <div
        class="absolute -right-9 top-10 z-10 hidden min-w-60 rounded-lg bg-white p-3 shadow-lg group-hover:block"
        data-testid="account-flyout"
      >
        {user ? (
          <div class="flex flex-col gap-2">
            <p>{t('account.greeting', { firstName: user.firstName })}</p>
            <p>
              {t('account.notYou')}{' '}
              <a
                href={addLocalePrefix('/auth/logout')}
                data-testid="logout-link"
                data-turbo="false"
                class="text-blue-600 hover:underline"
              >
                {t('account.logOut')}
              </a>
            </p>
          </div>
        ) : (
          <div class="flex flex-col gap-2">
            <a
              href={addLocalePrefix('/auth/login')}
              data-turbo="false"
              data-testid="login-link"
              class="rounded-md bg-slate-100 px-4 py-3 transition-colors hover:bg-slate-200"
            >
              {t('account.logIn')}
            </a>
            <a
              href={addLocalePrefix('/auth/register')}
              data-turbo="false"
              data-testid="register-link"
              class="rounded-md bg-slate-100 px-4 py-3 transition-colors hover:bg-slate-200"
            >
              {t('account.createAccount')}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountFlyout;
