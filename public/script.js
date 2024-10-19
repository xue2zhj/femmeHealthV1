const width = 800;
const height = 600;

// 创建SVG元素
const svg = d3.select("#graph").append("svg")
  .attr("width", width)
  .attr("height", height);

// 定义节点和边的数据
const nodes = [
  { id: 'Node.js', group: 1 },
  { id: 'Express', group: 1 },
  { id: 'HTTP Module', group: 1 },
  { id: 'File System (fs)', group: 1 },
  { id: 'Event Loop', group: 1 },
  { id: 'Asynchronous Programming', group: 1 },
];

const links = [
  { source: 'Node.js', target: 'Express', value: 1 },
  { source: 'Node.js', target: 'HTTP Module', value: 1 },
  { source: 'Node.js', target: 'File System (fs)', value: 1 },
  { source: 'Node.js', target: 'Event Loop', value: 1 },
  { source: 'Node.js', target: 'Asynchronous Programming', value: 1 },
];

// 创建力布局
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id).distance(150))
  .force("charge", d3.forceManyBody().strength(-500))
  .force("center", d3.forceCenter(width / 2, height / 2));

// 绘制连线
const link = svg.append("g")
  .selectAll("line")
  .data(links)
  .enter().append("line")
  .attr("stroke-width", d => Math.sqrt(d.value));

// 绘制节点
const node = svg.append("g")
  .selectAll("circle")
  .data(nodes)
  .enter().append("circle")
  .attr("r", 10)
  .attr("fill", "blue")
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

// 添加节点标签
const label = svg.append("g")
  .selectAll("text")
  .data(nodes)
  .enter().append("text")
  .attr("dy", -15)
  .attr("text-anchor", "middle")
  .text(d => d.id);

// 更新布局
simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

  label
    .attr("x", d => d.x)
    .attr("y", d => d.y);
});

// 拖动事件处理函数
function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
