import { useReply } from '~/context';

const NotFound = () => {
  useReply().callNotFound();
  return undefined;
};

export default NotFound;
