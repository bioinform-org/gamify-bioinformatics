import { PageCompilator } from '../../PageCompilator/PageCompilator';
import './ResetPasswordPage.scss';

interface Props {}

export const ResetPasswordPage: React.FC<Props> = () => {
  return (
    <PageCompilator 
      titlesText={{
        titleTop: 'Forgot password',
        titleBottom: 'Enter your email to reset your password',
      }}
      imageLink={'../../../public/images/reset-girl.png'}
      submitMessage="Reset Password"
      shouldBeForm={true}
      shouldBeUserName={false}
      shouldBeEmail={true}
      shouldBePassword={false}
      shouldBePasswordRules={false}
    />
  );
};
