const socket = io();
const $ = id => document.getElementById(id);
function render(s){
  $('round').textContent=s.round;
  $('active').textContent=s.active || 'Ожидание игрока';
  $('progress').textContent=`Попытки: ${s.attempts}/10 · Открыто: ${s.opened.length}/10`;
  $('cards').innerHTML='';
  for(let i=1;i<=10;i++){const el=document.createElement('div');el.className='card'+(s.opened.includes(i)?' open':'');el.textContent=s.opened.includes(i)?'✓':'✦';$('cards').appendChild(el)}
  $('queue').innerHTML=s.queue.length?s.queue.map(n=>`<li>${escapeHtml(n)}</li>`).join(''):'<li>Пока пусто</li>';
}
function escapeHtml(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
socket.on('state',render);
socket.on('message',m=>{const el=document.createElement('div');el.className='msg';el.textContent=`${m.user}: ${m.text}`;$('feed').prepend(el)});
