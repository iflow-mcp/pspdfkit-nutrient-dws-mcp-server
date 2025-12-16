import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

// 创建一个简单的MCP服务器实例
const server = new McpServer(
  {
    name: 'test-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// 注册一个测试工具
server.tool(
  'test_tool',
  'A test tool for verification',
  {},
  async () => {
    return { content: [{ type: 'text', text: 'Test tool executed successfully' }] };
  },
);

// 模拟tools/list请求
console.log('Simulating tools/list request...');
// 注意：这里我们无法直接访问私有属性_registeredTools，所以这是一个概念验证

console.log('Test script completed');