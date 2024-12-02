import { PageCompilator } from '../PageCompilator/PageCompilator';
import './ResetPasswordEmailSendPage.scss';

interface Props {}

export const ResetPasswordEmailSendPage: React.FC<Props> = () => {
  return (
    <PageCompilator
      titlesText={{
        titleTop: 'Check your email',
        titleBottom: 'We’ve sent a message to your email address.',
        secondTitleBottom: 'Please check your spam or junk folder if you don’t see it.',
      }}
      imageLink={'../../../public/images/reset-girl.png'}
      shouldBeForm={false}
    />
  );
};
