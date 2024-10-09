let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 1000);
        isRunning = true;
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function saveAndReset() {
    const taskTitle = document.getElementById("taskTitle").value;
    const timerValue = document.getElementById("timer").textContent;

    if (taskTitle.trim() !== "") {
        // Setzt den Text im TextElement (falls benötigt)
        //document.getElementById("textElement").textContent = `Gespeicherte Aufgabe: ${taskTitle}, Zeit: ${timerValue}`;
    
        // Timer zurücksetzen
        clearInterval(timer);
        elapsedTime = 0;
        isRunning = false;
    
        // Setze einen Cookie mit dynamischem Namen (basierend auf aktueller Zeit)
        var cookieLenght = document.cookie.split("; ").length + 1;

        const cookieName = `${cookieLenght}: ${taskTitle}`;
        //alert(cookieLenght)
        document.cookie = `${cookieName}=${timerValue}; path=/;`;
        //alert("Cookie gesetzt: " + cookieName + "=" + timerValue);
    
        // Timer-Text zurücksetzen
        document.getElementById("timer").textContent = "00:00:00";
    
        // Lösche das Eingabefeld nach dem Speichern
        document.getElementById("taskTitle").value = "";
    
        showCookies();
}
}


function showCookies() {
    // Holt alle Cookies als String im Format "key1=value1; key2=value2"
    const cookies = document.cookie;

    // Teile den Cookie-String in ein Array auf, basierend auf "; "
    const cookieArray = cookies.split("; ");

    // Erstelle eine HTML-Liste der Cookies
    let cookieList = "<ul>";
    cookieArray.forEach(cookie => {
        cookieList += `<li>${cookie}</li>`;
    });
    cookieList += "</ul>";

    // Zeige die Liste der Cookies im Div 'cookieDisplay' an
    document.getElementById("cookieDisplay").innerHTML = cookieList;
}
showCookies()

function updateTime() {
    const now = Date.now();
    const diff = now - startTime;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    document.getElementById("timer").textContent = 
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
    return String(unit).padStart(2, "0");
}

function getDateString() {
    const now = new Date();
    
    // Formatieren des Datums: Tag.Monat.Jahr
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Januar ist 0!
    const year = now.getFullYear();
    
    // Formatieren der Uhrzeit: Stunden:Minuten:Sekunden
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Zusammenfügen von Datum und Uhrzeit
    return `D: ${day}.${month}.${year} T: ${hours}:${minutes}:${seconds}`;
}


function clearCookies() {
    const taskTitle = document.getElementById("taskTitle").value;

    if (taskTitle == "_&_") {
        const cookies = document.cookie.split("; ");
        document.getElementById("taskTitle").value = "";


        // Setze für jeden Cookie ein Ablaufdatum in der Vergangenheit, um ihn zu löschen
        cookies.forEach(cookie => {
            const cookieName = cookie.split("=")[0];
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
    
        // Aktualisiere die Cookie-Anzeige
        showCookies();
    }


}
