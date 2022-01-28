export interface Todo {
  id: number,
  title: string, // 标题
  content: string, // 内容
  deadline: Date | null, // 截止时间
  color: string | 'default', // 计划列表项颜色
  remind: Boolean, // 是否提醒
  remindTimeAgo: number, // 提前几分钟提醒
  repeat: Boolean, // 是否重复
  repeatTime: number, // 重复间隔时间 （分钟）
  completion: Boolean // 是否完成
}
