import {useId, type ReactNode} from 'react';
import Previous from './managed-c-repair.overlay';
import type {ManagedOverlayProps} from '../managed-batches';

export const ids=[110,113,114,115,117,118,119,120,121].map(n=>`SM-${n}`);
const green='#087f74',orange='#c34c2f',ink='#403b33';
function Label({y,children,x=500,w=900}:{y:number;children:ReactNode;x?:number;w?:number}){
 return <g><rect x={x-w/2} y={y-26} width={w} height="52" rx="9" fill="#fffaf0" fillOpacity=".97" stroke={ink} strokeWidth="1.7"/><text x={x} y={y+9} textAnchor="middle" fill={ink} fontSize="25" fontWeight="650">{children}</text></g>;
}
function Ring({x,y}:{x:number;y:number}){return <circle cx={x} cy={y} r="17" fill="none" stroke={orange} strokeWidth="3"/>;}

export default function Overlay(props:ManagedOverlayProps){
 const {id,phase:p,map,pose=0}=props,n=Number(id.slice(3));
 const marker='user-correction-'+useId().replaceAll(':','');
 const arrow=(d:string)=><path d={d} fill="none" stroke={green} strokeWidth="4" strokeLinecap="round" markerEnd={`url(#${marker})`}/>;
 const line=(d:string)=><path d={d} fill="none" stroke={orange} strokeWidth="2.5"/>;
 if(n===120&&!map&&p===304)return <Previous {...props} phase={4}/>;
 let body:ReactNode=null;
 if(n===110&&!map&&p>=200){const left=p===201,x=left?570:430;
  body=<><Ring x={x} y={190}/><Label y={90}>{left?'右手握左脚 · 左膝伸直':'左手握右脚 · 右膝伸直'}</Label><Label y={850}>抬腿与地面成 90° · 头朝天空</Label><Label y={945}>接着直腿跨向对侧，并保持 10 秒</Label></>;
 }
 if(n===113){const tight=map||p>0;body=<><Label y={85}>双臂从两侧绕膝 · 前臂上下交叠，右手握左腕</Label><Label y={915}>{tight?'抱得更紧：大腿贴腹 · 小腿更水平':'双膝并拢 · 从两侧环抱膝下方'}</Label><Label y={975}>{map||p===2?'头颈放松原位 · 深呼吸 20–30 秒':'头颈放松，后脑与背部贴地'}</Label></>;}
 if(n===114){const turn=!map&&(p===1||p===2),left=p===1;body=<><Label y={40} x={600} w={750}>{turn?(left?'腿向身体左 · 头向身体右':'腿向身体右 · 头向身体左'):'双膝并拢 · 双手扶膝'}</Label>{turn&&<><Label y={820} x={left?240:760} w={420}>{left?'左':'右'}大腿外侧靠近地面</Label>{line(left?'M560 650 L380 785':'M440 650 L620 785')}</>}<Label y={915}>小腿、双脚悬空 · 脚心朝前，不朝地面</Label><Label y={975}>{turn?'保持 8–10 秒 · 一左一右共 2–3 次':'一左一右为 1 次 · 共 2–3 次'}</Label></>;}
 if(n===115&&!map&&p>=200){body=<><Label y={70}>{p===202?'第一晃 · 幅度较小':'第二晃 · 幅度比第一晃大'}</Label><Label y={895}>低头收下巴 · 头不向左右侧偏</Label><Label y={965}>小腿交叉 · 双手始终各握对侧脚</Label></>;}
 if(n===117){const b=map?0:p-200,left=map||b<4,hip=[2,3,6,7].includes(b),point=b===1||b===5,rev=b===3||b===7;
  const x=(v:number)=>left?1000-v:v;
  const ankle=pose>0?(pose===1?[455,155]:[760,150]):point?[560,180]:[635,175];
  body=<><g transform={left?'translate(1000 0) scale(-1 1)':undefined}>
   {hip?<><Ring x={590} y={635}/><path d={`M590 615 L${ankle[0]} ${ankle[1]+35}`} fill="none" stroke={green} strokeWidth="3"/>{arrow(rev!==left?'M725 150 A180 110 0 1 0 760 230':'M760 230 A180 110 0 1 1 725 150')}</>:<><Ring x={ankle[0]} y={ankle[1]}/>{arrow(point?'M460 230 Q430 90 535 65':'M620 70 Q480 70 485 215')}</>}
  </g><Label x={x(250)} y={300} w={450}>{hip?'整条直腿以髋为圆心画圈':point?'绷脚：脚尖远离小腿':'勾脚：脚尖向小腿前侧'}</Label><Label y={875}>{left?'身体左腿抬起 · 头朝画面右':'身体右腿抬起 · 头朝画面左'}</Label><Label y={955}>{hip?`${left?'左':'右'}腿绕髋${rev?'逆':'顺'}时针 10 圈`:'每腿勾绷 10 对 · 再绕髋顺／逆各 10 圈'}</Label></>;
 }
 if(n===118){const right=!map&&p>=4,stage=p%4,close=!map&&stage>=2;
  if(!map&&p>=300){body=<><Label y={75}>{p===304?'右脚脚背':'左脚脚背'} · 两拇指在脚背侧</Label><Label y={930}>其余四指包在脚心 · 全身仍保持直腿持足</Label></>;}
  else if(close){const leftHand=stage===2,activeX=right?(leftHand?335:590):(leftHand?410:665);
   body=<><ellipse cx={activeX} cy={490} rx="112" ry="145" fill="#c34c2f16" stroke={orange} strokeWidth="4"/>
    <Label x={170} y={240} w={290}>{right?'右手四指':'左手四指'}</Label><Label x={830} y={240} w={290}>{right?'左手四指':'右手四指'}</Label>
    <Label y={870}>{right?'右':'左'}脚：{leftHand?'左':'右'}手四指成组捏压</Label><Label y={950}>双手持续持足 · 交替每手各 10 次</Label></>;
  }else{body=<><Label x={right?780:220} y={350} w={400}>{right?'右腿伸直抬起':'左腿伸直抬起'}</Label><Label y={875}>双手包过前脚掌 · 四指脚心，拇指脚背</Label><Label y={950}>{!map&&stage===1?'保持持足 · 深呼吸 10 秒':'脚自然勾起 · 双手始终持足'}</Label></>;}
 }
 if(n===119){const open=!map&&p>=2;body=<><Label y={40} x={600} w={750}>{open?'侧视 · 双腿分开、双膝仍直':'侧视 · 双腿并拢伸直'}</Label><Label y={850}>双手各包握前脚掌 · 四指脚心、拇指脚背</Label><Label y={945}>{open?'分开保持 10 秒':'并拢保持 10 秒'} · 两阶段共 2–3 次</Label></>;}
 if(n===120){const bent=!map&&p>=2,neck=!map&&(p===3||p===5);body=<><Label x={bent?600:270} y={bent?240:250} w={bent?720:450}>{bent?'双手托抱大腿后侧 · 靠近膝窝':'双膝保持伸直'}</Label>{neck&&<><Ring x={135} y={660}/>{line('M135 680 L135 735')}<Label x={200} y={790} w={300}>后脑勺接地</Label>{arrow('M300 475 Q235 420 170 475')}<Label x={230} y={370} w={400}>向后仰头 · 颈部弓起</Label></>}<Label y={875}>{bent?'大腿贴腹 · 小腿朝前，双手仍抱在腿后':'双手从两侧托抱大腿后侧 · 靠近膝窝'}</Label><Label y={950}>{bent?'屈膝抱腿并仰头保持 10 秒':'直腿抱持 10 秒'} · 两阶段共 2–3 次</Label></>;}

 if(n===121&&!map&&p>=200){body=<>{line('M610 335 L530 235')}<Label y={190} w={720}>两膝内侧并拢贴紧 · 大腿位置稳定</Label>{p!==200&&<>{arrow(p===201?'M950 500 Q965 370 890 270':'M920 280 Q990 400 950 500')}</>}<Label y={840}>{p===200?'双手掌心向下垫腰 · 双脚悬空':'只摆小腿 · 双脚不落地'}</Label><Label y={935}>{p===200?'保持双膝贴合，再交替摆小腿':'每条小腿一上一下为 1 次 · 左右各 20 次'}</Label></>;}
 if(!body)return <Previous {...props}/>;
 return <svg className="point-overlay managed-batch-overlay" data-user-correction={id} viewBox="0 0 1000 1000" role="img" aria-label="按用户反馈修订的动作示意"><defs><marker id={marker} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M1 1L6 4L1 7" fill="none" stroke={green} strokeWidth="1.5"/></marker></defs>{body}</svg>;
}
