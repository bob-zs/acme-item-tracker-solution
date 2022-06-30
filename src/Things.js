import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import DeleteThingBtn from './DeleteThingBtn';

const Things = ({ things })=> {
  return (
    <div>
      <h1>Things</h1>
      <ul>
        {
          things.map( thing => {
            return (
              <li key={ thing.id }>
                { thing.name }
                <DeleteThingBtn thing={ thing } />
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
