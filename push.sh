#!/bin/bash
set -e
cd /Users/elevensum/Desktop/elevenvenven.github.io

# 读取 github token
TOKEN=$(cat ~/.claude/github_token 2>/dev/null | head -1 | tr -d '\n')
if [ -z "$TOKEN" ]; then
    echo "❌ 未找到 github_token，请检查 ~/.claude/github_token"
    exit 1
fi

REMOTE="https://${TOKEN}@github.com/Elevenvenven/Elevenvenven.github.io.git"

echo "📥 拉取远程变更..."
git pull --rebase "$REMOTE" main

echo "📤 推送本地提交..."
git push "$REMOTE" main

echo "✅ 推送完成！"
