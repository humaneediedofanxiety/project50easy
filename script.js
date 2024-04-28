// Time for the Functionality
let taskItems = document.querySelectorAll("li");
let count = document.getElementsByClassName('count')[0];
let sleep = document.getElementById('sleep');

let countIndex = localStorage.getItem('countIn')
count.innerHTML = countIndex;
if (countIndex === null) {
    count.innerHTML = '0'
}

if (countIndex <= 7) {
    sleep.innerHTML = 'To Sleep Before 3:00 AM'
} else if (countIndex <= 14) {
    sleep.innerHTML = 'To Sleep Before 2:30 AM'
} else if (countIndex <= 21) {
    sleep.innerHTML = 'To Sleep Before 2:00 AM'
} else if (countIndex <= 28) {
    sleep.innerHTML = 'To Sleep Before 1:00 AM'
} else if (countIndex >= 28) {
    sleep.innerHTML = 'To Sleep Before 12:00 AM'
}

for (let i = 0; i < taskItems.length; i++) {
    let task = taskItems[i].getAttribute('key')
    console.log(task);
    if (task === localStorage.getItem(`key${i}`)) {
        // taskItems[i].setAttribute('id', `${i}`)
        taskItems[i].classList.add('done');
    }
}

for (let i = 0; i < taskItems.length; i++) {
    taskItems[i].addEventListener('click', () => {
        taskItems[i].classList.add('done')
        // taskItems[i].setAttribute('id', `${i}`)
        localStorage.setItem(`key${i}`,taskItems[i].getAttribute('key'))
    })
    taskItems[i].addEventListener('dblclick', (event) => {
            taskItems[i].classList.remove('done');
            localStorage.removeItem(`key${i}`)
        
    })
}

let currentDate = new Date();
let currentHour = currentDate.getHours();
let currentMin = currentDate.getMinutes();

currentHour = currentHour < 10 ? "0" + currentHour : currentHour;
currentMin = currentMin < 10 ? "0" + currentMin : currentMin;
currentT = currentHour + currentMin;
     
function attrCheck() {
    for (let i = 0; i < taskItems.length; i++){ 
    if (taskItems[i].classList.contains('done') === false) {
        return false;
    }

    }
    return true;
}

let checkTrue = attrCheck();

function runOnceDaily() {
  // Get today's date in the format 'YYYY-MM-DD'
  const today = new Date().toISOString().slice(0, 10);

  // Check if the date key exists in localStorage
    if (!localStorage.getItem('lastRunDate') || localStorage.getItem('lastRunDate') !== today) {
      
    if (checkTrue === true) {
    localStorage.clear();
    countIndex++
    count.innerHTML = countIndex;
    localStorage.setItem('countIn', countIndex);
    console.log("gg you passed another day")
    } else {
        localStorage.clear()
        alert('gg you failed :)))')
    }

    localStorage.setItem('lastRunDate', today);
  } else {
    console.log('Day Updated Once Already');
  }
}

if (currentT > '0000') {
    runOnceDaily();
}
