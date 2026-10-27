import {cleanDisplayCopy,displaySteps} from './display-copy';
import {SheetImage} from './SheetImage';
import {isBatch2130} from './image-demo-batches/Batch2130Overlay';
import {UsageGuide} from './UsageGuide';
import './home-guide.css';
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import catalog from './catalog.json';
import './style.css';
import { ImageDemo, hasImageDemo, getImageDemo } from './ImageDemo';


for(const entry of catalog.index){
 const record=catalog.samples.find(e=>e.id===entry.id);
 entry.sample=!!record&&hasImageDemo(record.id,record.uid,record.contentRevision);
}
const illustratedCount=catalog.index.filter(e=>e.sample).length;
type Entry = typeof catalog.index[number];
type Sample = typeof catalog.samples[number];
type IconName = 'star'|'sun'|'heart'|'leaf'|'search'|'arrow'|'play'|'pause'|'close'|'book'|'head'|'hand'|'body'|'leg'|'foot'|'stretch';
function Icon({name, size=24, className=''}:{name:IconName,size?:number,className?:string}) {
  const paths:Record<IconName,React.ReactNode> = {
    star:<path d="m12 1 2.3 7.3L22 7l-5.7 5 4.3 6.2-7.6-2L9.8 23l-1.4-8L1 14l6.5-4.1L4.7 3l6.1 4.5Z"/>,
    sun:<><circle cx="12" cy="12" r="5"/><path d="m12 1 .2 3M12 20v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></>,
    heart:<path d="M12 21C7 17 1 13 2 7 3 1 10 2 12 6c3-5 9-4 10 1 1 6-5 11-10 14Z"/>,
    leaf:<><path d="M4 22c3-6 4-11 8-17m-5 8C0 12 1 6 2 3c6 0 10 3 7 8m1 0c-1-7 7-9 11-8 0 7-4 10-11 8m-4 5c7-6 11-3 13-2-2 6-7 7-14 5"/></>,
    search:<><circle cx="10" cy="10" r="7"/><path d="m15.5 15.5 6 6"/></>,
    arrow:<path d="M2 12h19m-7-7 7 7-7 7"/>,
    play:<path d="m7 3 14 9L7 21Z"/>,
    pause:<><path d="M7 3v18M17 3v18"/></>,
    close:<path d="m5 5 14 14M5 19 19 5"/>,
    book:<><path d="M12 5c-3-3-7-3-10-2v17c4-1 7-1 10 2 3-3 6-3 10-2V3c-4-1-7-1-10 2Zm0 0v17"/></>,
    head:<><path d="M8 22v-4C2 15 3 5 7 3c4-3 12 0 12 5l3 4-3 1v4l-5 1v4M5 7c4 1 7-1 8-4M14 9h1"/></>,
    hand:<><path d="m7 14-3-4c-2-2-3 0-2 2l5 8c3 4 10 3 12-2l2-9c0-2-3-2-3 0l-1 4 1-9c0-2-3-2-3 0l-1 8V3c0-2-3-2-3 0v10L9 5c-1-2-3-1-3 1Z"/></>,
    body:<><circle cx="12" cy="4" r="3"/><path d="M6 10 3 19m15-9 3 9M9 8 7 17h10l-2-9M9 18l-1 5m7-5 1 5"/></>,
    leg:<path d="M8 2 5 13c-1 3 1 5 4 5l8 4c3 1 5-1 3-3l-8-5 5-12M5 14l6-1"/>,
    foot:<><path d="M10 1c0 7-3 10-6 14-4 5 0 8 4 7l12-3c3-1 2-4-1-4h-7l5-14M6 13l6 2"/><path d="m17 16 1 3"/></>,
    stretch:<><circle cx="12" cy="3" r="2"/><path d="m2 5 7 4h6l7-4M9 9l1 6-6 7m11-13-1 6 6 7m-10-7h4"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{paths[name]}</svg>;
}
const groups = [
  {id:'head',name:'头、面与颈',caption:'从眉间，到颈侧',icon:'head',color:'yellow',regions:['头皮','面部','眼部','耳部','颈部']},
  {id:'arms',name:'肩、臂与手',caption:'照顾忙了一天的双手',icon:'hand',color:'blue',regions:['肩部','手臂','手部','手指','手腕']},
  {id:'back',name:'胸腹与腰背',caption:'把注意力放回身体',icon:'body',color:'pink',regions:['胸部','腹部','腰背','肩背']},
  {id:'legs',name:'髋、腿与膝',caption:'让每一步更从容',icon:'leg',color:'green',regions:['髋部','大腿','腿部','小腿','膝部']},
  {id:'feet',name:'脚踝、足与趾',caption:'给双脚一点关照',icon:'foot',color:'lavender',regions:['脚踝','足部','脚趾']},
  {id:'whole',name:'全身伸展',caption:'从一个姿势，认识全身',icon:'stretch',color:'orange',regions:['全身拉伸']},
] as const;
const groupFor = (e:Entry|Sample) => groups.find(g=>(g.regions as readonly string[]).includes(e.region))!;
const metadata:Record<string,{short:string,kicker:string,amount:string,color:string,frame:number,caption:string}>={
  'SM-007':{short:'给太阳穴，放个小假',kicker:'手指接触 · 面部',amount:'30 秒 · 1 遍',color:'yellow',frame:0,caption:'闭上眼睛，感受拇指落在太阳穴。'},
  'SM-103':{short:'双臂上举，一呼一吸',kicker:'呼吸配合 · 肩部',amount:'20 次 · 仰卧',color:'blue',frame:2,caption:'双臂一起上举，呼吸跟着动作走。'},
  'SM-105':{short:'腿向这边，头向那边',kicker:'全身协调 · 伸展',amount:'8–10 次 · 仰卧',color:'pink',frame:1,caption:'腿与头朝相反方向，慢慢读懂姿势。'},
};
for(const e of catalog.samples)if(!metadata[e.id]){const g=groupFor(e);metadata[e.id]={short:e.title,kicker:e.region+' · 动作步骤',amount:'见动作步骤',color:g.color,frame:0,caption:cleanDisplayCopy(e.summary)};}
const sample = (id:string) => catalog.samples.find(e=>e.id===id);
function Art({id}:{id:string}) {
  const demo=getImageDemo(id)!;
  return <div className="art single"><SheetImage src={demo.folder+demo.poster} alt={`${sample(id)?.title}，动作封面`} tile={demo.posterTile??(isBatch2130(id)?0:undefined)} flipX={demo.posterFlipX} loading="lazy"/></div>;
}
function useStored<T,>(key:string,initial:T){
  const [value,setValue]=useState<T>(()=>{try{return JSON.parse(localStorage.getItem(key)||'null')??initial;}catch{return initial;}});
  useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{}},[key,value]);
  return [value,setValue] as const;
}
function Modal({children,onClose,label}:{children:React.ReactNode,onClose:()=>void,label:string}){
  const ref=useRef<HTMLDialogElement>(null);
  useEffect(()=>{const el=ref.current;el?.showModal();return()=>el?.close();},[]);
  return <dialog ref={ref} className="paper-modal" aria-label={label} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}><button className="icon-btn modal-close" aria-label="关闭" onClick={onClose}><Icon name="close"/></button>{children}</dialog>;
}
function App(){
  const [route,setRoute]=useState(location.hash||'#/');
  const [favorites,setFavorites]=useStored<string[]>('sm-image-demo-favorites',[]);
  const [quiet]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [searchOpen,setSearchOpen]=useState(false);
  const [search,setSearch]=useState('');
  const [draw,setDraw]=useState<Sample|null>(null);
  const [drawing,setDrawing]=useState(false);
  const drawTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>{const change=()=>{setRoute(location.hash||'#/');window.scrollTo({top:0,behavior:'instant'});};addEventListener('hashchange',change);return()=>{removeEventListener('hashchange',change);if(drawTimer.current)clearTimeout(drawTimer.current);};},[]);
  useEffect(()=>{delete document.documentElement.dataset.theme;try{localStorage.removeItem('sm-image-demo-night');}catch{}},[]);
  useEffect(()=>{document.documentElement.dataset.motion=quiet?'quiet':'full';},[quiet]);
  useEffect(()=>{function key(e:KeyboardEvent){if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();setSearchOpen(true);}}document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key);},[]);
  const toggleFavorite=(id:string)=>setFavorites(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  const doDraw=()=>{if(drawing)return;setDrawing(true);drawTimer.current=setTimeout(()=>{setDraw(catalog.samples[Math.floor(Math.random()*catalog.samples.length)]);setDrawing(false);},quiet?0:850);};
  const currentId=route.startsWith('#/exercise/')?route.split('/')[2]:'';
  const current=sample(currentId);
  const library=route.startsWith('#/library');
  const region=new URLSearchParams(route.split('?')[1]||'').get('region')||'all';
  useEffect(()=>{document.title=current?`${current.title} · Self Massage`:library?'动作卡片 · Self Massage':'Self Massage · 把放松还给自己';},[route]);
  return <>
    <a className="skip-link" href="#content" onClick={e=>{e.preventDefault();document.getElementById("content")?.focus();document.getElementById("content")?.scrollIntoView();}}>跳到内容</a>
    <header className="site-header"><div className="header-inner"><a className="brand" href="#/" aria-label="Self Massage 首页"><span className="brand-star"><Icon name="star" size={30}/></span><span>Self Massage<small>生图练习册 · 独立预览</small></span></a><nav aria-label="主导航"><a className={!library&&!current?'active':''} href="#/">练习册</a><a className={library?'active':''} href="#/library">动作卡片</a><button className="icon-btn" onClick={()=>setSearchOpen(true)} aria-label="搜索动作"><Icon name="search"/></button></nav></div></header>
    <main id="content" tabIndex={-1} key={current?.id|| (library?'library':'home')}>
      {current?<Detail exercise={current} favorite={favorites.includes(current.id)} onFavorite={()=>toggleFavorite(current.id)} quiet={quiet}/>:library?<Library region={region} favorites={favorites} toggleFavorite={toggleFavorite}/>:<Home drawing={drawing} onDraw={doDraw}/>}
      {currentId&&!current&&<p className="missing">此动作还没有演示样例。<a href="#/library">返回动作卡片</a></p>}
    </main>
    <footer className="site-footer"><a className="footer-brand" href="#/"><Icon name="star"/>Self Massage</a><p className="footer-message">不用一次做很多，从关照自己开始。</p></footer>
    {searchOpen&&<Modal label="搜索动作" onClose={()=>setSearchOpen(false)}><div className="search-modal"><span className="eyebrow">翻翻你的练习册</span><h2>想找哪个动作？</h2><label className="search-input"><Icon name="search"/><input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜部位或动作，如：肩部、呼吸" aria-label="搜索动作关键词"/></label><div className="search-results">{catalog.index.filter(e=>e.title.includes(search)||e.region.includes(search)||e.id.toLowerCase().includes(search.toLowerCase())).slice(0,20).map(e=><a key={e.id} href={`#/exercise/${e.id}`}  onClick={()=>{setSearchOpen(false);}}><span><small>{e.id} · {e.region}</small>{e.title}</span><span className="tag">{e.sample?'看图解 ↗':'读步骤 ↗'}</span></a>)}{catalog.index.filter(e=>e.title.includes(search)||e.region.includes(search)||e.id.toLowerCase().includes(search.toLowerCase())).length===0&&<p>这页还没找到，试试“面部”或“肩部”。</p>}</div></div></Modal>}
    {draw&&<Modal label="抽到的动作卡" onClose={()=>setDraw(null)}><div className="draw-result"><div className="confetti" aria-hidden="true">✦ · ✧ · ✦</div><span className="eyebrow">今天，先认识这张卡</span><h2>留一点时间给自己。</h2><ExerciseCard exercise={catalog.index.find(e=>e.id===draw.id)!} favorite={favorites.includes(draw.id)} onFavorite={()=>toggleFavorite(draw.id)} onOpen={()=>setDraw(null)}/><button className="text-button" onClick={()=>setDraw(catalog.samples[(catalog.samples.findIndex(e=>e.id===draw.id)+1)%catalog.samples.length])}>再换一张 ↻</button></div></Modal>}
  </>;
}
function Home({drawing,onDraw}:{drawing:boolean,onDraw:()=>void}){
  return <>
    <section className="hero wrap"><span className="eyebrow hero-kicker"><span/>一本可以慢慢翻的身体练习册</span>
      <div className="hero-doodle doodle-sun"><Icon name="sun" size={86}/><span>慢一点，也很好</span></div>
      <div className="hero-doodle doodle-heart"><Icon name="heart" size={72}/><i>给自己一点关照</i></div>
      <h1>把<span className="red-word">放松</span>，<br className="mobile-break"/>还给<span className="marked-word">自己<svg viewBox="0 0 300 30" aria-hidden="true"><path d="M5 15Q140 0 295 13M8 24Q145 9 280 22"/></svg></span>。</h1>
      <p className="hero-copy">从头到脚，一张卡片一个动作。<br/>找到想照顾的部位，给身体一个小小的休息。</p>
      <div className="hero-actions"><button className={`btn primary ${drawing?'shaking':''}`} onClick={onDraw} disabled={drawing}><Icon name="star"/>{drawing?'翻翻看…':'抽一张动作卡'}<Icon name="arrow"/></button><a className="btn" href="#/library"><Icon name="book"/>按部位找动作</a></div>
      <div className="hero-stickers"><span className="sticker yellow">135 个动作已成册</span><span className="sticker mint">点位与步骤图解</span><span className="handwritten-note">小步开始，不必赶进度 <span>↙</span></span></div>
      <div className="doodle-leaf"><Icon name="leaf" size={65}/></div><a href="#body-map" className="scroll-note" onClick={e=>{e.preventDefault();document.getElementById('body-map')?.scrollIntoView({behavior:document.documentElement.dataset.motion==='quiet'?'instant':'smooth'});}}>往下翻翻 <span>↓</span></a>
    </section>
    <section className="body-map wrap" id="body-map"><div className="section-heading"><div><span className="eyebrow">01 / 从这里开始</span><h2>今天，想照顾哪里？</h2></div><span className="side-note">身体的每个角落，都值得关照。 <span>↘</span></span></div><div className="region-grid">{groups.map((g,i)=><a className={`region-card ${g.color}`} href={`#/library?region=${g.id}`} key={g.id}><div className="region-top"><span className="region-number">0{i+1}</span><Icon name={g.icon} size={55}/><span className="small-arrow">↗</span></div><h3>{g.name}</h3><p>{g.caption}</p><span className="region-count">{catalog.index.filter(e=>(g.regions as readonly string[]).includes(e.region)).length} 个动作 <span>→</span></span></a>)}</div></section>
    <section className="sample-section wrap" aria-labelledby="collection-title"><div className="section-heading"><div><span className="eyebrow">02 / 按顺序慢慢翻</span><h2 id="collection-title">从第一张，认识身体<span className="sketch-star">✧</span></h2></div><a className="text-button" href="#/library">翻开所有卡片 <Icon name="arrow" size={20}/></a></div><p className="section-intro">135 个动作，按编号收进同一本练习册。先翻看前 6 张，完整目录里可以按顺序浏览，也可以随时按部位筛选。</p><div className="preview-grid">{catalog.index.slice(0,6).map(e=><a className={`preview-card ${groupFor(e).color}`} key={e.id} href={`#/exercise/${e.id}`}><div className="preview-art"><Art id={e.id}/><span className="preview-number">#{e.id.slice(3)}</span></div><div className="preview-copy"><small>{e.region}</small><h3>{e.title}</h3><span aria-hidden="true">↗</span></div></a>)}</div><div className="collection-tail"><span>这里是前 6 张 · 完整卡片集共 135 张</span><a className="text-button" href="#/library">继续翻，查看 #007–#135 <Icon name="arrow" size={18}/></a></div></section>
    <UsageGuide/>
    <section className="draw-section wrap"><div><span className="eyebrow">一点小小的仪式感</span><h2>不知道从哪里开始？<br/>让卡片给你一个灵感。</h2><p>从 135 张卡片中抽一张，看看今天想照顾哪里。</p><button className="btn primary" onClick={onDraw} disabled={drawing}>{drawing?'正在打开…':'打开今天的卡包'}<Icon name="arrow"/></button></div><button className={`card-pack ${drawing?'shaking':''}`} onClick={onDraw} disabled={drawing} aria-label="抽一张动作卡"><span className="pack-top"/><span className="pack-star"><Icon name="star" size={74}/></span><span className="pack-title">松 弛<br/>补 给 包</span><span className="pack-sub">SELF MASSAGE / 135 CARDS</span><span className="pack-seal">给自己<br/>的小奖励</span></button></section>
  </>;
}
function ExerciseCard({exercise:e,favorite,onFavorite,onOpen}:{exercise:Entry,favorite:boolean,onFavorite:()=>void,onOpen?:()=>void}){
 const m=metadata[e.id],g=groupFor(e);
 return <article className={`exercise-card ${m?.color||g.color} ${e.sample?'has-sample':'pending-card'}`}>
 <div className="card-top"><span className="card-id">#{e.id.slice(3)}</span><span className="tiny-label">{e.region}</span><button className={`save-button ${favorite?'saved':''}`} aria-label={`${favorite?'取消收藏':'收藏'}${e.title}`} aria-pressed={favorite} onClick={onFavorite}><Icon name="heart" size={20}/></button></div>
 <a className="card-art-link" href={`#/exercise/${e.id}`} onClick={onOpen} aria-label={`查看${e.title}`}>{e.sample?<><Art id={e.id}/><span className="art-stamp">生图＋点位 · 样片</span></>:<div className="pending-art"><Icon name={g.icon} size={55}/><span>文字已保留 · 插图待制作</span></div>}</a>
 <div className="card-content"><span className="eyebrow">{m?.kicker||'动作素材已整理'}</span><h3><a href={`#/exercise/${e.id}`} onClick={onOpen}>{e.id==='SM-135'?'双拇指画弧，点位看清楚':e.title}</a></h3><p>{e.sample?getImageDemo(e.id)!.cardCaption:e.region+' · 阅读已整理的动作步骤'}</p><div className="card-bottom"><span>{e.sample?'图解样片 · 待复核':'步骤保留 · 插图待制作'}</span><a href={`#/exercise/${e.id}`} onClick={onOpen}>{e.sample?'查看图解':'阅读步骤'} <span>↗</span></a></div></div></article>;
}
function Library({region,favorites,toggleFavorite}:{region:string,favorites:string[],toggleFavorite:(id:string)=>void}){
  const [query,setQuery]=useState('');const [onlySamples,setOnlySamples]=useState(false);const [onlySaved,setOnlySaved]=useState(false);
  const group=groups.find(g=>g.id===region);
  const visible=catalog.index.filter(e=>(!group||(group.regions as readonly string[]).includes(e.region))&&(!onlySamples||e.sample)&&(!onlySaved||favorites.includes(e.id))&&(!query||e.title.includes(query)||e.region.includes(query)||e.id.toLowerCase().includes(query.toLowerCase()))).sort((a,b)=>a.id.localeCompare(b.id));
  return <div className="wrap library"><div className="breadcrumb"><a href="#/">练习册</a><span>/</span><span>动作卡片</span></div><div className="library-title"><div><span className="eyebrow">THE BODY CARD COLLECTION</span><h1>{group?.name||'你的身体，值得慢慢了解。'}</h1><p>{group?.caption||`135 项动作文字已保留，${illustratedCount} 项生图样片可预览。`}</p></div><span className={`library-seal ${group?.color||'yellow'}`}><Icon name={group?.icon||'book'} size={46}/><strong>{group?catalog.index.filter(e=>(group.regions as readonly string[]).includes(e.region)).length:135}</strong><small>个动作素材</small></span></div><div className="filters"><div className="region-tabs" role="navigation" aria-label="部位筛选"><a className={!group?'selected':''} href="#/library">全部部位</a>{groups.map(g=><a key={g.id} className={g.id===region?'selected':''} href={`#/library?region=${g.id}`}>{g.name}</a>)}</div><div className="filter-tools"><label className="inline-search"><Icon name="search" size={20}/><input type="search" placeholder="找部位、动作或编号" value={query} onChange={e=>setQuery(e.target.value)} aria-label="筛选动作"/></label><label className="check"><input type="checkbox" checked={onlySamples} onChange={e=>setOnlySamples(e.target.checked)}/>有图解</label><label className="check"><input type="checkbox" checked={onlySaved} onChange={e=>setOnlySaved(e.target.checked)}/>我的收藏</label><span className="result-count" aria-live="polite">{visible.length} 张卡片</span></div></div><div className="exercise-grid">{visible.map(e=><ExerciseCard key={e.id} exercise={e} favorite={favorites.includes(e.id)} onFavorite={()=>toggleFavorite(e.id)}/>)}</div>{!visible.length&&<div className="empty-state"><Icon name="leaf" size={54}/><h2>这页暂时空着。</h2><p>换个部位，或清除筛选再找找。</p><button className="btn" onClick={()=>{setQuery('');setOnlySamples(false);setOnlySaved(false);location.hash='#/library';}}>查看全部卡片</button></div>}</div>;
}
function Detail({exercise:e,favorite,onFavorite,quiet}:{exercise:Sample,favorite:boolean,onFavorite:()=>void,quiet:boolean}){
 const m=metadata[e.id],g=groupFor(e),at=catalog.samples.findIndex(s=>s.id===e.id),count=catalog.samples.length,prev=catalog.samples[(at+count-1)%count],next=catalog.samples[(at+1)%count];
 const [flipped,setFlipped]=useState(false),[phase,setPhase]=useState(0);const demo=getImageDemo(e.id);const illustrated=hasImageDemo(e.id,e.uid,e.contentRevision);
 const steps=displaySteps(e.steps.map((text,i)=>illustrated?demo?.instructionOverrides?.[i]??text:text));
 return <div className={`detail wrap image-detail ${m.color}`}><div className="breadcrumb"><a href="#/">练习册</a><span>/</span><a href={`#/library?region=${g.id}`}>{g.name}</a><span>/</span><span>#{e.id.slice(3)}</span></div>
 <div className="detail-heading"><div><span className="eyebrow">动作卡 #{e.id.slice(3)} <i/> {e.region} · {illustrated?'点位与步骤图解':'动作文字'}</span><h1>{e.title}</h1><p>{illustrated?'先看手怎么放，再看点在哪里。':'动作步骤已保留，生图演示尚未制作。'}</p>{!illustrated&&<span className="image-review-status">插图待制作</span>}</div><button className={`btn favorite-btn ${favorite?'is-saved':''}`} onClick={onFavorite} aria-pressed={favorite}><Icon name="heart" size={19}/>{favorite?'已收藏':'收藏这张'}</button></div>
 <div className="detail-layout">{illustrated?<ImageDemo id={e.id} quiet={quiet} phase={phase} onPhaseChange={setPhase}/>:<section className="image-empty"><Icon name={g.icon} size={80}/><span className="eyebrow">这张卡，先读步骤</span><h2>人物插图正在逐项制作。</h2><p>这里保留了该动作的文字说明。可先查看第 1 项温掌覆眼的生图样片。</p><a className="btn" href="#/exercise/SM-001">查看点位图解 ↗</a></section>}
 <aside className={`instruction-card ${flipped?'flipped':''}`}><div className="instruction-top"><span className="sticker">{flipped?'把细节记下来':'动作小抄'}</span><button className="text-button" onClick={()=>setFlipped(!flipped)}>{flipped?'看步骤':'翻到背面'} ↻</button></div>{!flipped?<><div className="instruction-facts"><span><small>身体部位</small><strong>{e.region}</strong></span><span><small>卡片进度</small><strong>{at+1} / {count}</strong></span></div><h2>跟着步骤，读懂动作。</h2><ol className="instruction-steps">{steps.map(({text,sourceStep},i)=><li key={sourceStep} data-source-step={sourceStep} className={illustrated&&(demo?.phases[phase]?.sourceStep??phase)===sourceStep?'current-step':''}><span>{i+1}</span><p>{text}</p></li>)}</ol></>:<div className="back-content"><Icon name="book" size={44}/><h2>这张卡的动作细节</h2><div className="source-notes"><p>{cleanDisplayCopy(e.summary)}</p>{e.notes.map(cleanDisplayCopy).filter(Boolean).map((n,i)=><p key={i}>{n}</p>)}</div></div>}</aside></div>
 <div className="detail-note"><span className="note-pin">✧</span><div><strong>{illustrated?demo!.noteTitle:'先读懂步骤，再看示范。'}</strong><p>{illustrated?demo!.note:'本页保存了复制时的动作文字。插图完成后会逐项接入，当前不显示其他动作的图作替代。'}</p></div></div>
 <nav className="detail-pagination" aria-label="切换动作"><a href={`#/exercise/${prev.id}`}><small>← 上一张 · {prev.id}</small><strong>{prev.title}</strong></a><a href="#/library" className="back-library"><Icon name="book"/>回到卡片集</a><a href={`#/exercise/${next.id}`}><small>下一张 · {next.id} →</small><strong>{next.title}</strong></a></nav></div>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
