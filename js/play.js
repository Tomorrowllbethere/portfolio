// ==========================================
// БЛОК 1. Завдання 1: Динамічний розмір шрифту
// ==========================================
function displayTextWithStyle(text, fontSize) {
    const outputDiv = document.getElementById('output-1-1');
    outputDiv.innerHTML = text; // Вставляємо текст
    outputDiv.style.fontSize = fontSize + 'px'; // Використовуємо style.fontSize
}

document.getElementById('btn-generate-text').addEventListener('click', function() {
    const text = document.getElementById('text-input').value;
    const size = document.getElementById('size-input').value;
    displayTextWithStyle(text, size);
});

// ==========================================
// БЛОК 1. Завдання 2: Картинка, що з'являється у новому місці
// ==========================================
const jumpingImg = document.getElementById('jumping-img');
const jumpContainer = document.getElementById('jump-container');

setInterval(() => {
    // розміри контейнера
    const maxX = jumpContainer.clientWidth - jumpingImg.clientWidth;
    const maxY = jumpContainer.clientHeight - jumpingImg.clientHeight;

    // випадкові координати
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

  
    jumpingImg.style.left = randomX + 'px';
    jumpingImg.style.top = randomY + 'px';
}, 1000); 

// ==========================================
// БЛОК 1. Завдання 3: Знайти всі <p> і змінити розмір через setAttribute + Скидання
// ==========================================
const btnChangeP = document.getElementById('btn-change-p');
const btnResetP = document.getElementById('btn-reset-p');

btnChangeP.addEventListener('click', function() {
    // Шукаємо всі абзаци на сторінці
    const paragraphs = document.getElementsByTagName('p');
    
    for (let i = 0; i < paragraphs.length; i++) {
        let currentStyle = paragraphs[i].getAttribute('style') || '';
        
        // Додаємо стиль, перевіряючи, чи ми його ще не додали (щоб не дублювати)
        if (!currentStyle.includes('font-size: 15px;')) {
            paragraphs[i].setAttribute('style', currentStyle + ' font-size: 15px;');
        }
    }
    
    // Перемикаємо кнопки
    btnChangeP.style.display = 'none';
    btnResetP.style.display = 'inline-block';
});

btnResetP.addEventListener('click', function() {
    const paragraphs = document.getElementsByTagName('p');
    
    for (let i = 0; i < paragraphs.length; i++) {
        let currentStyle = paragraphs[i].getAttribute('style') || '';
        
        
        let newStyle = currentStyle.replace('font-size: 15px;', '').trim();
        paragraphs[i].setAttribute('style', newStyle);
    }
    

    btnResetP.style.display = 'none';
    btnChangeP.style.display = 'inline-block';
});

// ==========================================
// БЛОК 1. Завдання 4: Текстовий годинник
// ==========================================
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    // Форматуємо час до вигляду ГГ:ХХ:СС
    clockElement.innerText = now.toLocaleTimeString('uk-UA');
}
setInterval(updateClock, 1000); // Оновлюємо годинник кожну секунду
updateClock(); 

// ==========================================
// БЛОК 1. Завдання 5: Ефект поступового витирання (Таймер) + Відновлення
// ==========================================
let fadeTimer;
const fadeBox = document.getElementById('fade-box');
const btnFade = document.getElementById('btn-fade');
const btnResetFade = document.getElementById('btn-reset-fade');

btnFade.addEventListener('click', function() {
    let opacity = parseFloat(fadeBox.style.opacity);
    if (isNaN(opacity)) opacity = 1.0;

    clearInterval(fadeTimer);

    btnFade.disabled = true;

    fadeTimer = setInterval(function() {
        if (opacity <= 0) {
            clearInterval(fadeTimer);
            fadeBox.style.display = 'none'; 
            
            btnFade.style.display = 'none';
            btnResetFade.style.display = 'inline-block';
            

            btnFade.disabled = false;
        } else {
            opacity -= 0.05;
            fadeBox.style.opacity = opacity;
        }
    }, 50);
});

btnResetFade.addEventListener('click', function() {
    clearInterval(fadeTimer); 
    
    // Повертаємо блок
    fadeBox.style.display = 'block'; 
    fadeBox.style.opacity = 1.0;     
    
    // МАГІЯ КНОПОК: ховаємо "Відновити", показуємо "Стерти"
    btnResetFade.style.display = 'none';
    btnFade.style.display = 'inline-block';
});


// ==========================================
// БЛОК 2. Завдання 4: Координати миші та код клавіші
// ==========================================
const mouseCoordsElem = document.getElementById('mouse-coords');
const keyboardKeyElem = document.getElementById('keyboard-key');

// Відстежуємо рух миші по всьому документу
document.addEventListener('mousemove', function(event) {
    mouseCoordsElem.innerText = `X: ${event.clientX}, Y: ${event.clientY}`;
});

// Відстежуємо натискання клавіш
document.addEventListener('keydown', function(event) {
    keyboardKeyElem.innerText = `Код: ${event.keyCode} (Клавіша: ${event.key})`;
});

// ==========================================
// БЛОК 2. Завдання 5: Зміна розміру тексту кнопаками A+/A- і Cookie
// ==========================================
const btnPlus = document.getElementById('btn-text-plus');
const btnMinus = document.getElementById('btn-text-minus');
let currentFontSize = 16; // Стандартний розмір

// Функції для роботи з Cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Застосовуємо розмір до тегу body
function applyGlobalFontSize(size) {
    document.body.style.fontSize = size + 'px';
}

// Перевіряємо куки при завантаженні сторінки
window.addEventListener('load', function() {
    let savedSize = getCookie('userFontSize');
    if (savedSize) {
        currentFontSize = parseInt(savedSize);
        applyGlobalFontSize(currentFontSize);
    }
});

btnPlus.addEventListener('click', function() {
    currentFontSize += 2;
    applyGlobalFontSize(currentFontSize);
    setCookie('userFontSize', currentFontSize, 7);
});

btnMinus.addEventListener('click', function() {
    currentFontSize -= 2;
    applyGlobalFontSize(currentFontSize);
    setCookie('userFontSize', currentFontSize, 7);
});



// ==========================================
// БЛОК 2. Завдання 6: Розфарбувати букви фрази (Пов'язано з 1.1)
// ==========================================
document.getElementById('btn-color-text').addEventListener('click', function() {
    // поля вводу з першого завдання
    const inputElement = document.getElementById('text-input');
    
    // Беремо текст, або за замовчуванням
    let text = inputElement.value.trim();
    if (text === "") {
        text = "Введіть текст у першому завданні!";
    }

    const colors = ["#4e77ff", "#28a745", "#ffc107", "#dc3545", "#6f42c1"];
    let htmlResult = "";


    let colorCounter = 0;

    // Цикл по кожній букві
    for (let i = 0; i < text.length; i++) {
        
        if (text[i] === " ") {
            htmlResult += " ";
            continue;
        }
        
        let colorIndex = colorCounter % colors.length;
        htmlResult += `<span style="color: ${colors[colorIndex]}">${text[i]}</span>`;
        
        colorCounter++; // Збільшуємо лічильник тільки для літер
    }

    document.getElementById('colored-text-container').innerHTML = htmlResult;
});

// ==========================================
// БЛОК 2. Завдання 8: Скрипт календаря на HTML
// ==========================================
function generateCalendar(year, month) {
    const container = document.getElementById('calendar-container');
    let d = new Date(year, month);
    
    let monthNameUk = d.toLocaleString('uk-UA', { month: 'long' });
    let monthNameEn = d.toLocaleString('en-US', { month: 'long' });
    
    
    monthNameUk = monthNameUk.charAt(0).toUpperCase() + monthNameUk.slice(1);
    monthNameEn = monthNameEn.charAt(0).toUpperCase() + monthNameEn.slice(1);

    // Місяць та Рік
    let headerHTML = `<h4 style="text-align: center; margin-bottom: 15px; color: #444; font-size: 1.2rem;">
                        ${monthNameUk} / ${monthNameEn} ${year}
                      </h4>`;
    // ----------------------------------------------


    let table = '<table class="calendar-table">';
    table += '<tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Нд</th></tr><tr>';

    function getDay(date) { 
        let day = date.getDay();
        if (day == 0) day = 7;
        return day - 1;
    }

    for (let i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }

    while (d.getMonth() == month) {

        let today = new Date();
        let isToday = (d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear());
        
        if (isToday) {
            table += `<td style="background-color: #4e77ff; color: white; font-weight: bold; border-radius: 4px;">${d.getDate()}</td>`;
        } else {
            table += `<td>${d.getDate()}</td>`;
        }
        
        if (getDay(d) % 7 == 6) { 
            table += '</tr><tr>'; 
        }
        d.setDate(d.getDate() + 1); 
    }

    if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
            table += '<td></td>';
        }
    }

    table += '</tr></table>';
    
  
    container.innerHTML = headerHTML + table;
}

const today = new Date();
generateCalendar(today.getFullYear(), today.getMonth());