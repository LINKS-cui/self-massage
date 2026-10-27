import {useId} from 'react';

const ink='#343a32',brown='#82654d',orange='#bd512e',green='#087d70';
type Props={group:'15'|'24'|'3'|'all';bent:boolean;rest:boolean};

// Hallux: MTP + IP. Lesser toes: PIP + DIP. Each profile shows two
// landmarks; the distal one is the contact, not an extra hallux IP joint.
export default function ToeJointInset({group,bent,rest}:Props){
 const uid=useId().replaceAll(':','');
 const pair=group==='15'||group==='all';
 const profiles=pair?['hallux','lesser']:['lesser'];
 const title=group==='15'?'1与5 · 分别辨认接触关节':group==='24'?'第2与第4趾 · 末端关节':group==='3'?'第3趾 · 末端关节':'各趾 · 靠趾尖的关节';
 return <g data-joint-inset="true" data-bent={bent} data-group={group} transform="translate(495 60)">
  <rect width={480} height={pair?440:270} rx={14} fill="#fffaf0" stroke={brown} strokeWidth={2}/>
  <text x={240} y={34} fontSize={26} fontWeight={650} textAnchor="middle" fill={ink}>{title}</text>
  <defs><marker id={uid} markerWidth={20} markerHeight={20} refX={17} refY={10} orient="auto" markerUnits="userSpaceOnUse"><path d="M2 3L17 10L2 17" fill="none" stroke={green} strokeWidth={3}/></marker></defs>
  {profiles.map((kind,i)=>{
   const hallux=kind==='hallux',first=hallux?105:190,top=pair?66+i*170:82;
   return <g key={kind} data-toe-profile={kind} transform={`translate(0 ${top})`}>
    {pair&&<text x={240} y={0} fontSize={23} textAnchor="middle" fill={ink}>{hallux?'大趾：趾根关节＋趾间关节':'小趾：两处趾间关节'}</text>}
    <path d={bent?'M35 43 Q110 30 190 43 L273 50 Q292 51 302 73 L328 118 Q331 138 311 143 Q292 144 282 126 L258 96 L190 94 Q100 96 35 88Z':'M35 43 Q110 30 190 43 L273 48 Q330 41 360 56 Q385 79 358 94 L273 96 L190 94 Q100 96 35 88Z'} fill="#efc9a4" stroke={brown} strokeWidth={3}/>
    <path data-joint-line="proximal" d={`M${first} 40 L${first} 94`} stroke={brown} strokeWidth={2.5}/>
    <path data-joint-line="distal" d={bent?'M273 50 L258 96':'M273 48 L273 96'} stroke={brown} strokeWidth={2.5}/>
    <path d={bent?'M303 94 L321 125':'M311 52 L353 58'} stroke="#bb806a" strokeWidth={5}/>
    <circle cx={273} cy={bent?50:48} r={10} fill="#fffaf0" stroke={orange} strokeWidth={4}/>
    {bent&&<path d="M355 28 Q425 75 370 138" fill="none" stroke={green} strokeWidth={5} markerEnd={`url(#${uid})`}/>}
   </g>;
  })}
  <text x={240} y={pair?424:251} fontSize={23} textAnchor="middle" fill={orange}>{bent?'圈处固定接触 · 趾尖向脚心弯':rest?'松开后伸回 · 两处关节仍标出':'圈处为拇指接触的位置'}</text>
 </g>;
}
