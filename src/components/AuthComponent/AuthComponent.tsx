import { Navigate, Outlet } from 'react-router-dom';
import { selectUser } from '../../store/features/userSlice';
import { useAppSelector } from '../../store/hooks';
import './AuthComponent.scss';
import { User } from '../../types/ProductType';

interface Props {}

export const AuthComponent: React.FC<Props> = () => {
  const user = useAppSelector(selectUser);

  if (!(user as User).userId) {
    return (<Navigate to={'sign-in'}/>);
  }

  return <Outlet />;
};
