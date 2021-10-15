

function Form(props){

    return(
        <form 
            onSubmit={(event) => {
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

export default Form;