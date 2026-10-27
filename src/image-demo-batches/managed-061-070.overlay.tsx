import {PressMapExamples} from '../PressMapExamples';
import {ContactSymbol} from '../ContactSymbol';
import type {ReactNode} from 'react';

export const ids:string[]=Array.from({length:10},(_,i)=>`SM-${String(i+61).padStart(3,'0')}`);
type Props={id:string;phase:number;map:boolean;pose?:number};
const green='#087c6c',orange='#c14d29',brown='#8b6849',ink='#393b31',paper='#fffaf0';
export default function Managed061070({id,phase:p,map}:Props){
 const key=`m6170-${id}-${map?'map':p}`;
 const line=(d:string,color=green,dashed=false,width=5)=><path d={d} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dashed?'12 9':undefined} strokeLinecap="round" strokeLinejoin="round"/>;
 const arrow=(d:string,color=green,dashed=false)=><path d={d} fill="none" stroke={color} strokeWidth="6" strokeDasharray={dashed?'12 9':undefined} strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#${key}-${color===brown?'brown':'green'})`}/>;
 const ring=(x:number,y:number,rx=28,ry=rx,color=orange)=><ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke={color} strokeWidth="5"/>;
 const point=(x:number,y:number)=>['SM-063','SM-067','SM-070'].includes(id)?<ContactSymbol x={x} y={y}/>:['SM-066','SM-068','SM-069'].includes(id)?<ContactSymbol x={x} y={y} kind="press"/>:<g data-contact-kind="position"><circle cx={x} cy={y} r="15" fill={paper} stroke={orange} strokeWidth="4"/><circle cx={x} cy={y} r="5" fill={orange}/></g>;
 const box=(s:string,x=500,y=920,w=900,color=ink)=><g><rect x={x-w/2} y={y-26} width={w} height="52" rx="10" fill={paper} fillOpacity=".97" stroke={color} strokeWidth="1.7"/><text x={x} y={y+10} textAnchor="middle" fill={color} fontSize="30" fontWeight="650">{s}</text></g>;
 let marks:ReactNode=null,caption='',detail='';
 if(id==='SM-061'){
  if(map||p>=2){const clenched=!map&&p===3;marks=<>{clenched?<>{ring(300,370,95,75)}{ring(700,370,95,75)}</>:<>{line('M 85 350 Q 100 125 330 105',green,true)}{line('M 670 105 Q 900 125 915 350',green,true)}</>}{box(clenched?'双手同时握拳':'两手同时，十指充分张开',500,760,760)}</>;caption=map?'右拇指在上 10 秒 → 左拇指在上 10 秒':p===2?'张开后，双手同步握拳':p===3?'张开 → 握拳，合为 1 次':'开合计数：两手共同计 20 次';detail='完整开合共 20 次；整套一遍';}
  else{marks=<>{ring(p===0?420:585,p===0?280:270,60,50)}{box(p===0?'右拇指在上':'左拇指在上',500,700,420,orange)}{line(p===0?'M 500 670 L 450 340':'M 500 670 L 570 330',orange)}</>;caption=p===0?'先十指交叉紧握，保持 10 秒':'改变交叉手型，再紧握 10 秒';detail='两次交叉紧握后，再开始双手开合';}
 }
 if(id==='SM-062'){
  if(p===4&&!map){marks=<>{point(500,380)}{box('左拇指固定右腕掌侧',500,140,620,orange)}{line('M 500 169 L 500 354',orange)}{arrow('M 895 430 Q 975 300 870 215')}</>;caption='换手：右侧也做 20 个完整循环';detail='掌心向上；四指伸直、前臂不动';}
  else{const bent=p===1&&!map;marks=<>{point(bent?380:510,bent?535:460)}{box('右拇指指腹：同处接触',620,740,690,orange)}{line(bent?'M 610 710 L 400 568':'M 610 710 L 520 490',orange)}{line(bent?'M 520 475 L 850 475':'M 600 415 L 850 415',green,true)}{box('前臂保持不动',750,210,390)}{map||bent?arrow('M 170 470 Q 80 300 190 180'):p===2?arrow('M 185 180 Q 70 320 180 465',brown,true):null}</>;caption=map?'手掌绕腕弯起，再放平':bent?'只在腕部弯起；拇指同步施力':p===2?'放平至与前臂平齐':'左手掌心向上，四指伸直';detail='拇指不沿皮肤滑动；一弯一放计 1 次';}
 }
 if(id==='SM-063'){
  if(map||p===1){marks=<>{[[430,640],[510,645],[590,640]].map(([x,y],i)=><ContactSymbol key={i} x={x} y={y}/>)}{line('M 400 620 Q 500 600 620 610 L 630 680 Q 510 670 395 690 Z',green,true)}{box('腕掌侧整片横向区域',500,130,650)}{line('M 500 160 L 500 598',green)}{box('腕关节 → 朝前臂约一指宽',500,790,760)}</>;caption='区域内逐点转压；每点 3–5 圈';detail='旋向、点数与点位顺序均无规定';}
  else if(p===3){marks=<>{ring(660,245,40,75)}{arrow('M 615 370 Q 670 350 676 290',brown,true)}{box('拇指指腹已经离肤',500,145,650,brown)}{box('其余四指继续支撑',500,770,610)}</>;caption='抬起拇指，再移到下一点';detail='不要贴肤拖动拇指换点';}
  else{const sw=p===4;const x=sw?500:590,y=sw?480:505;marks=<>{point(x,y)}{box(sw?'左拇指 → 右腕掌侧':'右拇指 → 左腕掌侧',500,760,650,orange)}{line(`M 500 730 L ${x} ${y+30}`,orange)}</>;caption=sw?'换手，覆盖右侧同样区域':p===2?'每点 3–5 圈；螺旋不指定旋向':'掌心向上、前臂不动，四指背侧支撑';detail=sw?'左右各完成一次，整套结束':'每点完成后先抬指，再换位置';}
 }
 if(id==='SM-064'){
  if(map){marks=<>{ring(480,600,115,34)}{box('腕关节掌心侧 · 固定同处',500,760,760,orange)}{line('M 500 730 L 490 642',orange)}</>;caption='食指＋中指指腹，一起拍打';detail='每侧 20–30 次，整套一次';}
  else{const sw=p===3;marks=<>{ring(sw?420:535,sw?565:555,45,35)}{box(sw?'左食指＋中指':'右食指＋中指',500,760,540,orange)}{line(sw?'M 490 730 L 431 610':'M 500 730 L 535 600',orange)}{p===0||p===2?arrow('M 600 580 Q 520 585 480 510',brown,true):arrow(sw?'M 525 475 L 455 540':'M 420 465 L 520 535')}</>;caption=sw?'换手：同样拍右腕 20–30 次':p===0?'左掌向上、腕部放平':'双指一起，固定腕掌侧拍 20–30 次';detail=p===2?'离开后仍回同处；不沿区域换点':'四指自然张开，前臂保持不动';}
 }
 if(id==='SM-065'){
  if(map){marks=<>{ring(290,600,80,32)}{ring(710,600,80,32)}{line('M 410 310 Q 430 430 400 505',orange,false,8)}{line('M 590 310 Q 570 430 600 505',orange,false,8)}{box('① 腕关节掌心侧',500,730,600)}{line('M 250 702 L 286 640',green)}{line('M 750 702 L 713 640',green)}{box('② 小指侧手掌边缘',500,160,650)}{line('M 400 190 L 410 290',green)}{line('M 600 190 L 590 290',green)}</>;caption='先腕掌侧，再小指侧掌缘';detail='两段各 20–30 次；整套一遍';}
  else if(p===0){marks=<>{line('M 500 466 L 500 540',orange,false,9)}{arrow('M 365 520 L 463 503')}{arrow('M 635 520 L 537 503')}{box('双腕掌心侧相互接触',500,760,670,orange)}</>;caption='第一段：互拍 20–30 次';detail='手掌张开，手指自然伸展';}
  else{const apart=p>=2;marks=<>{line(apart?'M 415 325 L 405 520':'M 500 350 L 500 510',orange,false,9)}{apart?line('M 585 325 L 595 520',orange,false,9):null}{p===2?<>{arrow('M 480 450 L 420 450',brown,true)}{arrow('M 520 450 L 580 450',brown,true)}</>:p===1?<>{arrow('M 345 440 L 460 440')}{arrow('M 655 440 L 540 440')}</>:null}{box('小指侧掌缘，不是腕关节',500,760,790,orange)}</>;caption=p===3?'两段依次完成后，整套结束':'第二段：小指侧掌缘互拍 20–30 次';detail=p===2?'掌缘离开，再相互拍击':'保持张掌、手指自然伸展';}
 }
 if(id==='SM-066'){
  const r=p===1&&!map,l=p===3&&!map,b=p===5&&!map;
  const yR=r||b?690:565,yL=l||b?690:565;
  marks=<>{point(160,yR)}{point(840,yL)}{r||b||map?arrow(`M 110 ${yR-145} L 110 ${yR-40}`):null}{l||b||map?arrow(`M 890 ${yL-145} L 890 ${yL-40}`):null}{line('M 600 230 L 600 470',green,true)}{map?box('背部挺直，不主动前倾',500,140,690):null}{!map&&(p===2||p===4||p===6)?<>{arrow('M 110 670 L 110 600',brown,true)}{arrow('M 890 670 L 890 600',brown,true)}</>:null}{box(r?'右侧先行仅为示例':l?'换到另一侧':b?'两手同时下压':'脚底保持相对合并',180,230,330)}</>;
  caption=map?'单侧各 10 秒 → 双侧一起 10 秒':r||l?'单侧持续向下按压 10 秒':b?'双侧同时持续向下按压 10 秒':p===0?'双手掌面分别放同侧膝盖':p===6?'双侧后松力回位，整套结束':'结束先松力，再进入下一段';detail='每段后松力；起始侧不限；整套一遍';
 }
 if(id==='SM-067'){
  if(map||p===3){marks=<>{[[330,350],[365,600],[670,350],[635,600]].map(([x,y],i)=><ContactSymbol key={i} x={x} y={y}/>)}{line('M 375 130 Q 260 90 225 270 Q 210 450 265 650 Q 260 820 390 840 Q 510 825 485 650 L 470 250 Q 470 140 375 130 Z',green,true)}{line('M 625 130 Q 740 90 775 270 Q 790 450 735 650 Q 740 820 610 840 Q 490 825 515 650 L 530 250 Q 530 140 625 130 Z',green,true)}{box('整个脚心侧 · 范围示意',500,70,710)}</>;caption='覆盖一遍；每点 3–5 圈';detail='双脚同时；不规定旋向、顺序或点数';}
  else if(p===2){marks=<>{ring(180,260,35,60)}{ring(820,260,35,60)}{arrow('M 280 330 Q 240 300 205 285',brown,true)}{arrow('M 720 330 Q 760 300 795 285',brown,true)}</>;caption='双拇指先抬起离肤，再换点';detail='其余四指在脚背侧继续支撑';}
  else if(p===0){marks=<>{point(405,785)}{point(595,785)}{box('各扶同侧脚，脚心翻开向上',500,130,790)}</>;caption='双膝向两侧弯曲，双脚靠拢';detail='拇指在脚心侧，四指在脚背侧支撑';}
  else{marks=<>{point(390,450)}{point(610,450)}{box('双拇指指腹 · 同时转按',500,740,750,orange)}</>;caption='每点转按 3–5 圈';detail='螺旋表示转按，不规定旋向';}
 }
 if(id==='SM-068'){
  if(map||p===4){marks=<>{arrow('M 385 625 Q 290 470 185 245')}{arrow('M 615 625 Q 710 470 815 245')}{arrow('M 160 280 Q 155 555 350 680',brown,true)}{arrow('M 840 280 Q 845 555 650 680',brown,true)}{box('终点：膝盖下方的小腿内侧',500,160,820)}{box('起点：脚踝附近',500,800,560)}</>;caption='每点保持 3–5 秒，松开再向上换点';detail='踝到膝下为一遍；松手回踝，总共 2–3 遍';}
  else {const xy=p===3?[[240,550],[790,550]]:p===2?[[380,720],[620,720]]:[[440,815],[560,815]];marks=<>{xy.map(([x,y],i)=><g key={i}>{point(x,y)}</g>)}{p===2?<>{arrow('M 340 720 L 280 635')}{arrow('M 660 720 L 720 635')}</>:null}{box('双拇指指腹 · 两侧同时',500,170,710,orange)}</>;caption=p===3?'到膝下为止，不按膝关节':p===2?'每点松开后，双手随点位一起上移':p===1?'一个点按住，持续保持 3–5 秒':'四指环抱支撑，从脚踝附近开始';detail='不是每点按 3–5 下；点数无规定';}
 }
 if(id==='SM-069'){
  if(map||p===3||p===5){marks=<>{arrow('M 370 690 Q 270 600 130 445')}{arrow('M 630 690 Q 730 600 870 445')}{arrow('M 130 445 Q 20 310 190 400',brown,true)}{arrow('M 870 445 Q 980 310 810 400',brown,true)}{arrow('M 190 400 Q 280 430 330 525')}{arrow('M 810 400 Q 720 430 670 525')}{box('膝关节：抬掌跳过',500,180,660,brown)}{line('M 210 205 L 120 380',brown,true)}{line('M 790 205 L 880 380',brown,true)}{box('终点到大腿根部',500,780,600)}</>;caption='踝 → 小腿内侧 → 跳膝 → 大腿内侧';detail='每点 3–5 下，每下松力；两侧同时一遍';}
  else{const thigh=p===4;const ys=thigh?600:p===2?685:795;const xs=thigh?[340,660]:p===2?[350,650]:[390,610];marks=<>{point(xs[0],ys)}{point(xs[1],ys)}{box('掌心接触 · 两侧同时',500,175,690,orange)}{p===2?<>{arrow('M 330 700 L 245 620')}{arrow('M 670 700 L 755 620')}</>:null}</>;caption=thigh?'大腿内侧中线逐点上行，到大腿根':p===2?'同点做完抬掌，再向上换点':'每点按 3–5 下，每一下后先松力';detail='次数单位是“下”，不是保持秒数';}
 }
 if(id==='SM-070'){
  const views=<>{box('右脚内侧',430,75,260)}{box('分视显示 · 两侧同时',300,135,530)}{box('左脚内侧',720,520,300)}</>;
  if(map||p===3){marks=<>{views}<ContactSymbol x={675} y={210}/><ContactSymbol x={325} y={635}/>{line('M 635 110 Q 755 105 790 220 L 805 310 Q 710 350 590 310 L 550 270 Q 590 195 635 110 Z',green,true)}{line('M 280 535 Q 220 540 220 635 L 220 715 Q 330 755 440 715 L 460 680 Q 390 600 360 540 Z',green,true)}</>;caption='整个脚踝内侧，各处逐点转按';detail='每点 3–5 圈；两侧同时覆盖一遍';}
  else if(p===2){marks=<>{views}{ring(915,110,32,65,brown)}{ring(120,510,32,65,brown)}{arrow('M 820 220 Q 860 195 882 162',brown,true)}{arrow('M 225 590 Q 185 555 160 530',brown,true)}</>;caption='双拇指离开内踝皮肤，再换点';detail='其余四指继续扶踝支撑';}
  else if(p===0){marks=<>{box('同侧手扶同侧踝',500,140,600)}</>;caption='双膝外展，脚心翻开向上';detail='坐姿准备；内踝位置见后续近景';}
  else {marks=<>{views}{point(675,200)}{point(325,630)}</>;caption='双拇指同时转按，每点 3–5 圈';detail='螺旋不规定旋向；每点后抬指';}
 }

 return <svg className="point-overlay managed-batch-overlay managed-061-070-overlay" viewBox="0 0 1000 1000" role="img" aria-label={`${id} ${map?'点位总览':'阶段 '+(p+1)}：${caption}；${detail}`}>
  <defs>{[['green',green],['brown',brown]].map(([name,color])=><marker key={name} id={`${key}-${name}`} markerWidth="16" markerHeight="16" refX="12" refY="7" orient="auto" markerUnits="userSpaceOnUse"><path d="M 1 1 L 13 7 L 1 13" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></marker>)}</defs>
  {marks}{box(caption,500,910)}{box(detail,500,972)}
 <PressMapExamples id={id} phase={p} map={map}/></svg>;
}
