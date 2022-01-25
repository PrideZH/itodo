export interface Todo {
  id: number,
  title: string, // 计划标题
  content: string, // 计划内容
  color: string | 'default', // 计划列表项颜色
  remindTime: Date | null, // 提醒时间
  deadline: Date | null, // 截止时间
  repeat: Boolean, // 是否重复
  repeatTime: Date | null, // 重复时间
  completion: Boolean, // 是否完成
  remark: string // 备注
}
