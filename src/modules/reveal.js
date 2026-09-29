// Scroll reveals, process line, card spotlight, contact form (demo only: nothing is sent)
// scroll reveals + process line
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv,#steps').forEach(el=>io.observe(el));
// card spotlight follows cursor
document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.card');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-r.left+'px');c.style.setProperty('--y',e.clientY-r.top+'px')}});
// form
document.getElementById('f').addEventListener('submit',e=>{e.preventDefault();document.getElementById('fields').style.display='none';document.getElementById('ok').style.display='block'});
