import {useId, type ReactNode} from 'react';
import BaseBack from './managed-131-135.overlay';
import type {ManagedOverlayProps} from '../managed-batches';

export const ids = [124,125,130,131,132,133,134].map(n=>`SM-${n}`);
const green='#087d70', orange='#c9552d', brown='#8a6a4c', ink='#403b33', paper='#fffaf0';
function Label({children,y,x=500,w=900,size=28}:{children:ReactNode;y:number;x?:number;w?:number;size?:number}){
 return <g><rect x={x-w/2} y={y-27} width={w} height="54" rx="10" fill={paper} fillOpacity=".97" stroke={ink} strokeWidth="1.8"/><text x={x} y={y+10} textAnchor="middle" fill={ink} fontSize={size} fontWeight="650">{children}</text></g>;
}
function Dot({x,y,open=false,color=orange,index}:{x:number;y:number;open?:boolean;color?:string;index?:number}){
 return <g data-point-index={index}><circle cx={x} cy={y} r={index?19:13} fill={paper} stroke={color} strokeWidth="4"/>{index?<text x={x} y={y+8} textAnchor="middle" fill={color} fontSize="24" fontWeight="700">{index}</text>:!open&&<circle cx={x} cy={y} r="5" fill={color}/>}</g>;
}
export default function Overlay(props:ManagedOverlayProps){
 const {id,phase:p,map}=props,n=Number(id.slice(3));
 const key='user121135-'+useId().replaceAll(':','');
 const arrow=(d:string,color=green,dash=false)=><path d={d} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash?'10 8':undefined} markerEnd={`url(#${key}-${color===brown?'return':'arrow'})`}/>;
 const line=(d:string,color=orange,dash=false)=><path d={d} fill="none" stroke={color} strokeWidth="3" strokeDasharray={dash?'10 8':undefined}/>;
 let body:ReactNode=null;

 if(n===124){
  const prone=map||[2,4,5].includes(p),mirror=!map&&p===4;
  if(prone){
   body=<><g transform={mirror?'translate(1000 0) scale(-1 1)':undefined}>
    <Dot x={716} y={139}/>{line('M730 150 L850 245')}
    {arrow('M600 510 Q735 570 855 680')}
   </g><Label x={mirror?210:790} y={280} w={350}>{mirror?'左肘支点':'右肘支点'}</Label>
   <Label x={mirror?780:220} y={570} w={400} size={25}>{mirror?'右腿回原仰卧右侧':'左腿回原仰卧左侧'}</Label>
   <Label x={mirror?780:220} y={650} w={400} size={25}>{mirror?'翻身后的左侧 · 向左下伸':'翻身后的右侧 · 向右下伸'}</Label>
   <Label x={mirror?780:220} y={730} w={400} size={25}>脚心朝上 · 脚背朝地</Label>
   <Label x={mirror?780:220} y={810} w={400} size={25}>双手脑后 · 保持 10 秒</Label>
   {(map||p===5)&&<Label x={mirror?780:220} y={890} w={400} size={25}>左右完整动作 2–3 次</Label>}</>;
  }else if(p===0){body=<><Label y={915}>仰卧 · 双腿伸直</Label><Label y={980}>双手抱头垫在脑后</Label></>;}
  else{body=<>{arrow(p===1?'M450 600 Q240 560 130 405':'M550 600 Q760 560 870 405')}<Label y={910}>{p===1?'左直腿跨右 · 尽量与右腿成 90°':'右直腿跨左 · 尽量与左腿成 90°'}</Label><Label y={975}>保持 10 秒 · 双手始终在脑后</Label></>;}
 }

 if(n===125){
  if(!map&&p===100){body=<>{arrow('M105 480 L105 385')}<Label x={255} y={330} w={450}>掌心朝上方</Label><Label y={820}>后脑、背部与臀部贴地 · 双臂在头顶</Label><Label y={900}>小腿向后折 · 双脚在臀旁、脚背贴地</Label><Label y={970}>上身沿地面侧弯 · 每侧停 3–5 秒</Label></>;}
  else if(!map&&p===1){body=<><Label y={710}>十指交叉后翻掌 · 俯视可见掌心</Label><Label y={800}>掌心朝上方（天花板）</Label><Label y={890}>双臂伸直，仍在头顶</Label></>;}
  else{body=<><Dot x={500} y={570}/><Dot x={440} y={765}/><Dot x={555} y={765}/>
   {(map||p===4)?<>{arrow('M420 280 Q240 190 200 110')}{arrow('M580 280 Q760 190 800 110')}</>:p===2?arrow('M500 230 Q650 145 740 110'):p===3?arrow('M500 230 Q350 145 260 110'):null}
   <Label y={870}>掌心朝上 · 双膝和臀部保持原位</Label><Label y={940}>{p===2&&!map?'向左侧弯 · 停 3–5 秒':p===3&&!map?'向右侧弯 · 停 3–5 秒':'一左一右共 3–5 次 · 各停 3–5 秒'}</Label></>;}
 }

 if(n===130){
  const overview=map||[1,2,4,5].includes(p),all=map||p===1||p===5;
  if(overview){
   const inner=[[535,230],[539,320],[542,410],[544,500],[545,585],[545,670]];
   const outer=[[675,230],[615,295],[585,380],[596,480],[620,570],[630,670]];
   body=<>{line('M500 190 V690','#8a8a7d',true)}
    {[1,...(all?[-1]:[])].map(side=><g key={side} transform={side===-1?'translate(1000 0) scale(-1 1)':undefined}>
     {arrow('M535 230 Q545 440 545 670',green,true)}
     {arrow('M675 230 Q610 270 585 380 Q580 450 615 535 L630 670',green,true)}
     {[...inner,...outer].map(([x,y],i)=><Dot key={i} x={x} y={y}/>)}
    </g>)}
    <Label x={190} y={315} w={330}>内线：脊柱旁</Label>{line(all?'M350 335 L458 408':'M350 335 L540 408')}
    <Label x={810} y={450} w={340}>外线：至后腰</Label>{line('M660 475 L620 570')}
    {p===4&&!map&&<>{arrow('M620 570 Q750 565 668 655',brown,true)}<Dot x={660} y={660} open color={brown}/></>}
    <Label y={795}>{p===4&&!map?'松开后换下一点 · 不沿皮肤长推':'沿每条线从上往下 · 每点按住 2–3 秒'}</Label>
    <Label y={880}>一侧双线做完再换侧 · 整套一遍</Label><Label y={960}>点位数量为示意 · 不按脊柱正中</Label></>;
  }else{body=<><circle cx={p===3?505:460} cy={p===3?618:390} r="20" fill="none" stroke={orange} strokeWidth="4"/><Label y={830}>{p===3?'圆钝压头接触后腰':'圆钝压头接触上背脊柱旁'}</Label><Label y={910}>裸背定位 · 每点按住 2–3 秒</Label><Label y={975}>松开后换点 · 细金属钩、长木柄</Label></>;}
 }

 if(n===131){
  if(!map&&p!==3)return <BaseBack {...props}/>;
  body=<><path data-region="upper-back-only" d="M330 325 Q500 265 670 325 L660 475 Q500 515 340 475 Z" fill="#087d7015" stroke={green} strokeWidth="5" strokeDasharray="12 9"/>
   {arrow('M475 403 H390')}{arrow('M525 403 H610')}{arrow('M500 391 V342')}{arrow('M500 420 V470')}
   <Label y={190} x={200} w={340}>仅上背部</Label><Label y={640}>上背部范围，不向腰部延伸</Label><Label y={825}>在此范围内左右、上下移动</Label><Label y={960}>不设固定时间、次数或换侧顺序</Label></>;
 }

 if(n===132){
  if(!map&&p!==5)return <BaseBack {...props}/>;
  const rows=[{y:600,endX:350,endY:520},{y:480,endX:330,endY:400},{y:360,endX:310,endY:280},{y:240,endX:290,endY:160}];
  body=<><Label y={70}>多组起点 · 分别向外斜上滑拉</Label>
   {rows.map(({y,endX,endY},i)=><g key={i} data-route-level={i+1}>
    {[1,-1].map(side=><g key={side} transform={side===-1?'translate(1000 0) scale(-1 1)':undefined}>
     <Dot x={450} y={y}/>{arrow(`M435 ${y-10} L${endX+17} ${endY+10}`)}<Dot x={endX} y={endY} open color={green}/>
    </g>)}
   </g>)}
   {arrow('M225 620 V225',brown,true)}<Label x={180} y={680} w={300}>从下往上换点</Label>
   <Label y={790}>实点：起点 · 空心点：滑拉方向示意端</Label><Label y={875}>左右同时向外斜上拉 · 同点 2–3 次</Label><Label y={960}>最高到双手可触及处 · 图示点数不限定实际点数</Label></>;
 }

 if(n===133){
  if(map||p===3){body=<><path data-region="above-nipples-below-clavicles" d="M325 380 Q500 410 675 380 L668 475 Q500 490 332 475 Z" fill="#087d7020" stroke={green} strokeWidth="5" strokeDasharray="12 9"/>
   <Label x={210} y={280} w={340}>锁骨下方</Label>{line('M210 307 L340 382',green)}
   <Label x={780} y={600} w={360}>乳头上方</Label>{line('M780 570 L660 475',green)}
   <Label y={760}>单手掌心拍打此区域 · 顺序不限</Label><Label y={900}>整个动作共 20–30 秒</Label><Label y={970}>不按拍打次数计数</Label></>;}
  else{const x=p===1?370:p===0?550:515,y=p===1?410:p===0?450:445;
   body=<><ellipse cx={x} cy={y} rx="62" ry="38" fill="none" stroke={orange} strokeWidth="4"/>{p===1&&arrow('M545 455 Q475 440 450 420',brown,true)}
    <Label y={740}>{p===1?'掌心离开，再拍下':'单手掌心接触胸前'}</Label><Label y={840}>范围：乳头上方至锁骨下方</Label><Label y={940}>边拍边移动 · 整个动作共 20–30 秒</Label></>;}
 }

 if(n===134){
  if(map||p===4||p===6){
   const cx=500,cy=480,r=240;
   const points=Array.from({length:8},(_,i)=>{const a=(90+i*45)*Math.PI/180;return {x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r,a};});
   body=<><circle cx={cx} cy={cy} r={r} fill="none" stroke={green} strokeWidth="3" strokeDasharray="9 9"/>
    {points.map(({x,y,a},i)=><g key={i}>
     <Dot x={x} y={y} color={green} index={i+1}/>
     {arrow(`M${cx+Math.cos(a)*(r-35)} ${cy+Math.sin(a)*(r-35)} L${cx+Math.cos(a)*48} ${cy+Math.sin(a)*48}`)}
    </g>)}
    <circle cx={cx} cy={cy} r="23" fill="none" stroke={orange} strokeWidth="3"/>
    {arrow('M250 630 Q195 540 215 430',brown,true)}{arrow('M750 330 Q805 420 785 530',brown,true)}
    {line('M540 500 V700 M530 500 H550 M530 700 H550',orange)}
    <Label x={815} y={745} w={300} size={25}>半径约 10 cm</Label>
    <Label y={120} x={255} w={450}>身体右侧：右手</Label><Label y={120} x={745} w={450}>身体左侧：左手</Label>
    <Label y={810}>①下方起步 · 顺时针经过完整 8 点</Label><Label y={890}>每点向肚脐操作 2–3 次，抬指回原点</Label><Label y={970}>绿色：向心路线 · 棕色：换点次序</Label></>;
  }else if(p===0||p===3){
   body=<><circle cx={576} cy={658} r="23" fill="none" stroke={orange} strokeWidth="3"/>{arrow('M620 630 L620 485')}
    {line('M705 465 V655 M695 465 H715 M695 655 H715',orange)}<Label x={810} y={570} w={260} size={26}>约 10 cm</Label>
    <Label y={800}>手从侧上方伸来 · 食指、中指指腹接触</Label><Label y={880}>由下方圆周点向上拉到肚脐</Label><Label y={960}>{p===3?'同点 2–3 次后，再顺时针换点':'起点距肚脐约 10 厘米'}</Label></>;
  }else if(p===1){body=<>{arrow('M480 650 V425')}<Label y={800}>双指指腹向上拉，终点到肚脐</Label><Label y={885}>完成后抬起双指，再回原圆周点</Label><Label y={970}>同点完成 2–3 次</Label></>;}
  else if(p===2){body=<>{arrow('M575 460 Q720 550 625 685',brown,true)}<Label y={800}>先抬起手指 · 与皮肤分离</Label><Label y={885}>离肤回到下方原点</Label><Label y={970}>不贴着皮肤向外反推</Label></>;}
  else if(p===5){body=<>{arrow('M720 480 Q580 485 475 435')}<Label y={800}>身体左侧用左手 · 从侧上方伸来</Label><Label y={885}>食指、中指指腹沿半径拉向肚脐</Label><Label y={970}>到达肚脐后抬指回位</Label></>;}
 }

 return <svg className="point-overlay managed-batch-overlay" data-user121135={id} viewBox="0 0 1000 1000" role="img" aria-label={`${id} 按用户纠正的姿势、点位和范围`}>
  <defs>{[['arrow',green],['return',brown]].map(([name,color])=><marker key={name} id={`${key}-${name}`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="5" markerHeight="5" orient="auto"><path d="M1 1 L10 6 L1 11" fill="none" stroke={color} strokeWidth="2.4"/></marker>)}</defs>
  {body}
 </svg>;
}
