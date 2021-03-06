global.defenderStats = {
  worldSay: 0,
  selector: 0,
  voxels: 0,
  createEntity:0,
};
let defenderFun = (stat) => {
  return function () {
    defenderStats[stat] += 1;
  };
};
console._clear = console.clear;
console._log = console.log;
console._error = console.error;
console.error=console.log=console.clear=null
world.onTick(() => {
  
  console._clear();
  console._log(
    [
      "---Box3防火墙---",
      `拦截系统消息:${defenderStats.worldSay}`,
      `拦截选择器命令: ${defenderStats.selector}`,
      `拦截方块操作: ${defenderStats.voxels}`,
      `拦截实体创建操作: ${defenderStats.createEntity}`,
    ].join("\n")
  );
  console._error("强力模式已打开");
  console._log("---------------");
});
(async function (){
  world.querySelectorAll('player').forEach(e => {
    e.fixed = true;
    e.player.cameraMode = 'FIXED'
    e.player.cameraPosition=new Box3Vector3(0,0,0)
  })
  world.say = defenderFun("worldSay");
  world.querySelectorAll = defenderFun("selector");
  world.querySelector = defenderFun("selector");
  voxels.setVoxel = defenderFun("voxels");
  world.createEntity = defenderFun("createEntity");
  // world.say = defenderFun("worldSay");

  // if (defenderStats.forceMode) {
  //   world._say = world.say;
  // }
})();
