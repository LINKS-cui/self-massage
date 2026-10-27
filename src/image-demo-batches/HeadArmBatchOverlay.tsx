import {PressMapExamples} from '../PressMapExamples';
import {ContactSymbol} from '../ContactSymbol';
import {useId,type ReactNode} from 'react';
const green='#087f74',orange='#c34c2f',ink='#403b33',paper='#fffaf0';
export const isHeadArmBatch=(id:string)=>/^SM-0(4[1-9]|50)$/.test(id);
function Label({y,children,color=ink,w=820}:{y:number;children:string;color?:string;w?:number}){return <g><rect x={(1000-w)/2} y={y-27} width={w} height="54" rx="12" fill={paper} fillOpacity=".96" stroke={color} strokeWidth="2"/><text x="500" y={y+10} textAnchor="middle" fontSize="28" fontWeight="650" fill={color}>{children}</text></g>;}
function Dot({x,y,n,active=true,r=14}:{x:number;y:number;n?:number;active?:boolean;r?:number}){const c=active?orange:green;return <g data-contact="position"><circle cx={x} cy={y} r={n?22:r} stroke={paper} strokeWidth="4" fill={c}/>{n&&<text x={x} y={y+10} textAnchor="middle" fill={paper} fontSize="27" fontWeight="700">{n}</text>}</g>;}
function Region({d}:{d:string}){return <path data-region="coverage" d={d} fill={green} fillOpacity=".12" stroke={green} strokeWidth="4" strokeDasharray="10 9"/>;}
export function HeadArmBatchOverlay({id,phase,map}:{id:string;phase:number;map:boolean}){
 const key=useId().replaceAll(':',''),arrow=`arm-arrow-${key}`,back=`arm-back-${key}`;let body:ReactNode;
 const path=(d:string,dash=false)=><path data-path={dash?'lifted-return':'direction'} d={d} fill="none" stroke={dash?ink:green} strokeWidth="6" strokeDasharray={dash?'12 10':undefined} strokeLinecap="round" markerEnd={`url(#${dash?back:arrow})`}/>;
 const n=Number(id.slice(3));
 if(n===41||n===42){
  const coverage=map||phase===3;
  body=<>{coverage&&<Region d={n===41?'M250 210 Q440 60 670 140 Q820 220 780 400 L742 450 Q680 420 670 485 L660 535 Q600 600 500 630 L380 650 Q180 560 210 380Z':'M300 180 Q560 60 750 210 Q880 390 730 650 Q500 730 360 650 L350 570 Q370 460 295 465 L270 450 Q180 300 300 180Z'}/>}{n===42&&!map&&phase===1&&<>{path('M300 430 L300 245')}{path('M725 430 L725 245')}</>}<Label y={820}>{coverage?'覆盖整个头部一遍 · 不设固定点数或顺序':n===41?['五指指腹 · 双手同时','每次抓完立即放开','换处继续 · 此位置仅为示例'][phase]:['五指张开 · 头发进入指缝','合拢指缝夹发 · 向上提起','松开头发，再换到其他位置'][phase]}</Label><Label y={900} color={orange}>{n===41?'抓捏头皮 · 不增加停留时间':coverage?'位置顺序、次数和总时长无规定':'提起后停 2–3 秒，再松开'}</Label></>;
 }else if(n===43){
  body=<>{map&&<><Dot x={350} y={540} n={1}/><Dot x={650} y={540} n={1}/><Dot x={210} y={560} n={2}/><Dot x={790} y={560} n={2}/></>}<Label y={780}>{map?'① 近颈、近背的后侧 → ② 较远的肩顶':phase===0?'从胸前伸向对侧肩膀 · 拇指与四指相对':phase===1?'先后侧区域 · 原位抓放 5–10 次':phase===2?'再肩顶区域 · 原位抓放 5–10 次':'两区都完成后，再换手换侧'}</Label><Label y={900} color={orange}>每次抓完立即松开 · 整套一轮</Label></>;
 }else if(n===44){
  const other=!map&&phase===4,move=map||phase===1||other,x=other?295:705;
  body=<>{(map||phase!==3)&&<><Dot x={x} y={415}/><path d={`M${x} 415H${other?855:145}V485`} fill="none" stroke={orange} strokeWidth="3"/><text x={other?855:145} y="525" textAnchor="middle" fontSize="28" fill={orange}>大臂下侧近肘部</text><text x={other?855:145} y="562" textAnchor="middle" fontSize="28" fill={orange}>向后按压</text></>}{move&&<g transform={other?'translate(1000 0) scale(-1 1)':undefined}>{path('M415 660 Q525 725 650 650')}</g>}<Label y={770} w={720} color={move?green:ink}>{move?(other?'腰部向身体右侧转':'腰部向身体左侧转'):'手臂横过颈前 · 肘在对侧肩前、接近肩高'}</Label><Label y={850}>{phase===3&&!map?'保持结束 → 身体回正 → 松开辅助按压':'头随躯干一起转 · 腿保持不动'}</Label><Label y={930} color={orange}>到位保持 5–10 秒 · 同侧 5–10 次</Label></>;
 }else if(n===45){
  const pull=map||phase===2,ret=!map&&phase===3;
  body=<Dot x={665} y={170}/>;
  body=<>{body}{pull&&path('M685 100 L470 100')}{ret&&path('M470 100 Q580 35 685 100',true)}<Label y={690}>{map?'先原位按压放松，再侧向牵拉':phase===0?'右手后颈 · 左手握右大臂近肘部':phase===1?'每侧开始时预备按压 · 次数时间不限':phase===2?'向身体左侧牵拉 · 保持 10 秒':phase===3?'松开牵拉、手臂回位，再拉伸':'镜像换侧：预备按压后，向身体右侧牵拉'}</Label><Label y={780} color={orange}>身体朝前不转动 · 同侧拉伸 2–3 次</Label><Label y={890}>每次拉伸之间，不重新增加预备按压</Label></>;
 }else if(n===46){
  const coverage=map||phase===3,x=phase===0?685:phase===1?595:649,y=phase===0?548:phase===1?287:648;
  body=<>{coverage&&<><Region d="M360 40 Q420 10 500 45 Q520 150 535 240 L495 300 Q450 220 400 120Z"/><Region d="M515 320 Q590 350 625 510 L665 610 L625 650 Q535 520 495 370Z"/></>}{!coverage&&<g data-thumb-pad="true"><Dot x={x} y={y} r={8}/><path d={`M${x-10} ${y}H220V710`} fill="none" stroke={orange} strokeWidth="2"/><rect x="70" y="718" width="300" height="44" rx="10" fill={paper} fillOpacity=".96" stroke={orange} strokeWidth="2"/><text x="220" y="749" textAnchor="middle" fontSize="26" fill={orange}>拇指指腹接触处</text></g>}{!map&&phase===2&&path('M290 200 L330 350')}<Label y={810}>{coverage?'大臂外侧＋小臂外侧 · 同侧完成再换侧':phase===0?'大臂外侧：拇指指腹发力按压':'小臂外侧：拇指指腹按压，四指支撑'}</Label><Label y={910} color={orange}>每点 3–5 次 · 松开换点 · 顺序无规定</Label></>;
 }else if(n===47){
  const diagram=map||phase===1||phase===3;
  body=<>{diagram&&<>{(map||phase===1||phase===3)&&path('M245 230 Q290 320 405 405')}{(map||phase===3)&&path('M430 425 Q550 525 675 625')}<text x="350" y="240" fill={green} fontSize="29">肩 → 肘</text>{(map||phase===3)&&<text x="650" y="500" fill={green} fontSize="29">肘 → 腕</text>}</>}{!diagram&&<Dot x={phase===0?595:695} y={phase===0?560:635}/>}<Label y={825}>{diagram?'按完松开，再逐点推进 · 不是连续滑推':phase===0?'掌心朝上 · 拇指内侧，四指外侧':'小臂内侧 · 拇指在上、四指在下'}</Label><Label y={915} color={orange}>每点 3–5 次 · 同侧两段完成后再换侧</Label></>;
 }else if(n===48){
  const press=map||phase===1,forward=map||phase===2,progress=map||phase===3||phase===4;
  body=<>{!progress&&<Dot x={355} y={610}/>}{press&&path('M345 475 L345 585')}{forward&&path('M355 630 L230 638')}{progress&&<>{path('M670 600 Q495 670 245 643',true)}<text x="620" y="560" fontSize="29" fill={ink}>肘端</text><Label y={745} w={490}>抬肘换点，逐步朝手腕推进</Label></>}<Label y={830}>{map?'先下压 → 再朝手心前推 = 1 次':phase===0?'左小臂由左大腿支撑 · 掌心朝上':phase===1?'第一段：右肘肘尖向下按压':phase===2?'第二段：肘尖朝手心方向前推':phase===3?'每点完成后抬肘，再向手腕方向换点':'换侧镜像 · 另一小臂由同侧大腿支撑'}</Label><Label y={920} color={orange}>每点 2–3 次 · 左右各覆盖一遍</Label></>;
 }else if(n===49){
  const diagram=map||phase>0,upper=map||phase===1||phase===2||phase===4,lower=map||phase===1||phase===3||phase===4;
  const xs=[360,430,500,570],ends=[[290,445],[385,405],[490,390],[615,420]];
  body=<>{diagram&&<>{upper&&xs.map((x,i)=><g key={'u'+i}>{path(`M${x} 595 L${ends[i][0]} ${ends[i][1]}`)}</g>)}{lower&&xs.map((x,i)=><g key={'l'+i}>{path(`M${x} 760 L${x} 625`)}</g>)}<text x="90" y="490" fontSize="28" fill={green}>先上区</text><text x="90" y="735" fontSize="28" fill={green}>再下区</text></>}<Label y={850}>{!diagram?'拇指指腹接触掌心 · 其余四指托手背':phase===2&&!map?'上半掌：掌心 → 指根 · 四条路径':phase===3&&!map?'下半掌：掌根 → 掌心 · 四条路径':'上下两区分别操作 · 不包括拇指路径'}</Label><Label y={935} color={orange}>每线 2–3 次 · 每次抬指回到该线起点</Label></>;
 }else{
  const coverage=map||phase>=2,left=map||phase===2;
  body=<>{coverage?<g data-palm-side={left?'left':'right'} transform={left?'translate(1000 0) scale(-1 1)':undefined}><Region d="M300 475 Q450 380 640 465 Q725 585 675 735 Q500 845 345 745 Q265 635 300 475Z"/>{[[390,520],[560,480],[450,655],[610,680]].map(([x,y],i)=><ContactSymbol key={i} x={x} y={y}/>)}</g>:phase===1?<ContactSymbol x={395} y={555} r={22}/>:null}<Label y={820}>{coverage?(left?'左掌 · 覆盖整个掌心':'右掌 · 覆盖整个掌心'):phase===0?'手指交叉、掌心露出 · 拇指可活动':'保持交叉手位 · 右拇指指腹原位转压'}</Label><Label y={915} color={orange}>{coverage?'每点 3–5 圈 · 抬指换点 · 两掌各一遍':'螺旋表示转压，不规定旋转方向'}</Label></>;

 }
 return <svg className="point-overlay head-arm-batch-overlay" data-exercise={id} data-map={map} viewBox="0 0 1000 1000" role="img" aria-label={map?'动作位置与方向总览':'当前分解步骤的位置与方向'}><defs>{[[arrow,green],[back,ink]].map(([name,c])=><marker key={name} id={name} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M1 1L7 4.5L1 8" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></marker>)}</defs>{body}<PressMapExamples id={id} phase={phase} map={map}/></svg>;
}
