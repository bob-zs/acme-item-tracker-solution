import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import DeleteThingBtn from './DeleteThingBtn';
import RankForm from './RankForm';

const getUserName = (userId, users)=> {
  const user = users.find(u=> u.id === userId);
  return user ? user.name : 'Unknown';
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

              const hasOwner = thing.userId !== null;
              const userName = hasOwner ? getUserName(thing.userId, users) : null;

              return (
                <li key={ thing.id }>
                  Rank #{ thing.rank }: { thing.name }
                  <br />
                  { hasOwner && <span>Owner: {userName}<br /></span> }
                  <DeleteThingBtn thing={ thing } />
                  <RankForm thing={ thing } />
                </li>
              );s
          })
        }
      </ul>
      <ThingForm />
    </div>
  );
};

export default connect(
  (state)=> {
    return {
      users: state.users,
      things: state.things
    }
  }
)(Things);
