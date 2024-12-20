const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let nodes = [];
let connections = [];
let mobilityInterval = null;

// Node Constructor
class Node {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.selfish = false;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = this.selfish ? "red" : "green";
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#000";
    ctx.fillText(this.id, this.x - 5, this.y - 15);
  }
}

// Draw the Network
function drawNetwork() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw connections
  connections.forEach(([node1, node2]) => {
    ctx.beginPath();
    ctx.moveTo(node1.x, node1.y);
    ctx.lineTo(node2.x, node2.y);
    ctx.stroke();
  });

  // Draw nodes
  nodes.forEach((node) => node.draw());
}

// Add a Node
function addNode() {
  if (nodes.length >= 20) return;

  const x = Math.random() * (canvas.width - 20) + 10;
  const y = Math.random() * (canvas.height - 20) + 10;
  const node = new Node(x, y, nodes.length + 1);
  nodes.push(node);

  // Connect to a random existing node
  if (nodes.length > 1) {
    const randomNode = nodes[Math.floor(Math.random() * (nodes.length - 1))];
    connections.push([node, randomNode]);
  }

  drawNetwork();
}

// Remove a Node
function removeNode() {
  if (nodes.length === 0) return;

  nodes.pop();
  connections = connections.filter(
    ([node1, node2]) => nodes.includes(node1) && nodes.includes(node2)
  );

  drawNetwork();
}

// Detect Selfish Nodes
function detectSelfishNodes() {
  nodes.forEach((node) => {
    node.selfish = Math.random() < 0.2;
  });

  drawNetwork();
}

// Mobility Simulation
function startMobilitySimulation() {
  if (mobilityInterval) return;

  mobilityInterval = setInterval(() => {
    nodes.forEach((node) => {
      node.x += (Math.random() - 0.5) * 10;
      node.y += (Math.random() - 0.5) * 10;

      node.x = Math.max(10, Math.min(canvas.width - 10, node.x));
      node.y = Math.max(10, Math.min(canvas.height - 10, node.y));
    });

    drawNetwork();
  }, 500);
}

function stopMobilitySimulation() {
  clearInterval(mobilityInterval);
  mobilityInterval = null;
}

// Update Performance Metrics
function updateMetrics() {
  document.getElementById("throughput").innerText = (Math.random() * 100).toFixed(2);
  document.getElementById("latency").innerText = (Math.random() * 50).toFixed(2);
  document.getElementById("packetLoss").innerText = (Math.random() * 10).toFixed(2);
}

// Periodically Update Metrics
setInterval(updateMetrics, 2000);

// Initialize Network
drawNetwork();
