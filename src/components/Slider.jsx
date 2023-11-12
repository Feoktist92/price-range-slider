import React, { useState, useEffect } from 'react';
import { formatToRubles, parseFromRubles } from '../utils/format';

const RangeSlider = ({ min, max, value, step, onChange }) => {
    const [minValue, setMinValue] = useState(value ? value.min : min);
    const [maxValue, setMaxValue] = useState(value ? value.max : max);
    const [isMinInputClicked, setIsMinInputClicked] = useState(false);
    const [isMaxInputClicked, setIsMaxInputClicked] = useState(false);
    const dataAttr = { 'data-attr': `${max}` };
    const [minPos, setMinPos] = useState(
        ((minValue - min) / (max - min)) * 100
    );
    const [maxPos, setMaxPos] = useState(
        ((maxValue - min) / (max - min)) * 100
    );

    useEffect(() => {
        if (value) {
            setMinValue(value.min);
            setMaxValue(value.max);
        }
    }, [value]);

    const handleMinChange = (e) => {
        const inputValue = parseFromRubles(e.target.value);
        if (inputValue >= min && inputValue <= maxValue - step) {
            setMinValue(inputValue);
            onChange({ min: inputValue, max: maxValue });
            const newMinPos = ((inputValue - min) / (max - min)) * 100;
            setMinPos(newMinPos); // Добавьте это состояние и обновите положение
        } else if (e.target.value === '') {
            setMinValue(0);
            onChange({ min: 0, max: maxValue });
            setMinPos(0); // Сбросите положение
        }
    };

    const handleMaxChange = (e) => {
        const inputValue = parseFromRubles(e.target.value);
        if (inputValue >= minValue + step && inputValue <= max) {
            setMaxValue(inputValue);
            onChange({ min: minValue, max: inputValue });
            const newMaxPos = ((inputValue - min) / (max - min)) * 100;
            setMaxPos(newMaxPos); // Добавьте это состояние и обновите положение
        } else if (e.target.value === '') {
            setMaxValue(minValue + step);
            onChange({ min: minValue, max: minValue + step });
            setMaxPos(100); // Сбросите положение
        }
    };

    const handleMinInputBlur = () => {
        setIsMinInputClicked(false);
        if (minValue < min) {
            setMinValue(min);
        }
        const formattedValue = formatToRubles(minValue);
        setMinValue(formattedValue);
        onChange({ min: minValue, max: maxValue });
    };

    const handleMaxInputBlur = () => {
        setIsMaxInputClicked(false);
        if (maxValue > max) {
            setMaxValue(max);
        }
        const formattedValue = formatToRubles(maxValue);
        setMaxValue(formattedValue);
        onChange({ min: minValue, max: maxValue });
    };

    // const minPos = ((minValue - min) / (max - min)) * 100;
    // const maxPos = ((maxValue - min) / (max - min)) * 100;

    return (
        <div className='wrapper'>
            <div className='input-wrapper'>
                <input
                    className='input'
                    type='range'
                    value={minValue}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleMinChange}
                    {...dataAttr}
                />
                <input
                    className='input'
                    type='range'
                    value={maxValue}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleMaxChange}
                    {...dataAttr}
                />
                <div
                    className='tooltip'
                    style={{ left: `${(minValue / max) * 100 - 9}%` }}
                >
                    <input
                        type='text'
                        value={
                            isMinInputClicked
                                ? minValue
                                : formatToRubles(minValue)
                        }
                        onChange={handleMinChange}
                        onBlur={handleMinInputBlur}
                        onFocus={() => setIsMinInputClicked(true)}
                    />
                </div>
                <div
                    className='tooltip'
                    style={{ left: `${(maxValue / max) * 100 + 10}%` }}
                >
                    <input
                        type='text'
                        value={
                            isMaxInputClicked
                                ? maxValue
                                : formatToRubles(maxValue)
                        }
                        onChange={handleMaxChange}
                        onBlur={handleMaxInputBlur}
                        onFocus={() => setIsMaxInputClicked(true)}
                    />
                </div>
            </div>

            <div className='control-wrapper'>
                <div className='control' style={{ left: `${minPos}%` }} />
                <div className='rail'>
                    <div
                        className='inner-rail'
                        style={{
                            left: `${minPos}%`,
                            right: `${100 - maxPos}%`,
                        }}
                    />
                </div>
                <div className='control' style={{ left: `${maxPos}%` }} />
            </div>
        </div>
    );
};

export default RangeSlider;
