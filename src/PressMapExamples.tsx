import {ContactSymbol} from './ContactSymbol';
// Example contact sites on existing diagrams, not a prescribed point count.
const examples:Record<string,{phases:number[];points:number[][]}>={
 'SM-037':{phases:[],points:[[450,115],[570,115]]},
 'SM-046':{phases:[3],points:[[450,160],[570,460]]},
 'SM-047':{phases:[1,3],points:[[325,320],[560,525]]},
 'SM-048':{phases:[3,4],points:[[355,630]]},
 'SM-068':{phases:[4],points:[[370,600],[630,600]]},
 'SM-069':{phases:[3,5],points:[[320,630],[680,630],[280,470],[720,470]]},
 'SM-076':{phases:[1,2,3],points:[[525,375],[525,470],[525,560]]},
 'SM-078':{phases:[3],points:[[480,370]]},
 'SM-081':{phases:[2,4,5],points:[[550,690],[700,560]]},
 'SM-082':{phases:[2,5],points:[[525,550]]},
 'SM-129':{phases:[1,2,5],points:[[605,270],[625,320],[554,410],[395,270],[375,320],[446,410]]},
 'SM-130':{phases:[1,2,5],points:[[543,470],[600,480],[457,470],[400,480]]},
};
export function PressMapExamples({id,phase,map}:{id:string;phase:number;map:boolean}){
 const e=examples[id];if(!e||(!map&&!e.phases.includes(phase)))return null;
 let points=e.points;
 if(!map&&id==='SM-047'&&phase===1)points=points.slice(0,1);
 if(!map&&id==='SM-076')points=[points[phase-1]];
 if(!map&&id==='SM-081'&&[2,4].includes(phase))points=[points[phase===2?0:1]];
 if(!map&&['SM-129','SM-130'].includes(id)&&phase===2)points=points.slice(0,points.length/2);
 return <g data-pressure-examples="true">{points.map(([x,y],i)=><ContactSymbol key={i} x={x} y={y} kind="press"/>)}</g>;
}
