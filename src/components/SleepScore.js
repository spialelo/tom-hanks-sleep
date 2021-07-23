import React from 'react';
import useForm from '../hooks/useForm';
import scoreCalculator from '../helpers/utils';


const SleepScore = () => {
    
    
   const { data, sleepScore, isDisable, isLoading, handleChange, handleSubmit } = useForm(callback, scoreCalculator);
//   let hoursInADay = 24;
   let minInHour = 60;
   let thirtyIncrem = 720;
   
   let options = [<option value="" key="default">Select length of time</option>];
   for(let i = 0; i <= thirtyIncrem; i+=30 ) {
       options.push(<option value={`${i}`} key={`${i}-min`}>{`${i} minutes = ${i/minInHour} hour(s)`}</option>);
    }

   
   function callback() {
        console.log(data);
  }
    
    
    return(
        <div className="ss-container">
            <form onSubmit={handleSubmit} noValidate>
                <h2>Sleep Score</h2>
                <label htmlFor="durationInBed">
                    Duration in bed:
                    <select value={data.durationInBed || ''} data-testid="duration-bed" name="durationInBed" onChange={handleChange} required>
                        {options}
                    </select>
                </label>
            
                <label htmlFor="durationAsleep">
                    Duration asleep:
                    <select value={data.durationAsleep || ''} data-testid="duration-asleep" name="durationAsleep" onChange={handleChange} required>
                        {options}
                    </select>
                </label>
                <input type="submit" value="Calculate" data-testid="calculate"  disabled={isDisable} />
                
                <div className="text-display" data-testid="text-display">
                    { isLoading ? 
                    <>Loading...</> : 
                    (sleepScore && sleepScore.score) ?
                    <p>Your sleep score is: <br/> {JSON.stringify(sleepScore.score)} </p>
                    :
                    ''
                    }
                </div>
                
            </form>
            
        </div>
        )
    
};

export default SleepScore;
