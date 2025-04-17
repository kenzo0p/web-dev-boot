import React, { useState, useEffect, useRef } from 'react';
import style from "./Timer.module.css";

const Timer = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef(null);
  const progressRef = useRef(null);

  // Format the time for display
  const getFormattedTime = () => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  };

  // Timer countdown effect
  useEffect(() => {
    let timerInterval;
    
    if (isRunning && timeInSeconds > 0) {
      timerInterval = setInterval(() => {
        setTimeInSeconds(prev => prev - 1);
      }, 1000);
    } else if (timeInSeconds === 0) {
      setIsRunning(false);
    }
    
    return () => clearInterval(timerInterval);
  }, [isRunning, timeInSeconds]);

  // Update progress bar
  useEffect(() => {
    if (progressRef.current) {
      const initialTime = parseInt(progressRef.current.dataset.initialTime) || timeInSeconds;
      const progress = initialTime > 0 ? (timeInSeconds / initialTime) * 100 : 0;
      
      // Try both methods to set the CSS variable
      try {
        // Method 1: Set on document.documentElement (global)
        document.documentElement.style.setProperty('--progress', `${progress}%`);
        
        // Method 2: Set directly on the element (local)
        progressRef.current.style.setProperty('--progress', `${progress}%`);
      } catch (e) {
        console.error("Error setting progress:", e);
      }
    }
  }, [timeInSeconds]);

  // Focus input when editing field changes
  useEffect(() => {
    if (editField && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editField]);

  // Handle clicking on a time unit to edit it
  const handleEditClick = (field) => {
    if (isRunning) {
      setIsRunning(false);
    }
    
    const currentValue = getFormattedTime()[field].replace(/^0+/, '') || '';
    setEditField(field);
    setEditValue(currentValue);
  };

  // Handle saving edited value
  const handleSaveEdit = () => {
    if (!editField) return;
    
    // Get the numeric value (default to 0 if empty)
    const value = parseInt(editValue, 10) || 0;
    
    // Apply appropriate limits based on field type
    const limitedValue = Math.min(
      editField === 'hours' ? 99 : 59, 
      Math.max(0, value)
    );
    
    // Calculate the new total time in seconds
    const { hours, minutes, seconds } = getFormattedTime();
    let newTotalSeconds;
    
    switch (editField) {
      case 'hours':
        newTotalSeconds = (limitedValue * 3600) + 
                         (parseInt(minutes, 10) * 60) + 
                         parseInt(seconds, 10);
        break;
      case 'minutes':
        newTotalSeconds = (parseInt(hours, 10) * 3600) + 
                         (limitedValue * 60) + 
                         parseInt(seconds, 10);
        break;
      case 'seconds':
        newTotalSeconds = (parseInt(hours, 10) * 3600) + 
                         (parseInt(minutes, 10) * 60) + 
                         limitedValue;
        break;
      default:
        newTotalSeconds = timeInSeconds;
    }
    
    // Update the initial time for progress calculation
    if (progressRef.current) {
      progressRef.current.dataset.initialTime = newTotalSeconds.toString();
    }
    
    // Update state
    setTimeInSeconds(newTotalSeconds);
    setEditField(null);
    setEditValue('');
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setEditValue(value);
  };

  // Handle key press in input field
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditField(null);
      setEditValue('');
    }
  };

  // Reset timer
  const handleReset = () => {
    setTimeInSeconds(0);
    setIsRunning(false);
    setEditField(null);
    setEditValue('');
    
    if (progressRef.current) {
      progressRef.current.dataset.initialTime = '0';
    }
  };

  // Start/Pause timer
  const handleToggleTimer = () => {
    if (timeInSeconds > 0) {
      setIsRunning(!isRunning);
    }
  };

  const { hours, minutes, seconds } = getFormattedTime();

  return (
    <div className={style.timerApp}>
      <div className={style.timerDisplay}>
        <div 
          className={style.timerCircle} 
          ref={progressRef}
          data-initial-time={timeInSeconds.toString()}
        >
          <div className={style.timerTime}>
            {editField === 'hours' ? (
              <input
                ref={inputRef}
                className={style.timeInput}
                type="text" 
                value={editValue}
                onChange={handleInputChange}
                onBlur={handleSaveEdit}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <span 
                className={style.timeUnit} 
                onClick={() => handleEditClick('hours')}
              >
                {hours}
              </span>
            )}
            :
            {editField === 'minutes' ? (
              <input
                ref={inputRef}
                className={style.timeInput}
                type="text"
                value={editValue}
                onChange={handleInputChange}
                onBlur={handleSaveEdit}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <span 
                className={style.timeUnit} 
                onClick={() => handleEditClick('minutes')}
              >
                {minutes}
              </span>
            )}
            :
            {editField === 'seconds' ? (
              <input
                ref={inputRef}
                className={style.timeInput}
                type="text"
                value={editValue}
                onChange={handleInputChange}
                onBlur={handleSaveEdit}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <span 
                className={style.timeUnit} 
                onClick={() => handleEditClick('seconds')}
              >
                {seconds}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={style.actionButtons}>
        <button
          className={style.actionButton}
          onClick={handleToggleTimer}
          disabled={timeInSeconds === 0}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          className={style.actionButton}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;