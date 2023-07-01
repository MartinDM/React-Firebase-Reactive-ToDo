export interface IToDo {
  text: string;
  completed: boolean;
  id: string;
  createdAt: object;
  handleDelete: (id: string) => void;
}
