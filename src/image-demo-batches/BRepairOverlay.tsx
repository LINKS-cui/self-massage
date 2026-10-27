import {useId,type ReactNode} from 'react';
import type {ImageDemoDefinition} from '../image-demos';
import b81 from './managed-081-090.json';
import b91 from './managed-091-100.json';
import b101 from './managed-101-110.json';
import './b-repair.css';
export const bRepairIds=['SM-081','SM-082','SM-083','SM-085','SM-088','SM-090','SM-091','SM-096','SM-097','SM-102','SM-104','SM-106','SM-107'];
const defs={...b81,...b91,...b101} as unknown as Record<string,ImageDemoDefinition>;
const green='#087d70',orange='#b84e2c',brown='#82654d',ink='#343a32',paper='#fffaf0';
function Label({x=500,y,w=600,children,color=ink}:{x?:number;y:number;w?:number;children:ReactNode;color?:string}){return <g><rect x={x-w/2} y={y-25} width={w} height={50} rx={8} fill={paper} fillOpacity={.96} stroke={color} strokeWidth={1.6}/><text x={x} y={y+9} textAnchor="middle" fill={color} fontSize={26} fontWeight={650}>{children}</text></g>}
function Dot({x,y,r=13}:{x:number;y:number;r?:number}){return <circle cx={x} cy={y} r={r} fill={paper} stroke={orange} strokeWidth={4}/>}
function Zone({d}:{d:string}){return <path d={d} fill={green} fillOpacity={.12} stroke={green} strokeWidth={4} strokeDasharray="10 8"/>}
export default function BRepairOverlay({id,phase:p,map,pose=0}:{id:string;phase:number;map:boolean;pose?:number}){
 const key=useId().replaceAll(':',''),d=defs[id],current=d.phases[p];
 const arrow=(path:string,reverse=false)=> <path d={path} fill="none" stroke={reverse?brown:green} strokeWidth={5} strokeDasharray={reverse?'10 7':undefined} markerEnd={`url(#${key}-${reverse?'back':'go'})`}/>;
 const line=(path:string,color=orange)=> <path d={path} fill="none" stroke={color} strokeWidth={3}/>;
 let body:ReactNode=null,foot='',sub='';
 if(id==='SM-081'){
  const region=map||p===2||p===4;
  if(region){body=<><Zone d="M260 545 Q530 660 840 740 L820 800 Q500 770 230 650Z"/><Zone d="M280 430 Q550 490 840 635 L850 720 Q500 610 275 520Z"/>{[[330,625],[470,685],[680,735],[360,490],[560,555],[760,635]].map(([x,y],i)=><Dot key={i} x={x} y={y} r={8}/>)}{arrow('M300 600 Q520 710 785 765')}<Label x={300} y={245} w={350}>后侧＋外侧整片覆盖</Label></>}
  else if(p===1&&pose===0)body=<><Dot x={675} y={605}/>{line('M675 605 L810 360')}<Label x={755} y={300} w={410}>右拇指指腹 · 四指环抱</Label></>;
  else if(p===3)body=<><Dot x={610} y={510}/><Label y={210} w={550}>右手五指并拢 · 掌心接触</Label></>;
  else body=<><Label x={740} y={170} w={340}>{p===5?'左手操作左腿':'右手操作右腿'}</Label>{line(p===5?'M260 335 L170 590 L130 755':'M735 340 L820 600 L875 755')}</>;
  foot='根部逐点到膝端 · 每点 3–5 下';sub='点位仅举例：覆盖整片，每下松力，同点做完再抬手';
 }
 if(id==='SM-082'){
  const full=!map&&(p===0||p===5||p===4||(p===3&&pose===1));
  if(full){body=<><Label y={130} w={640}>{p===5?'换左腿：姿势、操作手镜像对调':p===4?(pose===1?'松力回身':pose===2?'上身准备':'由髋部前倾'):'左腿前伸 · 右膝朝向左腿'}</Label><Label x={270} y={875} w={400}>{p===5?'左小腿平放':'右小腿平放 · 脚心向右'}</Label>{p===4&&arrow(pose===1?'M570 450 Q570 330 530 225':'M530 225 Q570 330 570 450',pose===1)}</>}
  else if(map||p===2)body=<>{arrow('M170 430 Q430 500 835 630')}<Label x={280} y={290} w={340}>腿窝下方 → 脚踝</Label><Label y={780}>小腿后侧中线</Label></>;
  else body=<><Dot x={p===1?535:480} y={p===1?555:436}/>{p===3&&<Dot x={530} y={436}/>}<Label y={180}>{p===1?'右拇指指腹，四指环抱':'两拇指并排并拢，共按同一点'}</Label></>;
  foot='先单拇指，再双拇指 · 每点 3–5 下';sub='下压后松力回身；同点完成后抬指换点';
 }
 if(id==='SM-083'){
  const full=p===0&&pose===1,dorsal=p>=3&&!map;
  if(full)body=<Label y={150}>沿用82坐姿 · 同侧手操作同侧脚</Label>;
  else if(!dorsal){body=<><Dot x={285} y={365}/><Dot x={790} y={660}/>{line('M285 365 L430 170')}{line('M790 660 L750 790')}<Label x={440} y={130} w={310}>外踝骨性凸起</Label><Label x={720} y={840} w={350}>小趾侧＝外侧</Label>{(map||p===2)&&<Zone d="M200 270 Q430 200 490 420 L465 580 Q240 610 160 500Z"/>}</>}
  else body=<><Zone d={p===4?'M680 300 L330 310 L350 680 L590 720Z':'M320 300 L670 310 L650 680 L410 720Z'}/><Label y={850}>{p===4?'左手操作左脚背':'右拇指操作右脚背'}</Label></>;
  foot='先外踝，再脚背 · 每点转按 3–5 圈';sub='同侧两区域做完再换脚；圈向与点数不固定';
 }
 if(id==='SM-085'){
  const hold=map||[1,3,4].includes(p),swap=p===4&&!map;
  body=<g transform={swap?'translate(1000 0) scale(-1 1)':undefined}>{p!==2&&<Dot x={690} y={370}/>}{hold?arrow('M790 470 Q880 310 770 155'):null}<path d="M180 680 L585 680" stroke={brown} strokeWidth={4} strokeDasharray="9 7"/></g>;
  body=<>{body}<Label x={300} y={820} w={410}>脚掌与踝保持原位</Label><Label x={740} y={740} w={390}>{hold?'五趾一起朝脚背掰':p===0?'握住全部五趾':'松开后，脚趾回位'}</Label></>;
  foot=p===2?'两次之间先松开':hold?'保持 10 秒':'另一手扶住脚作支撑';sub='每脚两次，每次10秒；换脚后双手角色对调';
 }
 if(id==='SM-088'){
  const bare=map||p===2||p===5||pose===1;
  if(bare)body=<>{[[235,270],[390,205],[515,180],[630,245],[750,320]].map(([x,y],i)=><g key={i}><Dot x={x} y={y} r={12}/><text x={x} y={y-30} textAnchor="middle" fontSize={26} fill={orange}>{i+1}</text></g>)}</>;
  body=<>{body}<g transform="translate(120 650)"><rect width={760} height={275} rx={16} fill={paper} stroke={brown} strokeWidth={2}/><text x={380} y={40} textAnchor="middle" fontSize={27} fill={ink}>第2/3/4趾：侧面辨认最靠近趾尖的关节</text><path d="M70 130 Q220 100 350 120 L490 125 Q585 105 645 130 Q680 155 640 175 L490 175 L350 175 Q200 185 70 175" fill="#efc9a4" stroke={brown} strokeWidth={3}/><path d="M540 124 L615 128" stroke="#bf886e" strokeWidth={5}/><path d="M350 120 L350 175 M490 125 L490 175" stroke={brown} strokeWidth={3}/><Dot x={490} y={125} r={12}/>{arrow('M600 85 Q700 135 630 220')}<text x={310} y={235} fontSize={25} fill={orange}>末端关节固定接触 · 趾尖朝脚心</text></g></>;
  foot='拇指按趾背末端关节，四指从脚心侧托住';sub='1＋5 → 2＋4 → 第3趾；每组两次各10秒，中间松开';
 }
 if(id==='SM-090'){
  const bare=map||[2,4].includes(p)||(p===1&&pose===1),left=!map&&p===5;
  if(bare){body=<>
   <path d="M498 330 Q510 520 500 715" fill="none" stroke={brown} strokeWidth={4} strokeDasharray="8 7" opacity={.8}/>
   <path d="M535 340 Q552 520 558 700" fill="none" stroke={green} strokeWidth={30} opacity={.12}/>
   <g data-route="ankle-to-knee" data-screen-direction="down"><path d="M535 340 Q552 520 558 700" fill="none" stroke={green} strokeWidth={5} strokeDasharray="10 8" markerEnd={`url(#${key}-go)`}/>{[[538,375],[542,440],[546,505],[552,570],[557,635]].map(([x,y],i)=><Dot key={i} x={x} y={y} r={7}/>)}</g>
   <Label x={195} y={410} w={330} color={brown}>胫骨前嵴示意</Label>{line('M360 410 L502 430',brown)}
   <Label x={800} y={570} w={360} color={green}>外侧缘与肌肉交界</Label>{line('M620 570 L552 570',green)}
   <Label x={780} y={310} w={320}>脚踝起点</Label>{line('M620 310 L535 340',green)}
   <Label x={780} y={740} w={320}>到膝盖下方</Label>{line('M620 740 L558 700',green)}
   <Label y={875} w={720}>第一视角：膝在下、脚在上，右腿外侧在右</Label>
  </>}
  else body=<>
   <g transform={left?'translate(1000 0) scale(-1 1)':undefined}>
    <Dot x={550} y={554} r={9}/>{line('M550 554 L310 655')}
    <ellipse cx={548} cy={514} rx={25} ry={19} fill="none" stroke={orange} strokeWidth={3}/>{line('M548 514 L760 355')}
   </g>
   <Label x={left?740:260} y={695} w={470}>下方指腹接触皮肤</Label>
   <Label x={left?265:735} y={315} w={490}>上方指腹叠在下指背面</Label>
   <Label x={220} y={160} w={350}>脚在上方</Label>
   <Label x={220} y={875} w={350}>膝在下方</Label>
   <Label x={765} y={860} w={410}>{left?'左腿 · 外侧在左':'右腿 · 外侧在右'}</Label>
  </>;
  foot='叠拇指按骨外缘 · 从脚踝逐点到膝下';sub='每点3–5下，按后即抬；两腿各一遍';
 }
 if(id==='SM-091'){
  const lift=p===2&&pose===0,edge=p===2&&pose===1;
  if(map||p===4)body=<>
   <g data-calf-route="true"><path d="M550 680 Q525 440 505 150" fill="none" stroke={green} strokeWidth={4} strokeDasharray="10 9" markerEnd={`url(#${key}-go)`}/>{[[550,680],[542,590],[533,500],[524,410],[516,320],[510,230],[505,150]].map(([x,y],i)=><Dot key={i} x={x} y={y} r={8}/>)}</g>
   <Label x={225} y={170} w={320}>到膝盖下方</Label>{line('M385 170 L505 150',green)}
   <Label x={790} y={690} w={340}>从脚踝开始</Label>{line('M620 690 L550 680',green)}
   <Label y={860} w={850}>点位在小腿上 · 每处先横拉、提起，再松开</Label>
  </>;
  else if(lift||edge){body=<><Dot x={320} y={440}/><Dot x={715} y={440}/>{arrow('M310 450 L160 450')}{arrow('M715 450 L865 450')}<Label y={180}>{lift?'夹起的组织轮廓向外隆起':'先到两侧边缘，再夹住组织'}</Label></>}
  else if(p===1)body=<>{arrow('M495 385 L305 385')}{arrow('M510 385 L710 385')}<Label y={150}>双拇指从前嵴向两侧滑拉</Label></>;
  else if(p===3||(p===2&&pose===2))body=<Label y={150}>手离开 · 组织恢复，回到前侧起点</Label>;
  foot='边缘肌肉向远离腿骨方向提起，保持3–5秒';sub='拉开＋提起＋松开算1次；同点2–3次后向上换点';
 }
 if(id==='SM-096'){
  if(map||p===2){body=<><Zone d="M270 600 Q450 440 700 355 L745 395 Q450 550 280 690Z"/>{[[705,400],[650,430],[595,465],[540,500],[485,535],[430,570],[375,605],[320,640]].map(([x,y],i)=><Dot key={i} x={x} y={y} r={8}/>)}{arrow('M700 400 Q520 510 320 640')}<Label x={680} y={270} w={560}>腿窝上方 → 大腿根部</Label><Label x={710} y={850} w={550}>沿大腿后侧逐点覆盖</Label></>}
  else if(p===1){body=<>{pose===0&&<><path d="M445 495 Q515 465 595 495" fill="none" stroke={orange} strokeWidth={5}/>{line('M510 485 L785 650')}<Label x={760} y={705} w={440}>指背接触大腿后侧</Label></>}{pose===1?arrow('M555 515 L570 565',true):arrow('M690 610 L570 505')}<Label y={875} w={800}>{pose===1?'拳离开后再敲 · 同一点8–10次':'拳在大腿下方 · 四指弯曲后的指背接触'}</Label></>}
  else{const right=p===3;body=<><g transform={right?'translate(1000 0) scale(-1 1)':undefined}><Dot x={515} y={492} r={9}/>{line('M515 492 L755 660')}</g><Label x={right?260:740} y={710} w={450}>后侧接触 · 拳从下方敲</Label><Label x={right?200:800} y={230} w={350}>{right?'右手扶右小腿':'左手扶左小腿'}</Label></>}
  foot='从腿窝上方肌肉到大腿根部 · 每点8–10次';sub='覆盖整个后侧一遍后再换腿；整套一次';
 }
 if(id==='SM-097'){
  const inhale=map||p===1,exhale=p===2;
  body=<>{(inhale||exhale)&&<ellipse cx={500} cy={335} rx={inhale?145:100} ry={inhale?105:75} fill={green} fillOpacity={.08} stroke={green} strokeWidth={4} strokeDasharray="10 7"/>}{(inhale||exhale)&&<>{arrow(inhale?'M425 335 L320 335':'M320 335 L425 335',exhale)}{arrow(inhale?'M575 335 L680 335':'M680 335 L575 335',exhale)}{arrow(inhale?'M500 390 L500 455':'M500 455 L500 390',exhale)}</>}<Label y={740} w={580}>{inhale?'吸气 · 扩张提示':exhale?'呼气 · 回收提示':'保持仰卧放松'}</Label></>;
  foot='双臂双腿略分开，深呼吸10–20次';sub='扩张与回收只提示吸呼；不规定秒数，不屏息';
 }
 if(id==='SM-102'){
  const right=p>=5&&!map,vertical=[3,4,7,8].includes(p)&&!map,reverse=!map&&[2,4,6,8].includes(p);
  const shoulder=vertical?[265,555]:[610,210];
  // Each path touches the depicted hand and the rays share the actual shoulder pivot.
  const pts=vertical?[[285,250],[425,160],[580,330],[425,500]]:[[900,210],[610,20],[320,210],[610,400]];
  const path=vertical?(reverse?'M285 250 Q270 440 425 500 Q630 450 580 330 Q545 125 425 160 Q325 140 285 250':'M285 250 Q325 140 425 160 Q545 125 580 330 Q630 450 425 500 Q270 440 285 250'):(reverse?'M900 210 C900 315 770 400 610 400 C450 400 320 315 320 210 C320 105 450 20 610 20 C770 20 900 105 900 210':'M900 210 C900 105 770 20 610 20 C450 20 320 105 320 210 C320 315 450 400 610 400 C770 400 900 315 900 210');
  body=<><g transform={right?'translate(1000 0) scale(-1 1)':undefined}>{pts.map(([x,y],i)=><g key={i}><path d={`M${shoulder[0]} ${shoulder[1]} L${x} ${y}`} stroke={green} strokeWidth={8} opacity={.2} strokeDasharray="12 8"/><circle cx={x} cy={y} r={11} fill={paper} stroke={green} strokeWidth={3}/></g>)}<Dot x={shoulder[0]} y={shoulder[1]} r={18}/>{arrow(path,reverse)}{arrow(vertical?(reverse?'M330 184 Q375 150 425 160':'M505 198 Q465 150 425 160'):(reverse?'M450 52 Q525 20 610 20':'M770 52 Q695 20 610 20'),reverse)}</g><Label x={vertical?730:300} y={vertical?690:650} w={470}>{vertical?'竖直平面可倾斜，手端避地':'水平面：手端路径与肩支点相连'}</Label><Label y={810} w={760}>浅色线＝同一条直臂经过的位置，不是多条手臂</Label></>;
  foot=`${right?'右':'左'}臂 · ${vertical?'竖直':'水平'}圈 · ${reverse?'反方向':'首方向'} 10圈`;sub='肩为活动支点；每臂水平＋竖直各20圈，再换臂';
 }
 if(id==='SM-104'){
  const swap=p>=5&&!map,up=map||[1,3,6,8].includes(p),over=[2,7].includes(p)&&!map;
  const close=up&&pose===1&&!map;const cross=up?(close?[550,510]:[390,300]):over?[220,145]:[345,440];
  body=<><g transform={swap?'translate(1000 0) scale(-1 1)':undefined}><Dot x={cross[0]} y={cross[1]} r={24}/>{line(`M${cross[0]+20} ${cross[1]+15} L730 630`)}</g><Label x={swap?270:730} y={680} w={430}>{up?'肩与肘之间：大臂中段':'肘与腕之间：前臂中段'}</Label><Label y={810}>{swap?'第二种上下交叉顺序':'第一种上下交叉顺序'}</Label></>;
  foot='小腹前臂 → 朝天大臂 → 头顶前臂';sub='上举、回程均慢慢先紧后松；同序5次，换序5次';
 }
 if(id==='SM-106'){
  const right=p>=4&&!map,air=[2,5].includes(p)&&!map;
  if(air){const pts=[[190,110],[350,70],[480,210],[340,350]];const path='M190 110 Q240 30 350 70 Q450 30 480 210 Q545 340 340 350 Q150 295 190 110';body=<><g transform={right?'translate(1000 0) scale(-1 1)':undefined}>{pts.map(([x,y],i)=><g key={i}><path d={`M195 470 L${x} ${y} M235 540 L${x} ${y}`} stroke={green} strokeWidth={6} opacity={.18} strokeDasharray="10 8"/><circle cx={x} cy={y} r={10} fill={paper} stroke={green} strokeWidth={3}/></g>)}<Dot x={195} y={470}/><Dot x={235} y={540}/>{arrow(path,right)}{arrow('M255 62 Q300 48 350 70',right)}</g><Label x={right?240:750} y={520} w={390}>肩为支点，手端走完整圈</Label><Label y={800} w={710}>浅色线：双臂途经位置 · 腿保持贴地不动</Label></>}
  else body=<><Label y={150} w={700}>{p===0?'十指交叉，掌心朝头顶方向':'腿先侧倒贴地，再保持不动'}</Label><Label y={800}>{right?'换侧后，画圈方向反转':'抬起、经过侧向位置、落下，连成一圈'}</Label></>;
  foot='每侧双臂画3–5个完整圈，画完再换腿';sub='一左一右共5次；首向不限，换侧必须反向';
 }
 if(id==='SM-107'){
  const left=p>=5&&!map;
  body=<><g transform={left?'translate(1000 0) scale(-1 1)':undefined}><Dot x={560} y={765}/><Dot x={310} y={660}/>{line('M560 765 L785 650')}{line('M310 660 L155 500')}<path d="M400 220 Q340 300 340 435" stroke={green} strokeWidth={5} fill="none" strokeDasharray="9 7"/></g><Label x={left?190:810} y={590} w={350}>{left?'右手抓左踝':'左手抓右踝'}</Label><Label x={left?770:200} y={440} w={370}>{left?'右脚与左膝相顶':'左脚与右膝相顶'}</Label><Label y={870} w={730}>垫面参照：头背平躺，下侧腿外缘贴地</Label></>;
  foot='每侧10秒：吸气5秒＋呼气5秒';sub='头与腰同向，对侧手持踝；完整左右3–5次';
 }
 return <svg className={`point-overlay b-repair-overlay managed-${Number(id.slice(3))<=90?'081-090':Number(id.slice(3))<=100?'091-100':'101-110'}-overlay`} viewBox="0 0 1000 1000" role="img" aria-label={`${id}：${map?d.mapTitle:current.title}；${foot}；${sub}`} data-repair-id={id} data-repair-pose={pose}>
 <defs>{[['go',green],['back',brown]].map(([n,c])=><marker key={n} id={`${key}-${n}`} markerWidth={23} markerHeight={23} refX={19} refY={11} orient="auto" markerUnits="userSpaceOnUse"><path d="M2 3L19 11L2 19" stroke={c} strokeWidth={3} fill="none"/></marker>)}</defs>
 <g transform="translate(90 90) scale(.82)">{body}</g><Label x={555} y={48} w={850}>{map?d.mapTitle:current.title}</Label><Label y={928} w={970}>{foot}</Label><Label y={978} w={970}>{sub}</Label>
 </svg>;
}
