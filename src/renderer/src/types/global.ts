export interface Todo {
  id: number;
  content: string;
  group: string | null;
  completion: boolean;
  imageUrl: string[];
}

export interface Affair {
  id?: number;
  content?: string;
  dateTime?: Date[];
  remindTime?: Date; // 提醒时间
}

export interface Task {
  id?: number;
  content?: string;
  dateTime?: Date;
  repeat?: number; // 每几分重复
  enable?: boolean;
}

