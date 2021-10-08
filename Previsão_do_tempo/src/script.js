const arrowUp = document.querySelector('.arrow-up');
let distancia = 60;
let idaVolta = 0

setInterval(function() {
  if (idaVolta == 0) {
    arrowUp.style.paddingTop = String(distancia+'px');
    if (distancia < 10) {
      distancia -= 4.7;
    } else if (distancia < 20) {
      distancia -= 4;
    } else if (distancia < 30) {
      distancia -= 3.2;
    } else if (distancia < 40) {
      distancia -= 2.6;
    } else if (distancia < 50) {
      distancia -= 2.2;
    } else {
      distancia -= 1.3;
    }
    if (distancia < 0) {
      idaVolta = 1
    }

  }
  if (idaVolta == 1) {
    arrowUp.style.paddingTop = String(distancia+'px');
    if (distancia < 10) {
      distancia += 4.7;
    } else if (distancia < 20) {
      distancia += 4;
    } else if (distancia < 30) {
      distancia += 3.2;
    } else if (distancia < 40) {
      distancia += 2.6;
    } else if (distancia < 50) {
      distancia += 2.3;
    } else {
      distancia += 1.6;
    }
    if (distancia > 60) {
      idaVolta = 0
    }
  }
}, 40);



let info
let por_sol_hora

// Entrada de dados
const input = document.querySelector('#search_city');
const button = document.querySelector('#search_btn');

// Nome da cidade
const city = document.querySelector('#city');

// Temperatura atual
const temperatura_atual = document.querySelector('#temperatura_atual');
const icon_temp_atual = document.querySelector('#icon_temp_atual');

// Caracteristicas
const sensacao_termica = document.querySelector('.sensacao_termica');
const umidade = document.querySelector('.umidade');
const vento = document.querySelector('.vento');
const pressao = document.querySelector('.pressao');
const nascer_sol = document.querySelector('.nascer_sol');
const por_sol = document.querySelector('.por_sol');

// Amanhã
const amanha_min = document.querySelector('#amanha_min');
const amanha_max = document.querySelector('#amanha_max');
const amanha_icons = document.querySelector('#amanha');

// Depois de amanhã
const depois_amanha_min = document.querySelector('#depois_amanha_min');
const depois_amanha_max = document.querySelector('#depois_amanha_max');
const depois_amanha_icons = document.querySelector('#depois_amanha');

// Dias da semana
let data_0;
let data_1;
let data_2;

let hoje = document.querySelector('#dia_0');
let amanha = document.querySelector('#dia_1');
let depois_amanha = document.querySelector('#dia_2');

// Primeiro acesso
let primeiroAcesso = 1

// Função principal
function funcaoPrincipal(e) {
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=786c98ec8460483cbe2133619212509&q=${input.value}&days=3&aqi=no&alerts=no&lang=pt`)
  .then(response =>{
      return response.json();
    })
    .then(data =>{
      info = data;
      console.log(data);

      // Mudar o main
      if (primeiroAcesso === 1) {
        document.querySelector('.titulo_1').remove();
        document.querySelector('main').style.display = 'flex';
        primeiroAcesso = 0
      }

      // Nome da cidade
      city.innerText = info.location.name + ' - ' + info.location.localtime

      // Temperatura atual
      temperatura_atual.children[1].innerText = info.current.temp_c + 'Cº';
      temperatura_atual.children[2].innerHTML = `<img src="${'https://'+info.current.condition.icon.slice(2)}">`;
      temperatura_atual.children[3].innerText = `Condição: ${info.current.condition.text}`;

      // Sensação térmica
      sensacao_termica.children[0].innerHTML = '<i class="fas fa-temperature-high"></i>';
      sensacao_termica.children[2].innerText = info.current.feelslike_c + 'Cº';

      // Umidade
      umidade.children[0].innerHTML = '<i class="fas fa-tint"></i>';
      umidade.children[2].innerText = info.current.humidity + '%';

      // Vento
      vento.children[0].innerHTML = '<i class="fas fa-wind"></i>';
      vento.children[2].innerText = info.current.wind_kph + 'Km/h';

      // Pressão
      pressao.children[0].innerHTML = '<i class="fab fa-cloudscale"></i>';
      pressao.children[2].innerText = info.current.pressure_mb + 'hPa';

      // Nascer do Sol
      nascer_sol.children[0].innerHTML = '<i class="far fa-sun"></i>';
      nascer_sol.children[2].innerText = info.forecast.forecastday[0].astro.sunrise.slice(0, -3);
      nascer_sol.children[2].innerText = nascer_sol.children[2].innerText.replace(":", "h");

      // Pôr do Sol
      por_sol.children[0].innerHTML = '<i class="fas fa-sun"></i>';
      por_sol_hora = parseInt(info.forecast.forecastday[0].astro.sunset.slice(0, 2)) + 12 + 'h';
      por_sol_hora += info.forecast.forecastday[0].astro.sunset.slice(3, -3);
      por_sol.children[2].innerText = por_sol_hora;

      //    //    //    //    //    //

      // Amanhã
      amanha_min.children[1].innerText = info.forecast.forecastday[1].day.mintemp_c + 'ºC';
      amanha_max.children[1].innerText = info.forecast.forecastday[1].day.maxtemp_c + 'ºC';
      amanha_icons.children[1].innerHTML = '<i class="fas fa-temperature-high"></i>';
      amanha_icons.children[3].innerHTML = '<i class="fas fa-temperature-low"></i>';

      // Depois de amanhã
      depois_amanha_min.children[1].innerText = info.forecast.forecastday[2].day.mintemp_c + 'ºC';
      depois_amanha_max.children[1].innerText = info.forecast.forecastday[2].day.maxtemp_c + 'ºC';
      depois_amanha_icons.children[1].innerHTML = '<i class="fas fa-temperature-high"></i>';
      depois_amanha_icons.children[3].innerHTML = '<i class="fas fa-temperature-low"></i>';

      //    //    //    //    //    //

      // Dias da semana //

      // Hoje
      data_0 = new Date(info.forecast.forecastday[0].date.slice(0, 4), info.forecast.forecastday[0].date.slice(5, 7)-1, info.forecast.forecastday[0].date.slice(8, 10));
      if (data_0.getDay() == '0') {hoje.innerText = 'Hoje - Domingo'}
      else if (data_0.getDay() == '1') {hoje.innerText = 'Hoje - Segunda feira'}
      else if (data_0.getDay() == '2') {hoje.innerText = 'Hoje - Terça feira'}
      else if (data_0.getDay() == '3') {hoje.innerText = 'Hoje - Quarta feira'}
      else if (data_0.getDay() == '4') {hoje.innerText = 'Hoje - Quinta feira'}
      else if (data_0.getDay() == '5') {hoje.innerText = 'Hoje - Sexta feira'}
      else if (data_0.getDay() == '6') {hoje.innerText = 'Hoje - Sábado'}

      // Amanhã
      data_1 = new Date(info.forecast.forecastday[1].date.slice(0, 4), info.forecast.forecastday[1].date.slice(5, 7)-1, info.forecast.forecastday[1].date.slice(8, 10));
      if (data_1.getDay() == '0') {amanha.children[0].innerText = 'Domingo'}
      else if (data_1.getDay() == '1') {amanha.children[0].innerText = 'Segunda feira'}
      else if (data_1.getDay() == '2') {amanha.children[0].innerText = 'Terça feira'}
      else if (data_1.getDay() == '3') {amanha.children[0].innerText = 'Quarta feira'}
      else if (data_1.getDay() == '4') {amanha.children[0].innerText = 'Quinta feira'}
      else if (data_1.getDay() == '5') {amanha.children[0].innerText = 'Sexta feira'}
      else if (data_1.getDay() == '6') {amanha.children[0].innerText = 'Sábado'}
      
      // Condição
      amanha.children[2].innerHTML = `<img src="${'https://'+info.forecast.forecastday[1].day.condition.icon.slice(2)}">`
      amanha.children[3].innerText = `Condição: ${info.forecast.forecastday[1].day.condition.text}`

      // Depois de amanhã
      data_2 = new Date(info.forecast.forecastday[2].date.slice(0, 4), info.forecast.forecastday[2].date.slice(5, 7)-1, info.forecast.forecastday[2].date.slice(8, 10));
      if (data_2.getDay() == '0') {depois_amanha.children[0].innerText = 'Domingo'}
      else if (data_2.getDay() == '1') {depois_amanha.children[0].innerText = 'Segunda feira'}
      else if (data_2.getDay() == '2') {depois_amanha.children[0].innerText = 'Terça feira'}
      else if (data_2.getDay() == '3') {depois_amanha.children[0].innerText = 'Quarta feira'}
      else if (data_2.getDay() == '4') {depois_amanha.children[0].innerText = 'Quinta feira'}
      else if (data_2.getDay() == '5') {depois_amanha.children[0].innerText = 'Sexta feira'}
      else if (data_2.getDay() == '6') {depois_amanha.children[0].innerText = 'Sábado'}

      // Condição
      depois_amanha.children[2].innerHTML = `<img src="${'https://'+info.forecast.forecastday[2].day.condition.icon.slice(2)}">`
      depois_amanha.children[3].innerText = `Condição: ${info.forecast.forecastday[2].day.condition.text}`
    });
};

// Execução da função principal

button.addEventListener('click', function(e) {
  funcaoPrincipal();
});

input.addEventListener('keydown', function(e) {
  if (e.keyCode == 13) {
    funcaoPrincipal();
    e.preventDefault()
  }
  return false;

})
