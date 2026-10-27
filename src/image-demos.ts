import {applyHandOriginRepairs} from './hand-origin-repairs';
import {applyPovCorrections} from './pov-corrections';
import {applyReferenceRepairs} from './reference-repairs-060-070';
import {applyVisualRepairs} from './visual-repairs-050-078';
import {cleanDisplayCopy} from './display-copy';
import {applyContactSemantics} from './contact-semantics';
import {managedDemos} from './managed-batches';
import batch5160 from './image-demo-batches/sm051-060.json' with {type:'json'};
import batch4150 from './image-demo-batches/sm041-050.json' with {type:'json'};
import batch1120 from './image-demos-011-020.json' with {type:'json'};
import batch0310 from './image-demo-batches/sm003-010.json' with {type:'json'};
import batch2130 from './image-demo-batches/sm021-030.json' with {type:'json'};
import batch3140 from './image-demo-batches/sm031-040.json' with {type:'json'};
export type ImageView={file:string;tile?:number;cropTop?:number;flipX?:boolean;overlayPhase?:number;overlayFlipX?:boolean;repairView?:string;sideLabel?:string};
export type ImagePhase=ImageView & {title:string;short:string;caption:string;alt:string;sourceStep?:number;poses?:(ImageView & {label:string;alt?:string})[]};
export type ImageDemoDefinition={id:string;uid:string;contentRevision:string;status:'draft';publication:'not-approved';reviewIssue?:string;instructionOverrides?:Record<number,string>;folder:string;poster:string;posterTile?:number;posterFlipX?:boolean;mapTile?:number;mapFlipX?:boolean;mapOverlayFlipX?:boolean;mapRepairView?:string;overlayFamily?:'face-batch'|'hand-batch'|'head-arm-batch';phases:ImagePhase[];mapFile:string;mapAlt:string;mapTitle:string;mapCaption:string;legend:string[];legendKinds?:string[];noteTitle:string;note:string;playerNote:string;cardCaption:string};
export const imageDemos:Record<string,ImageDemoDefinition>={
 'SM-001':{
  id:'SM-001',uid:'ex-d55893c0-16ac-5b8d-ba19-238ed2d54c46',contentRevision:'2d5ed7bb0a494530',status:'draft',publication:'not-approved',folder:'./illustrations/sm001/',poster:'03-stroke-v2.png',mapFile:'04-map.png',
  phases:[
   {title:'温掌 · 搓热双手',short:'温掌',file:'01-warm.png',caption:'双手掌面相对，相互搓动，让手掌温热。原步骤未规定温掌时长。',alt:'闭眼男子在胸前将双手掌面相对，做搓手准备的手势图'},
   {title:'覆眼 · 四指并拢',short:'覆眼',file:'02-cover-four-together-v3.png',caption:'闭眼，双手四指并拢覆盖双眼。中指与无名指指尖对齐，左右中指指尖相碰，左右无名指指尖也相碰。',alt:'双手各自四指并拢覆盖闭合双眼，左右中指和左右无名指指尖分别在中线相碰'},
   {title:'刮拭 · 由内向外',short:'刮拭',file:'03-stroke-v2.png',caption:'用中指和无名指的指肚沿上眼眶由内向外刮拭。绿色实点为内侧起点，空心点为外侧终点。全程闭眼。',alt:'中指与无名指的指肚位于内侧上眼眶，箭头沿上眼眶向外'},
   {title:'回位 · 先抬起手指',short:'回位',file:'04-map.png',caption:'到达外侧后，先抬起手指、离开皮肤，再回到内侧起点。虚线表示空中回位，不沿皮肤向内刮。',alt:'闭眼正面脸部点位图，虚线表示从外侧离肤返回内侧'},
   {title:'重复 · 共刮拭 5–10 次',short:'重复',file:'04-map.png',caption:'重复“向外刮拭 → 抬指 → 回到内侧”。共刮拭 5–10 次，刮拭速度无要求。',alt:'上眼眶的向外刮拭实线与离肤回位虚线，提示重复5至10次'},
  ],mapAlt:'双眼闭合的无遮挡脸部，标出上眼眶内侧起点、外侧终点与两种路径',mapTitle:'实线向外刮，抬指再回位',mapCaption:'绿色实线沿上眼眶由内向外；棕色虚线表示抬指后的空中回位。两端是路径起止位置，不是新增的按压穴位。',legend:['内侧起点','外侧终点','操作手指'],
  noteTitle:'两根手指与两条路径，分开看。',note:'橙色只标示中指和无名指，不表示点按。绿色实线表示沿上眼眶向外刮拭；棕色虚线表示抬指后回到内侧。全程闭眼，共刮拭 5–10 次，速度无要求。',playerNote:'翻页每页 6 秒，仅供看图，不是练习计时。温掌和覆眼未规定固定秒数；刮拭速度无要求。起止点是位置示意，手型与接触细节仍待复核。',cardCaption:'温掌、覆眼、向外刮拭、抬指回位，五步看清手型与路径。',
 },
 'SM-002':{
  id:'SM-002',uid:'ex-afc5b549-4fb7-51da-bd3b-1912f780b5f0',contentRevision:'5870efe98f6cf1a1',status:'draft',publication:'not-approved',folder:'./illustrations/sm002/',poster:'01-upper-v2.png',mapFile:'03-map.png',
  phases:[
   {title:'摆手 · 拇指固定太阳穴',short:'摆手',file:'01-upper-v2.png',caption:'全程闭眼，双手拇指分别固定两侧太阳穴，其余四指分开，左右两眼同时操作。图中无名指停在下一步的内侧起点。',alt:'闭眼男子双手四指分开，拇指固定太阳穴，无名指位于内侧上眼眶，其余手指分开'},
   {title:'横扫 · 由内向外',short:'横扫',file:'01-upper-v2.png',caption:'只用无名指沿上眼眶由内向外横扫。到达外侧后抬指回到内侧，再重复，共横扫 5–10 次。实线表示向外横扫，虚线表示离肤回位；手势图展示内侧起点。',alt:'无名指在内侧上眼眶的起点手势，绿色箭头向外横扫，虚线向内表示抬指回位'},
   {title:'上眼眶 · 依次转压三点',short:'上眼眶',file:'01-upper-v2.png',caption:'两侧同时用无名指，按 ①内侧 → ②中间 → ③外侧的顺序，转压上眼眶三个点，每点旋转 5–10 圈。手势展示第一个点，编号标出后续位置。转压没有规定旋转方向。',alt:'无名指接触内侧上眼眶，左右各三个编号点由内向外排列，双手拇指保持固定'},
   {title:'下眼眶 · 依次转压三点',short:'下眼眶',file:'02-lower.png',caption:'再按 ①内侧 → ②中间 → ③外侧的顺序，用无名指转压下眼眶三个点，每点旋转 5–10 圈，左右两侧同时操作。手势展示第一个点，转压没有规定旋转方向。',alt:'双手无名指移到内侧下眼眶，左右各三个下眼眶点由内向外编号，拇指继续固定太阳穴'},
  ],mapAlt:'无遮挡闭眼脸部，绿色标出两侧太阳穴，橙色数字标出每只眼上眼眶三点和下眼眶三点',mapTitle:'先横扫，再上三点，最后下三点',mapCaption:'绿色为拇指固定位置。每只眼的上、下眼眶各三个转压点，都按 ①内侧 → ②中间 → ③外侧的顺序；左右两侧同时操作。编号表示先后位置，不代表固定旋转方向。',legend:['拇指固定位置','横扫起止位置','无名指转压点'],
  noteTitle:'横扫数次数，转压数圈数。',note:'上眼眶横扫共 5–10 次，每次到外侧后抬指回位；随后先上、后下，每个点旋转 5–10 圈。全程拇指固定太阳穴，其余四指分开，只用无名指操作，转压方向没有规定。',playerNote:'自动翻页每页 6 秒，仅供看图，不是练习计时。手势图中的拇指接触部分被遮挡，可切换点位总览核对固定位置。点位为示意，手型与接触细节仍待复核。',cardCaption:'拇指固定、无名指横扫，再依次转压上、下眼眶三点。',
 },
 'SM-135':{
  id:'SM-135',uid:'preview-8700c4e7-6aa4-41e2-90ec-00abba0f4a91',contentRevision:'33c8c967503251b8',status:'draft',publication:'not-approved',folder:'./illustrations/sm135/',poster:'01-start.png',mapFile:'04-map.png',
  phases:[
   {title:'摆手 · 找到起点',short:'摆手',file:'01-start.png',caption:'四指扶腹支撑，双拇指指腹放到圆的上侧。绿色点标出两侧起点。',alt:'双手四指支撑腹部，双拇指位于肚脐上方的起势插图'},
   {title:'画弧 · 同时向下',short:'画弧',file:'02-arc.png',caption:'双拇指同时贴肤，分别沿左右半圆向下滑动，到空心终点。图中手势为滑动上段，箭头展示完整路径。',alt:'双拇指分别向腹部两侧移动的中间姿势，叠加左右两条向下的弧线'},
   {title:'点按 · 两侧同时',short:'点按',file:'03-press.png',caption:'完成两条弧线后，移到肚脐两侧橙色点，同时各按一下，保持 3–5 秒。',alt:'双拇指同时在肚脐两侧按压，橙色标记表示指腹下的接触位置'},
   {title:'松开 · 抬指回位',short:'回位',file:'04-map.png',caption:'先松开、抬起拇指，再回到上方起点；虚线只表示离开皮肤后的回位。整套算 1 次，共 5–10 次。',alt:'无遮挡的腹部点位图，虚线箭头提示抬起拇指后回到起点'},
  ],mapAlt:'腹部无遮挡底图，标出滑动起止点和随后按压位置',mapTitle:'先画弧，再点按',mapCaption:'绿色两条弧线表示双拇指同时由上向下滑动；完成后，再到橙色位置同时点按。点位为位置示意，不是六次点按。',legend:['滑动起点','滑动终点','随后按压'],
  noteTitle:'起止点与按压点，分开看。',note:'绿色起点、空心终点说明滑动路径；橙色点说明随后同时按压的位置。点位为示意，画弧半径约 10 厘米；起止角度与随后按压点的精确距离没有固定规定。',playerNote:'翻页仅用于看清步骤，每页 6 秒，不是练习计时。图中点位为示意；精确起止角度和点按距离无固定规定。图像与手法仍待复核。',cardCaption:'三张手势图与一张点位底图，逐步看清双手的路径。',
 },
};
Object.assign(imageDemos,Object.fromEntries(Object.entries(batch2130).map(([id,d])=>[id,{...d,status:'draft',publication:'not-approved',legend:[d.legend[0],d.legend[1],d.legend[2]]} satisfies ImageDemoDefinition])));
Object.assign(imageDemos,Object.fromEntries(Object.entries(batch0310).map(([id,d])=>[id,{...d,status:'draft',publication:'not-approved'} satisfies ImageDemoDefinition])));
Object.assign(imageDemos,batch1120);
Object.assign(imageDemos,batch3140);
Object.assign(imageDemos,batch4150);
Object.assign(imageDemos,batch5160);
Object.assign(imageDemos,managedDemos);
applyVisualRepairs(imageDemos);
applyReferenceRepairs(imageDemos);
applyHandOriginRepairs(imageDemos);
applyPovCorrections(imageDemos);
applyContactSemantics(imageDemos);
for(const demo of Object.values(imageDemos)){
 for(const key of ['mapAlt','mapCaption','note','playerNote','cardCaption'] as const)demo[key]=cleanDisplayCopy(demo[key]);
 for(const phase of demo.phases){
  phase.caption=cleanDisplayCopy(phase.caption);
  phase.alt=cleanDisplayCopy(phase.alt);
  for(const pose of phase.poses||[])if(pose.alt)pose.alt=cleanDisplayCopy(pose.alt);
 }
}
export const getImageDemo=(id:string):ImageDemoDefinition|undefined=>imageDemos[id];
export const hasImageDemo=(id:string,uid:string,revision:string)=>imageDemos[id]?.uid===uid&&imageDemos[id]?.contentRevision===revision;
