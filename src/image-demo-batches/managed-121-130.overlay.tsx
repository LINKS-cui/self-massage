import {PressMapExamples} from '../PressMapExamples';
import {useId,type ReactNode} from 'react';
import './managed-121-130.css';
export const ids=Array.from({length:10},(_,i)=>`SM-${121+i}`);
type Props={id:string;phase:number;map:boolean;pose?:number};
const GREEN='#087d70',ORANGE='#c9552d',BROWN='#8a6a4c';
function Point({x,y,open=false}:{x:number;y:number;open?:boolean}){return <g><circle cx={x} cy={y} r="16" fill="#fffaf0" stroke={ORANGE} strokeWidth="5" strokeDasharray={open?'6 5':undefined}/>{!open&&<circle cx={x} cy={y} r="6" fill={ORANGE}/>}</g>;}
function Tag({x=500,y=900,w=850,children,color='#3d3c34'}:{x?:number;y?:number;w?:number;children:ReactNode;color?:string}){return <g><rect x={x-w/2} y={y-29} width={w} height="58" rx="12" fill="#fffaf0" fillOpacity=".96" stroke={color} strokeWidth="2"/><text x={x} y={y+10} textAnchor="middle" fill={color} fontSize="30" fontWeight="650">{children}</text></g>;}
export default function Overlay({id,phase:p,map}:Props){
 const uid=useId().replaceAll(':','');
 const arrow=(d:string,dashed=false,color=GREEN)=> <path d={d} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashed?'12 10':undefined} markerEnd={`url(#${uid}-${color===BROWN?'return':'arrow'})`}/>;
 const lead=(d:string)=><path d={d} fill="none" stroke={ORANGE} strokeWidth="3"/>;
 let body:ReactNode=null;
 if(id==='SM-121'){
  const circle=map||p>=3;
  body=<>{circle?<>
   <Point x={475} y={685}/>{lead('M475 685 L330 795')}<Tag x={320} y={820} w={360}>腰为圆心</Tag>
   {(map||p===3||p===5)&&arrow('M520 610 C700 595 760 670 600 720 C445 765 395 665 510 615')}
   {p===4&&!map&&arrow('M520 610 C395 665 445 765 600 720 C760 670 700 595 530 610')}
   <Tag y={100}>{map?'先摆小腿各 20 次，再抬臀画圈':p===3?'抬臀 · 顺时针 10 圈':p===4?'抬臀 · 逆时针 10 圈':'尽量平行地面 · 允许倾斜'}</Tag>
   <Tag y={920}>{map?'顺时针 10 圈 → 逆时针 10 圈':'椭圆示意轨迹 · 不规定圈径或高度'}</Tag>
  </>:<>
   <Point x={p===2?644:592} y={p===2?390:330}/><Point x={480} y={p===2?750:700}/>
   {p>0&&<>{arrow(p===2?'M900 250 Q990 360 930 500':'M930 500 Q990 360 900 250')}{arrow(p===2?'M805 500 Q880 430 835 340':'M835 340 Q880 430 805 500')}</>}
   <Tag x={400} y={100} w={700}>{p===0?'双手掌心向下垫腰 · 双脚悬空':'绕膝摆小腿 · 一上另一下，再交换'}</Tag>
   <Tag y={900}>{p===2?'各腿一上一下算 1 次 · 左右各 20 次':'大腿相对稳定 · 双脚不落地'}</Tag>
  </>}</>;
 }else if(id==='SM-122'){
  const oblique=!map&&p===2,open=map||p===1||p===4;
  body=<>{oblique?<><Point x={740} y={650}/><Tag y={100}>脚掌相贴 · 双脚仍悬空</Tag>{lead('M740 650 L760 790')}</>:<>
   <Point x={open?290:280} y={open?420:415}/><Point x={open?710:720} y={open?420:415}/>
   {open?<><Point x={500} y={710}/>{arrow('M250 430 Q220 315 420 285')}{arrow('M750 430 Q780 315 580 285')}{arrow('M440 510 Q350 480 250 480')}{arrow('M560 510 Q650 480 750 480')}</>:p===3?<>{arrow('M425 310 Q250 310 130 460',true,BROWN)}{arrow('M575 310 Q750 310 870 460',true,BROWN)}{arrow('M290 550 L430 500',true,BROWN)}{arrow('M710 550 L570 500',true,BROWN)}</>:null}
  </>}
  <Tag y={860}>{map||p===1?'双肘贴地、大臂不动 · 手臂与开膝同时':p===3?'一起原路复位 · 双膝重新并拢':p===0?'双臂侧放 · 双膝屈曲抬起并拢':'脚掌相贴时，以两脚接触处为支点'}</Tag><Tag y={945}>双脚始终悬空 · 完整来回 20 次</Tag></>;
 }else if(id==='SM-123'){
  const side=p===2||p===5,mirror=p===3||p===4||p===5;
  body=<>{side?<>
   {arrow(mirror?'M490 230 Q310 150 130 160':'M490 230 Q690 150 870 160')}
   {arrow(mirror?'M530 490 Q660 590 825 680':'M470 490 Q340 590 175 680')}
   <Tag y={930}>{mirror?'右侧卧 · 左臂并拢、左腿回左':'左侧卧 · 右臂并拢、右腿回右'}</Tag>
   <Tag x={mirror?220:780} y={780} w={340}>保持 10 秒</Tag>
  </>:<>
   <Point x={mirror?90:900} y={mirror?270:250} open={p===1||p===4}/>
   {(p===1||p===4)&&arrow(mirror?'M90 270 Q130 160 220 170':'M900 250 Q940 155 850 145',true,BROWN)}
   <Tag y={910}>{p===1||p===4?'先松开脚，再转身回摆':mirror?'左腿跨右 · 右手握左脚 · 头转左':'右腿跨左 · 左手握右脚 · 头转右'}</Tag>
   <Tag y={965}>{map||p===6?'左右各两阶段合 1 次 · 共 2–3 次':p===1||p===4?'先松手是独立顺序要求':'直腿，尽量约 90 度 · 保持 10 秒'}</Tag>
  </>}</>;
 }else if(id==='SM-124'){
  const prone=map||[2,3,5,6].includes(p),mir=p===5;
  body=<>{prone?<>
   <Point x={mir?280:760} y={180}/>{lead(mir?'M280 180 L150 310':'M760 180 L855 315')}
   <Tag x={mir?180:810} y={355} w={300}>{mir?'左肘支点':'右肘支点'}</Tag>
   {arrow(mir?'M670 350 L820 150':'M330 350 L180 150')}
   <Tag y={905}>{mir?'右腿回右并朝头侧伸':'左腿回左并朝头侧伸'}</Tag>
   <Tag y={970}>脸朝下 · 手仍脑后 · 保持 10 秒</Tag>
  </>:p===0?<><Tag x={220} y={800} w={330}>双腿伸直</Tag><Tag y={965}>双手抱头垫在脑后</Tag></>:<>
   {arrow(p===1?'M450 600 Q240 560 130 405':'M550 600 Q760 560 870 405')}
   <Tag y={910}>{p===1?'左直腿跨右 · 尽量与右腿成 90 度':'右直腿跨左 · 尽量与左腿成 90 度'}</Tag>
   <Tag y={965}>保持 10 秒 · 双手始终在脑后</Tag>
  </>}{(map||p===6)&&<Tag x={240} y={650} w={430}>左右各两段 · 2–3 次</Tag>}</>;
 }else if(id==='SM-125'){
  body=<>{!map&&p===1?<><Tag y={890}>从手前方看掌心 · 十指交叉后翻掌</Tag><Tag y={965}>掌心朝远离头顶的方向</Tag></>:<>
   <Point x={500} y={570}/><Point x={440} y={765}/><Point x={555} y={765}/>
   {map||p===4?<>{arrow('M420 280 Q240 190 200 110')}{arrow('M580 280 Q760 190 800 110')}</>:p===2?arrow('M500 230 Q650 145 740 110'):p===3?arrow('M500 230 Q350 145 260 110'):null}
   <Tag y={885}>膝与臀原位 · 背部始终朝地</Tag>
   <Tag y={960}>{map||p===4?'一左一右共 3–5 次 · 各停 3–5 秒':p===2?'上身向左侧弯 · 停 3–5 秒':p===3?'上身向右侧弯 · 停 3–5 秒':'脚在臀旁 · 双脚背贴地'}</Tag>
  </>}</>;
 }else if(id==='SM-126'){
  const mir=!map&&p===3;
  body=<>
   <Point x={mir?900:100} y={420}/><Point x={mir?875:125} y={710}/><Point x={mir?110:890} y={550}/>
   <Point x={mir?540:460} y={580} open/><Point x={mir?80:920} y={455} open/>
   <Tag y={100}>头贴地 · 下侧手臂和腿贴地</Tag><Tag y={185}>上侧手臂和腿悬空 · 双脚绷直</Tag>
   {(map||p<2)&&<>{arrow(mir?'M730 410 L600 540':'M270 410 L400 540')}{arrow(mir?'M320 420 L190 475':'M680 420 L810 475')}</>}
   <Tag y={875}>{p===1&&!map?'双腿稍屈膝 · 向身体后方伸展':'双臂伸直向后展开 · 头不抬起'}</Tag>
   <Tag y={950}>{mir?'换侧后保持 10 秒':map||p===4?'左右各 10 秒 · 完整两侧共 2–3 次':'此侧保持 10 秒后，再换侧'}</Tag>
  </>;
 }else if(id==='SM-127'){
  const toes=!map&&p===2,relax=!map&&p===3,hold=map||p===1||p===4;
  body=<>{relax?<>{arrow('M690 555 Q750 490 810 540',true,BROWN)}<Tag y={830}>松开抓握，放松恢复趴姿</Tag></>:<>
   <Point x={toes?640:hold?625:715} y={toes?185:hold?350:450}/><Point x={toes?790:hold?800:840} y={toes?160:hold?330:440}/>
   {hold&&<><Point x={470} y={735}/>{arrow('M300 730 L280 560')}{arrow('M820 730 L825 560')}</>}
   <Tag y={850}>{toes?'够不到踝时可抓同侧脚尖':hold?'前胸和大腿均离地 · 腹部支撑':'左手抓左踝 · 右手抓右踝'}</Tag>
  </>}
  <Tag y={940}>保持 10 秒后松开 · 共 2–3 次</Tag></>;
 }else if(id==='SM-128'){
  const legs=!map&&[3,4,5].includes(p),head=!map&&(p===1||p===2);
  body=<>{legs?<>
   <Point x={250} y={775}/><Point x={750} y={775}/>
   {p===4?<>{arrow('M440 500 L285 410')}{arrow('M560 500 L715 410')}</>:<>
    {arrow(p===3?'M320 650 L560 360':'M680 650 L440 360')}
    <Tag x={500} y={895} w={850}>{p===3?'左小腿在前 · 右小腿在后':'右小腿在前 · 左小腿在后'}</Tag>
   </>}
   <Tag y={965}>{p===4?'打开后再次交叉，交换前后顺序':'此为腿部局部 · 头部仍同时侧倾'}</Tag>
  </>:head?<>
   <Point x={270} y={775}/><Point x={735} y={775}/>
   {arrow(p===1?'M520 145 Q655 160 700 270':'M480 145 Q345 160 300 270')}
   <Tag y={925}>{p===1?'左耳向左肩靠近 · 脖子主动侧倾':'右耳向右肩靠近 · 脖子主动侧倾'}</Tag>
  </>:<>
   <Point x={175} y={665}/><Point x={425} y={700}/><Point x={740} y={550}/>
   {arrow('M610 340 Q695 290 770 330')}{arrow('M835 330 Q770 290 700 340')}
   <Tag y={865}>双肘和大腿贴地 · 双手托腮</Tag><Tag y={940}>头腿同时活动 20–30 秒 · 无固定配对</Tag>
  </>}</>;
 }else if(id==='SM-129'){
  const overview=map||[1,2,4,5].includes(p);
  if(overview){
   const all=map||p===1||p===5;
   body=<>
    {[1,...(all?[-1]:[])].map(side=><g key={side} transform={side===-1?'translate(1000 0) scale(-1 1)':undefined}>
     {arrow('M550 235 Q610 270 685 305',true)}
     {arrow('M550 270 Q600 315 690 350',true)}
     {arrow('M535 255 Q548 320 550 375 Q555 440 590 430 Q625 415 646 365',true)}
    </g>)}
    {p===4&&!map&&<><Point x={553} y={365}/>{arrow('M553 365 Q610 355 585 410',true,BROWN)}<Point x={585} y={410} open/></>}
    <Tag x={210} y={165} w={340}>肩正上方线</Tag>{lead('M340 190 L650 290')}
    <Tag x={810} y={200} w={340}>肩后侧线</Tag>{lead('M810 230 L665 340')}
    <Tag y={720}>肩胛骨缝线：含向外弯曲的完整末段</Tag>{lead('M560 690 L590 430')}
    <Tag y={835}>{p===4&&!map?'每点按住 2–3 秒 → 松开 → 换点':'各线从脖子端到末端 · 三线先后不固定'}</Tag>
    <Tag y={925}>同侧三线做完再换侧 · 整套一遍</Tag>
   </>;
  }else body=<><Point x={p===3?480:482} y={p===3?425:175}/><Tag y={840}>{p===3?'圆钝压头接触 · 原位按住 2–3 秒':'手持钩背器，按压背部'}</Tag><Tag y={930}>按住后松开，再换到下一个点</Tag></>;
 }else if(id==='SM-130'){
  const overview=map||[1,2,4,5].includes(p);
  if(overview){
   const all=map||p===1||p===5;
   body=<>
    <path d="M500 185 L500 760" stroke="#8a8a7d" strokeWidth="3" strokeDasharray="8 8"/>
    {[1,...(all?[-1]:[])].map(side=><g key={side} transform={side===-1?'translate(1000 0) scale(-1 1)':undefined}>
     {arrow('M535 220 Q545 450 545 735',true)}
     {arrow('M675 225 Q610 270 585 360 Q580 445 615 525 L630 735',true)}
    </g>)}
    {p===4&&!map&&<><Point x={615} y={530}/>{arrow('M615 530 Q725 535 660 625',true,BROWN)}<Point x={625} y={635} open/></>}
    <Tag x={200} y={360} w={320}>内线：紧邻脊柱旁</Tag>{lead(all?'M350 380 L455 450':'M350 380 L545 450')}
    <Tag x={795} y={465} w={340}>外线：到后腰</Tag>{lead('M665 495 L625 625')}
    <Tag y={820}>{p===4&&!map?'按住 2–3 秒后松开，再换点':'各线从上往下逐点按 · 不在脊柱正中'}</Tag>
    <Tag y={925}>一侧双线完成再换侧 · 整套一遍</Tag>
   </>;
  }else body=<><Point x={p===3?480:460} y={p===3?635:410}/><Tag y={860}>细杆、木柄、圆钝压头 · 按住 2–3 秒</Tag><Tag y={940}>松开后再换点 · 不规定固定点数</Tag></>;
 }
 return <svg className="point-overlay managed-batch-overlay managed-121-130-overlay" viewBox="0 0 1000 1000" role="img" aria-label={`${id} ${map?'点位总览':'阶段'+(p+1)+'点位与方向'}`}>
  <defs>{[['arrow',GREEN],['return',BROWN]].map(([name,color])=><marker key={name} id={`${uid}-${name}`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="5" markerHeight="5" orient="auto"><path d="M1 1 L10 6 L1 11" fill="none" stroke={color} strokeWidth="2.4"/></marker>)}</defs>{body}
 <PressMapExamples id={id} phase={p} map={map}/></svg>;
}
