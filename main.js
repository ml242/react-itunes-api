'use strict';

var Results = React.createClass({

	filterResults: function(){
		var listItem = this.props.results.map(function(result, index){
        	return (
        		<ul>
        			<li>{result.artistName}</li>
        			<li>{result.trackName}</li>
        			<img src={result.artworkUrl100} />
    			</ul>)
    	});
		return (<div>{listItem}</div>)
	},

	render: function(){
		
		return(
			<div>
				{ this.filterResults() }
			</div>)
	}
});

var App = React.createClass({

	getInitialState: function(){
		return {
			text: "",
			results: [],
			cat: ""
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
		
		console.log("CAT: " + this.state.cat);
		
		var self = this;

		var searchResults = $.ajax({
			dataType: 'jsonp',
			url: 'https://itunes.apple.com/search?term=' + this.state.text + '&country=us&entity=' + this.state.cat,
			success: function(response){

				self.setState({
					results: self.state.results.concat(response.results)
				})

			}
		})



	},

    render: function(){
        return (
            <div>
                <input type="text" value={this.state.text} onChange={this.onChange}></input>
                <select value={this.state.value} onChange={this.handleCatChange}>
                	<option value="software">apps</option>
                	<option value="podcast">podcast</option>
                	<option value="allArtist">music</option>
                	<option value="movie">movie</option>
                </select>
                <input type="submit" value="search" onClick={this.searchItunes}></input>
                <Results results={this.state.results} />
            </div>
        );
    }
});

React.render(<App />,  document.getElementById("content"));	