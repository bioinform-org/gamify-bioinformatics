import "./SignInPage.scss";
import { PageCompilator } from "../../PageCompilator/PageCompilator";

type Props = {};

export const SignInPage: React.FC<Props> = () => {
  return (
    <PageCompilator
      titlesText={{
        titleTop: 'Welcome back!',
        titleBottom: 'Log in to continue your learning journey',
      }}
      imageLink={'../../../public/images/man-science.png'}
      submitMessage="Log In"
      shouldBeForm={true}
      shouldBeUserName={false}
      shouldBeEmail={true}
      shouldBePassword={true}
      shouldBePasswordRules={false}
    />
  );
};
