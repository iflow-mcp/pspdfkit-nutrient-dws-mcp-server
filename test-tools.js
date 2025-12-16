const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');

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
const toolsList = {
  tools: Object.entries(server._registeredTools)
    .filter(([, tool]) => tool.enabled)
    .map(([name, tool]) => {
      return {
        name,
        description: tool.description,
      };
    }),
};

console.log('Tools list response:');
console.log(JSON.stringify(toolsList, null, 2));