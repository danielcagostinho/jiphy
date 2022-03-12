// React Imports
import React from "react";

// CSS Imports
import "./Filter.scss";

const Filter = () => {
  return (
    <div className="Filter">
      <div className="FilterOption">
        <input type="checkbox" id="audio_only" name="audio_only" />
        <label for="audio_only">Audio Only</label>
      </div>
      <div className="FilterOption">
        <input type="checkbox" id="mute_audio" name="mute_audio" />
        <label for="mute_audio">Mute Audio on Fullscreen</label>
      </div>
      <div className="FilterOption">
        <input type="checkbox" id="gif_paused" name="gif_paused" />
        <label for="gif_paused">Hover to Play Gifs</label>
      </div>
    </div>
  );
};

export default Filter;
