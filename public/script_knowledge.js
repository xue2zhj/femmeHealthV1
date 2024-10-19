const width = 480;
const height = 500;

const svg = d3.select("#graph").append("svg")
  .attr("width", width)
  .attr("height", height);

// 定义节点和连线数据
const nodes = [
  { id: 'Menstrual Flow', group: 1 },
  { id: 'PCOS', group: 2 },
  { id: 'Hypothyroidism', group: 2 },
  { id: 'Hyperthyroidism', group: 2 },
  { id: 'Prolactinoma', group: 2 },
  { id: 'Cushing\'s Syndrome', group: 2 },
  { id: 'Ovarian Insufficiency', group: 2 }
];

const links = [
  { source: 'Menstrual Flow', target: 'PCOS' },
  { source: 'Menstrual Flow', target: 'Hypothyroidism' },
  { source: 'Menstrual Flow', target: 'Hyperthyroidism' },
  { source: 'Menstrual Flow', target: 'Prolactinoma' },
  { source: 'Menstrual Flow', target: 'Cushing\'s Syndrome' },
  { source: 'Menstrual Flow', target: 'Ovarian Insufficiency' }
];

// 使用 D3 力布局来自动布局节点
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id).distance(200))
  .force("charge", d3.forceManyBody().strength(-500))
  .force("center", d3.forceCenter(width / 2, height / 2));

// 绘制连线
const link = svg.append("g")
  .selectAll("line")
  .data(links)
  .enter().append("line")
  .attr("stroke", "lightblue")
  .attr("stroke-width", 2);

// 绘制节点
const node = svg.append("g")
  .selectAll("circle")
  .data(nodes)
  .enter().append("circle")
  .attr("r", 10)
  .attr("fill", "#69b3a2")
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

// 更新力布局
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
