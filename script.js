
document.querySelectorAll('.token').forEach(token=>{
  token.addEventListener('dragstart', e=>{
    e.dataTransfer.setData('text/plain', token.innerText);
  });
});

let dropzone = document.getElementById('dropzone');
dropzone.addEventListener('dragover', e=> e.preventDefault());
dropzone.addEventListener('drop', e=>{
  e.preventDefault();
  let value = e.dataTransfer.getData('text/plain');
  let node = document.createElement('div');
  node.className = 'token dropped';
  node.innerText = value;
  dropzone.appendChild(node);
});

document.getElementById('clear').onclick = ()=>{
  dropzone.innerHTML = "";
  document.getElementById('feedback').innerText = "";
};

document.getElementById('check').onclick = ()=>{
  let tokens = [...dropzone.children].map(n=>n.innerText);
  let eq = tokens.join("");
  let parts = eq.split("=");
  if(parts.length!==2){ document.getElementById('feedback').innerText="Invalid equation."; return;}

  try {
    let left = parts[0];
    let right = Number(parts[1]);
    let a = 0, b = 0;

    let pattern = /([+-]?\d*)x|([+-]?\d+)/g;
    let match;
    while((match = pattern.exec(left))!==null){
      if(match[1]!==undefined){
        let num = match[1];
        if(num===""||num==="+") num="1";
        if(num==="-"||num==="−") num="-1";
        a += Number(num);
      } else if(match[2]!==undefined){
        b += Number(match[2]);
      }
    }

    let x = (right - b) / a;
    let ans = document.getElementById('answer').value;

    if(Number(ans)===x){
      document.getElementById('feedback').innerText="Correct! x = "+x;
    } else {
      document.getElementById('feedback').innerText="Incorrect. True answer: x = "+x;
    }
  } catch(err){
    document.getElementById('feedback').innerText="Error solving equation.";
  }
};
