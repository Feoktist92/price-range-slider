import React from 'react';
import RangeSlider from './components/Slider';

const App = () => {
    const [value, setValue] = React.useState({ min: 0, max: 1000 });

    return (
        <RangeSlider
            min={0}
            max={1000}
            step={100}
            value={value}
            onChange={setValue}
        />
    );
};

export default App;
