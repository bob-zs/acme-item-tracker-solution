import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import DeleteThingBtn from './DeleteThingBtn';
import RankForm from './RankForm';
import axios from 'axios';

const findOwner = (userId, users)=> users.find(u=> u.id === userId);

const ChooseOwnerSelector = ({ thing, users, currentOwner = null }) => {

  return (
    <span>
      <select defaultValue={ currentOwner ? currentOwner.id : false } onChange={event => onSelectedNewOwner(event, thing) } >
        <option>Choose an Owner</option>
        {
          users.map((user) => {
            return (
              <option key={user.id} value={user.id}>{user.name}</option>
            )
          })
        }
      </select>
    </span>
  );

}

const Things = ({ things, users })=> {
  return (
    <div>
      <h1>Things</h1>
      <ul>
        {
          things
            .sort((thingA, thingB)=> thingA.rank - thingB.rank)
            .map( thing => {

              console.log(thing.userId);
              const hasOwner = thing.userId !== null;
              const currentOwner = hasOwner ? findOwner(thing.userId, users) : null;

              return (
                <li key={ thing.id }>
                  Rank #{ thing.rank }: { thing.name }
                  <br />
                  { hasOwner && <span>Owner: {currentOwner.name}<br /></span> }
                  <ChooseOwnerSelector thing={ thing } users={ users } currentOwner={ currentOwner } />
                  <br />
                  <DeleteThingBtn thing={ thing } />
                  <br />
                  <RankForm thing={ thing } />
                  <br />
                </li>            
              );
          })
        }
      </ul>
      <ThingForm />
    </div>
  );
};




const mapDispatchToProps = (dispatch) => {
  return {
    onSelectedNewOwner:  async function(e, thing) {
      const newOwnerId = parseInt(e.target.value);
      if (thing.userId === newOwnerId) {
        console.warn('Same owner, no need to make a request nor change state');
        return;
      }
      const response = await axios.put('/api/things/user', 
      { thingId: thing.id, newOwnerId })
    
      const ownerChanges = response.data;
      dispatch({ type: 'SET_USER_FOR_THING', ownerChanges }); 
    }
  }

};

const mapStateToProps = state => {
  return {
    users: state.users,
    things: state.things,
  }
}
    

export default connect(mapStateToProps, mapDispatchToProps)(Things);
