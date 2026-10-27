import BRepairOverlay,{bRepairIds} from './BRepairOverlay';
import type {ReactNode} from 'react';
import './managed-101-110.css';
export const ids=Array.from({length:10},(_,i)=>`SM-${i+101}`);
const green='#157b6c',orange='#bc542b',brown='#8a6c50',ink='#393e34',paper='#fffaf0';
type Props={id:string;phase:number;map:boolean;pose?:number};
export default function Managed101110({id,phase:p,map,pose=0}:Props){
 const key=`m101110-${id}-${map?'map':p}`;
 if(bRepairIds.includes(id))return <BRepairOverlay id={id} phase={p} map={map} pose={pose}/>;
 const line=(d:string,c=green,dash=false,w=4)=><path d={d} fill="none" stroke={c} strokeWidth={w} strokeDasharray={dash?'10 8':undefined} strokeLinecap="round" strokeLinejoin="round"/>;
 const arrow=(d:string,c=green,dash=false)=><path d={d} fill="none" stroke={c} strokeWidth="5" strokeDasharray={dash?'10 8':undefined} strokeLinecap="round" markerEnd={`url(#${key}-${c===brown?'brown':'green'})`}/>;
 const point=(x:number,y:number,r=13)=><g><circle cx={x} cy={y} r={r} fill={paper} fillOpacity=".65" stroke={orange} strokeWidth="4"/><circle cx={x} cy={y} r="4" fill={orange}/></g>;
 const ring=(x:number,y:number,rx=30,ry=rx,c=orange)=><ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke={c} strokeWidth="4"/>;
 const tag=(s:string,x:number,y:number,w=320,c=ink)=><g><rect x={x-w/2} y={y-25} width={w} height="48" rx="8" fill={paper} fillOpacity=".96" stroke={c} strokeWidth="1.5"/><text x={x} y={y+9} fontSize="28" textAnchor="middle" fill={c} fontWeight="650">{s}</text></g>;
 let marks:ReactNode=null;let title='';let a='';let b='';
 if(id==='SM-101'){
  const sky=map||p===1||p===3;
  if(sky){marks=<>{point(242,604)}{point(304,576)}{line('M 245 560 L 245 280')}{line('M 317 552 L 317 278')}{tag('经过朝天位置',680,200,370)}{tag('两臂同时，方向相反',680,290,440)}</>;}
  else {const swapped=p===2;marks=<>{point(swapped?405:590,285)}{point(swapped?600:375,325)}{tag(swapped?'右臂头侧':'左臂头侧',swapped?210:790,150,240)}{tag(swapped?'左臂脚侧':'右臂脚侧',swapped?800:185,580,240)}</>;}
  title=map?'双臂伸直 · 交替摆动':p===0?'起势：一臂头侧，一臂脚侧':p===1?'去程：同时经过朝天':p===2?'交换头侧与脚侧':p===3?'回程：再同时经过朝天':p===4?'回到最初位置':'完整来回共 20 次';
  a='交换 → 摆回起势，才算 1 次';b='共 20 次；经过位置不要求停顿';
 }
 if(id==='SM-102'){
  const vertical=[3,4,7,8].includes(p)&&!map,right=p>=5&&!map;
  if(!vertical){const x=right?370:610;marks=<>{point(x,210)}{line(right?'M 340 210 L 100 210':'M 650 210 L 875 210')}{ring(right?200:800,520,140,55,green)}{line(right?'M 60 600 L 340 600':'M 660 600 L 940 600',brown,true)}{tag('水平面示意',right?200:800,660,280)}{tag(right?'右肩':'左肩',right?190:800,320,160,orange)}</>;}
  else {const sx=right?730:265;marks=<>{point(sx,555)}{line(right?'M 724 510 L 710 260':'M 268 510 L 275 260')}{ring(right?350:660,340,110,145,green)}{line(right?'M 180 510 L 520 510':'M 490 510 L 830 510',brown,true)}{tag('头脚竖直面示意',right?350:660,570,400)}{tag('可略倾斜，避开地面',500,780,510)}</>;}
  title=map?'先左臂，后右臂':`${right?'右':'左'}直臂 · ${vertical?'沿头脚的竖直圈':'与地面平行的水平圈'}`;
  a=map?'每个平面：一个方向 10 圈 → 反向 10 圈':p===0?'先左肩为圆心，左臂伸直':([2,4,6,8].includes(p)?'同一平面反方向 10 圈':'先按一个方向画 10 圈');
  b=map?'每臂先水平后竖直，合计 40 圈':'左臂两段全做完，再换右臂；初始旋向不限';
 }
 if(id==='SM-103'){
  const sky=map||p===1||p===3,overhead=p===2&&!map;
  marks=sky?<>{point(235,620)}{point(305,565)}{arrow(p===3&&!map?'M 170 250 Q 510 160 580 570':'M 580 570 Q 510 160 170 250',p===3&&!map?brown:green,p===3&&!map)}{tag(p===3&&!map?'原路径回位':'同时经过朝天',730,220,360)}</>:overhead?<>{point(90,505)}{point(55,540)}{tag('双臂向头顶侧放平',630,260,500)}</>:<>{point(500,698)}{tag('双臂自然放在身体两侧',500,300,600)}</>;
  title=map?'上举吸气 · 回位吐气':p===0?'起势':p===1||p===2?'上举过程吸气':p===3||p===4?'放下回位时吐气':'完整上举回位共 20 次';a='身体两侧 → 朝天 → 头顶侧 → 原路回位';b='完整来回 1 次；不加呼吸秒数或屏息';
 }
 if(id==='SM-104'){
  const orderB=p>=5&&!map,up=map||[1,3,6,8].includes(p),overhead=[2,7].includes(p)&&!map;
  const x=orderB?(up?575:overhead?807:645):(up?348:overhead?190:350);const y=up?(orderB?300:328):overhead?150:442;
  const lx=orderB?245:760;
  marks=<>{ring(x,y,34,30)}{line(`M ${x+(orderB?-28:28)} ${y+23} L ${lx} 600`,orange)}{tag(up?'大臂中段交叉':'前臂中段交叉',lx,650,340,orange)}{tag(orderB?'第二种交叉顺序':'第一种交叉顺序',500,780,470)}</>;
  title=map?'交叉点随上举与回程变化':p===5?'完成 5 次后，交换上下顺序':up?'朝天：交叉收紧到大臂中段':overhead?'头顶侧：放松回前臂中段':'小腹上方：前臂中段交叉';
  a='上举、回程都尽量慢，且都先紧后松';b='同一上下顺序 5 次，再交换顺序 5 次';
 }
 if(id==='SM-105'){
  const right=[2,3].includes(p)&&!map,close=false;
  if(p===0&&!map)marks=<>{ring(500,490,90,80)}{tag('双腿并拢、屈膝抬起',500,900,560)}</>;
  else {const hx=right?560:close?355:440,hy=right?190:close?200:185;const kx=right?265:close?780:785,ky=right?560:close?600:570;marks=<>{arrow(`M ${hx} ${hy-15} L ${hx+(right?125:-125)} ${hy-15}`)}{point(kx,ky)}{line(right?'M 210 600 Q 210 735 390 780':close?'M 780 640 Q 750 820 580 865':'M 795 615 Q 770 770 575 810',orange)}{tag('下侧腿外侧贴地',right?710:270,650,400,orange)}</>;}
  title=map?'腿与头始终反向':p===0?'起势：双臂两侧平放':right?'腿向右倒，头向左转':'腿向左倒，头向右转';a='双腿并拢、屈膝，一起侧倒';b='完整一左一右为 1 次，共 8–10 次';
 }
 if(id==='SM-106'){
  const right=p>=4&&!map,air=p===2||p===5,initial=p===0&&!map;
  if(initial){marks=<>{ring(500,45,50,25)}{ring(500,510,105,90)}{tag('十指交叉',785,85,260,orange)}{tag('掌心朝头顶方向',785,180,390)}{tag('并腿屈膝抬起',500,920,400)}</>;}
  else if(air){const sx=right?720:235;marks=<>{point(sx,540)}{point(right?745:195,470)}{ring(right?780:190,110,65,28)}{ring(right?415:580,230,110,120,green)}{line(right?'M 290 380 L 540 380':'M 455 380 L 705 380',brown,true)}{tag('手部画圈平面示意',right?360:635,60,510)}{tag('腿贴地保持不动',right?280:725,800,410,orange)}</>;}
  else {const hx=right?515:490;marks=<>{ring(right?490:535,60,50,25)}{arrow(`M ${hx} 235 L ${hx+(right?125:-125)} 235`)}{line(right?'M 260 650 Q 275 800 460 865':'M 760 650 Q 730 825 520 890',orange)}{tag('腿先贴地，再保持不动',right?730:260,580,440,orange)}{tag('双肩带动双臂画圈',right?735:245,730,450)}</>;}
  title=map?'先侧倒贴地，再画圈':initial?'准备：头顶十指交叉':right?'右侧：画圈方向反转':'左侧：保持腿不动';a='每侧画 3–5 圈，画完再换侧';b='完整左右共 5 次；每次换侧都反转画圈方向';
 }
 if(id==='SM-107'){
  const left=p>=5&&!map;
  const grip=left?[410,765]:[580,765],contact=left?[720,646]:[302,646];
  marks=<>{point(grip[0],grip[1])}{point(contact[0],contact[1])}{tag(left?'右手抓左踝':'左手抓右踝',left?180:815,825,320,orange)}{line(`M ${left?310:685} 800 L ${grip[0]} ${grip[1]+10}`,orange)}{tag(left?'头向左':'头向右',left?820:210,260,200)}{tag(left?'右脚与左膝相顶':'左脚与右膝相顶',left?755:235,920,450,orange)}</>;
  title=map?'对侧手持踝 · 头与腰同向':p===3||p===6?'保持中的前 5 秒：深吸气':p===4||p===7?'保持中的后 5 秒：呼气':left?'换左侧：手脚全部对调':'右侧姿势与接触关系';a='每侧保持 10 秒＝吸气 5 秒＋呼气 5 秒';b='完整一左一右为 1 次，共 3–5 次';
 }
 if(id==='SM-108'){
  const swap=p>=5&&!map,up=p===0||p===3||p===5;
  const heel=swap?[670,590]:[350,585],ankle=swap?(up?[530,530]:[550,570]):(up?[505,500]:[580,560]);
  const knee=swap?(up?[345,420]:[280,540]):(up?[660,400]:[810,530]);
  marks=<>{point(heel[0],heel[1])}{point(ankle[0],ankle[1])}{[240,765].map(x=><g key={x}>{arrow(swap?`M ${x+32} 140 A 36 28 0 1 0 ${x+24} 176`:`M ${x+24} 176 A 36 28 0 1 1 ${x+32} 140`)}</g>)}{point(knee[0],knee[1],18)}{tag(swap?'左脚跟弯回':'右脚跟弯回',swap?790:190,760,290,orange)}{tag(swap?'右踝搭左大腿':'左踝搭右大腿',500,870,380,orange)}{tag('双腕持续转动',500,950,380)}</>;
  title=map?'搭踝保持 · 上方膝上下':p===0?'下方腿：小腿弯回，脚跟靠大腿外侧':p===1?'上方脚踝搭在对侧膝上大腿':p===2?'双肘弯曲，小臂朝头部':`${swap?'右':'左'}膝${up?'朝天空抬起':'向地面落下'}`;
  a=swap?'换腿后，双腕各自转向反转':'左膝上下 10 次，再换右膝上下 10 次';b='一上加一下为 1 次；腕圈不计数，膝不必触地';
 }
 if(id==='SM-109'){
  const lift=map||p===1||p===3,left=p===3&&!map;
  if(lift){marks=<>{line(left?'M 640 530 L 640 220':'M 385 525 L 380 230')}{point(left?645:380,400)}{point(left?105:885,left?230:240)}{tag(left?'左膝伸直':'右膝伸直',left?815:165,440,260,orange)}{tag(left?'右臂到头顶':'左臂到头顶',left?200:800,120,330)}{tag('抬腿与地面成 90°',500,850,480)}</>;}
  else {marks=<>{tag('双腿伸直',720,350,290)}{tag('双臂回到身体旁',300,650,450)}{p===2||p===4?arrow('M 790 250 Q 900 440 790 620',brown,true):null}</>;}
  title=map?'直腿与对侧手臂配合':p===0?'双臂身体两侧，双腿伸直':p===1?'右腿＋左臂，同时抬起':p===3?'左腿＋右臂，同时抬起':p===2||p===4?'腿放下，手臂同时原路复位':'完整左右共 20 次';a='每侧先抬起并复位，再换另一侧';b='两侧全完成才算 1 次；起始侧不限';
 }
 if(id==='SM-110'){
  const raise=p===0||p===3,left=p>=3&&!map;
  if(raise){marks=<>{line(left?'M 535 620 L 535 235':'M 465 610 L 465 235')}{point(left?530:470,420)}{line(left?'M 450 650 L 450 580 L 520 580':'M 530 650 L 530 580 L 460 580')}{tag('与地面成 90°',left?240:740,270,380)}{tag(left?'左膝伸直':'右膝伸直',left?780:210,430,300,orange)}</>;}
  else {const grip=left?[165,330]:[840,335];marks=<>{point(grip[0],grip[1])}{line(left?'M 565 440 L 245 400':'M 445 420 L 740 400')}{line(left?'M 520 480 L 520 545 L 585 545':'M 465 480 L 465 545 L 400 545')}{tag('两腿之间 90°',left?225:750,610,390)}{tag(left?'右手握左脚':'左手握右脚',left?220:770,245,350,orange)}{tag('头朝天空',left?790:240,100,240)}{tag('膝伸直，尽量贴地',500,820,500)}</>;}
  title=map?'抬腿 90° 与跨侧 90° 分开辨认':raise?'先抬直腿到与地面成 90°':left?'左直腿跨右，右手握左脚':'右直腿跨左，左手握右脚';a=raise?'下一步：对侧手握脚，再向对侧下压':'跨侧姿势每侧保持 10 秒，头始终朝天空';b='左右完成为 1 次，共 2–3 次；另一臂不限定';
 }
 return <svg className="point-overlay managed-batch-overlay managed-101-110-overlay" viewBox="0 0 1000 1000" role="img" aria-label={`${id} ${map?'点位总览':'阶段 '+(p+1)}：${title}；${a}；${b}`}>
  <defs>{[['green',green],['brown',brown]].map(([n,c])=><marker key={n} id={`${key}-${n}`} markerWidth="18" markerHeight="18" refX="15" refY="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M 0 0 L 16 8 L 0 16" fill="none" stroke={c} strokeWidth="3.5"/></marker>)}</defs>
  <g transform="translate(90 90) scale(.82)">{marks}</g>
  {tag(title,560,60,800)}{tag(a,500,930,950)}{tag(b,500,978,950)}
 </svg>;
}
