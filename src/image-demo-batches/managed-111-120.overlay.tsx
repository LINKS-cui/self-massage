import {useId,type ReactNode} from 'react';
import './managed-111-120.css';
export const ids=Array.from({length:10},(_,i)=>`SM-${111+i}`);
const green='#087f74',orange='#c34c2f',ink='#403b33';
function Label({y,children,x=500,w=900,color=ink}:{y:number;children:ReactNode;x?:number;w?:number;color?:string}){return <g><rect x={x-w/2} y={y-28} width={w} height="56" rx="10" fill="#fffaf0" fillOpacity=".96" stroke={color} strokeWidth="2"/><text x={x} y={y+10} textAnchor="middle" fill={color} fontSize="28" fontWeight="650">{children}</text></g>;}
function Dot({x,y,r=12}:{x:number;y:number;r?:number}){return <g data-contact="true"><circle cx={x} cy={y} r={r+6} fill="#fffaf0" stroke={orange} strokeWidth="3"/><circle cx={x} cy={y} r={r-3} fill={orange}/></g>;}
export default function Overlay({id,phase:p,map,pose=0}:{id:string;phase:number;map:boolean;pose?:number}){
 const uid=useId().replaceAll(':',''),ar=`ma111-${uid}`;const n=Number(id.slice(3));
 const path=(d:string,{double=false,arrow=true,dash=false}:{double?:boolean;arrow?:boolean;dash?:boolean}={})=><path d={d} fill="none" stroke={green} strokeWidth={dash?3:6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash?'10 10':undefined} markerEnd={arrow?`url(#${ar})`:undefined} markerStart={double?`url(#${ar})`:undefined}/>;
 const lead=(d:string)=><path d={d} fill="none" stroke={orange} strokeWidth="3"/>;
 const orbit=(x:number,y:number,rx:number,ry:number,reverse=false)=>path(reverse?`M${x+rx*.7} ${y-ry*.7} A${rx} ${ry} 0 1 0 ${x+rx} ${y}`:`M${x+rx} ${y} A${rx} ${ry} 0 1 1 ${x+rx*.7} ${y-ry*.7}`);
 const breath=(x:number,y:number,rx=85,ry=65)=><ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke={green} strokeWidth="4" strokeDasharray="12 12"/>;
 let body:ReactNode;
 if(n===111){
  const a=!map&&p===1,b=!map&&p===2,c=!map&&p===3;
  const pts=a?[[350,345],[675,270]]:b?[[725,325],[455,220]]:c?[[585,290],[560,195]]:[[585,325],[560,240]];
  body=<>{pts.map(([x,y],i)=><Dot key={i} x={x} y={y}/>)}{a?<>{path('M450 410 Q390 470 320 445')}{path('M530 200 Q610 160 710 200')}{path('M400 430 H685',{arrow:false,dash:true})}{path('M735 340 H930',{arrow:false,dash:true})}</>:b?<>{path('M530 410 Q640 425 750 415')}{path('M550 180 Q470 160 390 200')}{path('M765 380 H940',{arrow:false,dash:true})}{path('M520 275 H735',{arrow:false,dash:true})}</>:<>{path('M625 385 H895',{arrow:false,dash:true})}{path('M610 290 H865',{arrow:false,dash:true})}</>}<Label y={110}>{map?'大腿一近一远，随后交换':a?'一侧靠近腹部，另一侧同时远离':b?'交换靠近与远离，双手各随一膝':c?'保持双膝弯曲，小腿平行地面':'双手分别扶膝，两小腿与地面平行'}</Label><Label y={845} color={orange}>只交替活动大腿 · 不蹬直小腿</Label><Label y={935}>持续 20–30 秒 · 按时间，不计交替数</Label></>;
 }else if(n===112){
  const close=!map&&p===1,up=!map&&p===2,down=!map&&p===3;const knee=close?[260,210]:up?[595,380]:down?[590,310]:[595,340];
  body=<><Dot x={knee[0]} y={knee[1]}/>{close?<>{path('M380 310 H830',{arrow:false})}<Label y={100}>两小腿并拢，始终悬空</Label></>:<>{(map||up)&&path('M875 510 A285 285 0 0 0 890 190')}{(map||down)&&path('M925 200 A300 300 0 0 1 925 530')}<Label y={100} x={up?300:500} w={up?520:900}>{map?'膝为支点 · 双小腿同步上下摆':up?'同步向上，不要求完全伸直':down?'同步向下，双脚仍不落地':'双臂向两侧打开，帮助平衡'}</Label></>}<Label y={875} color={orange}>大腿保持抬起 · 两小腿同步，不交替</Label><Label y={955}>20–30 秒 · 幅度与速度无固定要求</Label></>;
 }else if(n===113){
  body=<><Dot x={520} y={325}/><Dot x={653} y={310}/>{(map||p===1)&&path('M670 220 Q540 190 430 270')}{(map||p>=2)&&<>{breath(365,545)}<Dot x={125} y={590}/>{lead('M125 610 L125 745 H265')}<Label x={270} y={785} w={450}>头颈放松，原位不动</Label></>}<Label y={100}>{map?'双膝靠近胸部 · 保持深呼吸':p===0?'双腿并拢屈膝，双手抱住膝盖':p===1?'舒服范围内，双膝尽可能靠近胸部':'深呼吸，不规定吸气与呼气时长'}</Label><Label y={915} color={green}>抱膝＋深呼吸 · 持续 20–30 秒</Label></>;
 }else if(n===114){
  const left=!map&&p===1,right=!map&&p===2;
  const pts=left?[[660,525],[715,550]]:right?[[310,505],[370,515]]:[[440,430],[560,430]];
  body=<>{pts.map(([x,y],i)=><Dot key={i} x={x} y={y}/>)}{left?<>{path('M490 660 H825')}{path('M600 100 H325')}<Label x={800} y={370} w={350} color={green}>腿向身体左</Label><Label x={165} y={250} w={270}>头向右</Label></>:right?<>{path('M510 670 H180')}{path('M390 90 H665')}<Label x={200} y={370} w={350} color={green}>腿向身体右</Label><Label x={835} y={250} w={270}>头向左</Label></>:<><Label x={170} y={330} w={260}>身体右</Label><Label x={830} y={330} w={260}>身体左</Label>{path('M280 600 H720',{double:true})}{path('M390 85 H610',{double:true})}</>}<Label y={900}>{map?'腿左头右 → 腿右头左':left?'腿左、头右 · 保持 8–10 秒':right?'腿右、头左 · 保持 8–10 秒':'俯视图：左右均指练习者自身'}</Label><Label y={975} color={orange}>一左一右 = 1 次 · 共 2–3 次</Label></>;
 }else if(n===115){
  const grip=!map&&p===1,rock=!map&&(p===2||p===3),sit=!map&&p===4;
  if(grip){body=<><Dot x={215} y={675}/><Dot x={790} y={675}/><Label y={170}>小腿交叉 · 手握对侧脚</Label><Label x={250} y={830} w={420} color={orange}>右手握左脚</Label><Label x={750} y={830} w={420} color={orange}>左手握右脚</Label><Label y={950}>整个序列均保持，不在坐起时撑地</Label></>;}
  else if(rock){body=<><Dot x={290} y={305}/>{path('M160 820 Q480 1040 850 800',{double:true})}<Label y={90}>{p===2?'第一次前后晃动':'第二次前后晃动，逐渐加大幅度'}</Label><Label y={160} w={650}>背部团拢成弧线</Label><Label y={965}>两手持续握对侧脚 · 小腿保持交叉</Label></>;}
  else if(sit){body=<><Dot x={850} y={595}/><Dot x={620} y={645}/><Label x={165} y={120} w={280}>第 3 次坐起</Label><Label y={850}>坐起仍保持交叉握足，随后躺回</Label><Label y={950} color={orange}>不是撑手坐起，也不松开双脚</Label></>;}
  else{body=<><Dot x={200} y={730}/><Dot x={810} y={730}/>{lead('M200 750 V825 H300')}{lead('M810 750 V825 H700')}<Label x={250} y={865} w={420} color={orange}>右手握左脚</Label><Label x={750} y={865} w={420} color={orange}>左手握右脚</Label><Label y={940}>{p===5&&!map?'坐起后躺回 · 双手、小腿关系不变':'两晃 → 第 3 次坐起 → 躺回 · 共 5 序列'}</Label></>;}
 }else if(n===116){
  const knees=!map&&(p===1||p===2),ankle=!map&&(p===3||p===4),rev=p===2||p===4;
  if(knees){body=<><Dot x={510} y={570}/>{orbit(510,570,240,110,rev)}{lead('M510 590 L455 735')}<Label x={420} y={780} w={440} color={orange}>腰部为圆心</Label><Label y={100}>双膝并拢 · 在水平面画圈</Label><Label y={890}>两膝同步画圈</Label><Label y={975} color={green}>{rev?'反向：逆时针 10 圈':'先顺时针 10 圈'}</Label></>;}
  else if(ankle){const x=rev?740:830,y=rev?410:375;body=<><Dot x={x} y={y}/>{orbit(x,y,rev?160:125,180,rev)}<Label x={300} y={100} w={520}>脚踝为圆心 · 竖直面绕圈</Label><Label y={770} color={green}>{rev?'双脚同时同向 · 逆时针各 10 圈':'双脚同时同向 · 顺时针各 10 圈'}</Label><Label y={890}>双膝阶段完成后，再做双踝阶段</Label><Label y={970}>保持屈膝抬腿 · 圈中姿势不另计次数</Label></>;}
  else{body=<><Dot x={510} y={570}/><Dot x={905} y={320}/>{path('M270 570 A240 110 0 1 1 750 570 A240 110 0 1 1 270 570',{arrow:false})}{path('M870 140 A85 180 0 1 1 870 500',{arrow:false})}<Label y={100}>先双膝水平圈，完成后再双脚竖直圈</Label><Label y={860}>双膝：腰部圆心，顺／逆各 10 圈</Label><Label y={950}>双脚：踝部圆心，同时同向，顺／逆各 10 圈</Label></>;}
 }else if(n===117){
  const right=!map&&p>=4,point=!map&&(p===1||p===5),hip=map||[2,3,6,7].includes(p),rev=p===3||p===7;
  const ankle=right?(point?[700,170]:[750,165]):(point?[560,180]:[635,175]);
  const pivot=right?[670,640]:[590,640];
  body=<>{hip?<><Dot x={pivot[0]} y={pivot[1]}/>{path(`M${pivot[0]} ${pivot[1]-20} L${ankle[0]} 225`,{arrow:false,dash:true})}{orbit(right?725:620,210,right?210:235,110,rev)}<Label x={260} y={280} w={440} color={green}>整条直腿绕髋画圈</Label></>:<><Dot x={ankle[0]} y={ankle[1]}/>{path(point?`M${ankle[0]-100} 190 Q${ankle[0]-140} 75 ${ankle[0]-15} 60`:`M${ankle[0]-10} 70 Q${ankle[0]-160} 70 ${ankle[0]-145} 210`)}<Label x={250} y={290} w={420} color={green}>{point?'绷脚：脚尖远离小腿':'勾脚：脚尖向小腿前侧'}</Label></>}<Label y={885}>{map?'先左腿完成两阶段，再换右腿':p===8?'每腿一遍，整套只做一次':hip?`${right?'右':'左'}腿：${rev?'逆':'顺'}时针 10 圈`:`${right?'右':'左'}腿：一勾一绷 = 1 次，共 10 次`}</Label><Label y={970} color={orange}>{map?'勾绷 10 对 → 绕髋顺／逆各 10 圈':'膝保持伸直 · 不规定抬腿角度和圈幅'}</Label></>;
 }else if(n===118){
  const close=map||p===3||p===4,dorsal=!map&&p===1,right=!map&&p>=5;
  if(close){const leftActive=p===3&&!map,rightActive=p===4&&!map;body=<><ellipse cx="410" cy="470" rx="140" ry="145" fill={rightActive?'#c34c2f18':'none'} stroke={orange} strokeWidth={rightActive?6:3}/><ellipse cx="665" cy="490" rx="115" ry="140" fill={leftActive?'#c34c2f18':'none'} stroke={orange} strokeWidth={leftActive?6:3}/>{lead('M315 365 L170 295')}{lead('M760 385 L865 295')}<Label x={165} y={240} w={270} color={orange}>右手四指</Label><Label x={835} y={240} w={270} color={orange}>左手四指</Label><Label y={945}>{map?'四指在脚心，拇指绕到脚背 · 两手交替各 10 次':leftActive?'左手四指一组捏压，右手仍握住脚部':'右手四指一组捏压，左手仍握住脚部'}</Label></>;}
  else if(dorsal){body=<><Dot x={440} y={240}/><Dot x={600} y={240}/>{lead('M440 260 L360 405')}{lead('M600 260 L680 405')}<Label y={465} w={740} color={orange}>两拇指在脚背，四指绕至脚心</Label><Label y={935}>脚背视角核对握法 · 仍保持直腿持足</Label></>;}
  else{const hand=right?[635,155]:[420,160];body=<><Dot x={hand[0]} y={hand[1]}/>{(p===2||p===5)&&breath(right?760:310,550,90,65)}<Label x={right?240:760} y={320} w={410}>{right?'右腿伸直':'左腿伸直'}</Label><Label y={850}>{p===0?'双手共同握住同一脚脚掌':p===2||p===5?'先保持姿势，深呼吸 10 秒':p===6?'再双手四指交替捏脚心，每手各 10 次':'两脚各一遍，整套只做一次'}</Label><Label y={950} color={orange}>四指脚心侧 · 拇指脚背侧 · 持足不松开</Label></>;}
 }else if(n===119){
  const open=map||p===2||p===3,alt=!map&&pose===1&&(p===1||p===2);const pts=open?(alt?[[135,205],[865,205]]:[[130,220],[890,220]]):(alt?[[440,160],[550,160]]:[[435,165],[550,165]]);
  body=<>{pts.map(([x,y],i)=><Dot key={i} x={x} y={y}/>)}{open&&<>{path('M440 150 Q300 95 180 245')}{path('M560 150 Q700 95 820 245')}</>}<Label y={890}>{alt?'替代握法：够不到脚掌时，可扶脚踝':open?'双手扶脚掌，辅助双腿向两侧分开':'双手扶脚掌，双腿伸直并拢'}</Label><Label y={970} color={green}>{map||p===3?'并拢 10 秒＋分开 10 秒 = 1 次，共 2–3 次':open?'分开保持 10 秒 · 双膝仍伸直':'并拢保持 10 秒 · 双膝伸直'}</Label></>;
 }else{
  const straight=!map&&p<=1,detail=!map&&p===2,neck=!map&&p===4;
  if(straight){body=<><Dot x={725} y={545}/><Dot x={675} y={560}/>{p===1&&path('M655 380 Q565 370 465 435')}<Label x={250} y={210} w={440}>双膝保持伸直</Label><Label y={900}>双手抱大腿后侧、靠近腿窝</Label><Label y={975} color={orange}>{p===1?'在舒服范围靠近胸部 · 保持 10 秒':'双腿伸直抬起，先核对抱持位置'}</Label></>;}
  else if(detail){body=<><Dot x={650} y={385}/><Dot x={325} y={240}/><Label y={750}>屈膝后手位不变，仍在大腿后侧</Label><Label y={940}>靠近腿窝处抱紧 · 近景不另设停留</Label></>;}
  else if(neck){body=<><Dot x={280} y={770}/>{lead('M280 790 V860 H370')}{path('M600 720 Q650 700 700 740',{arrow:false})}<Label x={300} y={905} w={460} color={orange}>后脑勺接地</Label><Label x={780} y={810} w={370} color={green}>颈部弓起</Label><Label y={975}>同一段 10 秒 · 不额外增加保持</Label></>;}
  else{body=<><Dot x={610} y={545}/><Dot x={145} y={795}/>{path('M270 640 Q170 585 95 705')}<Label y={110}>屈膝抱腿，同时仰头、颈部弓起</Label><Label x={240} y={875} w={420} color={orange}>后脑勺顶住地面</Label><Label x={750} y={875} w={440}>大腿后侧抱持不变</Label><Label y={970}>{map||p===5?'直腿 10 秒＋屈膝仰头 10 秒 · 共 2–3 次':'保持 10 秒 · 头向后仰，不向膝盖卷起'}</Label></>;}
 }
 return <svg className="point-overlay managed-batch-overlay managed-111-120-overlay" data-exercise={id} data-map={map} viewBox="0 0 1000 1000" role="img" aria-label={map?'本动作接触和方向总览':'本步骤接触位置和方向'}><defs><marker id={ar} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto-start-reverse"><path d="M1 1L7 4.5L1 8" fill="none" stroke={green} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></marker></defs>{body}</svg>;
}
