import { ActivityT } from "../types"


export type   ActivityActions = 
    { type : 'save-activity', payload : { newActivity : ActivityT } }   |
    { type : 'set-activeId', payload : { id : ActivityT['id'] } }       |
    { type : 'delete-activeId', payload : { id : ActivityT['id'] } }    |
    { type : 'restart-app' }    


export type ActivityState = {
    activities : ActivityT[];
    activeId   : ActivityT['id'];
}

const localStorageActivities = () : ActivityT[] => {
    const activities = localStorage.getItem('activities');
    return activities ? JSON.parse(activities) : [];
}

export const initialState : ActivityState = {
    activities : localStorageActivities(),
    activeId : '',
}

export const activityReducer = (
    state  : ActivityState = initialState,
    action : ActivityActions,
) => {

    switch (action.type) {

        case 'save-activity':
            
            let updatedActivities : ActivityT[] = [];

            if (state.activeId) {

                updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity);

            } else {

                updatedActivities = [...state.activities, action.payload.newActivity];

            }


            return {
                ...state,
                activities : updatedActivities,
                activeId : '',
            }

        case 'set-activeId':

            return {
                ...state,
                activeId : action.payload.id,
            }

        case 'delete-activeId':

            return {
                ...state,
                activities : state.activities.filter(activity => activity.id !== action.payload.id),
            }

        case 'restart-app':

            return {
                activities : [],
                activeId   : '',
            }
    
        default:
            break;

    }


    return state;

}