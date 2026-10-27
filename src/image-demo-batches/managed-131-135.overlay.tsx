import type {ReactNode} from 'react';
import './managed-131-135.css';

// SM-135 keeps its existing renderer and four original images.
export const ids:string[]=['SM-131','SM-132','SM-133','SM-134'];
type Props={id:string;phase:number;map:boolean;pose?:number};
const green='#087c6c',orange='#c14d29',brown='#8b6849',ink='#393b31',paper='#fffaf0';
export default function Managed131135({id,phase:p,map}:Props){
 const key=`m131135-${id}-${map?'map':p}`;
 const line=(d:string,color=green,dashed=false,width=5)=><path d={d} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dashed?'12 9':undefined} strokeLinecap="round" strokeLinejoin="round"/>;
 const arrow=(d:string,color=green,dashed=false)=><path d={d} fill="none" stroke={color} strokeWidth="6" strokeDasharray={dashed?'12 9':undefined} strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#${key}-${color===brown?'brown':'green'})`}/>;
 const ring=(x:number,y:number,rx=28,ry=rx,color=orange)=><ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke={color} strokeWidth="5"/>;
 const point=(x:number,y:number,color=orange)=><g><circle cx={x} cy={y} r="14" fill={paper} stroke={color} strokeWidth="4"/><circle cx={x} cy={y} r="5" fill={color}/></g>;
 const box=(s:string,x=500,y=920,w=900,color=ink,size=28)=><g><rect x={x-w/2} y={y-25} width={w} height="50" rx="9" fill={paper} fillOpacity=".97" stroke={color} strokeWidth="1.6"/><text x={x} y={y+10} textAnchor="middle" fill={color} fontSize={size} fontWeight="650">{s}</text></g>;
 let marks:ReactNode=null,caption='',detail='';
 if(id==='SM-131'){
  if(map||p===3){marks=<>{line('M 330 325 Q 500 265 670 325 L 650 650 Q 500 690 350 650 Z',green,true)}{arrow('M 480 490 L 390 490')}{arrow('M 520 490 L 610 490')}{arrow('M 500 470 L 500 380')}{arrow('M 500 515 L 500 610')}{box('肩背范围',180,200,300)}{box('移动方向示意，路线不限',500,790,790)}</>;caption='不设固定时间、次数或换侧顺序';detail='左右／上下移动背部，让一个网球滚压肩背';}
  else if(p===1){marks=<>{ring(765,420,53,67)}{box('网球夹在两者之间',300,170,490,orange)}{line('M 520 195 L 705 385',orange)}</>;caption='网球同时接触肩背与墙面';detail='利用身体移动带动网球滚压';}
  else{marks=<>{ring(p===0?674:662,p===0?222:242,17,22)}{box(p===0?'一个网球 · 球位示例':'上下移动中的姿势示例',260,330,470)}{line(p===0?'M 480 310 L 650 240':'M 480 310 L 642 260',orange)}{p===2?<>{arrow('M 390 640 L 390 470')}{arrow('M 430 470 L 430 640')}</>:null}</>;caption=p===0?'背对墙站立，肩背与墙间夹球':'背部可左右、上下移动';detail='没有固定幅度、路线或停留';}
 }
 if(id==='SM-132'){
  if(map||p===5){marks=<>{arrow('M 450 590 L 450 220')}{arrow('M 550 590 L 550 220')}{arrow('M 450 590 L 335 480')}{arrow('M 550 590 L 665 480')}{point(450,590)}{point(550,590)}{box('向上：同点做完，再换更高位置',500,130,900)}{box('斜上：单次贴肤滑拉',500,780,760)}</>;caption='每点 2–3 次，整体从下往上一遍';detail='最高处以双手可触及为准；点数不限';}
  else if(p===2){marks=<>{point(450,510)}{point(550,510)}{arrow('M 365 385 Q 330 495 425 510',brown,true)}{arrow('M 645 385 Q 680 495 575 510',brown,true)}{box('每一次拉完，先松开再回原点',500,130,890,brown)}</>;caption='回到脊柱旁原来的起点';detail='虚线为松开后的回位，不向内施力滑拉';}
  else if(p===1){marks=<>{point(370,385)}{point(640,385)}{arrow('M 450 510 L 380 420')}{arrow('M 550 510 L 630 420')}{box('左右同时，指腹向外斜上方滑动',500,130,910)}</>;caption='双拇指沿皮肤滑拉';detail='滑拉长度与速度均没有固定要求';}
  else if(p===4){marks=<>{point(460,300)}{point(550,300)}{arrow('M 465 520 L 465 345')}{arrow('M 550 520 L 550 345')}{box('移到较高位置，再从脊柱旁开始',500,130,900)}</>;caption='同一位置做完后，再向上换点';detail='换点不是连续沿脊柱向上推';}
  else{marks=<>{point(450,510)}{point(560,510)}{box(p===3?'同一位置重复 2–3 次':'双拇指指腹 · 左右同时',500,130,780)}{box('低位起点：臀部区域两侧',500,790,810)}</>;caption=p===3?'滑拉 → 松开回原点，完成同点次数':'从脊柱最低端的臀部区域开始';detail='两手握后腰；两拇指位于脊柱两旁';}
 }
 if(id==='SM-133'){
  if(map||p===3){marks=<>{line('M 325 380 Q 500 410 675 380 L 660 560 Q 500 610 340 560 Z',green,true)}{box('胸前范围 · 顺序不限',500,720,730)}</>;caption='整个动作总共 20–30 秒';detail='单手拍打；不是每点计时，也不数拍打次数';}
  else if(p===1){marks=<>{ring(370,430,72,52)}{arrow('M 545 455 Q 475 440 450 420',brown,true)}{box('单手示例',150,170,250)}</>;caption='掌心离开，再拍下';detail='拍打节奏未规定；另一手不参与';}
  else{marks=<>{ring(p===0?550:515,p===0?450:485,70,45)}{box('右手示例',150,170,250)}{box('掌心接触',500,740,450,orange)}</>;caption=p===0?'单手掌心拍打胸前':'边拍打边移动，覆盖胸前各处';detail='使用左手或右手均可；没有固定位置顺序';}
 }
 if(id==='SM-134'){
  if(map||p===4||p===6){marks=<>{line('M 500 700 A 220 220 0 1 1 501 700',green,true,4)}{arrow('M 345 635 Q 280 575 280 495')}{arrow('M 705 400 Q 735 480 705 555')}{point(500,700,green)}{ring(500,480,20,20)}{arrow('M 500 660 L 500 525')}{arrow('M 310 480 L 450 480')}{arrow('M 690 480 L 550 480')}{box('身体右侧：右手',250,170,430)}{box('身体左侧：左手',750,170,430)}{box('肚脐下方开始 · 半径约 10 厘米',500,800,910)}</>;caption=p===6&&!map?'依次向心推压，覆盖一圈即可':'同点 2–3 次后，顺时针换点';detail='圆周示换点次序；向内箭头不规定点数';}
  else if(p===2){marks=<>{ring(470,320,47,53,brown)}{arrow('M 490 370 Q 550 390 520 470',brown,true)}{box('双指抬起，回原圆周点',500,730,760,brown)}</>;caption='每次到肚脐后，先抬指再回位';detail='不沿皮肤向外反推';}
  else if(p===5){marks=<>{ring(600,310,28,37)}{arrow('M 675 310 L 535 310')}{box('左手食指＋中指指腹',500,720,740,orange)}</>;caption='身体左侧的点，使用左手';detail='图示向内推的途中；每点仍做 2–3 次';}
  else{const end=p===1;marks=<>{ring(end?505:500,end?320:465,35,25)}{arrow(end?'M 500 440 L 505 360':'M 500 425 L 500 345')}{box('食指＋中指并拢，用指腹',500,730,820,orange)}</>;caption=p===3?'同一点：向心推、抬回，共 2–3 次':end?'单手双指，从圆周推到肚脐':'从肚脐下方的圆周点开始';detail=p===0?'正中点图示右手，仅为示例':'左侧点用左手，右侧点用右手';}
 }
 return <svg className="point-overlay managed-batch-overlay managed-131-135-overlay" viewBox="0 0 1000 1000" role="img" aria-label={`${id} ${map?'点位总览':'阶段 '+(p+1)}：${caption}；${detail}`}>
  <defs>{[['green',green],['brown',brown]].map(([name,color])=><marker key={name} id={`${key}-${name}`} markerWidth="16" markerHeight="16" refX="12" refY="7" orient="auto" markerUnits="userSpaceOnUse"><path d="M 1 1 L 13 7 L 1 13" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></marker>)}</defs>
  {marks}{id==='SM-131'?box(caption,500,965,940):<>{box(caption,500,910,940)}{box(detail,500,972,940,ink,26)}</>}
 </svg>;
}
