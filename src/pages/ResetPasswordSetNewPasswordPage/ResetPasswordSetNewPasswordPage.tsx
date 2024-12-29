import { PageCompilator } from '../PageCompilator/PageCompilator';
import './ResetPasswordSetNewPasswordPage.scss';

interface Props {}

export const ResetPasswordSetNewPasswordPage: React.FC<Props> = () => {
  return (
    <PageCompilator
      titlesText={{
        titleTop: 'Set a New Password',
        titleBottom: `Create a password that you'll use to log into your account`,
      }}
      imageLink={'../../../public/images/reset-girl.png'}
      submitMessage='Save'
      shouldBeForm={true}
      shouldBeUserName={false}
      shouldBeEmail={false}
      shouldBePassword={true}
      shouldBePasswordRules={true}
    />
  );
};
