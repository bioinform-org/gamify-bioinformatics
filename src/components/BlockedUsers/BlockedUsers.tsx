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
      {blockedUsers.map((user, index) => {
        return (
          <div key={index} className="blocked-users__item">
            <div className="blocked-users__info">
              <img
                className="blocked-users__image"
                src="images/avatar_by_default.svg"
                alt=""
              />
              <p className="blocked-users__name">{user.name}</p>
            </div>
            <button className="blocked-users__button">Unblock</button>
          </div>
        );
      })}
    </div>
  )
}