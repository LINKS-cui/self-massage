// Omit generic optional guidance from the UI without changing the confirmed
// procedure or its media binding. Required breathing/eye instructions remain.
export function cleanDisplayCopy(text:string):string {
 const kept:{body:string;separator:string}[]=[];
 for(const token of text.match(/[^，。；·]+[，。；·]?/g)||[]){
  const body=token.replace(/[，。；·]$/,'').trim();
  const separator=token.match(/[，。；·]$/)?.[0]||'';
  const optionalEyes=/^睁眼或闭眼(?:均|都)?可$/.test(body);
  const unspecified=/睁闭眼|呼吸|吸气|呼气/.test(body)&&/(?:无(?:固定)?(?:规定|要求)|没有(?:固定|规定)|不固定)/.test(body);
  const comfortable=/^(?:(?:手部支撑)?力度|用力|速度和幅度|圈幅)?以(?:自己(?:感觉)?)?舒服为准$/.test(body);
  const noFixedForce=/^(?:没有|无)统一固定要求$/.test(body);
  if(optionalEyes||unspecified||comfortable||noFixedForce){
   if(kept.length&&separator==='。')kept[kept.length-1].separator='。';
   continue;
  }
  if(body)kept.push({body,separator});
 }
 return kept.map(({body,separator})=>body+separator).join('').replace(/[，；·]+$/,'').trim();
}

export function displaySteps(steps:string[]){
 return steps.map((text,sourceStep)=>({text:cleanDisplayCopy(text),sourceStep})).filter(step=>step.text);
}
