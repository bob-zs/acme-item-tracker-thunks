import React from 'react';
import ThingForm from './ThingForm';
import ThingOwnerForm from './ThingOwnerForm';
import { connect } from 'react-redux';
import { deleteThing, updateThing } from './store';

const Things = ({ things, users, deleteThing, increment })=> {

  const usersWithNumThings = users.map(user => {
    return {
      ...user,
      numThingsOwned: things.filter(thing => thing.userId === user.id).length,
    };
  });

  return (
    <div>
      <h1>Things</h1>
      <ul>
        {
          things
            .sort((t1, t2) => t2.ranking - t1.ranking)
            .map( thing => {
              const owner = usersWithNumThings.find(user => user.id === thing.userId) || null;
              return (
                <li key={ thing.id }>
                  { thing.name } ({ thing.ranking })
                  { owner && ` owned by ${owner.name} who has ${owner.numThingsOwned} thing${ (owner.numThingsOwned > 1) ? `s` : '' }` || `` }
                  <ThingOwnerForm thing={ thing } usersWithNumThings={ usersWithNumThings } />
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
      users: state.users
    }
  },
  (dispatch)=> {
    return {
      increment: (thing, dir)=> {
        thing = {...thing, ranking: thing.ranking + dir};
        dispatch(updateThing(thing));
      },
      deleteThing: (thing)=> {
        dispatch(deleteThing(thing));
      }
    };

  }
)(Things);
