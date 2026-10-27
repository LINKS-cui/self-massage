import {PressMapExamples} from '../PressMapExamples';
import {ContactSymbol} from '../ContactSymbol';
import {useId,type ReactNode} from 'react';
import './neck-batch.css';

const orange='#c34c2f',green='#087f74',ink='#403b33';
export const isNeckBatch=(id:string)=>/^SM-0(3[1-9]|40)$/.test(id);
function Point({x,y,support=false,example=false}:{x:number;y:number;support?:boolean;example?:boolean}){
 const color=support?green:orange;
 return <g data-contact={support?'support':example?'example':'active'}><circle cx={x} cy={y} r={example?13:17} fill="#fffaf0" stroke={color} strokeWidth="5"/>{!example&&<circle cx={x} cy={y} r="8" fill={color}/>}</g>;
}
function Label({x=500,y=855,lines,width=670,color=ink}:{x?:number;y?:number;lines:string[];width?:number;color?:string}){
 return <g className="neck-label"><rect x={x-width/2} y={y-33} width={width} height={lines.length*43+16} rx="13" fill="#fffaf0" fillOpacity=".97" stroke={color} strokeWidth="2"/>{lines.map((t,i)=><text key={t} x={x} y={y+i*43} dy=".15em" textAnchor="middle" fill={color} fontSize="30" fontWeight="650">{t}</text>)}</g>;
}
function Area({d,color=green}:{d:string;color?:string}){return <path data-region="true" d={d} fill={color} fillOpacity=".17" stroke={color} strokeWidth="4" strokeDasharray="10 7"/>;}
function Lead({d,color=orange}:{d:string;color?:string}){return <path d={d} fill="none" stroke={color} strokeWidth="3"/>;}

/** Coordinates follow the inspected quadrant, in a 1000 × 1000 frame. */
export function NeckBatchOverlay({id,phase,pose,map}:{id:string;phase:number;pose:number;map:boolean}){
 const uid=useId().replaceAll(':',''),arrow=`neck-arrow-${uid}`;
 const motion=(d:string,kind:string,twoWay=false)=><path data-motion={kind} d={d} fill="none" stroke={green} strokeWidth="7" strokeLinecap="round" markerEnd={`url(#${arrow})`} markerStart={twoWay?`url(#${arrow})`:undefined}/>;
 let content:ReactNode;
 if(id==='SM-031'){
  const rear=map||phase===2;
  content=rear?<><Area color={orange} d="M370 610 Q500 580 630 610 L635 790 Q500 840 365 790Z"/><Lead d="M630 700H760V795"/><Label lines={['双掌夹持后颈 · 同一位置','十指交叉，向后提，不上下换点']}/></>:phase===1?<><Area color={orange} d="M270 510 Q390 465 455 620 L410 695 Q275 690 245 600Z"/>{motion('M255 695H75','backward')}<Label lines={['向后远离后颈 · 头保持直立','夹提 3–5 秒，然后松开']}/></>:<><Area color={orange} d="M300 515 Q500 465 700 515 L710 690 Q500 765 290 690Z"/><Label lines={phase===0?['十指交叉 · 双掌夹住后颈','虚线区域为掌下接触位置']:['原位重复 5–10 次 · 1 组']}/></>;
 }else if(id==='SM-032'){
  if(map||phase===2||phase===4)content=<><Point x={380} y={525}/><Point x={620} y={525}/><Lead d="M380 545L300 750M620 545L700 750"/><Label lines={map?['左右换侧 · 每次只按一侧','同侧 4–6 次，再换另一侧']:phase===2?['松开拇指 · 头回正','同侧做完 4–6 次后换侧']:['左右各 4–6 次 · 整套一轮','图上点位仅作位置参照']}/></>;
  else {
   const left=phase===3,x=left?575:430,y=left?470:535;
   content=<><Point x={x} y={y}/><Point x={left?335:phase===0?750:590} y={left?190:phase===0?300:240} support/><Lead d={left?'M590 485L720 660':'M415 550L265 680'}/>{phase!==0&&motion(left?'M240 490Q125 345 220 250':'M780 535Q900 370 830 285','head-extension')}<Label lines={phase===0?['右拇指定点 · 左手扶左额','四指扶后脑，先吸一口气']:left?['左拇指定点 · 右手扶右额','先吸气；抬头及保持时持续吐气']:['定点抬头 · 保持 5–10 秒','抬头与保持时，持续吐气']}/></>;
  }
 }else if(id==='SM-033'){
  const rear=map||phase===2;const x1=rear?385:440,x2=rear?615:605,y=rear?605:560;
  content=<><Point x={x1} y={y}/><Point x={x2} y={y}/>{!rear&&<><Point x={310} y={245} support/><Point x={710} y={245} support/></>}{(map||phase===1)&&<>{motion('M190 530V300','upward-force')}{motion('M810 530V300','upward-force')}</>}<Label lines={map?['接触点固定 · 整个头向上顶提','绿色箭头是发力方向，不是滑动路线']:phase===0?['双拇指放后颈 · 四指扶头侧','背挺直，头自然直立']:phase===1?['先吸气；向上发力 3–5 秒并吐气','拇指不滑动 · 头不后仰']:phase===2?['发力结束 · 不额外停留','点位仅作接触位置参照']:['重复 8–10 次 · 1 组']}/></>;
 }else if(id==='SM-034'){
  const right=phase===1,left=phase===3;
  content=<>{right?<><Point x={665} y={225}/>{motion('M295 305Q190 355 190 485','right-side-bend')}<Label lines={['右手扶左头侧 · 向自己右侧倾','先吸气；下压及保持 10 秒时吐气']}/></>:left?<><Point x={345} y={235}/>{motion('M705 305Q810 355 810 485','left-side-bend')}<Label lines={['左手扶右头侧 · 向自己左侧倾','先吸气；下压及保持 10 秒时吐气']}/></>:<>{map&&<>{motion('M320 170Q220 200 210 360','right-side-bend')}{motion('M680 170Q780 200 790 360','left-side-bend')}</>}<Label lines={map?['只侧倾 · 不转头、不低头','左右指练习者自身，逐侧交替']:phase===0?['双肩自然放松 · 头自然直立','左右均以练习者自身为准']:phase===2?['保持结束 · 松手回正','回到自然直立，再换侧']:['左右交替 · 每侧 2 次','每次保持结束，松手回正']}/></>}</>;
 }else if(id==='SM-035'){
  const reverse=phase===2&&!map;
  const tile=reverse?[0,3,2,1][pose]:pose;
  const positions:[[number,number],[number,number],[number,number],[number,number]]=[[510,720],[500,610],[770,355],[445,565]];
  const point=phase===0||map?[500,560]:positions[tile];
  content=<><Point x={point[0]} y={point[1]} support/>{(map||phase>0)&&<g transform="translate(0 140)" data-circle-direction={reverse?'counterclockwise':'clockwise'}>{motion(reverse?'M180 620A75 75 0 1 0 95 550':'M180 620A75 75 0 1 1 265 550',reverse?'counterclockwise':'clockwise')}<text x="180" y="665" textAnchor="middle" fontSize="28" fill={green}>{reverse?'逆时针':'顺时针'}</text></g>}<Label lines={map?['低头、侧倾、仰头 · 完整绕圈','先顺 10 圈 → 直接反向再 10 圈']:phase===0?['双手自然下垂 · 放松颈部','头自然直立，背部挺直']:reverse?['直接反向 · 逆时针 10 圈','不先回正停顿；分解图不是节拍']:['先顺时针 · 完整绕 10 圈','经过低头、两侧侧倾与仰头']}/></>;
 }else if(id==='SM-036'){
  content=map?<><Point x={670} y={610}/>{motion('M760 760V640','chin-lift')}<Lead d="M652 625L510 750"/><Label lines={['双拇指指腹 · 下巴下方','侧面点仅标示接触区域']}/></>:phase===2?<Label lines={['停止上顶 · 头回正','回到自然直立，再开始下一次']}/>:<><Point x={phase===1?645:565} y={phase===1?550:645}/><Point x={phase===1?705:635} y={phase===1?555:650}/>{phase===1&&<>{motion('M620 725V605','chin-lift')}{motion('M770 725V605','chin-lift')}</>}<Label lines={phase===0?['双拇指顶下巴 · 四指并拢朝上','头自然直立，先吸一口气']:phase===1?['上顶后仰 · 保持 10 秒','后仰及保持期间持续吐气']:['重复 4–6 次 · 整套 1 组','先吸气，再上顶后仰并吐气']}/></>;
 }else if(id==='SM-037'){
  content=map?<><Area color={orange} d="M365 90Q500 30 655 90L630 205Q500 150 390 205Z"/>{motion('M175 200V360','palms-down')}<Label lines={['双掌并排接触头顶','两肘向前收拢 · 低头并下压']}/></>:phase===2?<Label lines={['停止下压 · 头回正','回到自然直立，再开始下一次']}/>:phase===1?<><ContactSymbol x={500} y={155} kind="press"/><Area color={orange} d="M420 115Q515 70 610 125L640 225Q545 220 455 185Z"/>{motion('M340 175V330','palms-down')}<Label lines={['低头并向下压 · 保持 10 秒','低头与保持期间持续吐气']}/></>:<><ContactSymbol x={460} y={120} kind="press"/><ContactSymbol x={620} y={135} kind="press"/><Area color={orange} d="M390 90Q470 35 535 85L540 175L390 170Z"/><Area color={orange} d="M560 75Q635 50 700 130L675 205L550 170Z"/><Label lines={phase===0?['双手并排放头顶 · 手指不交叉','两肘向前收拢，先吸气']:['重复 4–6 次 · 1 组','每次停止下压后，头回正']}/></>;
 }else{
  const n=Number(id.slice(3)),overview=map||phase===2;
  let region:ReactNode;let dots:number[][];
  if(n===38){
   region=<Area d="M300 350Q365 235 480 300L515 390Q490 430 455 415Q400 380 320 405Z"/>;
   dots=overview?[[406,292],[361,317],[391,317],[421,317],[451,317],[346,342],[376,342],[406,342],[436,342],[466,342],[331,367],[361,367],[391,367],[421,367],[451,367],[481,367],[466,392],[496,392]]:phase===0?[[295,445],[718,443]]:[[307,440],[690,440]];
  }else if(n===39){
   region=<Area d="M414 307C356 294 307 331 301 395C290 467 325 531 395 558L437 525C383 500 349 459 349 405C350 366 369 345 413 350Z"/>;
   dots=overview?[[370,320],[400,320],[355,345],[340,370],[325,395],[323,420],[325,445],[340,470],[355,495],[370,520],[400,520]]:phase===0?[[335,435],[682,435]]:[[350,535],[655,535]];
  }else{
   region=<Area d="M300 245Q500 70 705 245L720 490Q660 620 500 625Q340 620 280 490Z"/>;
   dots=overview?[[390,295],[570,270],[650,375],[350,430],[500,420],[590,540],[440,550]]:phase===0?[[420,530],[590,530]]:[[440,420],[565,420]];
  }
  content=<>{overview&&region}{dots.map(([x,y],i)=><ContactSymbol key={i} x={x} y={y} r={overview?(n===40?24:n===39?12:13):24} reverse={i%2===1}/>)}{!overview&&<><Lead color={green} d="M420 155L470 250M600 155L550 250"/><Label y={285} width={330} color={green} lines={['其余四指扶头顶']}/></>}<Label lines={overview?(n===39?['紧贴耳后轮廓 · 每点转压 3–5 圈','侧面显示一侧位置，实际两侧同时']:n===38?['整片区域逐点转压 · 每点 3–5 圈','螺旋表示转压，不限定点数或转向']:['区域内逐点转压 · 每点 3–5 圈','示例点不限定点数或先后顺序']):phase===0?['拇指指腹转压 · 双侧同时','图中为区域内的位置示例']:['每点转压 3–5 圈 · 无时间要求','另一位置示例，不表示换点顺序']}/></>;
 }
 return <svg className="point-overlay neck-batch-overlay" viewBox="0 0 1000 1000" role="img" aria-label={`${id} ${map?'点位总览':'当前步骤点位与方向'}`} data-neck-overlay={id} data-map={map}>
 <defs><marker id={arrow} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto-start-reverse" markerUnits="strokeWidth"><path d="M1 1L7 4.5L1 8" fill="none" stroke={green} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></marker></defs>
 {content}
 <PressMapExamples id={id} phase={phase} map={map}/></svg>;
}
