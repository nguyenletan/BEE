import { selector } from "recoil";
import { spaceUsageGFAListState } from "./atoms";

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(spaceUsageGFAListState);
    const list = get(spaceUsageGFAListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.title === filter);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});