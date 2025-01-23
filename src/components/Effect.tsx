import { useReply } from '~/context.js';

const Effect = ({
  action,
  target,
  children
}: {
  action: 'after' | 'append' | 'prepend' | 'replace' | 'update' | 'remove';
  target: string;
  children?: JSX.Element;
}) => {
  useReply().header('Content-Type', 'text/vnd.turbo-stream.html');
  return (
    <turbo-stream action={action} target={target}>
      {children && <template>{children}</template>}
    </turbo-stream>
  );
};

export default Effect;
