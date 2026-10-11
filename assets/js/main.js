(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const menuButton = $('.menu-toggle');
  const nav = $('.nav');
  if (menuButton && nav) menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  $$('.nav a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('open')));
  $$('.year').forEach(el => el.textContent = new Date().getFullYear());

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && window.gsap) {
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    gsap.from('.site-header', {y:-18, opacity:0, duration:.8, ease:'power3.out'});
    // Animate each reveal element independently so off-screen sections don't stay hidden.
    const revealItems = $$('.reveal');
    if (window.ScrollTrigger) {
      revealItems.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const alreadyVisible = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
        gsap.fromTo(el, {y:24, opacity:0}, {
          y:0, opacity:1, duration:.75, delay:alreadyVisible ? index * .045 : 0,
          ease:'power3.out', clearProps:'transform',
          scrollTrigger: alreadyVisible ? undefined : {trigger:el, start:'top 92%', once:true}
        });
      });
    } else {
      gsap.fromTo(revealItems, {y:24, opacity:0}, {y:0, opacity:1, duration:.75, stagger:.06, ease:'power3.out', clearProps:'all'});
    }
    $$('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {const r=el.getBoundingClientRect();gsap.to(el,{x:(e.clientX-r.left-r.width/2)*.12,y:(e.clientY-r.top-r.height/2)*.12,duration:.25});});
      el.addEventListener('mouseleave',()=>gsap.to(el,{x:0,y:0,duration:.45,ease:'elastic.out(1,.4)'}));
    });
  }

  const glow = $('.cursor-glow');
  if (glow && !reduceMotion && matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', e => {glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';},{passive:true});
  }

  const typed = $('#typed-role');
  if (typed && !reduceMotion) {
    const words = ['intelligent applications','useful Python tools','data-driven solutions','the next idea'];
    let word=0, char=words[0].length, deleting=true;
    const tick=()=> {
      const current=words[word];
      if(deleting){char--;typed.textContent=current.slice(0,char);if(char<=0){deleting=false;word=(word+1)%words.length;setTimeout(tick,280);return;}}
      else {char++;typed.textContent=words[word].slice(0,char);if(char>=words[word].length){deleting=true;setTimeout(tick,1250);return;}}
      setTimeout(tick,deleting?35:65);
    };
    setTimeout(tick,1800);
  }

  // Lightweight canvas particle orb: pauses when the tab is hidden and respects reduced-motion.
  const canvas = $('#particle-orb');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w=0,h=0,points=[],raf=0,mouse={x:0,y:0};
    const resize=()=>{const dpr=Math.min(window.devicePixelRatio||1,2);const r=canvas.getBoundingClientRect();w=r.width;h=r.height;canvas.width=Math.floor(w*dpr);canvas.height=Math.floor(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);points=[];const n=Math.max(250,Math.min(600,Math.floor(w*h/650)));for(let i=0;i<n;i++){const y=1-2*(i+.5)/n;const rad=Math.sqrt(1-y*y);const a=Math.PI*(3-Math.sqrt(5))*i;points.push({x:Math.cos(a)*rad,y,z:Math.sin(a)*rad,size:Math.random()*1.15+.3,phase:Math.random()*6.28});}};
    const draw=()=>{raf=0;if(document.hidden)return;ctx.clearRect(0,0,w,h);const cx=w*.5,cy=h*.5,r=Math.min(w,h)*.34, t=performance.now()*.00025;const projected=[];
      for(const p of points){const a=t*.8;const x=p.x*Math.cos(a)-p.z*Math.sin(a),z=p.x*Math.sin(a)+p.z*Math.cos(a);const b=-.18+mouse.y*.00025;const yy=p.y*Math.cos(b)-z*Math.sin(b),zz=p.y*Math.sin(b)+z*Math.cos(b);const scale=2.4/(3.3-zz);projected.push({x:cx+x*r,y:cy+yy*r,z:zz,size:p.size*scale,alpha:.22+(zz+1)*.38,phase:p.phase});}
      projected.sort((a,b)=>a.z-b.z);
      projected.forEach((p,i)=>{ctx.beginPath();ctx.fillStyle=p.z>.25?`rgba(122,157,255,${p.alpha})`:`rgba(168,106,255,${p.alpha*.85})`;ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();if(i%4===0&&p.z>.1){let nearest=null,dist=40;for(let j=i+1;j<Math.min(i+12,projected.length);j++){const q=projected[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<dist){dist=d;nearest=q;}}if(nearest){ctx.beginPath();ctx.strokeStyle=`rgba(126,117,255,${.12*(1-dist/40)})`;ctx.lineWidth=.5;ctx.moveTo(p.x,p.y);ctx.lineTo(nearest.x,nearest.y);ctx.stroke();}}});
      const halo=ctx.createRadialGradient(cx,cy,r*.1,cx,cy,r*1.2);halo.addColorStop(0,'rgba(84,60,190,.12)');halo.addColorStop(1,'rgba(84,60,190,0)');ctx.fillStyle=halo;ctx.fillRect(0,0,w,h);
      if(!reduceMotion)raf=requestAnimationFrame(draw);
    };
    resize();draw();window.addEventListener('resize',()=>{resize();if(!raf)draw();},{passive:true});
    canvas.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();mouse.x=e.clientX-r.left-w/2;mouse.y=e.clientY-r.top-h/2;if(reduceMotion){draw();}});
    document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else if(!raf)draw();});
  }

  const form = $('#contact-form');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const email = 'your.email@example.com'; // Replace with your real email address.
    const subject = encodeURIComponent('Portfolio contact from '+data.get('name'));
    const body = encodeURIComponent('Name: '+data.get('name')+'\nEmail: '+data.get('email')+'\n\n'+data.get('message'));
    const status = $('#form-status');
    if(email === 'your.email@example.com') {
      status.textContent = 'Please replace the placeholder email in contact.html and main.js before using this form.';
      return;
    }
    status.textContent = 'Opening your email app…';
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });
})();