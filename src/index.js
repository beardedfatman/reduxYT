import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import VideoList from './components/video_list';
import SearchBar from './components/searchbar';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDAIM5xxyQc_eKZDzZmGW2Jt4wTOapCwG8';

// Create new component. Component should produce HTML
class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('bob');
    }

    videoSearch(term) {
        YTSearch( {key: API_KEY, term: term}, videos => {
            this.setState({ 
                videos,
                selectedVideo: videos[0]
             });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 400)

        return (
        <div>
            <SearchBar onSearchTermChange={videoSearch} />
            <VideoDetail video={this.state.selectedVideo} />
            <VideoList 
                onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                videos={this.state.videos} /> 
        </div>
        );
    } 
        
}

// Take generated HTML and render onto DOM
ReactDOM.render(<App />, document.querySelector('.container'));