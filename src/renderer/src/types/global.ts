// export interface Todo {
//   id?: number;
//   title?: string; // 标题
//   content?: string; // 内容

//   model?: 'default' | 'frame' | 'daily' | 'remind';

//   startTime?: Date; // 开始时间
//   endTime?: Date; // 结束时间
//   remindTime?: number; // 提前几分钟提醒 0-不提醒
//   repeat?: number; // 0-不重复 1-每天 2-工作日 ...

//   date?: Date; // 日期

//   repeatTime?: number; // 重复间隔 0-不重复
//   repeatUnit?: number; // 时间单位 0-秒 1-分

//   completion?: Boolean; // 是否完成
// }

// export const todoDefault: Todo = {
//   title: '',
//   content: '',

//   model: 'default',

//   remindTime: 0,
//   repeat: 0,

//   repeatTime: 0,
//   repeatUnit: 3,

//   completion: false,
// };

export interface Todo {
  id?: number;
  content?: string;
  completion?: boolean;
}

export interface Task {
  id?: number;
  content?: string;
  dateTime?: Date;
  repeat?: number;
  enable?: boolean;
}

