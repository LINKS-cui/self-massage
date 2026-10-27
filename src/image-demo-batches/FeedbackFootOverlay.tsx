import {useId,type ReactNode} from 'react';
import type {ImageDemoDefinition} from '../image-demos';
import {ContactSymbol} from '../ContactSymbol';
import batch from './managed-081-090.json';
import './feedback-foot.css';

export const feedbackFootIds=['SM-083','SM-086','SM-087','SM-089'];
const green='#087d70',orange='#b84e2c',brown='#82654d',paper='#fffaf0';
const defs=batch as unknown as Record<string,ImageDemoDefinition>;
function Label({x=500,y,w=850,children}:{x?:number;y:number;w?:number;children:ReactNode}){return <g><rect x={x-w/2} y={y-25} width={w} height={50} rx={8} fill={paper} fillOpacity={.97} stroke="#343a32" strokeWidth={1.6}/><text x={x} y={y+9} textAnchor="middle" fontSize={26} fill="#343a32" fontWeight={650}>{children}</text></g>}
function Dot({x,y,r=10}:{x:number;y:number;r?:number}){return <circle cx={x} cy={y} r={r} fill={paper} stroke={orange} strokeWidth={4}/>}
function Zone({d}:{d:string}){return <path d={d} fill={green} fillOpacity={.10} stroke={green} strokeWidth={4} strokeDasharray="10 8"/>}
export default function FeedbackFootOverlay({id,phase:p,map,pose=0}:{id:string;phase:number;map:boolean;pose?:number}){
 const uid=useId().replaceAll(':',''),d=defs[id];
 const arrow=(path:string,dash=false)=> <path d={path} fill="none" stroke={dash?brown:green} strokeWidth={5} strokeDasharray={dash?'10 8':undefined} markerEnd={`url(#${uid}-${dash?'back':'go'})`}/>;
 let body:ReactNode,foot='',sub='';
 if(id==='SM-083'){
  const left=!map&&p>=4,full=!map&&p===0&&pose===1,dorsal=!map&&(p===3||p===6);
  const coverage=map||p===2||p===5;
  const dorsalRows=[[320,365,545],[365,355,625],[410,355,625],[455,360,625],[500,365,625],[545,370,625],[590,375,625],[635,380,620],[675,405,585]];
  const ankleRows=[[275,235,370],[320,220,400],[365,210,435],[410,200,445],[455,195,445],[500,215,445],[545,260,440],[565,305,395]];
  const coverageDots=(rows:number[][])=><g data-coverage-points={dorsal?'dorsum':'outer-ankle'}>{rows.flatMap(([y,start,end],row)=>Array.from({length:Math.floor((end-start)/45)+1},(_,col)=><g key={row+'-'+col} data-coverage-point><ContactSymbol x={start+col*45} y={y} r={12}/></g>))}</g>;
  body=full?<Label y={140}>沿用82坐姿 · 同侧手操作同侧脚</Label>:<>
   <g transform={left?'translate(1000 0) scale(-1 1)':undefined}>
    {dorsal?<><Zone d="M330 300 Q490 280 650 340 L640 685 Q520 730 365 680Z"/>{coverageDots(dorsalRows)}<ContactSymbol x={475} y={470} r={24}/></>:<>
     {coverage?<><Zone d="M205 260 Q385 215 470 390 L455 570 Q280 600 170 490Z"/>{coverageDots(ankleRows)}<ContactSymbol x={335} y={395} r={24}/></>:p===1||p===4?<ContactSymbol x={335} y={395} r={24}/>:null}
    </>}
   </g>
   <Label y={760}>{dorsal?`${left?'左':'右'}脚：第二区域 · 整个脚背`:`${left?'左':'右'}脚：第一区域 · 脚踝外侧`}</Label>
   <Label y={840}>{map?'两脚均须完成：外踝区 → 脚背区':dorsal?'本侧外踝区完成后，才进入脚背区':'外踝区全部做完，再操作本侧脚背'}</Label>
  </>;
  foot='每点转按 3–5 圈 · 抬指换点';sub='左右脚都先外踝、再脚背；点数与转按方向不固定';
 }else if(id==='SM-086'){
  const coverage=map||p>=3,left=!map&&p===5;
  body=<>
   <g transform={left?'translate(1000 0) scale(-1 1)':undefined}>
    {coverage?<g data-coverage-region="dorsum"><Zone d="M365 275 Q500 240 650 330 L640 700 Q500 750 360 680Z"/>{[[420,420],[520,420],[600,440],[410,550],[510,550],[600,560],[410,670],[510,680],[595,670]].map(([x,y],i)=><g key={i} data-example-point><Dot x={x} y={y}/>{arrow(`M${x} ${y-18} L${x} ${y-83}`)}</g>)}</g>:p===2?<><Dot x={296} y={295}/><Dot x={735} y={295}/>{arrow('M296 315 Q315 460 450 455',true)}{arrow('M735 315 Q715 460 580 455',true)}</>:<><Dot x={p===1?445:450} y={p===1?330:455}/><Dot x={580} y={p===1?345:455}/>{p===1&&<>{arrow('M445 450 L445 285')}{arrow('M585 450 L585 300')}</>}</>}
   </g>
   <Label y={810}>{coverage?'区域内换点覆盖 · 箭头均朝脚趾':p===2?'双拇指抬起，离肤回到各自起点':'双拇指在不同点位，同时短推'}</Label>
  </>;
  foot='每推约 3–5 厘米 · 每点 2–3 次';sub='点与箭头为覆盖示例，不限定点数、排数或先后顺序';
 }else if(id==='SM-089'){
  const left=p===5&&!map,back=!map&&(p===3||p===4||(p===5&&pose===1));
  const overview=map||p===2||p===4;
  body=<>
   <g transform={left?'translate(1000 0) scale(-1 1)':undefined}>
    {overview?<>
     <path d="M450 320 Q412 455 414 650 M540 320 Q580 455 574 650" fill="none" stroke={green} strokeWidth={5} strokeDasharray="10 8" markerEnd={`url(#${uid}-go)`}/>
     {[[445,360],[425,470],[415,590],[550,360],[570,470],[575,590]].map(([x,y],i)=><Dot key={i} x={x} y={y}/>)}
    </>:p===0?null:back?<><Dot x={566} y={362}/><Dot x={394} y={440}/><path d="M566 362 L780 230 M394 440 L210 360" fill="none" stroke={orange} strokeWidth={3}/></>:<><Dot x={425} y={445}/><Dot x={605} y={430}/><path d="M425 445 L215 280 M605 430 L780 300" fill="none" stroke={orange} strokeWidth={3}/></>}
   </g>
   {overview?<><Label x={760} y={210} w={330}>脚踝开始</Label><Label x={775} y={660} w={360}>{back?'到腿窝下方':'到膝盖下方'}</Label><Label y={780}>两侧相向夹捏 · 不是按胫骨正中</Label></>:p===0?<Label y={180}>第一视角 · 左手扶右膝，右手操作</Label>:<>
    <Label x={left?770:230} y={240} w={340}>{back?'四指在内侧':'拇指在内侧'}</Label>
    <Label x={left?230:770} y={300} w={340}>{back?'拇指在外侧':'四指在外侧'}</Label>
   </>}
  </>;
  foot=left?'左腿：左手操作，右手扶膝':map?'右腿第一视角：内侧在左，外侧在右':back?'后握：右拇指在画面右，四指在左':'前握：右拇指在画面左，四指在右';
  sub='每点抓放3–5次，捏后即松；两段都从脚踝重新向上';
 }else{
  const bare=map||p===4;
  body=<>
   {bare?[[275,300],[467,300],[600,335],[691,380],[775,450]].map(([x,y],i)=><g key={i}><Dot x={x} y={y}/><text x={x} y={y-22} textAnchor="middle" fontSize={27} fill={orange}>{i+1}</text></g>):p===3?<><Dot x={555} y={315}/>{arrow('M555 275 L555 170')}</>:p===2?<><Dot x={380} y={325}/><Dot x={625} y={350}/>{arrow('M380 285 L380 175')}{arrow('M625 310 L625 200')}</>:<><Dot x={305} y={275}/><Dot x={765} y={360}/>{p===1&&<>{arrow('M305 235 L305 125')}{arrow('M765 320 L765 205')}</>}</>}
   <g data-joint-detail="first-from-root" transform="translate(60 650)">
    <rect width={880} height={240} rx={15} fill={paper} stroke={brown} strokeWidth={2}/>
    <text x={440} y={38} textAnchor="middle" fontSize={27} fill="#343a32">第2／3／4趾侧面：从趾根往趾尖数</text>
    <path d="M95 115 Q230 95 365 112 L585 115 Q700 100 760 128 Q800 150 750 165 L585 165 L365 168 Q220 175 95 160" fill="#efc9a4" stroke={brown} strokeWidth={3}/>
    <path d="M365 112 L365 168 M585 115 L585 165 M665 118 L740 127" stroke={brown} strokeWidth={3}/>
    <Dot x={365} y={112} r={14}/>
    <text x={95} y={203} textAnchor="middle" fontSize={25} fill={brown}>趾根</text><text x={365} y={203} textAnchor="middle" fontSize={25} fill={orange}>第一处关节</text><text x={760} y={203} textAnchor="middle" fontSize={25} fill={brown}>趾尖</text>
   </g>
  </>;
  foot='拇指接触：趾根往趾尖的第一处关节';sub='沿趾向趾尖牵拉10秒后松开；接触处不沿皮肤滑动';
 }
 return <svg className="point-overlay feedback-foot-overlay" viewBox="0 0 1000 1000" role="img" aria-label={`${id} ${map?d.mapTitle:d.phases[p].title}；${foot}；${sub}`}>
  <defs>{[['go',green],['back',brown]].map(([k,c])=><marker key={k} id={`${uid}-${k}`} viewBox="0 0 12 12" refX={10} refY={6} markerWidth={5} markerHeight={5} orient="auto"><path d="M1 1 L10 6 L1 11" fill="none" stroke={c} strokeWidth={2.3}/></marker>)}</defs>
  <g transform="translate(90 90) scale(.82)">{body}</g>
  <Label x={555} y={48} w={850}>{map?d.mapTitle:d.phases[p].title}</Label><Label y={928} w={970}>{foot}</Label><Label y={978} w={970}>{sub}</Label>
 </svg>;
}
