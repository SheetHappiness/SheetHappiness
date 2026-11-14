// softsock Hypercomputer v0.1 – precompiled 2-bit finite-state machine.
// Two registers A,B ∈ {0,1,2,3}. No browser JS or request-time compute.
const OPS = [
  {
    "id": "inc",
    "label": "INC A",
    "meaning": "Increment A (modulo 4)"
  },
  {
    "id": "dec",
    "label": "DEC B",
    "meaning": "Decrement B (modulo 4)"
  },
  {
    "id": "add",
    "label": "ADD",
    "meaning": "A = (A + B) modulo 4"
  },
  {
    "id": "swap",
    "label": "SWAP",
    "meaning": "Exchange A and B"
  },
  {
    "id": "reset",
    "label": "RESET",
    "meaning": "Set both registers to zero"
  }
];
function transition(a,b,operation){
 if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||a>3||b<0||b>3)throw Error("Registers must be integers between 0 and 3");
 switch(operation){
 case "inc": return [(a+1)&3,b];
 case "dec": return [a,(b+3)&3];
 case "add": return [(a+b)&3,b];
 case "swap": return [b,a];
 case "reset": return [0,0];
 default: throw Error("Unknown operation: "+operation);
 }
}
function stateName(a,b){return `a${a}-b${b}`;}
function binary(a){return a.toString(2).padStart(2,"0");}
function controls(a,b,prefix=""){
 const result=OPS.map(op=>{
   const [na,nb]=transition(a,b,op.id);
   return `[${op.label}](${prefix}${stateName(na,nb)}.md)`;
 });
 return result.join(" &nbsp; | &nbsp; ");
}
function renderScreenSvg(a,b){
 const escape=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
 const bitTiles=(n,x,y,accent)=>{
  return [1,0].map((bit,i)=>{
    const active=((n>>bit)&1)===1;
    return `<rect x="${x+i*67}" y="${y}" width="55" height="48" rx="7" fill="${active?accent:"#211e35"}" stroke="${active?"#F4E8FF":"#5A4B75"}" stroke-width="1.5"/><text x="${x+27+i*67}" y="${y+33}" fill="${active?"#21172F":"#A99CC1"}" font-size="24" font-family="DejaVu Sans Mono,monospace" text-anchor="middle" font-weight="700">${active?"1":"0"}</text>`;
  }).join("");
 };
 return `<svg xmlns="http://www.w3.org/2000/svg" width="920" height="368" viewBox="0 0 920 368" role="img" aria-label="Hypercomputer version 0.1, register A equals ${a}, register B equals ${b}. Two-bit arithmetic modulo four.">
<defs>
  <linearGradient id="chassis" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#322747"/><stop offset=".58" stop-color="#241F3A"/><stop offset="1" stop-color="#161624"/></linearGradient>
  <linearGradient id="crt" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#151B28"/><stop offset="1" stop-color="#10121F"/></linearGradient>
  <pattern id="dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#6E5C80" opacity=".19"/></pattern>
</defs>
<rect x="2" y="2" width="916" height="364" rx="19" fill="url(#chassis)" stroke="#9B80C2" stroke-width="3"/>
<rect x="13" y="13" width="894" height="340" rx="12" fill="url(#dots)"/>
<circle cx="39" cy="38" r="6" fill="#9BE7C3"/>
<text x="59" y="44" font-size="19" font-family="DejaVu Sans Mono,monospace" font-weight="700" fill="#EADCF8">SOFTSOCK / HYPERCOMPUTER</text>
<text x="882" y="42" text-anchor="end" font-size="15" font-family="DejaVu Sans Mono,monospace" fill="#C4AEDF">v0.1 · STATE ${stateName(a,b).toUpperCase()}</text>
<rect x="23" y="63" width="874" height="240" rx="11" fill="url(#crt)" stroke="#6B597F" stroke-width="1.8"/>
<text x="48" y="93" font-size="16" font-family="DejaVu Sans Mono,monospace" fill="#B9AFD0">REGISTERS / 2-BIT</text>
<rect x="44" y="111" width="396" height="168" rx="10" fill="#211E34" stroke="#594B73"/>
<rect x="458" y="111" width="396" height="168" rx="10" fill="#211E34" stroke="#594B73"/>
<text x="65" y="147" font-size="19" font-family="DejaVu Sans Mono,monospace" font-weight="700" fill="#BDA9EC">REGISTER A</text>
<text x="479" y="147" font-size="19" font-family="DejaVu Sans Mono,monospace" font-weight="700" fill="#9FE4C3">REGISTER B</text>
${bitTiles(a,65,167,"#C5A3ED")}
${bitTiles(b,479,167,"#9EE3C2")}
<text x="399" y="235" text-anchor="end" font-size="66" font-family="DejaVu Sans Mono,monospace" font-weight="700" fill="#F0E7FE">${escape(a)}</text>
<text x="813" y="235" text-anchor="end" font-size="66" font-family="DejaVu Sans Mono,monospace" font-weight="700" fill="#DBF6E7">${escape(b)}</text>
<text x="68" y="264" font-size="13" font-family="DejaVu Sans Mono,monospace" fill="#AFA0C7">BIN ${binary(a)} / DEC ${a}</text>
<text x="482" y="264" font-size="13" font-family="DejaVu Sans Mono,monospace" fill="#AFA0C7">BIN ${binary(b)} / DEC ${b}</text>
<text x="42" y="332" font-size="15" font-family="DejaVu Sans Mono,monospace" fill="#9DE5BF">● READY</text>
<text x="276" y="332" font-size="15" font-family="DejaVu Sans Mono,monospace" fill="#C6B4DF">ALU: MOD 4</text>
<text x="505" y="332" font-size="15" font-family="DejaVu Sans Mono,monospace" fill="#C6B4DF">STATES: 16</text>
<text x="879" y="332" text-anchor="end" font-size="14" font-family="DejaVu Sans Mono,monospace" fill="#C6B4DF">GITHUB / NO JS</text>
</svg>
`;
}
function renderStatePage(a,b){
 const lines=OPS.map(op=>{
  const [na,nb]=transition(a,b,op.id);
  return `| [**${op.label}**](${stateName(na,nb)}.md) | ${op.meaning} | \`A=${na}, B=${nb}\` |`;
 }).join("\n");
 return `<!-- Generated by scripts/hypercomputer.mjs. Do not edit this state manually. -->
<div align="center">

# softsock Hypercomputer · v0.1

**STATE ${stateName(a,b).toUpperCase()}** · 2-bit registers · 16 possible states

<img src="../../assets/hypercomputer/${stateName(a,b)}.svg" alt="Register A is ${a}; register B is ${b}" width="100%">

</div>

## Execute an instruction

Select an instruction below. GitHub will open another Markdown state page.

| Instruction | Operation | Next state |
| :-- | :-- | :-- |
${lines}

**A = ${a}** (\`${binary(a)}\`) · **B = ${b}** (\`${binary(b)}\`) · all arithmetic modulo 4.

[↩ Back to profile](../../README.md#hypercomputer) · [Reset machine](a0-b0.md) · [Source code](../../scripts/hypercomputer.mjs)

<details>
<summary>How can Markdown behave like a computer?</summary>

Every possible register pair (\`0..3\`, \`0..3\`) is generated in advance. A click follows a link to the corresponding precomputed Markdown page. No JavaScript, Issues, GitHub Actions at click time or external backend. There are only 16 states, so **this is a finite-state machine, not a general-purpose CPU**.

</details>
`;
}
function renderProfilePanel(){
 const a=1,b=2;
 const commandButtons=OPS.map(op=>{const [na,nb]=transition(a,b,op.id);return `[**${op.label}**](./hypercomputer/states/${stateName(na,nb)}.md)`;}).join(" &nbsp; · &nbsp; ");
 return `### Hypercomputer

<sub>v0.1 · the smallest computer that should not work in a GitHub README</sub>

<div align="center">
<img src="./assets/hypercomputer/${stateName(a,b)}.svg" alt="Hypercomputer: 2-bit A=1, B=2; select an instruction below" width="100%">
</div>

**Execute a command (starts from A=1, B=2):**

${commandButtons}

[Open the machine and continue computing](./hypercomputer/states/${stateName(a,b)}.md) · [How it works](./hypercomputer/README.md)

<sub>Clicking a command navigates to its precomputed state. Within the state page you can keep computing. No JavaScript, no Issues, no server.</sub>
`;
}
function renderIndex(){
 return `# softsock Hypercomputer v0.1

A finite-state Markdown computer. It uses **two 2-bit unsigned registers** A and B (values 0 to 3), five commands, and **16 generated states**. Every click follows a relative Markdown link to the next state.

**[Boot computer → A=1, B=2](./states/a1-b2.md)**

## Instructions

| Command | Semantics |
| :-- | :-- |
${OPS.map(op=>`| \`${op.label}\` | ${op.meaning} |`).join("\n")}

\`ADD\` stores the sum in A and leaves B unchanged; arithmetic wraps modulo 4. \`RESET\` sets A and B to zero.

## Implementation

The deterministic compiler is [\`scripts/hypercomputer.mjs\`](../scripts/hypercomputer.mjs). It enumerates every state, renders 16 Markdown pages and 16 SVG screens, and verifies reachability and link targets with [tests](../tests/hypercomputer.test.mjs). GitHub Actions rebuilds the generated outputs when sources change.

Unlike an executable computer, **there is no computation while browsing**: each page has been generated ahead of time.

[← Return to GitHub profile](../README.md#hypercomputer)
`;
}
function generateHyperFiles(){
 const files=[{path:"hypercomputer/README.md",content:renderIndex()}];
 for(let a=0;a<4;a++)for(let b=0;b<4;b++){
  files.push({path:`hypercomputer/states/${stateName(a,b)}.md`,content:renderStatePage(a,b)});
  files.push({path:`assets/hypercomputer/${stateName(a,b)}.svg`,content:renderScreenSvg(a,b)});
 }
 return files;
}
export { OPS, transition, stateName, renderScreenSvg, renderStatePage, renderProfilePanel, renderIndex, generateHyperFiles };
