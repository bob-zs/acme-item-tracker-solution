import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import DeleteThingBtn from './DeleteThingBtn';
import RankForm from './RankForm';

const Things = ({ things })=> {
  return (
    <div>
      <h1>Things</h1>
      <ul>
        {
          things.map( thing => {
            return (
              <li key={ thing.id }>
                Rank #{ thing.rank }: { thing.name }
                <DeleteThingBtn thing={ thing } />
                <RankForm thing={ thing } />
              </li>
            );
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
      things: state.things
    }
  }
)(Things);
