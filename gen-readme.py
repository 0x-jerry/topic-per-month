# 自动根据docs目录生成readme

import os

writeContent = '''# 每月一题

每月根据一个主题，撰写一篇文章
'''
githubUrlPrefix = 'https://github.com/cwxyz007/topic-per-month/blob/main/docs/'
rootPath = './docs'
topicArr = []
topicCount = 0

for root, dirs, files in os.walk(rootPath):
    if (root == rootPath):
        topicArr = dirs

for topic in topicArr:
    if (topic == 'temp'):
        continue
    topicCount += 1
    topicUrl = githubUrlPrefix + topic + '/index.md'
    writeContent += f'\n ### [{topic}]({topicUrl})'

print(f'已生成{topicCount}个文档超链接')
file = open('./README.md', mode='w')
file.write(writeContent)
