import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
const root=new URL('../',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('assets-manifest.json',root)));
const catalog=JSON.parse(await readFile(new URL('src/catalog.json',root)));

test('all 135 exercises and their source bindings are present',()=>{
 assert.equal(catalog.samples.length,135);
 assert.deepEqual(catalog.index.map(e=>e.id),Array.from({length:135},(_,i)=>`SM-${String(i+1).padStart(3,'0')}`));
 for(const e of catalog.samples){assert.ok(e.uid&&e.contentRevision);assert.ok(e.steps.length>0);}
});

test('all redistributable assets are complete and match the manifest',async()=>{
 for(const f of manifest.files){
  assert.ok(!path.isAbsolute(f.path)&&!f.path.split('/').includes('..'));
  const data=await readFile(new URL('public/'+f.path,root));
  assert.equal(data.length,f.bytes,f.path);
  assert.equal(createHash('sha256').update(data).digest('hex'),f.sha256,f.path);
 }
 const walk=async directory=>{const names=[];for(const d of await readdir(new URL(directory,root),{withFileTypes:true})){const name=directory+d.name;if(d.isDirectory())names.push(...await walk(name+'/'));else names.push(name.slice(7));}return names;};
 assert.deepEqual((await walk('public/')).sort(),manifest.files.map(f=>f.path).sort());
 assert.ok(manifest.files.reduce((n,f)=>n+f.bytes,0)<1_000_000_000);
});
