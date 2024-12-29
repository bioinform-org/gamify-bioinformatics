import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import './AuthComponent.scss';
import { selectToken } from '../../store/features/tokenSlice';

//SIMPLE AUTH CHECK - IF USER HAS BEEN FETCHED FROM SERVER
interface Props {}

export const AuthComponent: React.FC<Props> = () => {
  const token = useAppSelector(selectToken);

  if (!token.value) {
    return (<Navigate to={'sign-in'}/>);
  }

  return <Outlet />;
};
