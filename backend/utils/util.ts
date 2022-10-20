export const sleep = (time) => {    
    const startTime = new Date().getTime() + parseInt(time, 10)  
    while(new Date().getTime() < startTime) {}
}