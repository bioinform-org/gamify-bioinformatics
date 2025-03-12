import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import './AuthComponent.scss';
import { selectToken } from '../../store/features/tokenSlice';

export const AuthComponent: React.FC = () => {
  const token = useAppSelector(selectToken);

  if (!token.value) {
    return (<Navigate to={'sign-in'}/>);
  }

  return <Outlet />;
};
