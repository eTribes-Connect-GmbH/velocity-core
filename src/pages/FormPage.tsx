import Button from '~/components/Button';
import LabeledInput from '~/components/LabeledInput';
import LabeledTextArea from '~/components/LabeledTextArea';
import Layout from '~/components/Layout';
import { useUser } from '~/context';
import useI18n from '~/i18n';

const FormPage = async () => {
  const { t } = useI18n();
  const user = useUser();
  return (
    <Layout title={t('message.message')}>
      <h1 class="mb-2 text-2xl font-bold">{t('message.writeAMessage')}</h1>
      <form method="POST" action="" class="mt-6 grid max-w-xl grid-cols-6 gap-3">
        <div class="col-span-3">
          <LabeledInput name="firstName" label={t('account.firstName')} value={user?.firstName} required />
        </div>
        <div class="col-span-3">
          <LabeledInput name="lastName" label={t('account.lastName')} value={user?.lastName} required />
        </div>
        <div class="col-span-6">
          <LabeledInput name="company" label={t('account.company')} required />
        </div>
        <div class="col-span-6">
          <LabeledInput name="streetAddress" label={t('address.streetAddress')} required />
        </div>
        <div class="col-span-6">
          <LabeledInput name="supplement" label={t('address.supplement')} />
        </div>
        <div class="col-span-2">
          <LabeledInput name="postalCode" label={t('address.postalCode')} required />
        </div>
        <div class="col-span-4">
          <LabeledInput name="city" label={t('address.city')} required />
        </div>
        <div class="col-span-6">
          <LabeledInput name="email" type="email" label={t('account.email')} value={user?.email} required />
        </div>
        <div class="col-span-6">
          <LabeledInput name="phone" label={t('account.phone')} required />
        </div>
        <div class="col-span-6">
          <LabeledTextArea name="message" label={t('message.message')} required />
        </div>
        <div className="col-span-4" />
        <div className="col-span-2 mt-1">
          <Button label={t('generic.submit')} />
        </div>
      </form>
    </Layout>
  );
};

export default FormPage;
