import React from 'react';

import ItemList from './ItemList';
import Form from './Form';

import {getDatabase, ref, child, get, set} from 'firebase/database';


const quoteAPI = 'http://quotes.rest/qod.json?category=inspire';

const quote = 'There are no limits. There are plateaus, but you must not stay there, you must go beyond them. If it kills you, it kills you. A man must constantly exceed his level.';

class ToDo extends React.Component{
    constructor(props){
        super(props);

        this.state = {items: [], input: '', quote: quote, quoteIsLoading: false};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    componentDidMount(){
        const dbRef = ref(getDatabase());
        
        get(child(dbRef, `users/${this.props.uid}`)).then((snapshot) =>{
            if(snapshot.exists()){
                console.log(snapshot.val());

                const items = [];
                
                for(const [key, value] of Object.entries(snapshot.val())){
                    if(key !== 'id')
                        items.push(value);
                }

                this.setState({
                    items: items
                });                
            }
        });

        // fetch(quoteAPI)
        //     .then(res => res.json())
        //     .then(result => {
        //         console.log(result);
        //         const quote = result.contents.quotes[0].quote;
        //         console.log(quote);
        //         this.setState({quote: quote, quoteIsLoading: false});
        //     });
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
        
        putItemList(items, this.props.uid);
        
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

        putItemList(items, this.props.uid);

        this.setState({items: items})
    }

    render(){
        let quote;
        if(this.state.quoteIsLoading){
            quote = (
                <div className='loading'></div>
            );
        } else{
            quote = <div><h1>{this.state.quote}</h1></div>
        }

        return (
            <div id='todo'>
                {quote}
                <Form 
                    onSubmit={this.handleSubmit}
                    onChange={this.handleInputChange}
                    value={this.state.input}
                      
                />
                <ItemList 
                    items={this.state.items} 
                    onDeleteItem={this.handleDeleteItem}    
                />

                <button onClick={this.props.signOut}>Sign Out</button>
            </div>
        );
    }

}

function putItemList(items, uid){
    const db = getDatabase();
    const dbItems = {};

    items.forEach((item, index) => {
        dbItems[index] = item;
    });

    set(ref(db, 'users/' + uid), dbItems);
}

export default ToDo;