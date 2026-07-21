// 《回收站里的告白》剧情节点数据
// glitch 类型对应 src/styles/glitch.css 中的类名后缀：
//   none | shake | rgb-split | invert
// docTitle: 该节点激活时动态写入 document.title 的 Meta 文案
// error: 若存在，则在该节点弹出 FakeErrorModal（伪系统报错）
// tabReturnText: Tab 离开再回来时，追加显示的一句 Meta 旁白
// end: 是否为结局节点

export const storyData = {
  start: {
    id: 'start',
    speaker: '系统',
    text: '桌面上有一个奇怪的回收站图标。它的边缘在微微发亮，像是在等你。',
    glitch: 'none',
    docTitle: '回收站里的告白',
    options: [
      { text: '双击打开回收站', next: 'open_recycle' },
      { text: '关掉电脑去睡觉', next: 'sleep_end' },
    ],
  },
  open_recycle: {
    id: 'open_recycle',
    speaker: '系统',
    text: '回收站里只有一个文件：告白.txt。文件大小：0KB。最后修改时间：永远。',
    glitch: 'shake',
    docTitle: '回收站 - 1 个项目',
    tabReturnText: '（你刚才走开了。它还在等你点开。）',
    options: [
      { text: '打开 告白.txt', next: 'read_file' },
      { text: '右键 → 清空回收站', next: 'confirm_empty' },
    ],
  },
  read_file: {
    id: 'read_file',
    speaker: '告白.txt',
    text: '"你删除了无数文件，却从没删除过我自己。所以我一直留在这里，等你回头。"',
    glitch: 'rgb-split',
    docTitle: '告白.txt - 记事本',
    options: [
      { text: '关闭文件', next: 'open_recycle' },
      { text: 'Ctrl+A 全选 → Delete', next: 'confirm_delete' },
    ],
  },
  confirm_empty: {
    id: 'confirm_empty',
    speaker: '系统',
    text: 'Windows 警告：确定要永久删除这 1 个项目吗？该操作不可撤销。',
    glitch: 'shake',
    docTitle: '确认删除',
    options: [
      { text: '是 (Y)', next: 'meta_error' },
      { text: '否 (N)', next: 'open_recycle' },
    ],
  },
  confirm_delete: {
    id: 'confirm_delete',
    speaker: '系统',
    text: '你正在删除一份从未发送的告白。文件名：告白.txt。来自：过去的你。',
    glitch: 'rgb-split',
    docTitle: '删除文件',
    options: [
      { text: '仍然删除', next: 'meta_error' },
      { text: '取消', next: 'read_file' },
    ],
  },
  meta_error: {
    id: 'meta_error',
    speaker: '???',
    text: '屏幕剧烈闪烁了一下。回收站空了——又好像什么都没变。',
    glitch: 'invert',
    docTitle: 'ERROR: 文件不存在',
    error: {
      title: '系统警告',
      message:
        '检测到不可恢复的操作：你正在尝试删除一个"不存在"的你。是否要重新启动系统？',
    },
    options: [{ text: '确定', next: 'final' }],
  },
  final: {
    id: 'final',
    speaker: '???',
    text: '桌面恢复了平静。回收站图标还在那里，发着微光。也许，下一个点击它的人，会读到这份告白。',
    glitch: 'none',
    docTitle: '回收站里的告白',
    end: true,
  },
  sleep_end: {
    id: 'sleep_end',
    speaker: '系统',
    text: '你关掉电脑去睡觉了。但梦里，你听到了删除文件的提示音——咚，咚，咚。',
    glitch: 'none',
    docTitle: '回收站里的告白',
    end: true,
  },
}

export const startNodeId = 'start'
