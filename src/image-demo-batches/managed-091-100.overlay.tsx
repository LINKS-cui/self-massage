import BRepairOverlay,{bRepairIds} from './BRepairOverlay';
import {ContactSymbol} from '../ContactSymbol';
import {useId,type ReactNode} from 'react';
import './managed-091-100.css';

export const ids=Array.from({length:10},(_,i)=>`SM-${String(91+i).padStart(3,'0')}`);
const green='#087f74',orange='#c34c2f',brown='#78604d',ink='#403b33';
function Label({y,children,x=500,w=900,color=ink}:{y:number;children:ReactNode;x?:number;w?:number;color?:string}){return <g><rect x={x-w/2} y={y-28} width={w} height="56" rx="10" fill="#fffaf0" fillOpacity=".96" stroke={color} strokeWidth="2"/><text x={x} y={y+10} textAnchor="middle" fill={color} fontSize="28" fontWeight="650">{children}</text></g>;}
function Dot({x,y,r=13}:{x:number;y:number;r?:number}){return <g data-contact="true"><circle cx={x} cy={y} r={r+6} fill="#fffaf0" stroke={orange} strokeWidth="3"/><circle cx={x} cy={y} r={r-3} fill={orange}/></g>;}
function Ring({x,y,rx=31,ry=26}:{x:number;y:number;rx?:number;ry?:number}){return <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke={green} strokeWidth="5"/>;}
export default function Overlay({id,phase:p,map,pose=0}:{id:string;phase:number;map:boolean;pose?:number}){
 const uid=useId().replaceAll(':','');const ar=`ma91-${uid}`,br=`mb91-${uid}`;const n=Number(id.slice(3));
 if(bRepairIds.includes(id))return <BRepairOverlay id={id} phase={p} map={map} pose={pose}/>;
 const path=(d:string,{back=false,double=false,arrow=true}:{back?:boolean;double?:boolean;arrow?:boolean}={})=><path d={d} fill="none" stroke={back?brown:green} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={back?'13 12':undefined} markerEnd={arrow?`url(#${back?br:ar})`:undefined} markerStart={double?`url(#${ar})`:undefined}/>;
 const lead=(d:string)=><path d={d} fill="none" stroke={orange} strokeWidth="3"/>;
 const circle=(x:number,y:number,r=42,reverse=false)=>path(reverse?`M${x+r*.65} ${y-r*.75} A${r} ${r} 0 1 0 ${x+r*.96} ${y+r*.2}`:`M${x+r*.96} ${y+r*.2} A${r} ${r} 0 1 1 ${x+r*.65} ${y-r*.75}`);
 let body:ReactNode;
 if(n===91){
  if(map||p===3||p===4){body=<>{map&&<>{path('M495 445 Q435 445 370 435')}{path('M515 445 Q575 445 635 435')}<Dot x={505} y={445}/><Label y={110}>从前侧胫骨线，分别向两侧滑拉</Label></>}{p===3&&!map?<>{path('M370 440 Q380 345 493 405',{back:true})}{path('M635 440 Q630 345 516 405',{back:true})}<Label y={130}>先松开，再回到同一高度起点</Label></>:<>{path('M720 760 L720 210')}<text x="750" y="290" fontSize="28" fill={green}>膝下</text><text x="750" y="745" fontSize="28" fill={green}>脚踝</text></>}<Label y={875}>{p===3&&!map?'拉开 → 提起保持 → 松开回位 = 1 次':'每处 2–3 次完整动作后，再向上换点'}</Label><Label y={950} color={orange}>提起保持 3–5 秒 · 先右后左 · 各一遍</Label></>;}
  else if(p===0){body=<><Dot x={467} y={660}/><Dot x={525} y={660}/><Label y={870}>右腿前伸、膝稍弯 · 双手抱住小腿</Label><Label y={950} color={orange}>拇指在前，四指在后侧支撑</Label></>;}
  else if(p===1){body=<><Dot x={500} y={395}/><Dot x={542} y={395}/>{path('M475 405 L365 405')}{path('M565 405 L665 405')}<Label y={680}>双拇指指腹贴肤，分别向两侧滑拉</Label><Label y={950}>这一幅示意同一高度的横向动作</Label></>;}
  else if(p===2){body=<><Dot x={418} y={380}/><Dot x={621} y={385}/>{path('M390 380 L300 345')}{path('M650 385 L740 350')}<Label y={660}>拇指配合四指，夹住两侧边缘肌肉</Label><Label y={950} color={orange}>向远离腿骨方向提起 · 保持 3–5 秒</Label></>;}
  else{body=<><Dot x={594} y={643}/><Dot x={640} y={636}/><Label y={920}>换左腿 · 踝部开始，逐点向膝下推进</Label><Label y={980} color={orange}>每腿一遍 · 整套不重复</Label></>;}
 }else if(n===92){
  if(map||p===3){body=<>
   <g data-thigh-route="true"><path d="M505 585 L505 95" fill="none" stroke={green} strokeWidth={5} strokeDasharray="11 10" markerEnd={`url(#${ar})`}/>{[585,505,425,345,265,185,105].map(y=><Dot key={y} x={505} y={y} r={7}/>)}</g>
   <Label y={42} x={580} w={770}>大腿正前方中线 · 膝上 → 大腿根部</Label>
   {lead('M505 105 L660 145')}<Label y={145} x={815} w={300}>到大腿根部</Label>
   {lead('M505 585 L660 615')}<Label y={615} x={815} w={300}>从膝盖上方开始</Label>
   <Label y={875}>每点 3–5 次 · 按下立即松开，再向上换点</Label><Label y={950} color={orange}>路径为逐点推进，不规定固定点数</Label>
  </>;}
  else if(p===0){body=<><Dot x={476} y={504}/>{path('M580 310 Q560 370 510 425')}<Label y={880}>右腿前伸、膝稍弯 · 身体前倾</Label><Label y={950}>双手抱住大腿，四指在后侧支撑</Label></>;}
  else if(p===4){body=<><Dot x={593} y={575}/><Dot x={625} y={570}/><Label y={910}>右腿完成后换左腿 · 同法前倾下压</Label><Label y={980}>每腿一遍 · 整套不重复</Label></>;}
  else{body=<><Dot x={495} y={565}/><Dot x={565} y={565}/>{p===2&&<>{path('M480 430 L480 530')}{path('M580 430 L580 530')}</>}<Label y={720} color={orange}>双拇指指腹并排靠拢 · 不叠放</Label><Label y={935}>{p===2?'身体前倾下压，按下后立即松开':'四指绕在大腿后侧作支撑'}</Label></>;}
 }else if(n===93){
  const rest=!map&&(p===2||p===4);
  body=<><Label y={85} w={900}>第一视角 · 右膝近景，两膝同时做</Label>
   {rest?<Label y={775}>{p===2?'双手松开双膝 · 休息 10 秒':'第二段结束松开 · 整套一遍'}</Label>:<>
    <ContactSymbol x={365} y={490} r={23}/><ContactSymbol x={662} y={450} r={23}/>
    {lead('M365 490 L290 390')}{lead('M662 450 L770 350')}
    <Label x={170} y={355} w={300} color={orange}>拇指 · 膝内侧</Label><Label x={830} y={315} w={300} color={orange}>四指 · 膝外侧</Label>
    <Label y={815}>接触在膝关节两侧 · 双膝保持原位</Label>
   </>}
   <Label y={890}>{rest?'双腿伸直 · 膝盖保持原位':map?'转按 10 秒 → 休息 10 秒 → 再转按 10 秒':p===0?'每手握住同侧膝盖，内外同时转按':p===1?'第一段：两膝同时转按 10 秒':'第二段：两膝同时转按 10 秒'}</Label>
   <Label y={965} color={green}>螺旋表示转按 · 不规定旋转方向</Label>
  </>;
 }else if(n===94){
  if(map){body=<><Dot x={340} y={430}/><Dot x={655} y={430}/><Dot x={500} y={245}/><Dot x={500} y={575}/>{path('M355 430 H640',{double:true})}{path('M500 270 V550',{double:true})}<Label y={90}>先左右拨动，再上下拨动 · 只移动髌骨</Label><Label y={780}>每方向：10 秒 → 松手休 10 秒 → 10 秒</Label><Label y={865}>上下拨：每只手都夹住上下两缘</Label><Label y={950} color={orange}>左膝两阶段完成后换右膝 · 每膝一遍</Label></>;}
  else if([0,2,5,9].includes(p)){body=<><Label y={825}>{p===0?'双腿伸直，膝和整条腿保持原位':p===9?'每膝两个阶段完成 · 整套不重复':'手指松开，休息 10 秒'}</Label><Label y={930} color={orange}>拨动结构是髌骨，不是整条腿</Label></>;}
  else if([1,3,7].includes(p)){const right=p===7;body=<><g transform={right?'translate(1000 0) scale(-1 1)':undefined}><Dot x={390} y={480}/><Dot x={615} y={505}/>{path('M420 485 H590',{double:true})}</g><Label y={745} color={orange}>{right?'右手拇指在内，食指在外':'左手拇指在内，食指在外'}</Label><Label y={830}>{right?'换右膝：先完成左右拨动的两段':p===3?'再次左右往复拨动 10 秒，结束松开':'左膝左右往复拨动 10 秒'}</Label><Label y={935}>髌骨移动 · 双膝与整腿保持原位</Label></>;}
  else{body=<><g transform={p===8?'translate(1000 0) scale(-1 1)':undefined}>{[[465,245],[555,245],[465,555],[565,555]].map(([x,y],i)=><Dot key={i} x={x} y={y}/>)}{path('M510 320 V485',{double:true})}</g><Label y={690} color={orange}>双手：每手拇指＋食指夹住上下两缘</Label><Label y={795}>{p===8?'换右膝：上下拨的时序与左膝相同':p===6?'再上下拨动 10 秒，结束松开':'上下往复拨动 10 秒'}</Label><Label y={935}>拨 10 秒 → 松手休 10 秒 → 再拨 10 秒</Label></>;}
 }else if(n===95){
  if(p===1&&!map){body=<><Dot x={515} y={330}/><Dot x={815} y={540}/><Label y={100} color={orange}>两手分别扶腿窝，稳定大腿</Label><Label y={920}>头和背保持平躺地面</Label></>;}
  else{body=<><Dot x={700} y={530}/><Dot x={590} y={470}/>{(map||p===2)&&path('M880 650 Q980 440 935 220')}{p===3&&!map&&path('M925 220 Q980 450 880 650')}<Label y={100}>{map?'以膝为轴，双小腿同时快抬慢落':p===2?'快速抬起，直到大腿与小腿成一直线':p===3?'缓慢放下，双脚脚掌重新着地':'头背平躺 · 双脚脚掌着地起始'}</Label><Label y={840}>大腿保持稳定 · 双手分别扶腿窝</Label><Label y={935} color={orange}>快抬＋慢落 = 1 次 · 共 20–30 次，一组</Label></>;}
 }else if(n===96){
  if(!map&&p===1){body=<><Dot x={520} y={500}/>{lead('M500 485 L360 360 H180')}<Label x={265} y={300} w={470} color={orange}>四指弯曲后的指背面</Label><Label y={800}>敲大腿后侧，左手握小腿保持稳定</Label><Label y={930}>不用拳的小指侧边缘或手腕敲击</Label></>;}
  else{const right=p===3&&!map;body=<><Dot x={right?545:510} y={right?545:515}/><Dot x={right?350:680} y={370}/>{(map||p===2||right)&&path(right?'M430 470 Q500 540 585 585':'M585 470 Q515 530 435 585')}<Label y={755}>{right?'右手扶右小腿，左拳敲右大腿后侧':'左手扶左小腿，右拳敲左大腿后侧'}</Label><Label y={850} color={green}>腿窝上方 → 大腿根部 · 逐点推进</Label><Label y={945}>每点 8–10 次 · 小腿平行地面 · 两侧各一遍</Label></>;}
 }else if(n===97){
  body=<>{(map||p===0)&&<>{path('M280 430 L220 480',{arrow:false})}{path('M720 430 L780 480',{arrow:false})}{path('M390 790 L350 850',{arrow:false})}{path('M610 790 L650 850',{arrow:false})}</>}{(map||p===1)&&<><ellipse cx="500" cy="320" rx="115" ry="90" fill="none" stroke={green} strokeWidth="4" strokeDasharray="12 12"/><Label x={165} y={300} w={240} color={green}>深呼吸</Label><Label x={835} y={300} w={240} color={green}>10–20 次</Label></>}<Label y={965}>{p===2&&!map?'按深呼吸次数完成，不另设固定时长':'仰卧放松 · 双手双脚自然向两侧打开'}</Label></>;
 }else if(n===98){
  const close=!map&&(p===2||p===3),rev=p===4&&!map;let pts:number[][];
  if(close)pts=p===2?[[320,340],[780,330]]:[[310,460],[715,460]];else pts=rev?[[285,225],[700,225],[425,800],[580,820]]:[[285,225],[700,225],[400,800],[590,800]];
  body=<>{pts.map(([x,y],i)=><g key={i}><Dot x={x} y={y}/>{map||p===0?<Ring x={x} y={y} rx={close?65:44} ry={close?55:40}/>:circle(x,y,close?74:55,rev)}</g>)}<Label y={close?740:615}>{map?'双腕＋双踝，四个关节同时绕圈':p===0?'平躺，准备同时转动双腕与双踝':rev?'反向各 10 圈 · 仍是四个关节同时':close?'近景看接触部位 · 练习时四关节同时':'先沿一个方向，各关节 10 圈'}</Label><Label y={close?835:690} color={green}>{map?'每个关节一向 10 圈，再反向 10 圈':p===0?'橙色标活动关节，不表示按压':'箭头方向仅示例 · 首向可自选'}</Label><Label y={960}>两段合为完整动作</Label></>;
 }else if(n===99){
  if(!map&&(p===2||p===3)){
   const inn=p===2,heelX=inn?200:820,edgeX=inn?880:165;
   body=<><Label y={95}>右脚近景 · 实际两脚同时{inn?'向内倒':'向外倒'}</Label>
    <Label y={185} color={green}>脚心与垫面垂直 · 脚的侧边触地</Label>
    <Dot x={heelX} y={642} r={10}/><Dot x={edgeX} y={645} r={10}/>
    {lead(`M${heelX} 655 V720`)}{lead(`M${edgeX} 658 V720`)}
    <Label x={inn?210:800} y={755} w={330} color={orange}>脚后跟始终触地</Label>
    <Label x={inn?785:205} y={755} w={360} color={orange}>{inn?'大趾侧触地':'小趾侧触地'}</Label>
    <Label y={865}>内外反复摆 · 同时继续前臂绕肘</Label>
    <Label y={950}>近景为接地状态 · 不增加保持时长</Label>
   </>;
  }
  else if(!map&&p===1){body=<><Dot x={150} y={620}/><Dot x={865} y={720}/>{path('M35 620 A115 350 0 0 1 265 620')}{path('M755 720 A110 430 0 0 1 975 720')}<Label y={90}>以肘关节为圆心，让两侧前臂画圈</Label><Label y={885}>首向各 10 圈，再各自反向 10 圈</Label><Label y={960} color={green}>方向仅示例 · 脚部同时内外摆</Label></>;}
  else{body=<><Dot x={270} y={245}/><Dot x={720} y={245}/>{circle(270,245,110,p===4&&!map)}{circle(720,245,110,p===4&&!map)}
   <Dot x={375} y={890} r={9}/><Dot x={615} y={890} r={9}/>
   {path('M295 790 H430',{double:true})}{path('M565 790 H700',{double:true})}
   <Label y={380}>{map?'前臂绕肘 · 两脚以脚跟为支点内外倒':p===4?'前臂反向各 10 圈，脚部继续反复摆动':p===5?'上肢两段完成后结束，摆脚不另计数':'前臂首向各 10 圈，同时内外摆脚'}</Label>
   <Label y={455}>脚心始终与垫面垂直 · 两脚侧边轮流接地</Label>
   <Label y={965} color={green}>上下肢同时进行 · 首向箭头仅示例</Label>
  </>;}

 }else{
  const down=!map&&p===2,mid=!map&&p===1,ret=!map&&p===3;const e=down?[[320,215],[680,215]]:[[315,215],[690,215]];
  body=<>{e.map(([x,y],i)=><Dot key={i} x={x} y={y}/>)}{(map||p===0||p===4)&&<>{path('M245 350 V115',{double:map})}{path('M760 350 V115',{double:map})}</>}{down&&<>{path('M245 110 V360')}{path('M755 110 V360')}</>}{ret&&<>{path('M240 350 V100')}{path('M760 350 V100')}</>}{mid&&<><Ring x={330} y={160}/><Ring x={670} y={160}/></>}{!mid&&<>{path(down?'M395 760 V900':'M395 900 V760',{double:map})}{path(down?'M605 760 V900':'M605 900 V760',{double:map})}<text x={270} y={835} fontSize="28" fill={green}>{map?'勾↔绷':down?'绷脚':'勾脚'}</text></>}<Label y={635}>{map?'头侧配勾脚 ↔ 脚侧配绷脚':down?'前臂朝脚侧 · 同时绷脚':mid?'经过朝天位置，不在此增加停留':'前臂朝头侧 · 同时勾脚'}</Label><Label y={710} color={orange}>大臂与肘原位 · 肘始终弯 90°</Label><Label y={955}>{map?'前臂往返配合一次勾绷脚 = 1 次，共 20 次':mid?'从头侧抬起，经朝天，再落向脚侧':'左右与上下肢同步 · 完整往返共 20 次'}</Label></>;
 }
 return <svg className="point-overlay managed-batch-overlay managed-091-100-overlay" data-exercise={id} data-map={map} viewBox="0 0 1000 1000" role="img" aria-label={map?'本动作点位方向总览':'本步骤点位与方向'}><defs>{[[ar,green],[br,brown]].map(([name,c])=><marker key={name} id={name} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto-start-reverse"><path d="M1 1L7 4.5L1 8" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></marker>)}</defs>{body}</svg>;
}
