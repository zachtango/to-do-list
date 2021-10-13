import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import firebaseApp from './firebase';
import ItemList from './ItemList';
import Form from './Form';

const dbLink = 'https://to-do-list-7afb6-default-rtdb.firebaseio.com/items.json';
const quoteAPI = 'http://quotes.rest/qod.json?category=inspire';

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {items: [], input: '', quote: '', quoteIsLoading: true};

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
        let quote;
        if(this.state.quoteIsLoading){
            quote = (
                <div className='loading'></div>
            );
        } else{
            quote = <div><h1>{this.state.quote}</h1></div>
        }

        return (
            <div>
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
