import React from 'react';
import { connect } from 'react-redux';
import { updateThing } from './store';

const ThingOwnerForm = ({ thing, users, updateThing })=> {
  return (
    <div>
      <select defaultValue={ thing.userId } onChange={ ev => updateThing(thing, ev.target.value )}>
        <option value=''>-- nobody --</option>
        {
          users.map( user => {
            return (
              <option key={ user.id } value={ user.id }>{ user.name }</option>
            );
          })
        }
      </select>
    </div>
  );
}

export default connect(
  (state)=> {
    return {
      users: state.users
    }
  },
  (dispatch)=> {
    return {
      updateThing: (thing, userId)=> {
        thing = {...thing, userId: userId * 1 };
        dispatch(updateThing(thing));
      }
    }
  }
)(ThingOwnerForm);