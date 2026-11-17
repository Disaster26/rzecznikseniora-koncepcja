(function(){
  var top=document.getElementById('top'),bg=document.getElementById('burger');
  function zamknij(){top.classList.remove('open');bg.setAttribute('aria-expanded','false')}
  bg.addEventListener('click',function(){var o=top.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
  document.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',zamknij)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij()});
  /* wiekszy tekst: 3 stopnie */
  var h=document.documentElement,aps=document.querySelectorAll('.aplus');
  function opis(){var t=+(h.getAttribute('data-t')||0);aps.forEach(function(ap){ap.setAttribute('aria-label',t<2?'Powiększ tekst na stronie':'Przywróć zwykłą wielkość tekstu');ap.querySelector('b').textContent=t<2?'A+':'A'})}
  aps.forEach(function(ap){ap.addEventListener('click',function(){var t=(+(h.getAttribute('data-t')||0)+1)%3;if(t)h.setAttribute('data-t',t);else h.removeAttribute('data-t');try{localStorage.setItem('rps-tekst',t||'')}catch(e){}opis()})});
  opis();
  /* aktywna pozycja menu */
  var links=[].slice.call(document.querySelectorAll('.menu a'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    links.forEach(function(l){var t=document.querySelector(l.getAttribute('href'));if(t)io.observe(t)});
    io.observe(document.getElementById('start'));
  }
  /* ankieta Google ladowana dopiero po kliknieciu */
  var ob=document.getElementById('otworz-ankiete'),fm=document.getElementById('forma');
  ob.addEventListener('click',function(){if(!fm.querySelector('iframe')){var i=document.createElement('iframe');i.src=ob.dataset.src;i.title='Ankieta: badanie potrzeb seniorów';fm.appendChild(i)}fm.hidden=false;fm.scrollIntoView({behavior:'smooth',block:'start'})});
  /* cookies + mapa przy przewinieciu */
  var ck=document.getElementById('cookies'),mapa=document.getElementById('mapa'),zgoda=null,widoczna=false;
  try{zgoda=localStorage.getItem('rps-cookies')}catch(e){}
  function wstawMape(){if(mapa.querySelector('iframe'))return;var i=document.createElement('iframe');i.src=mapa.dataset.src;i.title='Mapa: ul. Witaszka 6, Piła';i.loading='lazy';i.referrerPolicy='no-referrer-when-downgrade';mapa.appendChild(i)}
  function moze(){if(zgoda!=='0'&&widoczna)wstawMape()}
  ck.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){zgoda=b.dataset.c;try{localStorage.setItem('rps-cookies',zgoda)}catch(e){}ck.hidden=true;moze()})});
  document.getElementById('pokaz-mape').addEventListener('click',function(){zgoda='1';try{localStorage.setItem('rps-cookies','1')}catch(e){}ck.hidden=true;wstawMape()});
  if('IntersectionObserver' in window){new IntersectionObserver(function(es){if(es[0].isIntersecting){widoczna=true;moze()}},{rootMargin:'300px'}).observe(mapa)}else{widoczna=true;moze()}
  var r=document.getElementById('rok');if(r)r.textContent=new Date().getFullYear();
})();
