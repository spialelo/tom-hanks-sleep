export default function scoreCalculator(data) {

    let sleepScore = {};
    let ONE_HUNDRED = 100;
    
    sleepScore['score'] = Math.round( ONE_HUNDRED * data.durationAsleep / data.durationInBed);

    return sleepScore;
}