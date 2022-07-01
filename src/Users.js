import React from 'react';
import { connect } from 'react-redux';
import DeleteUserBtn from './DeleteUserBtn';
import UserForm from './UserForm';


const Users = ({ users, things })=> {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users.map( (user) => {
            
            const thingsOwned = things.filter((thing) => thing.userId === user.id);

            return (
              <li key={ user.id }>
                { user.name }

                  { thingsOwned && // Maybe this should be it's own component
                    <span>
                      {' '}owns
                      <ul>
                      { thingsOwned.map((thing) => 
                          <li key={ thing.id }>{ thing.name }</li>
                      ) }
                      </ul>
                    </span>
                  }

                <DeleteUserBtn user={ user } />
              </li>
            );
          })
        }
      </ul>
      <UserForm />
    </div>
  );
}

const mapStateToProps = (state)=> {
  return {
    users: state.users,
    things: state.things,
  };
}
export default connect(mapStateToProps)(Users);
