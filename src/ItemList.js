function ItemList(props){

    return (
        <ul>
            {props.items.map((item, index) => {
                return (
                    <Item
                        key={index} 
                        item={item}
                        onDeleteItem={props.onDeleteItem}
                    />
                );
            })}
        </ul>
    );
}

function Item(props){

    return (
        <li className='item'>
            <div className='itemText'>{props.item}</div>
            <div className='options'>
                <button
                    className='delete' 
                    onClick={() => props.onDeleteItem(props.item)}
                >X</button>
            </div>
            
        </li>
    );
}

export default ItemList;