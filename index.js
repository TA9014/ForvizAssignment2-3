const bookingData = [
    {
        "id": 1,
        "roomId": "A101",
        "startTime": "2021-01-19 13:00:00",
        "endTime": "2021-01-19 14:00:00",
        "title": "Lunch with Petr"
    },
    {
        "id": 2,
        "roomId": "A101",
        "startTime": "2021-01-19 14:00:00",
        "endTime": "2021-01-19 15:00:00",
        "title": "Sales Weekly Meeting"
    },
    {
        "id": 3,
        "roomId": "A101",
        "startTime": "2021-01-19 16:00:00",
        "endTime": "2021-01-19 18:00:00",
        "title": "Anastasia Website Warroom"
    },
    {
        "id": 4,
        "roomId": "A101",
        "startTime": "2021-01-20 13:00:00",
        "endTime": "2021-01-20 14:00:00",
        "title": "One-on-One Session"
    },
    {
        "id": 5,
        "roomId": "A101",
        "startTime": "2021-01-20 16:00:00",
        "endTime": "2021-01-20 18:00:00",
        "title": "UGC Sprint Planning"
    },
    {
        "id": 6,
        "roomId": "A102",
        "startTime": "2021-01-22 09:00:00",
        "endTime": "2021-01-26 18:00:00",
        "title": "5-Day Design Sprint Workshop"
    },
    {
        "id": 7,
        "roomId": "Auditorium",
        "startTime": "2021-01-17 09:00:00",
        "endTime": "2021-01-18 19:00:00",
        "title": "Thai Tech Innovation 2021"
    },
    {
        "id": 8,
        "roomId": "A101",
        "startTime": "2021-01-19 10:00:00",
        "endTime": "2021-01-19 13:00:00",
        "title": "Raimonland project"
    },
    {
        "id": 9,
        "roomId": "A102",
        "startTime": "2021-01-30 18:00:00",
        "endTime": "2021-01-30 20:00:00",
        "title": "Management Meetinng"
    },
    {
        "id": 10,
        "roomId": "A101",
        "startTime": "2021-02-04 14:00:00",
        "endTime": "2021-02-06 11:00:00",
        "title": "3-day workshop Corgi costume"
    }
]

let roomId = "A101"
let startTime = ""
let endTime = ""
let startTimeMs;
let endTimeMs;
let availability = 'AAA'

//get current time
const currentDateTime = new Date().toLocaleString();
const currentDate = new Date().toLocaleDateString();
const currentDay = new Date().getDay();




//get value from input and store in a variable
const roomIdHandler = () => {
    roomId = document.getElementById('room-id').value;
}

const startTimeHandler = () => {
    startTime = document.getElementById('start-time').value;
    startTimeMs = Date.parse(startTime);
}

const endTimeHandler = () => {
    endTime = document.getElementById('end-time').value;
    endTimeMs = Date.parse(endTime)
}

//Check Availability
const checkAvailablity = () => {
    if (!roomId || !startTimeMs || !endTimeMs) {
        alert('Please enter a valid value')
    } else {
        availability = 'Available'
        const filteredArray = bookingData.filter((room) => room.roomId === roomId)

        filteredArray.forEach((data) => {
            if (startTimeMs > Date.parse(data.startTime) && startTimeMs < Date.parse(data.endTime)) {
                return availability = 'Unavailable'
            } else if (endTimeMs > Date.parse(data.endTime) && endTimeMs < Date.parse(data.endTime)) {
                return availability = 'Unavailable'
            } else if (endTimeMs - startTimeMs > Date.parse(data.startTime) - startTimeMs && Date.parse(data.startTime) - startTimeMs > 0) {
                return availability = 'Unavailable'
            }
        })
        document.getElementById('check-status').innerHTML = availability
    }
}

// Filter to get array with specific room
const a101Filter = bookingData.filter((data) => data.roomId === "A101");
const a102Filter = bookingData.filter((data) => data.roomId === "A102");
const auditoriumFilter = bookingData.filter((data) => data.roomId === "Auditorium");

//sort data
let a101Sort = a101Filter.sort(function (a, b) {
    let aTime = Date.parse(a.startTime);
    let bTime = Date.parse(b.startTime);
    if (aTime < bTime) {
        return -1;
    }
    if (aTime > bTime) {
        return 1;
    }
    return 0
})

let a102Sort = a102Filter.sort(function (a, b) {
    let aTime = Date.parse(a.startTime);
    let bTime = Date.parse(b.startTime);
    if (aTime < bTime) {
        return -1;
    }
    if (aTime > bTime) {
        return 1;
    }
    return 0
})

let auditoriumSort = auditoriumFilter.sort(function (a, b) {
    let aTime = Date.parse(a.startTime);
    let bTime = Date.parse(b.startTime);
    if (aTime < bTime) {
        return -1;
    }
    if (aTime > bTime) {
        return 1;
    }
    return 0
})

let sortBookingData = bookingData.sort(function (a, b) {
    let aTime = Date.parse(a.startTime);
    let bTime = Date.parse(b.startTime);
    if (aTime < bTime) {
        return -1;
    }
    if (aTime > bTime) {
        return 1;
    }
    return 0
})

//get next event to deal with upcoming event
const nextA101 = a101Sort.filter((time) => Date.parse(time.startTime) > Date.parse(currentDateTime))
const nextA102 = a102Sort.filter((time) => Date.parse(time.startTime) > Date.parse(currentDateTime))
const nextAuditorium = auditoriumSort.filter((time) => Date.parse(time.startTime) > Date.parse(currentDateTime))

// upcoming Meeting
if (nextA101.length > 0) {
    document.getElementById('roomId-a101-heading').innerHTML = nextA101[0].roomId
    document.getElementById('a101-start-time').innerHTML = nextA101[0].startTime
    document.getElementById('a101-end-time').innerHTML = nextA101[0].endTime
    document.getElementById('a101-title').innerHTML = nextA101[0].title
} else {
    document.getElementById('roomId-a101-heading').innerHTML = 'A101'
    document.getElementById('a101-start-time').innerHTML = 'N/A'
    document.getElementById('a101-end-time').innerHTML = 'N/A'
    document.getElementById('a101-title').innerHTML = 'N/A'
}

if (nextA102.length > 0) {
    document.getElementById('roomId-a102-heading').innerHTML = nextA102[0].roomId
    document.getElementById('a102-start-time').innerHTML = nextA102[0].startTime
    document.getElementById('a102-end-time').innerHTML = nextA102[0].endTime
    document.getElementById('a102-title').innerHTML = nextA102[0].title
} else {
    document.getElementById('roomId-a102-heading').innerHTML = 'A102'
    document.getElementById('a102-start-time').innerHTML = 'N/A'
    document.getElementById('a102-end-time').innerHTML = 'N/A'
    document.getElementById('a102-title').innerHTML = 'N/A'
}

if (nextAuditorium.length > 0) {
    document.getElementById('roomId-auditorium-heading').innerHTML = nextAuditorium[0].roomId
    document.getElementById('auditorium-start-time').innerHTML = nextAuditorium[0].startTime
    document.getElementById('auditorium-end-time').innerHTML = nextAuditorium[0].endTime
    document.getElementById('auditorium-title').innerHTML = nextAuditorium[0].title
} else {
    document.getElementById('roomId-auditorium-heading').innerHTML = 'Auditorium'
    document.getElementById('auditorium-start-time').innerHTML = 'N/A'
    document.getElementById('auditorium-end-time').innerHTML = 'N/A'
    document.getElementById('auditorium-title').innerHTML = 'N/A'
}

const todayBooking = sortBookingData.filter((data) => Date.parse(data.startTime) > Date.parse(currentDate)
    && Date.parse(data.startTime) < Date.parse(currentDate) + 86400000)

const thisWeekBooking = sortBookingData.filter((data) => Date.parse(data.startTime) > (Date.parse(currentDate) - (currentDay * 86400000))
    && Date.parse(data.startTime) < (Date.parse(currentDate) + ((7 - currentDay) * 86400000)))

const nextWeekBooking = sortBookingData.filter((data) => Date.parse(data.startTime) > (Date.parse(currentDate) + ((7 - currentDay) * 86400000))
    && Date.parse(data.startTime) < (Date.parse(currentDate) + ((7 - currentDay) * 86400000) + (7 * 86400000)))

if (todayBooking.length > 0) {
    document.getElementById('today-event').innerHTML = todayBooking.map((data) =>
        `<div class="event-card">
            <div class="title-container">
                <h3 class="title-h3">Room Id: </h3>
                <p class="event-detail">Start:</p>
                <p class="event-detail">End:</p>
                <p class="event-detail">Title:</p>
            </div>
            <div class="event-value-container">
                <h3 class="title-h3">${data.roomId}</h3>
                <p class="event-detail">${data.startTime}</p>
                <p class="event-detail">${data.endTime}</p>
                <p class="event-detail">${data.title}</p>
            </div>
        </div>
        `
    ).join('')
} else {
    document.getElementById('today-event').innerHTML = 'N/A'
}

if (thisWeekBooking.length > 0) {
    document.getElementById('this-week-event').innerHTML = thisWeekBooking.map((data) =>
        `<div class="event-card">
            <div class="title-container">
                <h3 class="title-h3">Room Id: </h3>
                <p class="event-detail">Start:</p>
                <p class="event-detail">End:</p>
                <p class="event-detail">Title:</p>
            </div>
            <div class="event-value-container">
                <h3 class="title-h3">${data.roomId}</h3>
                <p class="event-detail">${data.startTime}</p>
                <p class="event-detail">${data.endTime}</p>
                <p class="event-detail">${data.title}</p>
            </div>
        </div>
        `
    ).join('')
} else {
    document.getElementById('today-event').innerHTML = 'N/A'
}

if (nextWeekBooking.length > 0) {
    document.getElementById('next-week-event').innerHTML = nextWeekBooking.map((data) =>
        `<div class="event-card">
            <div class="title-container">
                <h3 class="title-h3">Room Id: </h3>
                <p class="event-detail">Start:</p>
                <p class="event-detail">End:</p>
                <p class="event-detail">Title:</p>
            </div>
            <div class="event-value-container">
                <h3 class="title-h3">${data.roomId}</h3>
                <p class="event-detail">${data.startTime}</p>
                <p class="event-detail">${data.endTime}</p>
                <p class="event-detail">${data.title}</p>
            </div>
        </div>
        `
    ).join('')
} else {
    document.getElementById('today-event').innerHTML = 'N/A'
}
