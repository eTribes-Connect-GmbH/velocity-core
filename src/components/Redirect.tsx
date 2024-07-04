import { useReply } from '~/context';

const Redirect = ({ path }: { path: string }) => {
  useReply().redirect(path);
  return undefined;
};

export default Redirect;
