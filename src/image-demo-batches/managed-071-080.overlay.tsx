import {PressMapExamples} from '../PressMapExamples';
import {ContactSymbol} from '../ContactSymbol';
import type {ReactNode} from 'react';
import FourActionsOverlay from './FourActionsOverlay';

export const ids=Array.from({length:10},(_,i)=>`SM-${String(i+71).padStart(3,'0')}`);
const green='#137c70',orange='#c4552a',brown='#8c6d50',ink='#373b31',paper='#fffaf0';
type Props={id:string;phase:number;map:boolean;pose?:number;swapSides?:boolean};
export default function Managed071080({id,phase:p,map,swapSides=false}:Props){
 if(id==='SM-080')return <FourActionsOverlay id={id} phase={p} map={map}/>;
 const wording=(value:string)=>swapSides?value.replace(/[左右]/g,x=>x==='左'?'右':'左'):value;
 const key=`m7180-${id}-${map?'map':p}`;
 const arrow=(d:string,color=green,dashed=false)=><path d={d} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashed?'11 9':undefined} markerEnd={`url(#${key}-${color===brown?'brown':'green'})`}/>;
 const point=(x:number,y:number)=>id==='SM-075'||(id==='SM-073'&&p<2)?<ContactSymbol x={x} y={y}/>:['SM-074','SM-076'].includes(id)?<ContactSymbol x={x} y={y} kind="press"/>:<g data-contact-kind="position"><circle cx={x} cy={y} r="15" fill={paper} stroke={orange} strokeWidth="3"/><circle cx={x} cy={y} r="4.5" fill={orange}/></g>;
 const ring=(x:number,y:number,rx=34,ry=rx)=><ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke={orange} strokeWidth="4"/>;
 const line=(d:string,color=green,dashed=false,width=4)=><path d={d} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dashed?'10 8':undefined} strokeLinecap="round"/>;
 const box=(text:string,y=920,x=500,width=850,color=ink)=><g><rect x={x-width/2} y={y-25} width={width} height="48" rx="9" fill={paper} fillOpacity=".96" stroke={color} strokeWidth="1.6"/><text x={x} y={y+9} textAnchor="middle" fontSize="26" fontWeight="650" fill={color}>{wording(text)}</text></g>;
 const label=(text:string,x:number,y:number,w=240,color=ink)=>box(text,y,x,w,color);
 const rotation=(clockwise:boolean,x:number,y:number)=> <g>{arrow(clockwise?`M ${x} ${y-54} A 54 54 0 1 1 ${x-52} ${y-12}`:`M ${x} ${y-54} A 54 54 0 1 0 ${x+52} ${y-12}`)}<text x={x} y={y+8} fill={green} textAnchor="middle" fontSize="24" fontWeight="700">10圈</text></g>;
 let marks:ReactNode=null;let caption='';let detail='';
 if(id==='SM-071'){
  if(map||p===4){marks=<>{point(520,530)}{label('踝关节：整脚绕此活动',500,140,560)}{rotation(true,180,700)}{rotation(false,360,700)}{label('旋向符号',270,810,280)}</>;caption='先顺时针 10 圈 → 直接逆时针 10 圈';detail='同侧两方向完成，再换腿；整套一遍';}
  else if(p===0){marks=<>{point(280,493)}{point(676,520)}{line('M 570 605 L 570 647',orange)}{label('右手扶右膝',230,690,240)}{label('左手包握全部脚趾',700,720,360)}</>;caption='左腿伸直；右踝支在左膝上方大腿';detail='右膝弯曲，扶膝与握趾分工明确';}
  else if(p===3){marks=<>{point(720,490)}{point(290,515)}{label('左手扶左膝',735,690,250)}{label('右手握左脚全部脚趾',305,720,390)}</>;caption='换腿与换手后，仍先顺时针再逆时针';detail='左脚同样：两方向各 10 圈';}
  else {marks=<>{point(846,420)}{ring(520,540,22)}{rotation(p===1,480,130)}{label(p===1?'先顺时针':'直接反向：逆时针',490,235,450)}{label('左手握全部脚趾',750,770,360)}</>;caption=p===1?'顺时针 10 圈；整脚绕踝':'逆时针 10 圈；整脚绕踝';detail='不是只动脚趾，也不旋转整条腿';}
 }
 if(id==='SM-072'){
  if(map){marks=<>{ring(754,510,26)}{arrow('M 907 500 Q 965 370 907 265')}{arrow('M 890 590 Q 940 670 898 745')}{label('① 向上',720,205,220)}{label('② 向后',720,780,220)}</>;caption='向上 10 秒 → 松力回位 → 向后 10 秒';detail='第二方向后也松力回位，再换腿';}
  else if(p===0||p===5){marks=<>{point(290,505)}{point(758,512)}{line('M 603 588 L 603 637',orange)}</>;caption=p===0?'右手扶膝，左手包握全部脚趾':'同侧两方向完成后，换腿镜像操作';detail=p===0?'右踝支在左膝上方大腿':'图为右脚参照；另一侧也各 10 秒并回位';}
  else if(p===1){marks=<>{point(900,340)}{arrow('M 946 595 Q 972 460 940 310')}{label('朝小腿内侧／天空方向',525,130,580)}</>;caption='向上掰：整脚绕踝，持续 10 秒';detail='保持结束，先松力回位';}
  else if(p===3){marks=<>{point(900,550)}{arrow('M 805 400 Q 965 425 936 630')}{label('远离小腿，像绷脚背',490,170,560)}</>;caption='向后掰：持续保持 10 秒';detail='方向按当前屈膝放脚姿势理解';}
  else {marks=<>{point(900,440)}{arrow(p===2?'M 940 300 Q 975 380 925 455':'M 940 660 Q 975 550 925 455',brown,true)}{label('松力，回起始位置',510,190,480,brown)}</>;caption='回位后再继续；本页不增加停留';detail=p===2?'接下来做向后掰':'两个方向完成，接下来换腿';}
 }
 if(id==='SM-073'){
  if(map||p===2||p>=4){marks=<>{(map||p===2||p===5)&&<ContactSymbol x={500} y={480} r={29}/>} {(map||p>=4)&&<ContactSymbol x={550} y={680} kind="press" r={29}/>} {line('M 620 220 Q 740 380 675 650 Q 665 900 490 860 Q 340 830 375 630 Q 415 450 355 300 Q 450 200 620 220 Z',green,true)}{label('整个脚心区域',500,145,420)}{p===2||p===4?arrow('M 700 610 Q 850 590 830 430',brown,true):null}</>;caption=map?'先单拇指：3–5 圈；再双拇指：3–5 秒':p===2?'每点做完抬拇指，再换点':p===4?'第二阶段：松力抬指，再换点':'左脚两阶段全完成，才换右脚';detail='两阶段均覆盖整个脚心；图中点位仅为示例';}
  else if(p===3){marks=<><ContactSymbol x={505} y={440} kind="press" r={30}/>{label('双拇指并排、共同按同处',500,80,680,orange)}</>;caption='同时按下，持续保持 3–5 秒';detail='松力抬指后换点，覆盖整个脚心';}
  else {marks=<>{point(532,453)}{label('右拇指指腹',760,670,300,orange)}{line('M 660 647 L 552 474',orange)}{label('左手扶脚；四指在脚背支撑',500,800,700)}</>;caption=p===0?'第一阶段：左脚朝上，由右腿支撑':'每点转按 3–5 圈；螺旋不指定旋向';detail='这一阶段覆盖足底后，再做双拇指按住';}
 }
 if(id==='SM-074'){
  if(map||p>=4){const toes=[[593,125,270],[480,120,240],[425,168,280],[370,211,310],[335,255,340]];marks=<>{toes.map(([x,y,start],i)=><g key={i}>{arrow(`M ${x} ${start} L ${x} ${y+24}`)}<circle cx={x} cy={y} r="17" fill={paper} stroke={orange} strokeWidth="2.5"/><text x={x} y={y+7} textAnchor="middle" fontSize="20" fontWeight="700" fill={orange}>{i+1}</text></g>)}{label('① 大脚趾 → ⑤ 小脚趾',510,620,580)}</>;caption=!map&&p===5?'一脚五趾做完，再换脚、换操作拇指':'每趾：从趾根推一次，到趾尖停 5 秒';detail='五趾顺序明确；整套一次';}
  else if(p===2){marks=<>{point(596,107)}{label('右拇指按住趾尖',510,680,500,orange)}</>;caption='趾尖持续按住 5 秒';detail='四指继续在趾背侧支撑';}
  else if(p===3){marks=<>{arrow('M 370 260 Q 300 150 200 165',brown,true)}{label('松开后再换趾',550,660,440,brown)}</>;caption='保持结束 → 松开 → 换下一趾';detail='不增加本趾重复滑推';}
  else {marks=<>{point(644,271)}{p===1?arrow('M 684 262 Q 713 185 693 110'):null}{label('趾根',790,340,150)}{label('趾尖',810,120,150)}</>;caption=p===0?'右拇指指腹接触脚心侧趾根':'沿皮肤：趾根 → 趾尖，只推一次';detail='右手四指垫在趾背侧作支撑';}
 }
 if(id==='SM-075'){
  if(map||p>=3){marks=<>{[[350,370],[570,440],[770,485]].map(([x,y],i)=><ContactSymbol key={i} x={x} y={y}/>)}{line('M 280 280 Q 480 295 760 390 Q 905 410 880 500 Q 870 600 660 565 L 285 475 Q 220 380 280 280 Z',green,true)}{label('整个脚心：范围示意',530,170,560)}</>;caption=!map&&p===4?'完成左脚后，右手扶右脚、左肘操作':'每点 3–5 圈；完整覆盖足底一遍';detail='方向、点位顺序、点数均无规定';}
  else if(p===0){marks=<>{point(390,585)}{label('右肘尖',220,670,210,orange)}{line('M 325 650 L 382 601',orange)}{label('左手扶左脚',705,690,300)}</>;caption='左脚在右腿上支撑，脚心朝上';detail='右肘尖接触；左手扶脚稳定';}
  else if(p===1){marks=<>{point(475,485)}{label('右肘尖 · 每点 3–5 圈',500,730,600,orange)}</>;caption='螺旋表示转按，不规定旋向';detail='每点做完先抬肘，再换位置';}
  else {marks=<>{arrow('M 460 420 L 460 345',brown,true)}{line('M 400 403 L 540 403',brown,true)}{label('可见离肤间隙',610,680,390,brown)}</>;caption='抬肘离开足底，再移到下一个点';detail='不沿足底拖动肘尖换点';}
 }
 if(id==='SM-076'){
  const paths=['M 800 478 Q 535 346 230 335','M 798 511 Q 520 470 215 421','M 790 548 Q 520 596 225 492'];
  if(map||p===1||p===2||p===3){marks=<>{paths.map((d,i)=><g key={i} opacity={map||p===i+1?1:.2}>{arrow(d)}</g>)}{label('① 内侧中线',330,150,330)}{label('② 内后侧中间线',350,225,430)}{label('③ 后侧中线',320,690,330)}{(p===2||p===3)&&!map?arrow('M 220 580 Q 425 740 790 610',brown,true):null}{[335,421,492].map((y,i)=><text key={y} x={178} y={y+9} fill={green} fontSize={28} fontWeight={750}>{i+1}</text>)}{label('膝下',130,600,140)}{label('脚踝',845,720,160)}</>;caption='每点保持 3–5 秒，松开后向上换点';detail=map?'依次三线，每线由踝至膝下；各一遍':p===1?'第一线：内侧中线':p===2?'抬手回踝，再走第二线':'抬手回踝，再走第三线';}
  else if(p===4){marks=<>{point(667,558)}{label('左拇指指腹',670,790,340,orange)}{label('右手扶膝',200,115,260)}</>;caption='按住 3–5 秒；不是按 3–5 下';detail='每点先松开，再换到上方下一点';}
  else {marks=<>{point(p===0?192:822,p===0?456:420)}{point(p===0?525:512,p===0?550:531)}</>;caption=p===0?'右手扶右膝，左拇指操作右小腿':'换腿与换手，仍按三线顺序各一遍';detail='脚踝支在对侧膝盖上方；整套一次';}
 }
 if(id==='SM-077'){
  if(p===0&&!map){marks=<>{ring(454,422,60,37)}{label('双拇指并排并拢',690,150,460,orange)}{line('M 620 185 L 500 390',orange)}</>;caption='两指指腹共同接触内侧同一处';detail='其余四指环抱作支撑；从脚踝附近开始';}
  else {marks=<><g opacity={.55}>{line('M 200 260 Q 480 400 810 615',green,true,3)}{line('M 180 465 Q 470 615 790 740',green,true,3)}</g>{label('内侧中线',480,170,330)}{label('后侧中线',290,730,330)}{map||p===1||p===2?arrow('M 674 535 Q 620 598 623 675'):null}{map||p===2?arrow('M 653 690 Q 795 660 704 544',brown,true):null}{map||p===3||p===4?<>{arrow('M 850 535 Q 620 340 300 210',green,true)}{label('向上换处',730,285,280)}</>:null}</>;caption=map?'每处横推 2–3 次，再由踝向膝下换处':p===2?'每次推完抬拇指，离肤回内侧起点':p===3?'同一处 2–3 次后，才向膝下换处':p===4?'整侧完成一遍，再镜像换腿':'同一高度：内侧中线 → 后侧中线';detail=map||p>=3?'短实线：横向推压；长虚线：向上换处':'短实线：沿皮肤推压，同处 2–3 次';}
 }
 if(id==='SM-078'){
  if(p===3||map){marks=<>{line('M 360 300 Q 490 370 610 430',orange,false,10)}{label('靠近肘部的小臂段',520,145,560,orange)}{line('M 500 175 L 450 345',orange)}{label('小指侧边缘接触',620,700,460,orange)}{map?<>{label('换点方向示意',500,790,420)}{arrow('M 260 850 L 740 850')}{label('膝上',170,850,140)}{label('大腿根',840,850,190)}</>:null}</>;caption='同点 3–5 次后，抬起小臂再换点';detail='沿大腿内侧中线：膝盖上方 → 大腿根';}

  else {marks=<>{p===1?arrow('M 535 245 Q 535 320 495 385'):null}{p===1?arrow('M 375 540 L 375 610'):null}{p===0||p===1?line(p===0?'M 338 568 L 425 604':'M 362 590 L 490 626',orange,false,10):null}{p===2?arrow('M 450 505 Q 420 400 450 325',brown,true):null}</>;caption=p===0?'近肘的小指侧前臂段，接触右大腿内侧':p===1?'上半身前倾，借身体力量经小臂下压':p===2?'松力回起始；每点共 3–5 次':'换成左小腿在上，用左前臂操作左大腿';detail=p===4?'图为右侧参照；完成两侧后结束':'手型与另一手位置均不作固定要求';}
 }
 if(id==='SM-079'){
  if(p===0&&!map){marks=<>{line('M 254 225 L 254 635',green,true)}{line('M 470 760 L 880 790',green,true)}{label('上身竖直、双腿伸直',650,300,600)}</>;caption='双脚同步，由踝主动带动整只脚';detail='不用手辅助';}
  else {const flex=map||p===2||p===4;marks=<>{flex?arrow('M 928 560 Q 975 385 885 265'):arrow('M 725 370 Q 920 440 933 620')}{point(flex?677:420,flex?654:580)}{label(flex?'脚尖靠近小腿':'脚尖远离小腿',500,145,500)}</>;caption=map?'前压 10 秒 → 后勾 10 秒为一轮':`${p<=2?'第一轮':'第二轮'}${flex?'后勾':'前压'}：持续 10 秒`;detail=map?'直接再做第二轮；双脚同步':p===4?'第二轮结束，动作完成':'直接切换下一阶段，不增加中间停顿';}
 }
 if(id==='SM-080'){
  const lift=map||p===1||p===3;
  marks=<>{lift?<>{ring(365,145,30,22)}{ring(640,145,30,22)}{arrow('M 465 255 Q 445 165 360 147')}{arrow('M 535 255 Q 555 165 640 147')}</>:<>{ring(460,170,30,35)}{ring(540,170,30,35)}</>}{line('M 385 315 L 370 315 L 370 540 L 385 540',green)}{label('其余四趾原位',205,630,330)}{line('M 340 610 L 370 530',green)}{label('双脚掌保持合并',720,760,450)}</>;
  caption=map?'只有大脚趾朝脚背侧抬起；双脚同步':p===0?'准备：脚掌合并，无手辅助':lift?'抬起并保持 10 秒':'恢复平齐，并持续保持 10 秒';
  detail=map?'抬起 10 秒 + 平齐 10 秒，一共两轮':p===0?'坐姿双腿弯曲，近景显示脚掌关系':p===3||p===4?'第二轮；平齐保持结束后完成':'第一轮；阶段之间直接切换';
 }
 return <svg className="point-overlay managed-batch-overlay managed-071-080-overlay" viewBox="0 0 1000 1000" role="img" aria-label={`${id} ${map?'点位总览':'阶段 '+(p+1)}：${wording(caption)}；${wording(detail)}`}>
  <defs>{[['green',green],['brown',brown]].map(([name,color])=><marker key={name} id={`${key}-${name}`} markerWidth="20" markerHeight="20" refX="15" refY="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M 0 0 L 16 8 L 0 16" fill="none" stroke={color} strokeWidth="3.5"/></marker>)}</defs>
  {marks}{box(caption,912)}{box(detail,968)}
 <PressMapExamples id={id} phase={p} map={map}/></svg>;
}
