import React from 'react';
import { connect } from 'react-redux';
import DeleteUserBtn from './DeleteUserBtn';
import UserForm from './UserForm';


const Users = ({ users })=> {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                { user.name }
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
    users: state.users
  };
}
export default connect(mapStateToProps)(Users);
