'use strict';

var Results = React.createClass({
	render: function(){
		return(
			<div>{this.props.results}</div>)
	}
});

var App = React.createClass({

	getInitialState: function(){
		return {
			text: "",
			results: [],
			cat: "movie"
		}
	},

	onChange: function(e){
		this.setState({ 
			text: e.target.value 
		});
	},

	handleCatChange: function(e){
		this.setState({
			cat: e.target.value
		})
		console.log(this.state.cat);
	},

	searchItunes: function(){
		
		console.log(this.state.text);
		
		var searchResults = $.ajax({
			dataType: 'jsonp',
			url: 'https://itunes.apple.com/search?term=' + this.state.text + '&country=us&entity=' + this.state.cat
		})	

		this.setState({
			results: this.state.results.concat(searchResults)
		});
	},

    render: function(){
        return (
            <div>
                <input type="text" value={this.state.text} onChange={this.onChange}></input>
                <select onChange={this.handleCatChange}>
                	<option value="apps">apps</option>
                	<option value="music">music</option>
                	<option value="movie">movie</option>
                </select>
                <input type="submit" value="search" onClick={this.searchItunes}></input>
                <Results results={this.state.results} />
            </div>
        );
    }
});

React.render(<App />,  document.getElementById("content"));	