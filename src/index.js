import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const dbLink = 'https://to-do-list-7afb6-default-rtdb.firebaseio.com/items.json';

function Form(props){

    return(
        <form onSubmit={(event) => {
            event.preventDefault();
            props.onSubmit();
        }}>
            <label>
                <input 
                    type='text'
                    placeholder='To Do...'
                    value={props.value} 
                    onChange={props.onChange}
                />
            </label>
        </form>
    );
}

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
                <button className='edit'>O</button>
                <button
                    className='delete' 
                    onClick={() => props.onDeleteItem(props.item)}
                >X</button>
            </div>
            
        </li>
    );
}

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {items: [], input: ''};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    componentDidMount(){

        fetch(dbLink)
            .then(response => response.json())
            .then(data => {
                
                const items = [];
                
                if(data){
                    for(const [key, value] of Object.entries(data)){
                        items.push(value);
                    }
                }

                this.setState({
                    items: items
                });

            });
    }

    handleInputChange(event){
        console.log('handleInputChange');
        this.setState({
            input: event.target.value
        });
    }

    handleSubmit(){
        const items = this.state.items.slice();
        items.push(this.state.input);
        
        putItemList(items);
        
        this.setState({
            items: items,
            input: ''
        });
    }

    handleDeleteItem(item){
        const items = this.state.items.slice();
        const index = items.indexOf(item);
        if (index > -1) {
            items.splice(index, 1);
        }

        putItemList(items);

        this.setState({items: items})
    }

    render(){
        const quote = "\"There are no limits. There are plateaus, but you must not stay there, you must go beyond them. If it kills you, it kills you. A man must constantly exceed his level\""
        
        return (
            <div>
                <h1>{quote}</h1>
                <Form 
                    onSubmit={this.handleSubmit}
                    onChange={this.handleInputChange}
                    value={this.state.input}
                      
                />
                <ItemList 
                    items={this.state.items} 
                    onDeleteItem={this.handleDeleteItem}    
                />
            </div>
        );
    }

}

function putItemList(items){
    const dbItems = {};

    items.forEach((item, index) => {
        dbItems[index] = item;
    });

    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dbItems)
    }

    fetch(dbLink, requestOptions)
        .then(res => res.json())
        .then(data => console.log('PUT', data));
}

ReactDOM.render(<App />, document.getElementById('root'));
