import './PopUpContainer.scss';

interface Props {
  children: React.ReactNode,
}

export const PopUpContainer: React.FC<Props> = ({
  children,
}) => {
  return (
    <div className="pop-up-container">
      {children}
    </div>
  );
};
