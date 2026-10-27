import {useId,type ReactNode} from 'react';
import {SheetImage} from './SheetImage';
import {ContactSymbol} from './ContactSymbol';
const green='#087f74',orange='#bf4d2c',ink='#403b33',paper='#fffaf0',brown='#8b6849';
function Tag({text,x=500,y=920,w=900,color=ink}:{text:string;x?:number;y?:number;w?:number;color?:string}){return <g><rect x={x-w/2} y={y-28} width={w} height={56} rx={10} fill={paper} fillOpacity={.97} stroke={color} strokeWidth={1.8}/><text x={x} y={y+10} textAnchor="middle" fontSize={28} fontWeight={650} fill={color}>{text}</text></g>}
const region=(d:string)=><path data-region="coverage" d={d} fill={green} fillOpacity={.13} stroke={green} strokeWidth={3.5} strokeDasharray="9 7"/>;
const dots=(pts:number[][],kind:'press'|'rotate'='press',r=10)=><g data-dense-points={kind}>{pts.map(([x,y],i)=><ContactSymbol key={i} x={x} y={y} kind={kind} r={r}/>)}</g>;
const along=(a:number[],b:number[],n:number)=>Array.from({length:n},(_,i)=>[a[0]+(b[0]-a[0])*i/(n-1),a[1]+(b[1]-a[1])*i/(n-1)]);
export function ReferenceComparison({view,folder,points,onError}:{view:string;folder:string;points:boolean;onError:()=>void}){
 const items=view==='ref-60-pair'?[{file:'fist-photo-v4.png',view:'ref-60-fist',title:'① 拳助 · 拳掌根面顶四指中间关节'},{file:'grip-photo-v4.png',view:'ref-60-grip',title:'② 握指 · 握住四指同向背伸'}]:view==='ref-62-pair'?[{file:'flat-pov-v3.png',view:'ref-62-flat',title:'① 掌心向上 · 手腕放平'},{file:'up-pov-v3.png',view:'ref-62-up',title:'② 保持前臂 · 向天空弯起'}]:[{file:'wrist-clap-v4.png',view:'ref-65-volar',title:'① 鼓掌式掌心相对 · 仅腕掌侧接触'},{file:'sheet-v2.png',tile:2,view:'ref-65-edge',title:'② 双手小指侧掌缘相互接触'}];
 return <div className="reference-comparison repair-comparison" aria-label="两幅动作对照">{items.map(item=><figure key={item.file}><figcaption>{item.title}</figcaption><div className="reference-comparison-picture"><SheetImage src={folder+item.file} tile={item.tile} alt={item.title} onError={onError}/>{points&&<ReferenceRepairOverlay view={item.view}/>}</div></figure>)}</div>;
}
export function ReferenceRepairOverlay({view,mirror=false}:{view:string;mirror?:boolean}){
 const uid='ref-'+useId().replaceAll(':','');let geometry:ReactNode=null,labels:ReactNode=null,title='',detail='';
 const arrow=(d:string,dashed=false)=><path d={d} fill="none" stroke={dashed?brown:green} strokeWidth={4.5} strokeDasharray={dashed?'10 9':undefined} markerEnd={`url(#${uid})`} strokeLinecap="round"/>;
 const line=(d:string,color=orange)=><path d={d} fill="none" stroke={color} strokeWidth={3}/>;
 if(view==='ref-60-fist'||view==='ref-60-grip'){
  const fist=view==='ref-60-fist';geometry=<><ellipse cx={fist?578:605} cy={fist?325:353} rx={30} ry={49} fill="none" stroke={orange} strokeWidth={4}/>{line(fist?'M585 376L585 705':'M605 405L605 705')}</>;title=fist?'拳掌根面 → 四指中间关节':'握四指 · 拇指在被操作手背侧';detail='前臂水平固定 · 保持10秒后松开回正';
 }else if(view==='ref-60-ready'||view==='ref-60-release'){title=view==='ref-60-ready'?'屈肘，前臂水平，四指伸直':'松开辅助用手，手腕回正';detail='同一只手完成拳助和握指，再换手';
 }else if(view==='ref-61-spread'){
  geometry=<g data-web-spaces="8" stroke={green} strokeWidth={4} fill="none">{[[168,405],[243,355],[342,365],[408,431],[590,431],[659,365],[757,355],[835,405]].map(([x,y],i)=><path key={i} d={`M${x-15} ${y+22}L${x} ${y-12}L${x+15} ${y+22}`}/>)}</g>;title='十指充分外展 · 每个指缝尽可能大';detail='充分张开 → 双手握拳，共20次';
 }else if(view==='ref-62-flat'||view==='ref-62-up'){
  const up=view==='ref-62-up';geometry=<><circle cx={up?458:510} cy={up?490:292} r={23} fill="none" stroke={orange} strokeWidth={4}/>{line(up?'M435 515L205 610':'M486 305L205 610')}{up&&arrow('M760 375 Q875 240 770 145')}<path d="M350 625L307 790" stroke={green} strokeWidth={4} strokeDasharray="8 8"/></>;labels=<Tag text="拇指同处接触" x={205} y={650} w={330} color={orange}/>;title=up?'只在腕部向天空弯起 · 四指伸直':'掌心向上 · 手腕与前臂放平';detail='前臂不动，拇指不滑动 · 一弯一放计1次';
 }else if(view==='ref-63-map'){
  geometry=<>{region('M400 602 Q510 582 620 602L628 704Q510 686 390 710Z')}<g data-wrist-row="joint">{dots(along([420,622],[600,622],6),'rotate',13)}</g><g data-wrist-row="forearm">{dots(along([420,679],[600,679],6),'rotate',13)}</g>{line('M622 622L800 622')}{line('M628 679L800 750')}</>;
  labels=<><Tag text="① 腕关节" x={mirror?180:820} y={575} w={300}/><Tag text="② 朝前臂约一指宽" x={mirror?220:780} y={785} w={410}/></>;title='两行横向覆盖腕掌侧区域';detail='每点3–5圈 · 抬指换点 · 点数和顺序不限';
 }else if(view==='ref-63-contact'){
  geometry=<ContactSymbol x={590} y={505} kind="rotate" r={24}/>;title=`${mirror?'右':'左'}拇指转压${mirror?'左':'右'}腕掌侧`;detail='每点3–5圈，抬起拇指再换点';
 }else if(view==='ref-63-release'){title='拇指抬起离肤，再换到下一点';detail='四指仍在手背侧支撑';
 }else if(view.startsWith('ref-64-')){
  const map=view==='ref-64-map',release=view==='ref-64-release';
  // Each source tile places the receiving wrist differently. Trace the wrist
  // crease on that tile, not the hovering operating fingers.
  const band=map?'M383 551Q480 537 602 565L602 609Q475 579 374 600Z':release?'M610 547Q703 522 808 538L807 578Q704 557 615 587Z':'M555 547Q647 524 753 536L753 575Q650 556 555 584Z';
  geometry=<>{region(band)}{!release&&<ellipse cx={map?477:598} cy={map?578:557} rx={34} ry={17} fill="none" stroke={orange} strokeWidth={4}/>}</>;
  labels=<Tag text="绿色横带：腕关节掌心侧" y={750} w={680} color={green}/>;title=release?'双指离开，腕部仍保持放平':'双指指腹固定在腕关节处拍打';detail=release?'准备与离开都对准这段腕横纹':'每侧20–30次 · 前臂保持不动';
 }else if(view==='ref-65-volar'){
  geometry=<><path d="M501 521L501 550" stroke={orange} strokeWidth={7} strokeLinecap="round"/>{arrow('M395 630L484 556')}{arrow('M620 637L519 557')}</>;title='掌心相对，只有腕掌侧互拍';detail='手掌和手指分开 · 第一段20–30次';
 }else if(view==='ref-65-edge'){
  geometry=<path d="M500 350L500 510" stroke={orange} strokeWidth={8} strokeLinecap="round"/>;title='小指侧手掌边缘相互接触';detail='第二段：互拍20–30次';
 }else if(view==='ref-67-map'){
  const foot='M479 840Q395 895 329 804Q318 745 307 672Q260 552 246 430Q199 347 200 288Q205 252 232 260Q219 210 246 202Q268 192 276 225Q252 162 280 151Q302 139 322 192Q299 129 329 119Q354 108 372 157Q350 90 389 96Q430 90 450 158Q485 246 493 350L488 714Q504 795 479 840Z';
  const pts:number[][]=[];for(let y=300;y<=800;y+=63)for(let x=340;x<=450;x+=55)pts.push([x,y]);pts.push([239,291],[269,238],[303,198],[346,174],[404,163],[290,365],[309,430]);
  geometry=<>{[false,true].map((flip)=><g key={String(flip)} transform={flip?'translate(1000 0) scale(-1 1)':undefined}>{region(foot)}{dots(pts,'rotate',12)}</g>)}</>;labels=<Tag text="脚掌心区域：趾腹 · 前掌 · 足弓 · 脚跟" y={63} w={920} color={green}/>;title='整个脚掌心侧逐点覆盖';detail='每点3–5圈 · 双脚同时 · 一遍';
 }else if(view==='ref-68-body'){
  // Leave the full sitting pose unobstructed; its instructions are below it.
  return null;
 }else if(view.startsWith('ref-68-')){
  const contact=view==='ref-68-contact';
  if(contact){geometry=<><circle cx={363} cy={485} r={27} fill="none" stroke={orange} strokeWidth={5}/>{line('M370 520L370 742')}</>;title='拇指按内侧，四指从背侧环抱支撑';detail='接触手型特写 · 实际两侧同时';}
  else{const pts=along([755,535],[190,478],25);geometry=<>{region('M775 510L790 566Q480 575 175 510L179 442Q470 515 775 510Z')}{dots(pts,'press',9)}{arrow('M753 457Q478 420 205 398')}{view==='ref-68-map'&&arrow('M215 696Q500 760 759 665',true)}{view==='ref-68-start'&&<circle cx={755} cy={535} r={24} fill="none" stroke={orange} strokeWidth={4}/>} {view==='ref-68-end'&&<circle cx={190} cy={478} r={24} fill="none" stroke={orange} strokeWidth={4}/>}</>;
   labels=<><Tag text="终点：膝盖下方" x={220} y={282} w={380}/><Tag text="起点：脚踝附近" x={750} y={760} w={380}/>{line('M220 312L190 443',green)}{line('M750 730L755 559',green)}</>;title='小腿内侧中线 · 从踝附近逐点向膝下';detail='每点保持3–5秒 · 松开换点 · 共2–3遍';}
 }else if(view==='ref-69-thigh-press'||view==='ref-69-thigh-release'){
  const release=view.endsWith('release');
  if(!release)geometry=<ellipse cx={468} cy={350} rx={67} ry={75} fill="none" stroke={orange} strokeWidth={4}/>;
  title=release?'同点完成后抬掌，再移到上方下一点':'掌心包握大腿内侧 · 跳过膝关节';
  detail='每点按3–5下，每下松力 · 沿内侧到大腿根';
 }else if(view==='ref-69-press'||view==='ref-69-release'||view==='ref-69-press-upper'){
  const release=view==='ref-69-release';
  if(!release)geometry=<ellipse cx={view.endsWith('upper')?557:680} cy={view.endsWith('upper')?558:445} rx={61} ry={92} fill="none" stroke={orange} strokeWidth={4}/>;
  title=release?'同点按完后，抬掌再向上换点':'掌心包握内侧 · 四指环抱腿后侧';
  detail=release?'每点3–5下，每一下按后先松力':'第一视角接触近景 · 实际双侧同时';
 }else if(view==='ref-69-map'){
  const calf=along([385,720],[148,452],20),thigh=along([200,414],[337,545],13);
  geometry=<>{[false,true].map(flip=><g key={String(flip)} transform={flip?'translate(1000 0) scale(-1 1)':undefined}>{region('M405 720L368 741L124 464L164 430Z')}{region('M180 420L209 395L357 532L325 561Z')}{dots(calf,'press',9)}{dots(thigh,'press',9)}{arrow('M361 751L121 485')}{arrow('M115 435Q63 330 190 385',true)}{arrow('M211 377L373 535')}<ellipse data-excluded-region="knee" cx={112} cy={372} rx={65} ry={46} fill={paper} fillOpacity={.4} stroke={brown} strokeWidth={3} strokeDasharray="9 7"/></g>)}</>;
  labels=<><Tag text="膝关节：抬掌跳过" y={230} w={560} color={brown}/>{line('M250 253L145 340',brown)}{line('M750 253L855 340',brown)}<Tag text="到大腿根部" y={610} w={330}/><Tag text="起点：两侧脚踝附近" y={850} w={600}/></>;title='沿小腿内侧 → 跳膝 → 沿大腿内侧';detail='每点按3–5下，每下松力 · 两侧同时一遍';
 }else if(view==='ref-70-map'){
  const upper:number[][]=[],lower:number[][]=[];
  for(let row=0;row<7;row++)for(let col=0;col<7;col++){const y=135+row*28,x=615+col*25;if((row<2&&col<1)||(row===6&&col===6))continue;upper.push([x,y]);lower.push([1000-x,1000-y-125]);}
  geometry=<>{region('M620 103Q770 95 795 205L813 314Q725 352 579 318L551 277Q597 188 620 103Z')}{region('M380 772Q230 780 205 670L187 561Q275 523 421 557L449 598Q403 687 380 772Z')}{dots(upper,'rotate',10)}{dots(lower,'rotate',10)}</>;labels=<><Tag text="脚踝内侧 · 整片区域" x={310} y={90} w={520} color={green}/><Tag text="分视近景 · 双侧同时" x={690} y={515} w={520}/></>;title='密排点位，覆盖整个内踝区域';detail='每点3–5圈，抬指再换点 · 一遍';
 }
 if(view.endsWith('-pair'))return null;
 return <svg className="point-overlay reference-repair-overlay" data-reference-view={view} viewBox="0 0 1000 1000" role="img" aria-label={title+'；'+detail}><defs><marker id={uid} markerWidth={9} markerHeight={9} refX={7} refY={4.5} orient="auto"><path d="M1 1L7 4.5L1 8" fill="none" stroke={green} strokeWidth={1.6}/></marker></defs><g transform={mirror?'translate(1000 0) scale(-1 1)':undefined}>{geometry}</g>{labels}<Tag text={title} y={910}/><Tag text={detail} y={973}/></svg>;
}
