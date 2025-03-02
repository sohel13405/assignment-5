const completeButtons= document.querySelectorAll(".complete-btn");
for(let i = 0; i < completeButtons.length; i++){
    const completeBtn= completeButtons[i];
    completeBtn.addEventListener("click", function(event){
        completeBtn.setAttribute("disabled", true);
        alert("Board Updated Successful...");
        const completeTask= completeBtn.getAttribute("disabled") === "true" ? 1 : 0;
        const CurrentTask= parseInt(document.getElementById("task-assigned").innerText);
        const TotalCompleteJob = parseInt(document.getElementById("total-complete-job").innerText);
        const remainingTask= CurrentTask - completeTask;
        if(remainingTask === 0){
            alert("Congrats!! You have completed all the current task");
        }
        document.getElementById("task-assigned").innerText= remainingTask;
        const numOfCompleteJob= TotalCompleteJob + completeTask;
        document.getElementById("total-complete-job").innerText= numOfCompleteJob;

        const taskTitle= document.querySelectorAll(".task-title")[i].innerText;

        const taskLog= document.getElementById("task-log");
        const div= document.createElement("div");
        div.innerHTML= `
            <div class="bg-[#F4F7FF] p-4 text-justify rounded-lg space-y-3 logs">
                <p>You have Completed the ${taskTitle} at ${timeFormat(new Date())}</p>      
            </div>
        `
        taskLog.appendChild(div);
    });
}
document.getElementById("clear-logs").addEventListener("click", function(event){
    const logs= document.getElementsByClassName("logs");
    for(let i= 0; i < logs.length; i++){
        const log= logs[i];
        log.classList.add("hidden");
    }

});

const date= document.getElementById("date");
const p= document.createElement("p");
p.innerHTML= `
    ${formatDate(new Date())}
`
date.appendChild(p);
let previousTheme= 0;
document.getElementById("theme-controller").addEventListener("click", function(event){

    event.preventDefault();
    const colors =({
        "regular" : "bg-[#F4F7FF]",
        "green": "bg-green-200",
        "red": "bg-red-200",
        "purple": "bg-purple-200",
        "orange" : "bg-orange-200",
        "amber" : "bg-amber-200",
        "yellow" : "bg-yellow-200",
        "sky" : "bg-sky-200",
    })
    const keys= Object.keys(colors);
    let randIndex, randKey, randValue;
    for(let i= 0; i < 100000; i++){
        randIndex= Math.floor(Math.random()*keys.length);
        randKey= keys[randIndex];
        randValue= colors[randKey];
        if(randValue !== previousTheme){
            break;
        }
    }
    document.getElementById("body").classList.remove(...Object.values(colors));
    document.getElementById("body").classList.add(randValue);
    previousTheme= randValue;
})

function timeFormat(time){
    let hours= time.getHours();
    let minutes= time.getMinutes();
    let seconds= time.getSeconds();

    let period= hours >= 12 ? "PM" : "AM";

    let hoursConvert= hours % 12;
    hours= hoursConvert === 0 ? 12 : hoursConvert;
    hours= hours < 10 ? "0"+hours : hours;
    minutes= minutes < 10 ? "0"+ minutes : minutes;
    seconds= seconds < 10 ? "0"+ seconds : seconds;

    return `${hours}: ${minutes}: ${seconds} ${period}`;
}

function formatDate(date){
    
    const week= ["Sun", "Mon", "Tue", "Wes", "Thu", "Fri", "Sat"];
    const months= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day= week[date.getDay()];
    const month= months[date.getMonth()];
    let dated= date.getDate();
    const year= date.getFullYear();
    if(dated < 10){
        dated= "0"+dated;
    } else{
        dated;
    }

    return `${day}, <strong>${month} ${dated} ${year}</strong>`;
}

