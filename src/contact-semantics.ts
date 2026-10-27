import type {ImageDemoDefinition} from './image-demos';
// Manually reviewed against all 135 confirmed procedures, not keyword matching at runtime.
export const rotatingContactIds=[2,7,9,15,20,21,26,29,38,39,40,50,51,52,56,63,67,70,73,75,83,84,93].map(n=>`SM-${String(n).padStart(3,'0')}`);
export const mixedHoldIds=['SM-007','SM-009','SM-052','SM-056','SM-073','SM-084'];
export const plainPressureIds=[11,16,17,23,32,33,34,36,37,44,45,46,47,48,60,62,66,68,69,74,76,78,81,82,88,90,92,110,114,129,130,135].map(n=>`SM-${String(n).padStart(3,'0')}`);
export function applyContactSemantics(demos:Record<string,ImageDemoDefinition>){
 // SM-055 is continuous travel across the palm, not rotation at a pressure point.
 if(demos['SM-055']){demos['SM-055'].legend=['每阶段起点','每阶段终点','箭头：贴肤移动方向'];demos['SM-055'].legendKinds=['start','end','trajectory'];}
 for(const id of plainPressureIds){
  const d=demos[id];if(!d)continue;
  const kinds=d.legendKinds||d.legend.map((_,i)=>['start','end','press'][i]);
  const hasDot=kinds.includes('press');
  d.legend=d.legend.map((label,i)=>kinds[i]==='press'?label+'（圆点）':label);
  if(!hasDot){d.legend.push('按压位置（圆点）');kinds.push('press');}
  d.legendKinds=kinds;
 }
 for(const id of rotatingContactIds){
  const d=demos[id];if(!d)continue;
  // Preserve positional/range/return keys. Replace only the ambiguous contact key.
  const kinds=d.legendKinds||d.legend.map((_,i)=>['start','end','press'][i]);
  const retained=d.legend.flatMap((label,i)=>kinds[i]==='press'||kinds[i]==='spiral'?[]:[{label,kind:kinds[i]}]);
  retained.push({label:'转压／转按（螺旋）',kind:'spiral'});
  if(mixedHoldIds.includes(id))retained.push({label:['SM-052','SM-056'].includes(id)?'指尖捏持（圆点）':'按压保持（圆点）',kind:'press'});
  d.legend=retained.map(x=>x.label);d.legendKinds=retained.map(x=>x.kind);
 }
}
