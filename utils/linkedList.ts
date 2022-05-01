// type DataInItem = MockInterview | MockUserQuestions;

// export class Item<T extends DataInItem, Next extends DataInItem | null> {
//   public data: T;
//   public next: Item<T, Next> | null;

//   constructor(data: T, next: Item<T, Next> | null) {
//     this.data = data;
//     this.next = next;
//   }
// }

// interface RequiredData {
//   headId: string;
//   [id: string]: string | DataInItem;
// }

// const mockData = {
//   headId: '1',
//   tailId: '5',
//   '1': {
//     id: '1',
//     nextItemId: '2',
//     question: 'Q1',
//     answer: 'A1',
//     keyword: ['k', 'e', 'y'],
//     isPrivate: true,
//     created_by: Date.now(),
//   },
//   '2': {
//     id: '2',
//     nextItemId: '3',
//     question: 'Q2',
//     answer: 'A2',
//     keyword: ['k2', 'e2', 'y2'],
//     isPrivate: false,
//     created_by: Date.now(),
//   },
//   '3': {
//     id: '3',
//     nextItemId: '4',
//     question: 'Q3',
//     answer: 'A3',
//     keyword: ['k3', 'e3', 'y3'],
//     isPrivate: true,
//     created_by: Date.now(),
//   },
//   '4': {
//     id: '4',
//     nextItemId: '5',
//     question: 'Q4',
//     answer: 'A4',
//     keyword: ['k4', 'e4', 'y4'],
//     isPrivate: false,
//     created_by: Date.now(),
//   },
//   '5': {
//     id: '5',
//     nextItemId: null,
//     question: 'Q5',
//     answer: 'A5',
//     keyword: ['k5', 'e5', 'y5'],
//     isPrivate: true,
//     created_by: Date.now(),
//   },
// };

// export class LinkedList<T extends RequiredData> {
//   private headId: string;
//   private head: Item<DataInItem, DataInItem | null> | null;
//   private tail: Item<DataInItem, DataInItem | null> | null;

//   constructor(data: T) {
//     this.headId = data.headId;
//     this.head = new Item(data[this.headId] as DataInItem, null);
//     this.tail = this.head;

//     let tmp = this.head;
//     while (tmp.data.nextItemId) {
//       const nextItem = new Item(data[tmp.data.nextItemId] as DataInItem, null);

//       this.tail = tmp;
//       tmp.next = nextItem;
//       tmp = tmp.next;
//     }
//   }

//   static parseListToData(list: DataInItem[]) {
//     const data: RequiredData = { headId: '' };

//     data.headId = list[0].id;
//     for (const item of list) data[item.id] = item;

//     return data;
//   }

//   getList(): DataInItem[] {
//     const list = [];

//     let tmp = this.head;

//     while (tmp && tmp.data) {
//       list.push(tmp.data);
//       tmp = tmp.next;
//     }

//     return list;
//   }

//   addItem(data: DataInItem) {
//     if (this.tail) {
//       this.tail.next = new Item(data, null);
//       this.tail = this.tail.next;
//     } else {
//       this.headId = data.id;
//       this.head = new Item(data, null);
//       this.tail = this.head;
//     }
//   }

//   deleteItem(data: DataInItem) {
//     let tmp = this.head;
//     let prevItem;
//     while (tmp?.data.id === data.id) {
//       prevItem = tmp;
//       tmp = tmp.next;
//     }
//   }
// }

// const test = new LinkedList(mockData);

// console.log(test.getList());
export const bla = () => {};

interface MockInterview {
  prevItemId: string | null;
  nextItemId: string | null;
  title: string;
  created_by?: number;
}

interface MockUserQuestions {
  prevItemId: string | null;
  nextItemId: string | null;
  question: string;
  answer: string;
  keyword: string[];
  isPrivate: boolean;
  created_by: number;
}

interface MockData {
  [id: string]: MockInterview | MockUserQuestions;
}

export const makeList = (headId: string, data: MockData) => {
  const head = data[headId];
  const list = [head];

  let tmp = head;
  while (tmp.nextItemId) {
    const nextData = data[tmp.nextItemId];
    list.push(nextData);
    tmp = data[tmp.nextItemId];
  }

  return list;
};

// prevItemId가 추가된 로직으로 전면 수정
const addItem = (
  tailId: string,
  newItemId: string,
  newItem: MockInterview | MockUserQuestions,
  data: MockData
) => {
  const tail = data[tailId];
  tail.nextItemId = newItemId;
  data[newItemId] = newItem;
  data[newItemId].prevItemId = tailId;
};

const deleteItem = (deleteItemId: string, data: MockData) => {
  const deleteItem = data[deleteItemId];
  const { prevItemId, nextItemId } = deleteItem;

  if (prevItemId) {
    data[prevItemId].nextItemId = nextItemId;
  } else if (nextItemId) {
    data[nextItemId].prevItemId = null;
  }

  if (nextItemId) {
    data[nextItemId].prevItemId = prevItemId;
  } else if (prevItemId) {
    data[prevItemId].nextItemId = null;
  }

  delete data[deleteItemId];
};

const switchOrder = (
  dragItemId: string,
  dropItemId: string,
  data: MockData
) => {
  const { prevItemId: dragItemPrevId, nextItemId: dragItemNextId } =
    data[dragItemId];

  const { prevItemId: dropItemPrevId, nextItemId: dropItemNextId } =
    data[dropItemId];

  if (dragItemPrevId) data[dragItemPrevId].nextItemId = dropItemId;
  if (dragItemNextId) data[dragItemNextId].prevItemId = dropItemId;
  if (dropItemPrevId) data[dropItemPrevId].nextItemId = dragItemId;
  if (dropItemNextId) data[dropItemNextId].prevItemId = dragItemId;

  data[dragItemId].prevItemId = dropItemPrevId;
  data[dragItemId].nextItemId = dropItemNextId;
  data[dropItemId].prevItemId = dragItemPrevId;
  data[dropItemId].nextItemId = dragItemNextId;

  if (data[dragItemId].prevItemId === dragItemId) {
    data[dragItemId].prevItemId = dropItemId;
  }
  if (data[dropItemId].nextItemId === dropItemId) {
    data[dropItemId].nextItemId = dragItemId;
  }
};
