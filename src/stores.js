import { writable , get} from 'svelte/store';

export const clickables = writable([]);

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

export const callClickedElement = (x,y) => {
    const _clickables = get(clickables);
        _clickables.forEach((clickable) => {
            console.log(x , x ,clickable)
            if (x >= clickable.x && x <= clickable.x + clickable.width && y >= clickable.y && y <= clickable.y + clickable.height) {
                
                clickable.callback();
            }
        });

}
