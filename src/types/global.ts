export interface Todo {
  id: number,
  content: string, // 计划内容
  deadline: Date | null, // 截止时间
  color: string | 'default', // 计划列表项颜色
  remind: Boolean, // 是否提醒
  remindTime: Date | null, // 提醒时间
  repeat: Boolean, // 是否重复
  repeatTime: Date | null, // 重复时间
  completion: Boolean, // 是否完成
  remark: string // 备注
}
