import React from 'react'
import './StoryReel.css'
import Story from '../Story/Story'
function StoryReel() {
    return (
        <div className='storyReel'>
            {/* Story */}
            <Story 
                image="http://placeimg.com/640/480/animals"
                profileSrc="http://placeimg.com/640/480/cats"
                title="Aga Kam"
            />
            <Story 
                image="http://placeimg.com/640/480/people"
                profileSrc="http://placeimg.com/640/480/abstract"
                title="Zuzia"
            />
            <Story 
                image="http://placeimg.com/640/480/transport"
                profileSrc="http://placeimg.com/640/480/food"
                title="Mikołaj"
            />
            <Story 
                image="http://placeimg.com/640/480/abstract"
                profileSrc="http://placeimg.com/640/480/nightlife"
                title="Sartuszek"
            />
            <Story 
                image="http://placeimg.com/640/480/animals"
                profileSrc="http://placeimg.com/640/480/animals"
                title="Gola960"
            />

        </div>
    )
}

export default StoryReel
