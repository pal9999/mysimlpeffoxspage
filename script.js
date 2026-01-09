document.addEventListener('DOMContentLoaded', async function() {
    const searchInput = document.getElementById('search-input');
    
    // Фокус
    searchInput.focus();
    
    // Пошук Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = encodeURIComponent(this.value);
            window.open(`https://duckduckgo.com/?ia=web&origin=funnel_home_website&t=h_&kc=-1&kk=-1&kl=wt-wt&kn=1&kp=-2&kt=u&kz=-1&kae=d&kah=ua-uk&kaj=m&kak=-1&kao=-1&kap=-1&kaq=-1&kat=-1&kau=-1&kax=-1&kay=i&kbe=0&kbg=-1&q=${query}`, '_self');
        }
    });
    
    // Погода одразу
    await updateWeather();
});

// Функція погоди (зовні)
async function updateWeather() {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=48.525&longitude=25.0371&hourly=temperature_2m&timezone=auto&forecast_days=1');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        const now = new Date();
        const hourIndex = Math.floor(now.getHours());
        const temp = Math.round(data.hourly.temperature_2m[hourIndex]);

        document.getElementById('weather-temp').textContent = `${temp}°C`;
    } catch (error) {
        console.error('Погода:', error);
        document.getElementById('weather-temp').textContent = '?';
    }
}

setInterval(updateWeather, 3600000);
