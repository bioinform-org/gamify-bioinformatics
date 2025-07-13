import './BlockedUsers.scss';

const blockedUsers = [
  {name: 'Patrick'},
  {name: 'Lucas'},
  {name: 'Janna'},
  {name: 'Katrine'},
  {name: 'Diana'},
]

export const BlockedUsers = () => {
  return (
    <div className="blocked-users">
      {blockedUsers.map(user => {
        return (
          <div className="blocked-users__item">
            <img
              className="blocked-users__image"
              src="/public/images/avatar_by_default.svg"
              alt=""
            />
            <p className="blocked-users__name">{user.name}</p>
            <button className="blocked-users__button">Unblock</button>
          </div>
        );
      })}
    </div>
  )
}