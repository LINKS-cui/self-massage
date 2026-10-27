import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {drawCard} from '../src/draw.ts';

const {samples:cards}=JSON.parse(await readFile(new URL('../src/catalog.json',import.meta.url)));

test('an initial draw can reach every card',()=>{
  const selected=cards.map((_,i)=>drawCard(cards,undefined,()=>(i+0.5)/cards.length).id);
  assert.deepEqual(new Set(selected),new Set(cards.map(card=>card.id)));
});

test('a redraw can reach every other card without repeating the current one',()=>{
  for(const current of cards){
    const selected=new Set(Array.from({length:cards.length-1},(_,i)=>drawCard(cards,current.id,()=>(i+0.5)/(cards.length-1)).id));
    assert.equal(selected.has(current.id),false);
    assert.deepEqual(selected,new Set(cards.filter(card=>card.id!==current.id).map(card=>card.id)));
  }
});

test('random range boundaries and small collections stay valid',()=>{
  assert.equal(drawCard(cards,undefined,()=>0),cards[0]);
  assert.equal(drawCard(cards,undefined,()=>1-Number.EPSILON),cards.at(-1));
  assert.equal(drawCard([],undefined,()=>0),null);
  assert.equal(drawCard([cards[0]],cards[0].id,()=>0),cards[0]);
});
