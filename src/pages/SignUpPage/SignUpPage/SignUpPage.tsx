import { PageCompilator } from '../../PageCompilator/PageCompilator';
import './SignUpPage.scss';

interface Props {}

export const SignUpPage: React.FC<Props> = () => {
  return (
    <PageCompilator 
      titlesText={{
        titleTop: 'Join our community of young scientists!',
        titleBottom: 'Create an account to start learning with us',
      }}
      imageLink={'../../../public/images/sign-up-girl.png'}
      submitMessage="Sign Up"
    />
  );
};
