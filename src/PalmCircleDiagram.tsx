import {useId} from 'react';
import {SheetImage} from './SheetImage';

const green='#087f74',paper='#fffaf0';
const center=[510,565],radius=178;
const outward=Array.from({length:1281},(_,i)=>{
 const t=i/1280,a=-Math.PI/2+t*20*Math.PI;
 return [center[0]+radius*t*Math.cos(a),center[1]+radius*t*Math.sin(a)];
});
const path=(pts:number[][])=>pts.map(([x,y],i)=>`${i?'L':'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');

/** One continuous ten-turn path; reversing it preserves the stage transition. */
export function PalmCirclePath({shrink=false}:{shrink?:boolean}){
 const marker='palm-path-'+useId().replaceAll(':','');
 const pts=shrink?[...outward].reverse():outward,start=pts[0],end=pts.at(-1)!;
 return <g data-palm-trajectory={shrink?'shrink':'grow'} data-center={center.join(',')} data-turns={10}>
  <defs><marker id={marker} markerWidth={7} markerHeight={7} refX={5.5} refY={3.5} orient="auto"><path d="M1 1L5.5 3.5L1 6" fill="none" stroke={green} strokeWidth={1.4}/></marker></defs>
  <path d={path(pts)} fill="none" stroke={paper} strokeWidth={7} strokeOpacity={.8}/>
  <path data-palm-path="complete" d={path(pts)} fill="none" stroke={green} strokeWidth={3.5} strokeLinecap="round"/>
  {[.45,.8].map(t=>{
   // Place direction arrows on the middle and outer turns in either stage.
   const index=Math.round((shrink?1-t:t)*1280);
   return <path key={t} d={path(pts.slice(index-9,index+1))} fill="none" stroke={green} strokeWidth={4} markerEnd={`url(#${marker})`}/>;
  })}
  <circle data-path-endpoint="start" cx={start[0]} cy={start[1]} r={10} fill={green} stroke={paper} strokeWidth={3}/>
  <circle data-path-endpoint="end" cx={end[0]} cy={end[1]} r={10} fill={paper} stroke={green} strokeWidth={4}/>
 </g>;
}

export function PalmCircleComparison({folder,mirror,points,onError}:{folder:string;mirror:boolean;points:boolean;onError:()=>void}){
 const hand=mirror?'左':'右';
 return <div className="palm-circle-comparison" aria-label={`${hand}掌画圈的两个完整阶段`}>
  <p className="palm-circle-intro">食指中间关节背面 · 沿掌面连续画圈</p>
  <div className="palm-circle-panels">{[false,true].map(shrink=><figure key={String(shrink)} data-palm-panel={shrink?'shrink':'grow'}>
   <h3>{shrink?'② 反向 · 由大到小':'① 从掌心 · 由小到大'}</h3>
   <div className="palm-circle-picture"><div className="palm-circle-canvas">
    <SheetImage src={folder+'atlas-repair-v3.png'} tile={3} flipX={mirror} alt={`${hand}掌向上，${shrink?'反向从外圈逐渐缩小回到掌心':'从掌心开始逐渐扩大到外圈'}的完整轨迹`} onError={onError}/>
    {points&&<svg className="point-overlay" viewBox="0 0 1000 1000" role="img" aria-label={shrink?'反向由外向内，10圈':'从掌心向外扩大，10圈'}><g transform={mirror?'translate(1000 0) scale(-1 1)':undefined}><PalmCirclePath shrink={shrink}/></g></svg>}
   </div></div>
   <figcaption>{shrink?'外圈接着反向 → 收回掌心':'掌心起步 → 圆圈逐渐扩大'}<strong>共10圈</strong></figcaption>
  </figure>)}</div>
  <p className="palm-circle-note">两个阶段方向相反，转向时也保持贴肤。图中起始旋向为示例。</p>
 </div>;
}
