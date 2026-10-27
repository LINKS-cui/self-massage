import {chromium} from '@playwright/test';
import {createServer} from 'node:http';
import {readFile,mkdir,stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('../',import.meta.url));
const dist=path.join(root,'dist');
await stat(path.join(dist,'index.html'));
const catalog=JSON.parse(await readFile(path.join(root,'src/catalog.json'),'utf8'));
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.ttf':'font/ttf','.txt':'text/plain'};
const server=createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(!pathname.startsWith('/self-massage/'))throw Error('outside site prefix');
  const relative=pathname.slice('/self-massage/'.length)||'index.html';
  const file=path.resolve(dist,relative);if(!file.startsWith(dist+path.sep))throw Error('invalid path');
  await stat(file);res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');createReadStream(file).pipe(res);
 }catch{res.writeHead(404);res.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}/self-massage/`;
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const failures=[],errors=[],external=[];let views=0;
page.on('response',r=>{if(r.status()>=400)failures.push({url:r.url(),status:r.status()});});
page.on('pageerror',e=>errors.push(e.message));
page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('data:'))external.push(r.url());});
const decode=async selector=>page.locator(selector).evaluateAll(imgs=>Promise.all(imgs.map(async i=>{i.loading='eager';await i.decode();})));
const inspect=async()=>{await decode('.image-stage img');assert.equal(await page.locator('.image-load-error').count(),0);views++;};
try{
 await page.goto(base,{waitUntil:'networkidle'});await page.locator('.usage-guide').waitFor();
 assert.equal(await page.locator('.preview-card').count(),6);assert.equal(await page.locator('.draw-section .card-pack').count(),1);
 await decode('.preview-card img');await page.evaluate(()=>document.fonts.ready);
 assert.ok(await page.evaluate(()=>document.fonts.check('16px ZCOOL')));
 await mkdir(path.join(root,'verification'),{recursive:true});await page.screenshot({path:path.join(root,'verification/home.png'),fullPage:true});
 await page.getByRole('link',{name:'翻开所有卡片'}).click();await page.locator('.library').waitFor();
 assert.equal(await page.locator('.exercise-card').count(),135);await decode('.exercise-card img');
 for(const [index,exercise] of catalog.samples.entries()){
  await page.goto(base+'#/exercise/'+exercise.id);await page.locator('.detail-heading .eyebrow').filter({hasText:'#'+exercise.id.slice(-3)}).waitFor();
  const phases=await page.locator('.image-phase-tabs button').count();assert.ok(phases>0);
  for(let i=0;i<phases;i++){
   await page.locator('.image-phase-tabs button').nth(i).click();await inspect();
   const poses=await page.locator('.image-pose-controls button').count();
   for(let j=1;j<poses;j++){await page.locator('.image-pose-controls button').nth(j).click();await inspect();}
  }
  await page.locator('.image-mode-controls button').nth(1).click();await inspect();
  if((index+1)%25===0)console.log(`${index+1}/135 exercises; ${views} views checked`);
 }
 for(const width of [390,320]){
  await page.setViewportSize({width,height:844});await page.goto(base);await page.locator('.usage-guide').waitFor();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:path.join(root,`verification/home-${width}.png`),fullPage:true});
  await page.goto(base+'#/exercise/SM-091');await page.locator('.image-stage').waitFor();await inspect();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 }
 assert.deepEqual(failures,[]);assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 console.log(JSON.stringify({exercises:135,views,failures,errors,external,subpath:'/self-massage/'},null,2));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
