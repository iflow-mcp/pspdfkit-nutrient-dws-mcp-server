#!/usr/bin/env node

// 启动服务器并发送tools/list请求进行测试
import { spawn } from 'child_process';
import { createInterface } from 'readline';

// 启动服务器进程
const serverProcess = spawn('node', ['./dist/index.js'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

console.log('🚀 启动MCP服务器...');

// 创建 readline 接口来处理 stdin 和 stdout
const rl = createInterface({
  input: serverProcess.stdout,
  output: serverProcess.stdin
});

// 监听服务器输出
serverProcess.stdout.on('data', (data) => {
  console.log('📥 服务器输出:', data.toString());
});

serverProcess.stderr.on('data', (data) => {
  console.error('❌ 服务器错误:', data.toString());
});

serverProcess.on('close', (code) => {
  console.log(`🔧 服务器进程退出，退出码: ${code}`);
});

// 发送初始化请求
setTimeout(() => {
  const initializeRequest = {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: {
        name: "test-client",
        version: "1.0.0"
      }
    }
  };
  
  console.log('📤 发送初始化请求...');
  serverProcess.stdin.write(JSON.stringify(initializeRequest) + '\n');
}, 1000);

// 发送tools/list请求
setTimeout(() => {
  const listToolsRequest = {
    jsonrpc: "2.0",
    id: 2,
    method: "tools/list"
  };
  
  console.log('📤 发送tools/list请求...');
  serverProcess.stdin.write(JSON.stringify(listToolsRequest) + '\n');
}, 2000);

// 5秒后关闭服务器
setTimeout(() => {
  console.log('🛑 关闭服务器...');
  serverProcess.kill();
}, 5000);