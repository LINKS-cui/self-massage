/** Contact semantics only. A spiral has no arrow and does not prescribe direction/count. */
const spiralPath=Array.from({length:81},(_,i)=>{
 const t=i/80,a=t*Math.PI*3.5,r=.1+.9*t;
 return `${i?'L':'M'}${(Math.cos(a)*r).toFixed(4)} ${(Math.sin(a)*r).toFixed(4)}`;
}).join(' ');
export function ContactSymbol({x,y,kind='rotate',r=24,reverse=false}:{x:number;y:number;kind?:'rotate'|'press';r?:number;reverse?:boolean}){
 const color='#c34c2f';
 return <g data-contact-kind={kind} data-symbol={kind==='rotate'?'spiral':'dot'} transform={`translate(${x} ${y})`}>
 {kind==='rotate'?<g transform={`scale(${reverse?-r:r} ${r})`} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d={spiralPath} stroke="#fffaf0" strokeWidth=".44"/><path d={spiralPath} stroke={color} strokeWidth=".19"/></g>:<circle r={r*.58} fill={color} stroke="#fffaf0" strokeWidth="4"/>}
 </g>;
}
export function SpiralLegend(){return <svg className="spiral-legend" viewBox="-30 -30 60 60" aria-hidden="true"><ContactSymbol x={0} y={0}/></svg>;}
