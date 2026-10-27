import {useId,type ReactNode} from 'react';
import './four-actions.css';
import ToeJointInset from './ToeJointInset';

const green='#087d70',blue='#356f9b',orange='#bd512e',brown='#82654d',paper='#fffaf0',ink='#343a32';
type Props={id:string;phase:number;map:boolean;pose?:number};
function Label({x=500,y,w=600,children,color=ink}:{x?:number;y:number;w?:number;children:ReactNode;color?:string}){
 return <g><rect x={x-w/2} y={y-27} width={w} height={54} rx={9} fill={paper} fillOpacity={.97} stroke={color} strokeWidth={1.5}/><text x={x} y={y+10} textAnchor="middle" fill={color} fontSize={29} fontWeight={650}>{children}</text></g>;
}
function Dot({x,y,r=11}:{x:number;y:number;r?:number}){return <circle cx={x} cy={y} r={r} fill={paper} fillOpacity={.7} stroke={orange} strokeWidth={4}/>;}
function Zone({d,color=green,name}:{d:string;color?:string;name:string}){return <path data-region={name} d={d} fill={color} fillOpacity={.13} stroke={color} strokeWidth={3.5} strokeDasharray="10 7"/>;}

export default function FourActionsOverlay({id,phase:p,map,pose=0}:Props){
 const key=useId().replaceAll(':','');
 const mirror=!map&&p===5;
 const arrow=(d:string,color=green,dashed=false)=><path d={d} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" strokeDasharray={dashed?'10 8':undefined} markerEnd={`url(#${key}-${color===blue?'blue':color===brown?'back':'go'})`}/>;
 const line=(d:string,color=orange)=><path d={d} fill="none" stroke={color} strokeWidth={2.5}/>;
 const reflected=(node:ReactNode)=><g transform={mirror?'translate(1000 0) scale(-1 1)':undefined}>{node}</g>;
 let body:ReactNode=null,title='',footer='',detail='';

 if(id==='SM-080'){
  const lift=map||p===1||p===3;
  title='第一视角 · 双脚掌相对合并';
  body=<>
   {lift?<>
    <ellipse cx={400} cy={143} rx={24} ry={34} fill="none" stroke={orange} strokeWidth={4} transform="rotate(-30 400 143)"/>
    <ellipse cx={601} cy={143} rx={24} ry={34} fill="none" stroke={orange} strokeWidth={4} transform="rotate(30 601 143)"/>
    {arrow('M463 195 Q435 120 374 105')}{arrow('M537 195 Q565 120 626 105')}
   </>:<><ellipse cx={471} cy={162} rx={21} ry={35} fill="none" stroke={orange} strokeWidth={4}/><ellipse cx={530} cy={162} rx={21} ry={35} fill="none" stroke={orange} strokeWidth={4}/></>}
   {lift&&<>{line('M484 163 L468 163 L468 278 L484 278',green)}{line('M468 225 L270 350',green)}
    <Label x={225} y={375} w={400}>四对小趾仍在中央相贴</Label></>}
   {line('M504 563 L690 670',green)}<Label x={650} y={700} w={490}>脚跟、脚掌保持相贴</Label>
  </>;
  footer=map?'只有大脚趾朝各自脚背侧抬起':p===0?'准备：双膝打开，双脚掌合并':lift?'抬起大脚趾 · 保持10秒':'恢复平齐 · 保持10秒';
  detail=map?'抬起10秒＋平齐10秒为一轮，共两轮':p===0?'不用手辅助；其余四趾和脚踝保持原位':p<3?'第一轮 · 两种状态直接切换':'第二轮 · 平齐保持后结束';
 }
 if(id==='SM-081'){
  const full=!map&&(p===0||(p===3&&pose===1)||(p===5&&pose===2));
  const posterior=map||p===2||(p===1&&pose===1),lateral=map||p===4;
  title=map?'先后侧拇指，再外侧掌心':full?'上身前倾 · 力量经手臂传到掌心':posterior?'后侧区域 · 拇指逐点按压':lateral?'外侧区域 · 掌心逐点按压':p===3||(p===5&&pose===1)?'外侧 · 五指并拢，掌心接触':'后侧 · 拇指指腹接触';
  if(full){
   body=<>{reflected(<><Dot x={310} y={632} r={16}/>{arrow('M300 415 Q340 500 315 595')}{line('M310 632 L560 470')}</>)}<Label x={mirror?290:710} y={430} w={440}>由髋部前倾下压</Label><Label x={mirror?270:730} y={505} w={400}>每下按后松力</Label></>;
  }else if(posterior||lateral){
   body=<>
    {posterior&&<g data-area="posterior">
     <Zone name="posterior" d="M180 358 Q360 335 545 345 L490 407 Q340 445 155 458Z"/>
     {[[205,402],[275,395],[350,382],[420,377],[485,367]].map(([x,y],i)=><Dot key={i} x={x} y={y} r={7}/>)}
     {arrow('M185 426 Q330 420 505 390',green,true)}{line('M315 420 L230 580',green)}
     <Label x={225} y={625} w={370} color={green}>① 后侧 · 拇指</Label>
    </g>}
    {lateral&&<g data-area="lateral">
     <Zone name="lateral" color={blue} d="M220 225 Q420 235 550 280 L600 316 Q410 322 195 323Z"/>
     {[[240,278],[310,282],[380,284],[450,289],[520,297]].map(([x,y],i)=><Dot key={i} x={x} y={y} r={7}/>)}
     {arrow('M230 250 Q410 255 560 303',blue,true)}{line('M500 280 L690 180',blue)}
     <Label x={730} y={135} w={410} color={blue}>② 外侧 · 掌心</Label>
    </g>}
    <Label x={750} y={640} w={420}>两区分开，避开膝关节</Label>
   </>;
  }else{
   const palm=p===3||(p===5&&pose===1);
   body=<>{reflected(<>{palm?<><ellipse cx={464} cy={249} rx={37} ry={28} fill="none" stroke={orange} strokeWidth={4}/>{line('M464 249 L700 145')}{arrow('M465 110 L465 209')}</>:<><Dot x={410} y={411}/>{line('M410 411 L245 590')}</>}</>)}
    <Label x={palm?(mirror?255:745):mirror?745:225} y={palm?110:635} w={palm?420:390}>{palm?'掌心承接上身力量':`${mirror?'左':'右'}拇指 · 四指环抱`}</Label>
   </>;
  }
  footer='根部向膝端逐点换处 · 每点3–5下';
  detail=map||posterior||lateral?'点位为覆盖示例；同点完成后抬手再换点':p===5?'左腿仍先后侧拇指，再外侧掌心':'每下松力；同侧两区完成后再换腿';
 }
 if(id==='SM-082'){
  const full=!map&&(p===0||p===4||(p===3&&pose===1));
  const path=map||p===2,double=p===3||(p===5&&pose===1);
  title=path?'第一视角 · 小腿后侧中线':double?'第一视角 · 双拇指并拢共按一点':`第一视角 · ${mirror?'左':'右'}拇指指腹`;
  if(full){
   title=p===4?(pose===1?'松力 · 上身回到起始位置':pose===2?'重新准备 · 同点再按':'由髋部前倾 · 借上身力量下压'):'坐姿 · 左腿前伸，右小腿平放';
   body=<>
    <Label x={310} y={890} w={550}>右膝向左 · 右脚心朝右</Label>
    {p===4&&pose!==2&&arrow(pose===1?'M570 440 Q575 340 535 245':'M535 245 Q575 340 570 440',pose===1?brown:green,pose===1)}
   </>;
  }else if(path)body=<>
   <Zone name="posterior-calf" d="M335 520 Q560 545 825 602 L810 639 Q565 610 340 585Z"/>
   {[[365,555],[465,572],[565,587],[665,603],[765,618]].map(([x,y],i)=><Dot key={i} x={x} y={y} r={8}/>)}
   {arrow('M345 550 Q540 575 810 618',green,true)}
   {line('M345 550 L265 365',green)}<Label x={270} y={325} w={360}>从腿窝下方开始</Label>
   {line('M810 618 L795 730',green)}<Label x={770} y={780} w={350}>向下到脚踝</Label>
  </>;
  else body=<>{reflected(<>
   {double?<ellipse data-common-contact="true" cx={505} cy={574} rx={36} ry={23} fill="none" stroke={orange} strokeWidth={4}/>:<Dot x={513} y={581} r={14}/>}
   {line(double?'M505 574 L515 365':'M513 581 L515 365')}
  </>)}<Label y={320} w={double?740:570}>{double?'两指并排并拢 · 共同接触同一处':'四指环抱，拇指指腹按压'}</Label></>;
  footer='先单拇指，再双拇指 · 每点3–5下';
  detail=path?'从腿窝下到脚踝；单指、双指分别走完一遍':mirror?'左腿同样先单指，再双指':'按后松力；同点完成后抬指换点';
 }
 if(id==='SM-088'){
  const rest=p===2||([1,3,4].includes(p)&&pose===1)||(p===5&&pose===3);
  const group=p===5?(pose===1?'24':pose===2?'3':'15'):p===3?'24':p===4?'3':'15';
  const bent=map||(!rest&&p!==0);
  title=map?'末端关节定位 · 趾尖朝脚心弯':rest?'松开 · 趾端恢复自然位置':p===0?'轻触 · 趾尖前最后一处关节':`${mirror?'左脚':'右脚'}${group==='15'?'大趾＋小趾':group==='24'?'第2＋第4趾':'第3趾'} · 末节向下弯`;
  const coords=group==='15'?[[420,635],[869,566]]:group==='24'?[[459,599],[720,590]]:[[557,585]];
  body=<>
   {map?<>{[[441,634],[552,623],[652,625],[746,619],[813,564]].map(([x,y],i)=><g key={i}><Dot x={x} y={y} r={12}/><text x={x} y={y-26} textAnchor="middle" fontSize={31} fontWeight={700} fill={orange}>{i+1}</text></g>)}</>:rest?reflected(<>{arrow('M345 573 L320 500',brown,true)}{arrow('M868 533 L893 460',brown,true)}</>):reflected(<>
    {(p===0?[[428,608],[824,573]]:coords).map(([x,y],i)=><Dot key={i} x={x} y={y} r={10}/>)}
    {bent&&coords.map(([x,y],i)=><g key={i}>{arrow(`M${x+55} ${y-10} Q${x+110} ${y+25} ${x+73} ${y+95}`)}</g>)}
   </>)}
   <ToeJointInset group={map?'all':group} bent={bent} rest={rest}/>
  </>;
  footer=rest?'拇指抬起松开 · 四指继续轻托前足':'拇指固定在末端关节 · 四指从脚心侧托住';
  detail='1＋5 → 2＋4 → 3；每组2次×10秒，中间松开';
 }
 return <svg className="point-overlay four-actions-overlay" viewBox="0 0 1000 1000" role="img" aria-label={`${id}：${title}；${footer}；${detail}`} data-action={id} data-pose={pose} data-mirror={mirror}>
  <defs>{[['go',green],['blue',blue],['back',brown]].map(([name,color])=><marker key={name} id={`${key}-${name}`} markerWidth={23} markerHeight={23} refX={19} refY={11} orient="auto" markerUnits="userSpaceOnUse"><path d="M2 3L19 11L2 19" fill="none" stroke={color} strokeWidth={3}/></marker>)}</defs>
  <g transform="translate(90 90) scale(.82)">{body}</g>
  <Label x={560} y={47} w={850}>{title}</Label><Label y={928} w={965}>{footer}</Label><Label y={980} w={965}>{detail}</Label>
 </svg>;
}
