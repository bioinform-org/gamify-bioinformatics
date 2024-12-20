// import { Navigate, Outlet } from 'react-router-dom';
// import { selectUser } from '../../store/features/userSlice';
// import { useAppSelector } from '../../store/hooks';
// import './AuthComponent.scss';

// //SIMPLE AUTH CHECK - IF USER HAS BEEN FETCHED FROM SERVER
// interface Props {}

// export const AuthComponent: React.FC<Props> = () => {
//   const user = useAppSelector(selectUser);

//   if (!user.value) {
//     return (<Navigate to={'sign-in'}/>);
//   }

//   return <Outlet />;
// };
