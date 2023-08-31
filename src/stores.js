import { writable , get , readable} from 'svelte/store';

export const clickables = writable([]);
export const id = readable(Math.random().toString().substring(2));
export const registeredUser = writable([]);
export const currentGame = writable(0);
export const isGameRunning = writable(false);
export const missedBullet = writable({count : 0, lastUser : null} );
export const points = writable([]);

export const possibleGame = ["balloon" , "balloon","balloon"]

export const updateScore = (position , score) => {
    registeredUser.update((_registeredUser) => {
        return _registeredUser.map((user) => {
            if (user.position === position) {
                user.score += score;
            }
            return user;
        })
    });
    points.update(_point => {
        return [..._point , {score ,  date : new Date().getTime()}]
    });
}
export const addNewClickable = ({callback , x , y , width,height}) => {
    const id = Math.random().toString();
    clickables.update((_clickables) => {
        return [..._clickables, { id, callback , x,y ,  width,height}]
    });
    return id;
}

export const removeClickable = (id) => {
    clickables.update((_clickables) => {
        return _clickables.filter((clickable) => clickable.id !== id)
    });
}

export const updateClickable = (id , { x , y }) => {
    clickables.update((_clickables) => {
        return _clickables.map((clickable) => {
            if (clickable.id === id) {
                clickable.x = x;
                clickable.y = y;
            }
            return clickable;
        })
    });
}

export const callClickedElement = (x,y , id) => {
    console.log("clicked")
    registerUser(id);
    let flagMissedSHot = true
    const _clickables = get(clickables);
    const position = get(registeredUser).find(user => user.id === id)?.position;
        _clickables.forEach((clickable) => {
            if (x >= clickable.x && x <= clickable.x + clickable.width && y >= clickable.y && y <= clickable.y + clickable.height) {
                flagMissedSHot = false;
                
                clickable.callback(position);
            }
        });
        if(flagMissedSHot) missedBullet.update(_missedBullet => ({count : _missedBullet.count + 1 , lastUser : position}));
}

export const registerUser = (id) => {
    registeredUser.update((_registeredUser) => {
        if(_registeredUser.filter(user => user.id === id).length > 0 || _registeredUser.length >= 2 ) return _registeredUser;
        return [..._registeredUser, {id , score : 0 , position :_registeredUser.length }]
    });
}
