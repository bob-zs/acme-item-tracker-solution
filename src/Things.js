import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({ things, deleteThing, increment })=> {
  return (
    <div>
      <h1>Things</h1>
      <ul>
        {
          things.map( thing => {
            return (
              <li key={ thing.id }>
                { thing.name } ({ thing.ranking })
                <button onClick={ ()=> deleteThing(thing)}>x</button>
                <button onClick={()=> increment(thing, -1)}>-</button>
                <button onClick={()=> increment(thing, 1)}>+</button>
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
      things: state.things,
    }
  },
  (dispatch)=> {
    return {
      increment: async(thing, dir)=> {
        thing = {...thing, ranking: thing.ranking + dir};
        thing = (await axios.put(`/api/things/${thing.id}`, thing)).data;
        dispatch({ type: 'UPDATE_THING', thing });
      },
      deleteThing: async(thing)=> {
        await axios.delete(`/api/things/${thing.id}`);
        dispatch({ type: 'DELETE_THING', thing });
      }
    };

  }
)(Things);
