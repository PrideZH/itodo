export interface Todo {
  id: number;
  content: string;
  group: string | null;
  imageUrl: string[];
  completion: boolean;
  completionTime: Date | null;
}

export interface TodoOption {
  id?: number;
  content?: string;
  group?: string | null;
  imageUrl?: string[];
  completion?: boolean;
  completionTime?: Date | null;
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
  dateTime: Date;
  repeat?: number; // 每几分重复
  enable?: boolean;
}

