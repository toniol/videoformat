## videoformat

视频转换格式为MP4

开启进程服务命令： `forever -a -p . -l ./logs/access.log -e ./logs/error.log start index.js`

终止进程服务命令： `forever stop index.js`

## 帮助:

forever 命令行的中文解释

### 子命令 actions：

`start`:      启动守护进程

`stop`:     停止守护进程

`stopall`:    停止所有的forever进程

`restart`:    重启守护进程

`restartall`:   重启所有的foever进程

`list`:     列表显示forever进程

`config`:     列出所有的用户配置项

`set <key> <val>`: 设置用户配置项

`clear <key>`:  清楚用户配置项

`logs`:       列出所有forever进程的日志

`logs <script|index>`: 显示最新的日志

`columns add <col>`: 自定义指标到forever list

`columns rm <col>`: 删除forever list的指标

`columns set<cols>`: 设置所有的指标到forever list

`cleanlogs`: 删除所有的forever历史日志
