const getTime = (date) => {
    let time = date.split('T')[1].slice(0,5);
    //2020-08-19,18:10:00 -> 18:10:00 -> 18:10

    return time
}

const getDayOfYear = (date) => {
    let day = date.split('T')[0].split('-');
    //2020-08-19,18:10:00 -> 2020-08-19 -> [2020,08,19]

    const months = [
        'янв.', 'февр.', 'мар.', 
        'апр.', 'май', 'июнь', 
        'июль', 'авг.', 'сент.',
        'окт.', 'нояб.', 'дек.'];

    let formatedDay = `${day[2]} ${months[parseInt(day[1]) - 1] }`
    
    return formatedDay
}

const getDayOfWeek = (date) => {
    let day = date.split('T')[0];
    //2020-08-19,18:10:00 -> 18:10:00 -> 18:10
    const dayOfWeek = new Date(day).getDay();
    debugger
    return isNaN(dayOfWeek) ? null : 
    ['вс.', 'пн.', 'вт.', 
    'ср.', 'чт.', 'пт.', 'сб.'][dayOfWeek];  
}

export {getDayOfYear, getTime, getDayOfWeek}