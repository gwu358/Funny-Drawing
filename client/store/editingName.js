
// ACTION TYPES
const EDIT_NAME = 'EDIT_NAME';

// ACTION CREATORS

export function editName (editing) {
  const action = { type: EDIT_NAME, editing };
  return action;
}

// REDUCER
export default function reducer (state = false, action) {

  switch (action.type) {

    case EDIT_NAME:
      return action.editing;

    default:
      return state;
  }

}
