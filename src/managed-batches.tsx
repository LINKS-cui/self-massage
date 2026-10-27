import type {ComponentType} from 'react';
import type {ImageDemoDefinition} from './image-demos';

export type ManagedOverlayProps={id:string;phase:number;map:boolean;pose?:number;swapSides?:boolean};
type ManagedModule={ids:string[];default:ComponentType<ManagedOverlayProps>};
const definitions=import.meta.glob('./image-demo-batches/managed-*.json',{eager:true,import:'default'}) as Record<string,Record<string,ImageDemoDefinition>>;
const modules=import.meta.glob('./image-demo-batches/managed-*.overlay.tsx',{eager:true}) as Record<string,ManagedModule>;
const overlays=new Map<string,ComponentType<ManagedOverlayProps>>();
for(const module of Object.values(modules))for(const id of module.ids)overlays.set(id,module.default);
export const managedDemos:Record<string,ImageDemoDefinition>={};
for(const batch of Object.values(definitions))for(const [id,definition] of Object.entries(batch)){
 if(overlays.has(id))managedDemos[id]=definition;
}
export const isManagedBatch=(id:string)=>Boolean(managedDemos[id]);
export function ManagedBatchOverlay(props:ManagedOverlayProps){const Overlay=overlays.get(props.id);return Overlay?<Overlay {...props}/>:null;}
